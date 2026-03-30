const Product = require('../models/Product');

// ─── CONTROLLER ───────────────────────────────────────────────────────────────
// Controllers handle request logic, call the Model, and render the View.

const productController = {

  // GET /products — list all products
  index(req, res) {
    const products = Product.findAll();
    res.render('products/index', {
      title: 'All Products',
      products,
    });
  },

  // GET /products/new — show create form
  newForm(req, res) {
    res.render('products/form', {
      title: 'Add New Product',
      product: null,
      action: '/products',
      method: 'POST',
    });
  },

  // POST /products — create a product
  create(req, res) {
    const { name, category, price, stock } = req.body;
    if (!name || !category || !price || !stock) {
      return res.status(400).render('products/form', {
        title: 'Add New Product',
        product: req.body,
        action: '/products',
        method: 'POST',
        error: 'All fields are required.',
      });
    }
    Product.create({ name, category, price, stock });
    res.redirect('/products');
  },

  // GET /products/:id — show single product
  show(req, res) {
    const product = Product.findById(req.params.id);
    if (!product) return res.status(404).render('404', { title: 'Not Found' });
    res.render('products/show', { title: product.name, product });
  },

  // GET /products/:id/edit — show edit form
  editForm(req, res) {
    const product = Product.findById(req.params.id);
    if (!product) return res.status(404).render('404', { title: 'Not Found' });
    res.render('products/form', {
      title: `Edit: ${product.name}`,
      product,
      action: `/products/${product.id}?_method=PUT`,
      method: 'POST',
    });
  },

  // POST /products/:id?_method=PUT — update a product
  update(req, res) {
    const updated = Product.update(req.params.id, req.body);
    if (!updated) return res.status(404).render('404', { title: 'Not Found' });
    res.redirect(`/products/${updated.id}`);
  },

  // POST /products/:id?_method=DELETE — delete a product
  delete(req, res) {
    Product.delete(req.params.id);
    res.redirect('/products');
  },
};

module.exports = productController;
