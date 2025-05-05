fetch('http://localhost:3000/products/all')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('products-container');
        data.forEach(product => {
          const div = document.createElement('div');
          div.className = 'product col-md-4 w-100';
          div.innerHTML = `
            <h2>${product.titele || ''}</h2>
            <p>${product.color || ''}</p>
            <p>${product.size || ''}</p>
            <p>Prix: ${product.price || 'N/A'}</p>
          `;
          container.appendChild(div);
        });
      })
      .catch(error => {
        console.error('Erreur :', error);
      });


