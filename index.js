const cors = require('cors');
const express = require('express');
const products = require('./data.js');

const app = express();
app.use(cors());

const produi = [
  { 
      id: 1, 
      name: 'taki',
      titele: 'toni naruto',
      size: 'S M L XL XXL',
      color: 'black white blue',
      price: '300DH'
  },
  { 
      id: 2, 
      name: 'abde',
      titele: 'toni lofi',
      size: 'M L XL XXL',
      color: 'black white ',
      price: '300DH'
  },
  { 
      id: 3, 
      name: 'abdo',
      titele: 'toni humter',
      size: 'S M L XL XXL',
      color: 'black white red',
      price: '300DH'
  },
  { 
      id: 4, 
      name: 'abd',
      titele: 'toni detnote',
      size: 'S M L XL XXL',
      color: 'black white blue',
      price: '300DH'
  },   
];


app.get('/produi', (req, res) => {
  res.json(produi);
})


// Définir une route GET
app.get('/', (req, res) => {
  res.send('Bienvenue sur azicode62');
});

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(item => item.id === productId);
  
  if (!product) {
    return res.status(404).send({message: 'product not found'});
  }else {
    res.json(product);
  }
});


app.delete('/delete', (req, res) => {
  res.send('delete  hello world');
});

app.post('/post', (req, res) => {
  res.send('post');
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});
