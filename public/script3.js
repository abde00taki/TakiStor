document.addEventListener("DOMContentLoaded", () => {
  const url = window.location.href;
  const parts = url.split("/"); // Split the URL into parts by "/"
  const productId = parts.splice(-1)[0];

  fetch(`http://localhost:3000/products/${productId}`)
    .then((res) => res.json())
    .then((product) => {
      console.log("image de produit : " + product.img);

      const container = document.getElementById("product-container");
      const div = document.createElement("div");
      div.className = "product mx-2 mt-4 card bg-primary";
      // div.id = "product-"+product.id
      div.innerHTML = `
            <div id="carouselExampleControlsNoTouching" class="carousel slide bg-dark" data-bs-touch="false" style="border: 1px solid whitesmoke; border-radius: 10px; box-shadow: 0 0 8px white; ">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="/emage/${product.img}" class="d-block w-100" style="background-image: url(/img/orang.png);" alt="...">
    </div>
    <div class="carousel-item">
      <img src="/emage/${product.img2}" class="d-block w-100" style="background-image: url(/img/brown.png);"  alt="...">
    </div>
    <div class="carousel-item">
      <img src="/emage/${product.img3}" class="d-block w-100" style="background-image: url(/img/red.png);"  alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  <div class="row mt-2">
           <div class="col">
            <h2 class="text-center text-light">  ${product.titele} </h2>
           </div>
           <div class="col">
            <h2 class="text-center text-light">  ${product.price} </h2>
           </div>
</div>
           
            
           
          </div>

          <div class="d-flex justify-content-center">
          <div class="row mt-4 bg-dark w-100" style=" padding: 10px; border: 1px solid whitesmoke; border-radius: 10px; box-shadow: 0 0 8px white">
          <div class="col">
            <div class="form-group">
               <select name="${product.size}" id="" class="form-select">
                   <option value="${product.size}">S</option>
                   <option value="${product.size}">M</option>
                   <option value="${product.size}">L</option>
                   <option value="${product.size}">XL</option>
               </select>
            </div>
          </div>
            <div class="col">
                 <div class="form-group">
               <select name="${product.color}" id="" class="form-select">
                   <option value="${product.color}">BLACK</option>
                   <option value="${product.color}">WHITE</option>
                   <option value="${product.color}">RED</option>
                   
               </select>
            </div>
            </div>
            <div class="d-flex justify-content-center">
            <button data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-primary mt-2 w-75">chop</button>
            </div>
        </div>
          </div>
         
        
       
          `;
      container.appendChild(div);
    })
    .catch((error) => {
      console.log("failed to get the product with id ", productId);
      console.log("details of the error : ", error);
    });
});