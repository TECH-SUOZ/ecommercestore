// Set the date we're counting down to
var countDownDate = new Date("Dec 5, 2024 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function () {
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML =
    days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 2,
  spaceBetween: 10,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
  },
});

// Animations
ScrollReveal().reveal(".top_nav", {
  origin: "bottom",
  distance: "20px",
  opacity: 0,
});
ScrollReveal().reveal(".nav", {
  origin: "bottom",
  distance: "20px",
  opacity: 0,
  delay: 100,
});

ScrollReveal().reveal(".header", {
  origin: "bottom",
  distance: "20px",
  opacity: 0,
  delay: 200,
});
ScrollReveal().reveal(".section", {
  origin: "bottom",
  distance: "20px",
  opacity: 0,
  duration: 1000,
  delay: 100,
});
ScrollReveal().reveal(".footer", {
  origin: "bottom",
  distance: "20px",
  opacity: 0,
  duration: 1000,
  delay: 100,
});

// mobile nav
const hamburger = document.querySelector(".hamburger");
const Nav = document.querySelector(".mobile_nav");

hamburger.addEventListener("click", () => {
  Nav.classList.toggle("mobile_nav_hide");
});



// Load cart items from localStorage
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to add product to cart
function addToCart(name, price, image) {
    const existingProduct = cartItems.find(item => item.name === name);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cartItems.push({ name, price: parseFloat(price), quantity: 1, image });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartItemCount();  // Update the cart item count on the icon
    showFloatingNotification(name, price, image);  // Show floating notification after adding to cart
}

// Function to update the cart item count on the cart icon
function updateCartItemCount() {
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartBadge = document.getElementById('cart-item-count'); // Add ID 'cart-item-count' to the cart icon in your HTML
    if (cartBadge) {
        cartBadge.textContent = cartItemCount;  // Update the text content of the badge
    }
}

// Function to show floating notification
function showFloatingNotification(name, price, image) {
    const notification = document.createElement('div');
    notification.classList.add('floating-notification');
    notification.innerHTML = `
        <div class="notification-content">
            <img class="notification-image" src="${image}" alt="${name}" />
            <div class="notification-info">
                <h3 class="notification-title">${name}</h3>
                <p class="notification-price">₦${parseFloat(price).toFixed(2)}</p>
                <p class="notification-message">Added to cart!</p>
            </div>
        </div>
    `;
    document.body.appendChild(notification);

    // Automatically remove the notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Event listener for adding products to cart
document.querySelectorAll('.add-product').forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.closest('.single-product');
        const name = productElement.getAttribute('data-name');
        const price = productElement.getAttribute('data-price');
        const image = productElement.getAttribute('data-image');
        addToCart(name, price, image);
    });
});

// Redirect to cart page
document.getElementById('viewCart')?.addEventListener('click', () => {
    window.location.href = 'cart.html';
});

// Initialize cart item count on page load
document.addEventListener("DOMContentLoaded", updateCartItemCount);
