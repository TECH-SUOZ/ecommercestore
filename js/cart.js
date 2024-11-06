const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const cartDisplay = document.getElementById('shopping-cart');
const totalAmountDisplay = document.getElementById('currentTotal');

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function refreshCart() {
    cartDisplay.innerHTML = ''; // Clear current cart display
    let total = 0;

    cartItems.forEach((product, index) => {
        const itemTotal = product.price * product.quantity;
        total += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';  // Added class for cart item styling
        itemElement.innerHTML = `
            <div class="cart-item-content">  <!-- Added wrapper for item content -->
                <img class="cart-item-image" src="${product.image}" alt="${product.name}">
                <div class="cart-item-details">  <!-- Added class for item details -->
                    <span class="cart-item-name">${index + 1}. ${product.name}</span>  <!-- Product name -->
                    <span class="cart-item-price">$${product.price.toFixed(2)}</span>
                    <div class="cart-item-quantity">
                        <button class="minus-button" data-name="${product.name}">-</button>
                        <span class="cart-item-quantity-number">${product.quantity}</span>
                        <button class="plus-button" data-name="${product.name}">+</button>
                    </div>
                    <span class="cart-item-total">= $${itemTotal.toFixed(2)}</span>
                </div>
            </div>
            <button class="remove-product" data-name="${product.name}">Remove</button>
        `;
        cartDisplay.appendChild(itemElement);
    });

    totalAmountDisplay.innerText = `₦${formatNumber(total.toFixed(2))}`;

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-product').forEach(button => {
        button.addEventListener('click', () => {
            removeFromCart(button.getAttribute('data-name'));
        });
    });

    // Add event listeners for plus and minus buttons
    document.querySelectorAll('.plus-button').forEach(button => {
        button.addEventListener('click', () => {
            changeQuantity(button.getAttribute('data-name'), 1);
        });
    });

    document.querySelectorAll('.minus-button').forEach(button => {
        button.addEventListener('click', () => {
            changeQuantity(button.getAttribute('data-name'), -1);
        });
    });
}

function changeQuantity(name, delta) {
    const index = cartItems.findIndex(item => item.name === name);
    if (index > -1) {
        cartItems[index].quantity += delta;
        // Prevent quantity from going below 1
        if (cartItems[index].quantity < 1) {
            cartItems[index].quantity = 1;
        }
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    refreshCart();
}

function removeFromCart(name) {
    const index = cartItems.findIndex(item => item.name === name);
    if (index > -1) {
        cartItems[index].quantity--;
        if (cartItems[index].quantity === 0) {
            cartItems.splice(index, 1);
        }
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    refreshCart();
}

// Initial call to display items
refreshCart();

// Event listener for checkout button
document.getElementById('checkout').addEventListener('click', () => {
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert('Proceeding to checkout!');
        // Here you could redirect to a checkout page
    }
});

// Scroll reveal effect
ScrollReveal().reveal('.single-product', {
    origin: 'bottom',
    distance: '30px',
    duration: 600,
    delay: 200,
    opacity: 0,
    reset: true
});

ScrollReveal().reveal('.cart-section', {
    origin: 'top',
    distance: '30px',
    duration: 600,
    delay: 200,
    opacity: 0,
    reset: true
});
