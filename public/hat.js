fetch('http://localhost:3000/hats/all')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('products-container');
        data.forEach(product => {
          const div = document.createElement('div');
          div.className = 'product mx-2 mt-4 col-md-3 card';
          div.id = "product-"+product.id
          div.innerHTML = `
            <a href=""> <img class="w-100"src="emage/${product.photo}" alt="image"/> </a>
            <h6 class="text-center">  ${product.prix} </h6>
            <button data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-primary" style="">shop</button>
          `;
          container.appendChild(div);
        });
      })
      .catch(error => {
        console.error('Erreur :', error);
      });
      