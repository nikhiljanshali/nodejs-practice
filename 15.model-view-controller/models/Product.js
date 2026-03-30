// ─── MODEL ────────────────────────────────────────────────────────────────────
// In a real app, this would connect to a database (MongoDB, PostgreSQL, etc.)
// Here we use an in-memory array to keep the example dependency-free.

let products = [
  { id: 1, name: 'Mechanical Keyboard', category: 'Electronics', price: 129.99, stock: 45 },
  { id: 2, name: 'Ergonomic Chair',     category: 'Furniture',   price: 349.00, stock: 12 },
  { id: 3, name: 'Standing Desk',       category: 'Furniture',   price: 499.99, stock: 8  },
  { id: 4, name: 'USB-C Hub',           category: 'Electronics', price: 49.99,  stock: 120 },
  { id: 5, name: 'Noise Cancelling Headphones', category: 'Electronics', price: 249.00, stock: 30 },
];

let nextId = 6;

const Product = {
  // READ all
  findAll() {
    return products;
  },

  // READ one by id
  findById(id) {
    return products.find(p => p.id === parseInt(id));
  },

  // CREATE
  create({ name, category, price, stock }) {
    const product = {
      id: nextId++,
      name,
      category,
      price: parseFloat(price),
      stock: parseInt(stock),
    };
    products.push(product);
    return product;
  },

  // UPDATE
  update(id, { name, category, price, stock }) {
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) return null;
    products[index] = { id: parseInt(id), name, category, price: parseFloat(price), stock: parseInt(stock) };
    return products[index];
  },

  // DELETE
  delete(id) {
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) return false;
    products.splice(index, 1);
    return true;
  },
};

module.exports = Product;
