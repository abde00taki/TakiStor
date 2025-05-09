document.addEventListener("DOMContentLoaded", () => {
        const url = window.location.href;
        const parts = url.split("/"); // Split the URL into parts by "/"
        const productId = parts.splice(-1)[0];

        fetch(`http://localhost:3000/products/${productId}`)
          .then((res) => res.json())
          .then((product) => {
            console.log("image de produit : "+product.img);
            
            const container = document.getElementById("product-container");
            const div = document.createElement("div");
            div.className = "product mx-2 mt-4 card bg-dark";
            // div.id = "product-"+product.id
            div.innerHTML = `
            <img class="w-100"src="/emage/${product.img}" style="border: 1px solid whitesmoke; border-radius: 10px; box-shadow: 0 0 8px white; background-image: url(/img/orang.png);" alt="image"/> 
            <h2 class="text-center">  ${product.titele} </h2>
            <h2 class="text-center">  ${product.size} </h2>
            <h2 class="text-center">  ${product.color} </h2>
            <h2 class="text-center">  ${product.price} </h2>
          `;
            container.appendChild(div);
          })
          .catch((error) => {
            console.log("failed to get the product with id ", productId);
            console.log("details of the error : ", error);
          });
      });