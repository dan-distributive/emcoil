# EMCoil DCP Job example with node.js
This project demonstrates how to write and deploy a simple distributed computing job on the Distributive Compute Protocol (DCP) using:

* Main job script (`emcoil-job.py`)
* Mathematical model (`tube-forces.js`)
* Math library (`lib`)
* Distributed workers (browser workers or native workers)

This example is intended to illustrate the complete end-to-end workflow for distributed inference. While this demo job is small, the same structure can be applied to larger workloads.

> Note: Running this disributed demo is slower than running the computations locally due to network transfer and worker initialization overhead. The performance benefits of DCP become evident when the work function is computationally expensive and when there are numerous inputs.

## Overview

This repository is designed as a tutorial rather than a production-ready system. The code is intended to be clear and easy to understand, allowing developers to modify it as needed. Many configuration values are hard-coded (compute group join credentials, slice payment offer, etc.), but they can be adapted or turned into command prompts for more advanced/secure useage.

If you encounter any issues or have questions, you can reach the team via:

* Email: info@distributive.network
* Slack: [DCP Developers Slack](https://join.slack.com/t/dcp-devs/shared_invite/zt-56v87qj7-fkqZOXFUls8rNzO4mxHaIA)

## Prerequisites

* Node.js
* DCP client libraries:
```
npm install
```
* DCP keystore files in the home directory:
```
~/.dcp/id.keystore
~/.dcp/default.keystore
```
To obtain keystores, contact: dan@dcp.dev

## Running the Example

1. Launch the physics job:
```
node emcoil-job.js
```
2. Start browser-based workers:
* Open https://dcp.work/demo
* Enter join secret: `dcp`
* Click **Start**
3. As jobs are processed, stringified result objects will be displayed in the terminal via result events:
```
{
  job: 'jz4wXlUTcZqzTpc9CWRSSt',
  sliceNumber: 239,
  result: [ 200, 68, 200.65341925135965, 47686.501722830806 ]
}
```
Browser-based workers are sufficient for testing, but production-scale workflows can use native Docker, Linux, or Windows workers. More information: [DCP Workers](https://distributive.network/workers)

## Project Structure
```
.
├── emcoil-job.js        # Main job script
├── tube-forces.js       # Mathematical model
├── lib/
│   ├── integration/     # Numerical integration subroutine
│   ├── special/         # Special functions (Bessel, Struve, etc.)
│   └── utils/           # Utilities (complex numbers, etc.)
└── package.json
```

## Configuration
The following parameters can be modified:

| Parameter                   | Location            | Description                                        |
| --------------------------- | ------------------- | -------------------------------------------------- |
| parameterSets               | `emcoil-job.js`     | The multi-range object generates all permutations  |
| computeGroups               | `job.computeGroups` | Set join key and join secret                       |
| name, description, and link | `job.public`        | Publicly viwable information about your job        |
|slicePaymentOffer            | `job.exec`          | How many compute credits offered per job slice     |
| paymentAccountKeystore      | `job.exec`          | Specify which keystore file to use from ~/.dcp     |


To reduce console verbosity from workers, you can comment out or remove:
```
job.on('console', (con) => console.dir(con, { depth: Infinity }));
```

## Extending the Example

The same structure can be used for other types of use cases:
* Image classification or segmentation
* Audio or video analysis
* Large language model batching
* Medical imaging pipelines
The pattern remains:
```
const job = compute.for(inputSet, workFunction, arguments)
const results = await job.exec()
```
