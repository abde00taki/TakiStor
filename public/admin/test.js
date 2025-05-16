

        const form = document.getElementById('formation-form')
        form.addEventListener('submit', (e) => {
            e.preventDefault()

            const titre = document.getElementById('titre').value
            const duree = document.getElementById('durre').value
            const description = document.getElementById('description').value

            const nouvelleFormation = { titre, duree, description }
            console.log(nouvelleFormation);

            fetch('/new-formation', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(nouvelleFormation)
            })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.error('Error:', err));
        })

                    

// new formation
app.post('/new-formation', (req, res) => {
    const newFormation = req.body;
    newFormation.id = formations.length + 1;  
    formations.push(newFormation);
    console.log(newFormation);
    res.json({ success: true, formation: newFormation });
});