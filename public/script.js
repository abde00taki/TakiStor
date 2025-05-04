fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('products-container');
        data.forEach(product => {
          const div = document.createElement('div');
          div.className = 'product';
          div.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.titele || ''}</p>
            <p>${product.color || ''}</p>
            <p>${product.size || ''}</p>
            <p>Prix: ${product.price || 'N/A'}</p>
            <img src="${product.url}>
          `;
          container.appendChild(div);
        });
      })
      .catch(err => console.error(err));