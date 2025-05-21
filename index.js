const cors = require('cors');
const express = require('express');
const { products, hats } = require('./data/data.js');
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
// hado les page dyal casket
app.get('/hat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'hat.html'))
})
app.get('/hat-details', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'hat-details.html'))
})
app.get('/hat-details/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'hat-details.html'))
})
app.get('/hats/all', (req, res) => {
  res.json(hats);
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
app.get('/hats/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const  hat = hats.find(p => p.id === id);

  if (!hat) {
    return res.status(404).send({ message: 'Produit introuvable' });
  }

  res.send(hat);
});


app.get('/product-details', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'product-details.html'));
});

app.get('/Hommes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Hommes.html'))
})

app.post('/products', (req, res) => {
   const newProduct = req.body;
    newProduct.id = products.length + 1;  
    products.push(newProduct);
    console.log(newProduct);
    res.json({ success: true, product: newProduct });
  
})

// Démarrage du serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});
