fetch('http://localhost:3000/products/all')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('Hommes-container');
        data.forEach(Homme => {
        const div = document.createElement('div');
        div.className = 'product mx-2 col-md-3 card';
        div.id = "product-"+Homme.id
        div.innerHTML = `
        
        
        <h3 class="text-primary"> ${Homme.color}</h3>
        <h3 class="text-primary"> ${Homme.size}</h3>
        <h1 class="text-primary"> ${Homme.title}</h1>
        
        `;
        container.appendChild(div);
        });
    })
    .catch(error => {
        console.error('Erreur :', error);
    });