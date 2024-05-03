var image=[
    "./assets/DMart Grocery.jpg",
    "./assets/image_url=https_3A_2F_2Fcdn.dmart.in_2Fimages_2Frwd_2Fbanners_2Fhmpg_2F1jan24-crsl-serveware.jpg",
    "./assets/The Beauty Store.jpg",
    "./assets/Women’s Corner.jpg"
    

]
var i=0;

function slide(){
    document.getElementById("main-image").src=image[i]

    if(i<image.length-1){
        i++
    }else{
        i=0
    }
}
setInterval(slide,2000)

var container = document.getElementById('swiper-container');
        var isDown = false;
        var startX;
        var scrollLeft;

        document.getElementById('scroll-left').addEventListener('click', function() {
            container.scrollBy({ left: -container.offsetWidth / 2, behavior: 'smooth' });
        });

        document.getElementById('scroll-right').addEventListener('click', function() {
            container.scrollBy({ left: container.offsetWidth / 2, behavior: 'smooth' });
        });

        container.addEventListener('mousedown', function(e) {
            isDown = true;
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
            container.classList.add('active');
        });

        container.addEventListener('mouseleave', function() {
            isDown = false;
            container.classList.remove('active');
        });

        container.addEventListener('mouseup', function() {
            isDown = false;
            container.classList.remove('active');
        });

        container.addEventListener('mousemove', function(e) {
            if (!isDown) return;
            e.preventDefault();
            var x = e.pageX - container.offsetLeft;
            var walk = (x - startX) * 3;
            container.scrollLeft = scrollLeft - walk;
        });


        // cart start here

        let startX2;
let scrollLeft2;
let isDown2 = false;
let products = [
 
  { id: 1, name: 'Malkist Cheese Flavoured Crunchy Layered Crackers : 138 gms', price: 45, image: './assets/MAR120005509xx27MAR22_5_B.jpg' },
  { id: 2, name: 'Slurrp Farm Little Millet Mild Masala Noodles : 192 gm ', price: 64, image: './assets/b2.jpg' },
  { id: 3, name: 'Borges Apple Cider Vinegar With The Mother : 355 ml', price: 319, image: './assets/b3.jpg' },
  { id: 4, name: 'Organic India Organic Cow Ghee : 500 ml', price: 575, image: './assets/b4.jpg' },
  { id: 5, name: 'Raw Pressery Coconut Water : 200 ml', price: 45, image: './assets/b5.jpg' },
  { id: 6, name: 'RiteBite Max Protein Daily Choco Almond Bar : 50 gms', price: 56, image: './assets/b6.jpg' },
  { id: 7, name: 'RiteBite Max Protein Daily Choco Classic Bar : 50 gms', price: 55, image: './assets/b7.jpg' },
  { id: 8, name: 'Gramiyaa Wood Cold Pressed Coconut Oil : 500 ml', price: 217, image: './assets/b8.jpg' },
  { id: 9, name: 'Colombian Brew Instant Coffee Original : 100 gms', price: 149, image: './assets/b9.jpg' },
  { id: 10, name: 'Davidoff Coffee Crema Intense : 90 gms', price: 498, image: './assets/b10.jpg' },
  
 
];

let cart = {};

function generateProductCard(product) {
  const productCard = document.createElement('div');
  productCard.className = 'product-card';
  productCard.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <h3 class="p-name">${product.name}</h3>
    <div class="price">₹${product.price}</div>
    <button class="button2" onclick="addToCart(${product.id})">ADD TO CART</button>
  `;
  return productCard;
}

function renderProducts() {
  const carousel = document.getElementById('productCarousel');
  products.forEach(product => carousel.appendChild(generateProductCard(product)));
}

// Carousel mouse drag functionality
const carousel = document.getElementById('productCarousel');
carousel.addEventListener('mousedown', (e) => {
  isDown2 = true;
  startX2 = e.pageX - carousel.offsetLeft;
  scrollLeft2 = carousel.scrollLeft;
});
carousel.addEventListener('mouseleave', () => {
  isDown2 = false;
});
carousel.addEventListener('mouseup', () => {
  isDown2 = false;
});
carousel.addEventListener('mousemove', (e) => {
  if (!isDown2) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX2) * 3; 
  carousel.scrollLeft = scrollLeft2 - walk;
});

function scrollProductCarousel(direction) {
  const carousel = document.getElementById('productCarousel');
  const scrollDistance = direction === 'left' ? -280 : 280;
  carousel.scrollBy({ left: scrollDistance, behavior: 'smooth' });
}

function renderCart() {
  const cartItemsContainer = document.getElementById('cartItems');
  cartItemsContainer.innerHTML = ''; 
  let total = 0;
  Object.values(cart).forEach(item => {
    total += item.quantity * item.price;
    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <span class="cart-name">${item.name}</span>
        <div class="plus">
          <button class="plus-minus-button" onclick="updateQuantity(${item.id}, -1)">-</button>
          <span>${item.quantity}</span>
          <button class="plus-minus-button" onclick="updateQuantity(${item.id}, 1)">+</button>
        </div>
        <span>₹${item.quantity * item.price}</span>
      </div>
    `;
  });
  document.getElementById('cartTotal').innerText = `Total: ₹${total}`;
  document.getElementById('cartCount').innerText = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
}

function addToCart(productId) {
  if (!cart[productId]) {
    const product = products.find(p => p.id === productId);
    cart[productId] = { ...product, quantity: 1 };
  } else {
    cart[productId].quantity += 1;
  }
  renderCart();
}

function updateQuantity(productId, delta) {
  if (cart[productId]) {
    cart[productId].quantity += delta;
    if (cart[productId].quantity <= 0) {
      delete cart[productId]; 
    }
    renderCart();
  }
}

function toggleCart() {
  const cartOverlay = document.getElementById('cartOverlay');
  cartOverlay.style.display = cartOverlay.style.display === 'flex' ? 'none' : 'flex';
  renderCart();
}

renderProducts();

// search 
const placeholders = ["Rice", "Sugar", "Tea", "Biscuits"];
  let index = 0;
  const animatedPlaceholder = document.getElementById('animatedPlaceholder');

  function cyclePlaceholder() {
    animatedPlaceholder.style.animation = 'swipeOut 0.5s forwards';

    setTimeout(() => {
      index = (index + 1) % placeholders.length;
      animatedPlaceholder.textContent = `${placeholders[index]}`;
      animatedPlaceholder.style.animation = 'swipeIn 0.5s forwards';
    }, 500); 
  }

  cyclePlaceholder();

  setInterval(cyclePlaceholder, 3000);
