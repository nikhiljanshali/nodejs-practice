const path = require("path");

const file = "text/sample.txt";

console.log(path.basename(file));
console.log(path.dirname(file));
console.log(path.extname(file));
console.log(path.parse(file));

console.log(path.resolve("text", "sample.txt"));
console.log(path.join("text", "sample.txt"));
console.log(path.normalize("text\\sample.txt"));

console.log(path.isAbsolute("text\\sample.txt"));
console.log(path.isAbsolute("/text/sample.txt"));

/**
 * global constants
 */
console.log(__dirname);
console.log(__filename);
