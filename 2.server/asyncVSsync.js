// console.log("First");
// console.log("Second");
// console.log("Third");

// setTimeout(() => {
//   console.log("Fourth");
// }, 2000);

// console.log("Fifth");

// let a = 10;
// let b = 20;
// console.log(a + b);

// setTimeout(() => {
//   b = 30;
//   console.log(a + b);
// }, 1000);

// const fs = require("fs");
// fs.readFile("textFiles/Nikhil.txt", "utf-8", (error, data) => {
//   if (error) {
//     console.log(error);
//     return;
//   }
//   console.log(data);
// }); // async
// console.log("end script");



const fs = require("fs");
const data = fs.readFileSync("textFiles/Nikhil.txt", "utf-8",); // sync
console.log(data);
console.log("end script");