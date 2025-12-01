/*
* @file        emcoil-job.js  Main driving program for modelling electromagnetic 
*                             force interactions in tube-coil geometries.
*
* Copyright (c) 2025, Distributive Corp.
*
* @authors     Dr. Dan Desjardins, dan@distributive.network
* @date        Jan 2025
*
* example command to run script:   node emcoil-job
*
* Requirements:
*   - Node.js
*   - npm packages:
*       - dcp-client
*       - nodeplotlib
*/

async function main() {

  const compute = require('dcp/compute')
  const wallet = require('dcp/wallet');
  const MultiRangeObject = require('dcp/range-object').MultiRangeObject;

  // INPUT SET
  const parameterSets = new MultiRangeObject([
  // The multi-range object is used to generate all combinations of the inputs.
  // docs.dcp.dev/api/compute/classes/multi-range-object.html
    [10, 20, 50, 100, 200],           // frequency [Hz]
    { start: 0, end: 100, step: 2 },  // velocity [m/s] 
    1,                                // current [A]
    9560000,                          // wire turn density [m^-2]
    0.1,                              // coil thickness [m]
    0.1,                              // coil length [m]
    0.05,                             // coil-tube air gap [m]
    2,                                // outer radius of outer tube layer [m]
    0.02,                             // outer tube thickness [m]
    37700000,                         // outer tube conductivity [S/m]
    1,                                // outer tube relative magnetic permeability [unitless]
    0.01,                             // inner tube thickness [m]
    5500000,                          // inner tube conductivity [S/m]
    200,                              // inner tube relative magnetic permeability [unitless]
  ]);


  // WORK FUNCTION
  async function model(parameterSet) {
    progress();
    const physics = require('./tube-forces');
    const result = [
        parameterSet[0], 
        parameterSet[1], 
        physics.axialForce(...parameterSet), 
        physics.radialForce(...parameterSet)
    ];
    return result;
  }


  // COMPUTE.FOR
  const job = compute.for(parameterSets, model);

  // REQUIRED PACKAGES
  job.requires(['./tube-forces']);

  // COMPUTE GROUPS
  job.computeGroups = [{joinKey: 'demo', joinSecret: 'dcp'}];

  // JOB PUBLIC INFO
  job.public = {
    name: 'EMcoil', 
    description: 'Computational electrodynamics', 
    link: 'https://dcp.live/demo'
  };

  // EVENTS
  job.on('readystatechange', (ev) => console.log(`Ready state: ${ev}`));
  job.on('accepted', () => {
    console.log(`  Job id: ${job.id}`);
    console.log('  Job accepted, waiting on first results...');
  });
  job.on('result', (ev) => console.log(ev));
  job.on('error', (error) => console.error('  Job error:', error));
  job.on('nofunds', (ev) => console.log(ev));
  job.on('stop', (ev) => console.log(ev));


  // JOB.EXEC
  let resultSet = await job.exec(
    slicePaymentOffer = 0.010,                              // Compute Credits offered per job slice
    paymentAccountKeystore = await wallet.get('default')    // name of keystore file to use from ~/.dcp
  );

  

  // PLOT RESULTS
  const plot = require('nodeplotlib');

  // Group data by frequency
  const groupedData = {};
  Array.from(resultSet).forEach(entry => {
    const frequency = entry[0];
    if (!groupedData[frequency]) {
      groupedData[frequency] = { velocity: [], axialForce: [], radialForce: [] };
    }
    groupedData[frequency].velocity.push(entry[1]);
    groupedData[frequency].axialForce.push(entry[2]);
    groupedData[frequency].radialForce.push(entry[3]);
  });

  // Define a color palette
  const colorPalette = ['blue', 'green', 'red', 'purple', 'orange'];

  // Prepare Axial and Radial traces
  const axialTraces = Object.keys(groupedData).map((frequency, index) => ({
    x: groupedData[frequency].velocity,
    y: groupedData[frequency].axialForce,
    type: 'scatter',
    mode: 'markers',
    name: `Axial Freq ${frequency} Hz`,
    marker: { color: colorPalette[index] },
    xaxis: 'x1',
    yaxis: 'y1'
  }));

  const radialTraces = Object.keys(groupedData).map((frequency, index) => ({
    x: groupedData[frequency].velocity,
    y: groupedData[frequency].radialForce,
    type: 'scatter',
    mode: 'markers',
    name: `Radial Freq ${frequency} Hz`,
    marker: { color: colorPalette[index] },
    xaxis: 'x2',
    yaxis: 'y2'
  }));

  // Combine traces
  const allTraces = [...axialTraces, ...radialTraces];

  // Define layout with two subplots side by side
  const layout = {
    grid: { rows: 1, columns: 2, pattern: 'independent' },
    title: 'Axial and Radial Forces vs Velocity',
    xaxis: { title: 'Velocity [m/s]' },
    yaxis: { title: 'Axial force [N]' },
    xaxis2: { title: 'Velocity [m/s]' },
    yaxis2: { title: 'Radial force [N]' }
  };

  // Plot both on the same page
  plot.plot(allTraces, layout);

}

require('dcp-client').init('https://scheduler.distributed.computer').then(main);