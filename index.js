const cors = require('cors');
const express = require('express');
const {products, Hommes} = require('./data/data.js');
const path = require('path');
// const Hommes = require('./data/data.js');

const app = express();
app.use(cors());
// Middleware لتحليل بيانات JSON من الطلبات
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));



// hna kan3yto 3la page index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
});
//  hna can3yto 3la page li ghan7to fiha lproducts
app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'product.html'))
});
// hna kan3tyo 3la lproducts
app.get('/products/all', (req, res) => {
  res.json(products)
});
//  hna can3yto 3la page li ghan7to fiha hommes
app.get('/Hommes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Hommes.html'))
}) 
// hna kan3tyo 3la lproducts
app.get('/hommes/all', (req, res) => {
  res.json(Hommes);
})
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(item => item.id === productId);
  
  if (!product) {
    return res.status(404).send({message: 'product not found'});
  }else {
    res.json(product);
  }
});
  

app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id); 
  const index = products.findIndex(item => item.id === id);  

  if (index === -1) {
    return res.status(404).send({ message: 'Formation non trouvée' });
  }

  products.splice(index, 1); 
  res.send({ message: 'Formation supprimée avec succès' });
});
  

app.get('/product-details/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'product-details.html'))
}) 


app.get('/product-details/:nom', (req, res) => {
  const nom = req.params.nom
res.send(`Bonjour ${nom}`);
});

app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});










