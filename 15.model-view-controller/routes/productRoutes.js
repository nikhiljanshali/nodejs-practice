const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// ─── ROUTES ───────────────────────────────────────────────────────────────────
// Routes map HTTP verbs + URL paths → Controller actions

// METHOD override middleware (HTML forms only support GET/POST)
router.use((req, res, next) => {
  if (req.query._method === 'PUT')    req.method = 'PUT';
  if (req.query._method === 'DELETE') req.method = 'DELETE';
  next();
});

router.get('/',          productController.index);    // List
router.get('/new',       productController.newForm);  // New form
router.post('/',         productController.create);   // Create
router.get('/:id',       productController.show);     // Show
router.get('/:id/edit',  productController.editForm); // Edit form
router.put('/:id',       productController.update);   // Update
router.delete('/:id',    productController.delete);   // Delete

module.exports = router;
