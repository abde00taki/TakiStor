const cors = require('cors');
const multer = require('multer')
const express = require('express');
const { products, hats } = require('./data/data.js');
const path = require('path');
const PORT = 3000


const app = express();

// config Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/emage/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ 
    storage: storage ,
    limits: { fileSize: 2 * 1024 * 1024 } // Limite: 2MB
 })



app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// get home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// get page the admin
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin/post.html'));
});


// get page thr products
app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'product.html'));
});

// API: get all the products in json
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


// Page the détails products
app.get('/product-details/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'product-details.html'));
});

// API: get product by ID
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).send({ message: 'Produit introuvable' });
  }

  res.send(product);
});

// =============POST product by ID=========== 
app.post('/products', upload.single('img') ,(req, res) => {
  const image = req.file;
   const newProduct = req.body;
    newProduct.id = products.length + 1; 
    newProduct.img = image.filename; 
    products.push(newProduct);
    console.log(newProduct);
    res.json({ success: true, product: newProduct});
  
})

// ============ UPDATE product by ID =============
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(f => f.id === id);

  // hna kantakdo wach dija 3ndna dak lproduct
  if (!product) {
    return res.status(404).json({ error: 'we dont have this product' });
  }

  // hna kantakdo mn l7wayj li ghaytbdlo
  const { img, titele, size, color, price } = req.body;
  if (img) product.img = img;
  if (titele) product.titele = titele;
  if (size) product.size = size;
  if (color) product.color = color;
  if (price) product.price = price;

  res.json(product);
});

// ===========DELETE product by ID==============
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(f => f.id === id);

  // hna kantakdo wach 3ndna
  if (index === -1) {
    return res.status(404).json({ error: 'Formation non trouvée.' });
  }

  // hna ba9i mafhmtoch mzyan db nrje3 lih
  const [deleted] = products.splice(index, 1);
  res.json({ message: 'Formation supprimée.', product: deleted });
});

// ========== GET hat by ID ============
app.get('/hats/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const  hat = hats.find(p => p.id === id);

  if (!hat) {
    return res.status(404).send({ message: 'product is not her' });
  }

  res.send(hat);
});
  // ======== UPDATE hat by id =======
  app.put('/hats/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const hat = hats.find(f => f.id === id);

  // takod
  if (!hat) {
    return res.status(404).json({ error: 'we dont have this product' });
  }

  // 
  const { photo, title, colore, prix } = req.body;
  if (photo) hat.photo = photo;
  if (title) hat.title = title;
  if (colore) hat.colore = colore;
  if (prix) hat.prix  = prix;
  res.json(hat);
});

// =========== DELETE hat by ID =========
app.delete('/hats/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = hats.findIndex(f => f.id === id);

  // takod
  if (index === -1) {
    return res.status(404).json({ error: 'Formation non trouvée.' });
  }

  // 
  const [deleted] = hats.splice(index, 1);
  res.json({ message: 'Formation supprimée.', hat: deleted });
});

// =========== GET page product-details ===========
app.get('/product-details', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'product-details.html'));
});

// page ba9i makhdemtch 3liha
app.get('/Hommes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Hommes.html'))
})



// =========== RUN server ============
app.listen(PORT, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});
