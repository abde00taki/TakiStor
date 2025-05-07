fetch('http://localhost:3000/products/all')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('products-container');
        data.forEach(product => {
          const div = document.createElement('div');
          div.className = 'product mx-2 mt-4 col-md-3 card';
          div.id = "product-"+product.id
          div.innerHTML = `
            <a href="/product-details/${product.id}"> <img class="w-100"src="emage/${product.img}" alt="image"/> </a>
            <h6 class="text-center">  ${product.titele} </h6>
          `;
          container.appendChild(div);
        });
      })
      .catch(error => {
        console.error('Erreur :', error);
      });
      


    //   function showProduct(productId) {
    //     const product = products.find(p => p.id === productId);
    //     const sidebar = document.getElementById('zone-cards');
        
    //     if (product) {
    //         sidebar.innerHTML = `
    //             <h5>${product.img}</h5>
    //             <p>${product.titel}</p>
    //             <p><strong>${product.price}</strong></p>
    //         `;
    //     } else {
    //         sidebar.innerHTML = <p>Produit non trouvé.</p>;
    //     }
    // }
    
    // Initial display of products
    // displayProducts();
    // showProduct(1); // Show the first product by default
      
      // const containerCards = document.getElementById('zone-cards');
      // window.showPreview = function(e) {
      //   const preview = document.createElement('div');
      //   preview.innerHTML = `<img src="${e.product.img}" alt="${e.alt}">
      //                       <h1>${product.titel}<h1>
      //                       <h1>${product.size}<h1>
      //                       <h1>${product.color}<h1>
      //                       <h1>${product.price}<h1>
      //                       `;
      //                       containerCards.appendChild(preview)
      // }