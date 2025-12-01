Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xerror = xerror;
function xerror() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  console.log(args);
  process.exit(1);
}