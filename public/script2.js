fetch('http://localhost:3000/Hommes/all')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('Hommes-container');
        data.forEach(Homme => {
        const div = document.createElement('div');
        div.className = 'product mx-2 col-md-3 card';
        div.id = "product-"+Homme.id
        div.innerHTML = `
        
        <h1 class="text-primary"> ${Homme.nom}</h1>
        <h3 class="text-primary"> ${Homme.color}</h3>
        <h3 class="text-primary"> ${Homme.size}</h3>
        `;
        container.appendChild(div);
        });
    })
    .catch(error => {
        console.error('Erreur :', error);
    });