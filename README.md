# Node.js Learning Journey 🚀

A structured collection of **19 hands-on Node.js practice projects**, progressing from basic concepts to database integration with MongoDB and Mongoose.

---

## 📁 Project Structure

| # | Folder | Topic | Description |
|---|--------|-------|-------------|
| 01 | `1.basic` | Node.js Basics | Introduction to Node.js, modules, and core concepts |
| 02 | `2.server` | HTTP Server | Creating a basic HTTP server using Node's built-in `http` module |
| 03 | `3.moduler-routes` | Modular Routes | Organizing routes into separate modules for clean architecture |
| 04 | `4.sample website` | Sample Website | Building a simple multi-page website with Node.js |
| 05 | `5.path-global-constant` | Path & Global Constants | Working with the `path` module and global constants in Node.js |
| 06 | `6.express` | Express.js Basics | Introduction to Express.js framework and routing |
| 07 | `7.express-html-form` | Express HTML Forms | Handling HTML form submissions with Express |
| 08 | `8.express-html-files` | Express HTML Files | Serving static HTML files using Express |
| 09 | `9.middleware-understanding` | Middleware Concepts | Understanding how middleware works in Express |
| 10 | `10.middleware-example` | Middleware Examples | Practical examples of custom middleware |
| 11 | `11.external-middleware` | External Middleware | Using third-party middleware packages (e.g., `morgan`, `body-parser`) |
| 12 | `12.error-handling-middleware` | Error Handling | Implementing error-handling middleware in Express |
| 13 | `13.template-engine` | Template Engine | Using template engines (e.g., EJS, Pug) to render dynamic HTML |
| 14 | `14.model-view-controller` | MVC Pattern (Part 1) | Structuring apps using the Model-View-Controller pattern |
| 15 | `15.model-view-controller` | MVC Pattern (Part 2) | Advanced MVC implementation and best practices |
| 16 | `16.dynamic-routes` | Dynamic Routes | Creating dynamic URL parameters and route handlers |
| 17 | `17.dynamic-routes-with-api` | Dynamic Routes + API | Combining dynamic routes with RESTful API endpoints |
| 18 | `18.Database - Node Js mongoDB` | MongoDB | Connecting Node.js to MongoDB using the native driver |
| 19 | `19.Database - NodeJs mongoose` | Mongoose ODM | Using Mongoose for MongoDB schema modeling and queries |

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB, Mongoose
- **Middleware:** Morgan, Body-Parser, and others
- **Template Engines:** EJS / Pug

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (for projects 18 & 19)

### Clone the Repository

```bash
git clone https://github.com/your-username/nodejs-practice.git
cd nodejs-practice
```

### Run Any Project

```bash
# Navigate to the desired project folder
cd 6.express

# Install dependencies
npm install

# Start the server
node index.js
```

---

## 📚 Learning Path

```
1.basic
   ↓
2.server
   ↓
3.moduler-routes → 4.sample website → 5.path-global-constant
   ↓
6.express → 7.express-html-form → 8.express-html-files
   ↓
9.middleware-understanding → 10.middleware-example
→ 11.external-middleware → 12.error-handling-middleware
   ↓
13.template-engine
   ↓
14.model-view-controller → 15.model-view-controller
   ↓
16.dynamic-routes → 17.dynamic-routes-with-api
   ↓
18.Database (MongoDB) → 19.Database (Mongoose)
```

---

## 📝 Notes

- Each folder is an **independent project** with its own `package.json`
- Run `npm install` inside each folder before starting
- `node_modules` are **not included** in the repo — run `npm install` to restore them
- Projects 18 & 19 require a running **MongoDB instance**

---

## 📌 Useful Commands

```bash
# Install dependencies for all projects at once (run from root)
for /d %f in (*) do (cd "%f" && npm install && cd ..)

# Check Node.js version
node --version

# Check npm version
npm --version
```

---

## 🤝 Contributing

Feel free to fork this repo, add improvements, and submit a pull request!

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
