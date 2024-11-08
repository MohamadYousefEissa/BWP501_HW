// for bootstrap popover...
const popoverTriggerList = document.querySelectorAll(
  '[data-bs-toggle="popover"]'
);
const popoverList = [...popoverTriggerList].map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);

//here we define all the products to reduce html code :
const products = [
  {
    title: "Sweater",
    price: 10,
    imgSrc: "./images/sweater.webp",
    quantity: 1,
    inCart: false,
    id: 1,
    description:
      "Designed for ultimate comfort and enduring style, this sweater is crafted from premium-quality materials that adapt to your body for a perfect fit. Ideal for both casual outings and cozy nights in, it provides a snug embrace while maintaining breathability and warmth. The refined knit pattern and tailored silhouette ensure you stay fashionable and comfortable throughout the day, offering versatility and elegance in every wear.",
  },
  {
    title: "Shoes",
    price: 100,
    imgSrc: "./images/shoes.png",
    quantity: 1,
    inCart: false,
    id: 2,
    description:
      "Step into style with these classic shoes, designed with both aesthetics and functionality in mind. The cushioned insole provides all-day comfort, while the sturdy outsole ensures reliable traction. A perfect blend of fashion and practicality for the discerning customer.",
  },
  {
    title: "Shoes",
    price: 150,
    imgSrc: "./images/shoes-2.png",
    quantity: 1,
    inCart: false,
    id: 3,
    description:
      "Expertly crafted for both style and endurance, these shoes are made from high-quality materials that mold to the contours of your feet over time. Ideal for any occasion, from casual outings to formal events, they provide a snug fit and superior support. The durable sole offers excellent traction, ensuring stability and comfort with every step. Elevate your footwear collection with shoes that combine elegance and practicality effortlessly.",
  },
  {
    title: "Dress",
    price: 250,
    imgSrc: "./images/dress.png",
    quantity: 1,
    inCart: false,
    id: 4,
    description:
      "This elegant dress features a timeless silhouette with a modern twist. The breathable fabric drapes beautifully, creating a flattering fit for all body types. Its versatile design makes it suitable for various occasions, from a day at the office to an evening out.",
  },
  {
    title: "Sweater",
    price: 15,
    imgSrc: "./images/sweater-2.png",
    quantity: 1,
    inCart: false,
    id: 5,
    description:
      "Immerse yourself in comfort and sophistication with our exquisitely designed sweater. Crafted from the finest materials, this sweater offers a gentle touch against your skin while providing optimal warmth. Whether you're dressing up for a special occasion or keeping it casual, its versatile style ensures you always look your best. The meticulously detailed knitting and flattering cut make it a must-have addition to your clothing collection, blending elegance and functionality effortlessly.",
  },
];
//render all products in page
const productsSection = document.querySelector("#products .row");
products.forEach((product) => {
  productsSection.innerHTML += `
  <div class="card" style="width: 18rem">
    <img data-bs-toggle="modal" data-bs-target="#exampleModal${product.id}"
      src="${product.imgSrc}"
      class="card-img-top"
      alt="${product.title}"
    />
  <div class="card-body">
    <h5 class="card-title">${product.title}</h5>
    <p class="card-text">${product.price}$</p>
    <div
      class="d-flex gap-2 justify-content-center align-items-center"
    >
      <div id="product-button-field">
        <a href="login.html"><button class="btn btn-secondary">Login to Add</button></a>
      </div>
      <button class="minus btn border-0 p-1 rounded-5">
        <i class="bi bi-dash"></i>
      </button>
      <input type="text" value="${product.quantity}" disabled class="product-quantity" />
      <button class="plus btn border-0 p-1 rounded-5">
        <i class="bi bi-plus-lg"></i>
      </button>
    </div>
  </div>
</div>

<div class="modal fade p-0" id="exampleModal${product.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-lg modal-fullscreen-md-down">
  <div class="modal-content">
    <div class="modal-header">
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg d-flex justify-content-center">
            <img src="${product.imgSrc}" alt="${product.title}" class="img-fluid">
          </div>
          <div class="col">
            <h1 class="modal-title fs-5" id="exampleModalLabel">${product.title}</h1>
            <p class="text-secondary mb-3">${product.price}$</p>
            <p>${product.description}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
  </div>
</div>
</div>
    `;
});

const plus = document.querySelectorAll(".plus");
const minus = document.querySelectorAll(".minus");
const productQuantity = document.querySelectorAll(".product-quantity");
let addToCartBtn;
let cart = [];
const cartContainer = document.querySelector("#cart-container");
const cartBadge = document.querySelector(".badge");
let deleteAllBtn = document.querySelector("#delete-all-btn");
let removeFromCartBtn = document.querySelectorAll(".remove-from-cart");
const errorAlert = document.querySelector("#error-alert");

//add eventlistner to all button to make the page dynamic when add or remove product
for (let i = 0; i < products.length; i++) {
  plus[i].addEventListener("click", () => {
    if (products[i].quantity === 10) return;
    products[i].quantity++;
    productQuantity[i].value = products[i].quantity;
  });
  minus[i].addEventListener("click", () => {
    if (products[i].quantity === 1) return;
    products[i].quantity--;
    productQuantity[i].value = products[i].quantity;
  });
}
//change button text and disable the increase and decrease buttons
function productsControlBtns() {
  cart.forEach((product) => {
    const index = product.id - 1;
    products[index].inCart = true;
    addToCartBtn[index].disabled = products[index].inCart;
    plus[index].disabled = products[index].inCart;
    minus[index].disabled = products[index].inCart;
    addToCartBtn[index].innerHTML = `Added <i class="bi bi-cart"></i>`;
  });
}
//function to add the products to cart
function addToCart() {
  let total = 0;
  cartContainer.innerHTML = "";
  for (let product of cart) {
    cartContainer.innerHTML += `
  <div class="row align-items-center">
  <div class="col-3 me-2">
    <img
      src="${product.imgSrc}"
      alt="${product.title}"
      class="img-fluid img-cart"
    />
  </div>
  <div class="col">
    <div><b>Product</b></div>
    <div>${product.title}</div>
  </div>
  <div class="col">
    <div><b>Price</b></div>
    <div>${product.price}$</div>
  </div>
  <div class="col">
    <div><b>Quantity</b></div>
    <div>${product.quantity}</div>
  </div>
  <div class="col d-flex justify-content-end">
    <button class="remove-from-cart btn btn-danger"><i class="bi bi-trash3"></i></button>
  </div>
</div>
<li><hr class="dropdown-divider" /></li>
  `;
    removeFromCartBtn = document.querySelectorAll(".remove-from-cart");
    total += product.price * product.quantity;
    cartBadge.innerText = cart.length;
    cartBadge.classList.remove("d-none");
  }
  updateEvent(); // call this function to keep the page dynamic when remove a product
  const section = document.createElement("section");
  cartContainer.appendChild(section);
  section.innerHTML = `
<div class="d-flex justify-content-between align-items-center">
<b>Total: ${total}$</b>
<div>
<button class="btn btn-danger" id="delete-all-btn">Delete All</button>

<a href="orders.html">
  <button class="btn btn-primary">
    Buy
  </button>
</a>
</div>
</div>

`;

  //delete all products from cart
  deleteAllBtn = document.querySelector("#delete-all-btn");
  deleteAllBtn.addEventListener("click", () => {
    cart.forEach((product) => {
      addToCartBtn[product.id - 1].disabled = false;
      addToCartBtn[product.id - 1].innerHTML = "Add to Cart";
      plus[product.id - 1].disabled = false;
      minus[product.id - 1].disabled = false;
    });
    cart = [];
    addToCart();
    fetchToCart();
    emptyCart(); //cal this to show 'no products' word
  });
}
function updateEvent() {
  for (let i = 0; i < cart.length; i++) {
    removeFromCartBtn[i].addEventListener("click", () => {
      removeFromCart(i);
    });
  }
}

//remove single product from cart using the title and the index that we define above in products array
function removeFromCart(i) {
  //side note : find is a method return an object that the product we want remove
  const removedProduct = products.find((product) => {
    return product.id - 1 === cart[i].id - 1;
  });
  removedProduct.inCart = false;
  addToCartBtn[removedProduct.id - 1].disabled =
    products[removedProduct.id - 1].inCart;
  plus[removedProduct.id - 1].disabled = products[removedProduct.id - 1].inCart;
  minus[removedProduct.id - 1].disabled =
    products[removedProduct.id - 1].inCart;
  addToCartBtn[removedProduct.id - 1].innerHTML = "Add to Cart";
  cart.splice(i, 1);
  /*splice use to remove item from array, i refer to the index will remove from array,
   and 1 to numbers of items you wanna remove after this index*/
  addToCart();
  fetchToCart();
  emptyCart();
}

function emptyCart() {
  if (cart.length === 0) {
    cartContainer.innerHTML = `<span class="opacity-75">No Products</span>`;
    cartBadge.classList.add("d-none");
  }
}

function isLogged() {
  const isLogged = localStorage.getItem("isLogged");
  const log = document.querySelector("#log-field");
  const productBtnField = document.querySelectorAll("#product-button-field");
  if (isLogged) {
    productBtnField.forEach((field, i) => {
      field.innerHTML = `
      <button class="add-to-cart-btn btn btn-primary me-4"  >
          Add to Cart
      </button>
      `;
      addToCartBtn = document.querySelectorAll(".add-to-cart-btn");
      addToCartBtn[i].addEventListener("click", () => {
        cart.push(products[i]);
        productsControlBtns();
        addToCart();
        fetchToCart();
      });
    });
    log.innerHTML = `
    <button id="logout-button" class="border-0 bg-transparent ms-0 ms-md-5 "><i class="bi bi-box-arrow-left"></i> Logout</button>
    `;
    logOut();
  }
}

function fetchFromCart() {
  fetch("get_cart.php")
    .then((response) => response.json())
    .then((data) => {
      cart = data;
      productsControlBtns();
      addToCart();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function fetchToCart() {
  const jsonString = JSON.stringify(cart);
  fetch("post_array.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "json=" + encodeURIComponent(jsonString),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function logOut() {
  document
    .getElementById("logout-button")
    .addEventListener("click", async () => {
      const response = await fetch("logout.php", { method: "POST" });
      const text = await response.text();
      if (text === "Logout successful") {
        localStorage.removeItem("isLogged");
        window.location.href = "index.html";
      }
    });
}
isLogged();
fetchFromCart();
