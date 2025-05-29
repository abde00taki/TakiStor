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
// hna mnach kanposte les products 
app.post('/products', (req, res) => {
   const newProduct = req.body;
    newProduct.id = products.length + 1;  
    products.push(newProduct);
    console.log(newProduct);
    res.json({ success: true, product: newProduct });
  
})

// han bach kn7edet product 
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(f => f.id === id);

  // Vérification de l'existence
  if (!product) {
    return res.status(404).json({ error: 'we dont have this product' });
  }

  // Mise à jour des champs si fournis
  const { img, titele, size, color, price } = req.body;
  if (img) product.img = img;
  if (titele) product.titele = titele;
  if (size) product.size = size;
  if (color) product.color = color;
  if (price) product.price = price;

  res.json(product);
});
//  mn hna mnach kanmse7 product 
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(f => f.id === id);

  // Vérification de l'existence
  if (index === -1) {
    return res.status(404).json({ error: 'Formation non trouvée.' });
  }

  // Suppression avec splice
  const [deleted] = products.splice(index, 1);
  res.json({ message: 'Formation supprimée.', product: deleted });
});

// hna kanjib hat by id 
app.get('/hats/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const  hat = hats.find(p => p.id === id);

  if (!hat) {
    return res.status(404).send({ message: 'product is not her' });
  }

  res.send(hat);
});
  // hna mnach n9der n7adet hat product
  app.put('/hats/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const hat = hats.find(f => f.id === id);

  // Vérification de l'existence
  if (!hat) {
    return res.status(404).json({ error: 'we dont have this product' });
  }

  // Mise à jour des champs si fournis
  const { photo, title, colore, prix } = req.body;
  if (photo) hat.photo = photo;
  if (title) hat.title = title;
  if (colore) hat.colore = colore;
  if (prix) hat.prix  = prix;
  res.json(hat);
});

// hna manch kanmse7 hat 
app.delete('/hats/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = hats.findIndex(f => f.id === id);

  // Vérification de l'existence
  if (index === -1) {
    return res.status(404).json({ error: 'Formation non trouvée.' });
  }

  // Suppression avec splice
  const [deleted] = hats.splice(index, 1);
  res.json({ message: 'Formation supprimée.', hat: deleted });
});


app.get('/product-details', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'product-details.html'));
});

app.get('/Hommes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Hommes.html'))
})



// Démarrage du serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});
