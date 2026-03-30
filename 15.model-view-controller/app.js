const express = require('express');
const path = require('path');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── View Engine ───────────────────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(express.json());                          // Parse JSON
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// ─── Routes ────────────────────────────────────────────────────────────────────
app.use('/products', productRoutes);

// Home redirect
app.get('/', (req, res) => res.redirect('/products'));

// 404 Handler
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// ─── Start Server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  Server running at http://localhost:${PORT}`);
  console.log(`📁  MVC Structure: Models → Controllers → Views`);
});
