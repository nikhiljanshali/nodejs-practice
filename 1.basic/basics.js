// var a = 50;
// var b = 20;
// var c = 30;

// if (a > b && a > c) {
//   console.log("A is greater");
// } else if (b > a && b > c) {
//   console.log("B is greater");
// } else {
//   console.log("C is greater");
// }

// let arr = [1, 2, 3, 4, 5];
// for (let i = 0; i < arr.length; i++) {
//   console.log(arr[i]);
// }

// const a = 100;
// const b = 200;
// const c = 300;

// // c = 400;
// console.log(a + b + c);

// if (a == 200) {
//   console.log("Equal");
// } else {
//   console.log("Not Equal");
// }

// function sum(a, b) {
//   return a + b;
// }

// console.log(sum(10, 20));

// for (var i = 0; i < 20; i++) {
//   console.log("For loop->>", i);
// }

// var i = 0;
// while (i <= 10) {
//   i++;
//   console.log("Do While Loop->>", i);
// }

// var users = ["nikhil", "vikash", "anil", "chitan", "jayant"];
// console.log(users[2]);

// for (var i = 0; i < users.length; i++) {
//   console.log(users[i]);
// }

// console.log('----------------------------------');

// var user = {
//   name: "Nikhil",
//   age: 20,
//   city: "Delhi",
//   state: "Haryana",
//   country: "India",
// };

// console.log(user);

// console.log(user.name);
// console.log(user.age);
// console.log(user.city);
// console.log(user.state);
// console.log(user.country);

console.log('---------data.js-------------------------');
/**
 * way 1
 */
// import { userName } from "./data.js";
// console.log(userName);

/**
 * way 2
 */
// const data = require("./data.js");
// console.log(data.userName);

/**
 * way 3
 */
const { userName } = require("./data.js");
console.log(userName);
