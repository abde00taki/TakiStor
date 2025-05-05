// دالة لجلب المنتجات من السيرفر
async function fetchProducts() {
    try {
      const response = await fetch('http://localhost:3000/api/products');
      if (!response.ok) throw new Error('فشل في جلب البيانات');
      const products = await response.json();
      displayProducts(products);
    } catch (error) {
      console.error('Error:', error);
      alert('حدث خطأ أثناء جلب المنتجات');
    }
  }
  
  // دالة لعرض المنتجات في واجهة المستخدم
  function displayProducts(products) {
    const container = document.getElementById('products-container');
    if (!container) {
      console.error('العنصر products-container غير موجود في الصفحة');
      return;
    }
    container.innerHTML = '';
  
    products.forEach(product => {
      const card = `
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <img src="${product.image || '/images/default.jpg'}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">السعر: $${product.price}</p>
              <button class="btn btn-primary">إضافة إلى السلة</button>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += card;
    });
  }
  
  // دالة لإضافة منتج جديد
  async function addProduct(productData) {
    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'فشل في إضافة المنتج');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error; // إعادة رمي الخطأ للتعامل معه في مكان آخر
    }
  }
  
  // معالجة إرسال النموذج
  document.addEventListener('DOMContentLoaded', () => {
    fetchProducts(); // جلب المنتجات عند تحميل الصفحة
  
    const form = document.getElementById('addProductForm');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        const product = {
          name: document.getElementById('productName').value.trim(),
          price: parseFloat(document.getElementById('productPrice').value),
          image: document.getElementById('productImage').value.trim() || undefined
        };
  
        try {
          await addProduct(product);
          alert('تمت إضافة المنتج بنجاح!');
          form.reset(); // إعادة تعيين النموذج
          fetchProducts(); // تحديث القائمة
        } catch (error) {
          alert(error.message);
        }
      });
    }
  });