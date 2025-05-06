fetch('http://localhost:3000/products/all')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('products-container');
        data.forEach(product => {
          const div = document.createElement('div');
          div.className = 'product mx-2 mt-4 col-md-3 card';
          div.id = "product-"+product.id
          div.innerHTML = `
            <a href="/show-prooduct/${product.id}"> <img class="w-100" src="emage/${product.img}" alt="image"/> </a>
          `;
          container.appendChild(div);
        });
      })
      .catch(error => {
        console.error('Erreur :', error);
      });


