const cors = require('cors');
const express = require('express');
const { products } = require('./data/data.js');
const path = require('path');


const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
// Page d'accueil
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Page d'accueil
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin/index.html'));
});


// Page des produits
app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'product.html'));
});

// API: Tous les produits
app.get('/products/all', (req, res) => {
  res.json(products);
});

// Page de détails
app.get('/product-details/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'product-details.html'));
});

// API: Un seul produit selon ID
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).send({ message: 'Produit introuvable' });
  }

  res.send(product);
});


app.get('/product-details', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'product-details.html'));
});

app.get('/Hommes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Hommes.html'))
})

app.post('/products', (req, res) => {
   const newProduct = req.body;
    products.id = products.length + 1;  
    products.push(newProduct);
    console.log(newProduct);
    res.json({ success: true, product: newProduct });
  
})

// Démarrage du serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});
