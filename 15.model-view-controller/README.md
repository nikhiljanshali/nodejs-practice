# Node.js MVC — Express + EJS + Nodemon

A clean, full-featured **MVC architecture** example using:

- **Express.js** — web framework & routing
- **EJS** — server-side templating (Views)
- **Nodemon** — auto-restart on file changes (dev)
- **In-memory data store** — simulates a database Model

---

## 📁 Project Structure

```
node-mvc/
├── app.js                    ← Entry point, Express setup
│
├── models/
│   └── Product.js            ← MODEL: data & business logic
│
├── controllers/
│   └── productController.js  ← CONTROLLER: request handling
│
├── routes/
│   └── productRoutes.js      ← ROUTES: URL → Controller mapping
│
├── views/
│   ├── partials/
│   │   ├── header.ejs        ← Shared header
│   │   └── footer.ejs        ← Shared footer
│   ├── products/
│   │   ├── index.ejs         ← List all products
│   │   ├── show.ejs          ← Product detail
│   │   └── form.ejs          ← Create / Edit form
│   └── 404.ejs
│
├── public/
│   └── css/style.css         ← Static assets
│
└── package.json
```

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start in development mode (with Nodemon auto-reload)
npm run dev

# 3. Start in production mode
npm start
```

Open **http://localhost:3000**

---

## 🔄 MVC Request Flow

```
HTTP Request
    ↓
Route (routes/productRoutes.js)
    ↓
Controller (controllers/productController.js)
    ↓         ↓
  Model    View (EJS)
(data)   (render HTML)
    ↓
HTTP Response
```

---

## 🛣️ Routes

| Method | Path                | Action         |
|--------|---------------------|----------------|
| GET    | /products           | List all       |
| GET    | /products/new       | Show create form |
| POST   | /products           | Create         |
| GET    | /products/:id       | Show one       |
| GET    | /products/:id/edit  | Show edit form |
| PUT    | /products/:id       | Update         |
| DELETE | /products/:id       | Delete         |

> HTML forms only support GET/POST, so PUT/DELETE are simulated via `?_method=PUT`
