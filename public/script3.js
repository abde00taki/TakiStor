const { products } = require("../data/data");

const producttId = new URLSearchParams(window.location.search).get('id'); // Get the ID from the URL

fetch(`http://localhost:3000/products/${producttId}`)
    .then(res => res.json())
    .then(products => {
        // console.log(product);
        
        const container = document.getElementById('product-container'); // Update to the correct ID
        container.innerHTML = `
                    <h5 class="card-title">${products.titele}</h5>
        `;
    })
    .catch(error => {
        console.error('Erreur:', error);
        document.getElementById('product-container').innerHTML = '<p>Formation non trouvée.</p>';
    });