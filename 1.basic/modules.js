const fs = require("fs"); // node js core module called file system
const os = require("os"); // node js core module called operating system

const { log, warn } = require("console");

fs.writeFileSync("dummy.txt", "trying with modules");

// console.log(os.cpus());
// console.log(os.platform());
// console.log(os.arch());
// console.log(os.hostname());
// console.log(os.networkInterfaces());
// console.log(os.userInfo());
// console.log(os.uptime());
// console.log(os.totalmem());
// console.log(os.freemem());

console.log("hello world");
console.log(process.cwd());
console.log(process.pid);

log('custom Log');
warn('custom Log');
