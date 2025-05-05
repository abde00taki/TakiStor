const cors = require('cors');
const express = require('express');
const products = require('./data.js');

const app = express();
app.use(cors());
// Middleware لتحليل بيانات JSON من الطلبات
app.use(express.json());


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


app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id); // نحصل على رقم الـ id من الرابط
  const index = products.findIndex(item => item.id === id); // نبحث عن العنصر

  if (index === -1) {
    // إذا لم نجده
    return res.status(404).send({ message: 'Formation non trouvée' });
  }

  products.splice(index, 1); // نحذف العنصر من القائمة
  res.send({ message: 'Formation supprimée avec succès' });
});
  

// مسار POST لإضافة منتج جديد
app.post('/api/products', (req, res) => {
  const { name, price, image } = req.body; // البيانات المرسلة من النموذج

  // 1. التحقق من وجود البيانات المطلوبة
  if (!name || !price) {
    return res.status(400).json({ error: 'الاسم والسعر مطلوبان' });
  }

  // 2. إنشاء منتج جديد
  const newProduct = {
    id: products.length + 1, // إنشاء ID تلقائي
    name,
    price: Number(price),
    image: image || '/images/default.jpg' // صورة افتراضية إذا لم تُحدد
  };

  // 3. إضافة المنتج للمصفوفة
  products.push(newProduct);

  // 4. إرسال الرد بنجاح العملية
  res.status(201).json(newProduct);
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});










