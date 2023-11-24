document.addEventListener("DOMContentLoaded", function () {
    // Fetch pricing details from the books.json file
    fetch('./books.json')
        .then(response => response.json())
        .then(data => {
            // Check if data is an array of books
            if (Array.isArray(data)) {
                const cartItemsContainer = document.getElementById('cart-items');
                const totalAmountElement = document.getElementById('totalAmount');

                // Get cart items from localStorage
                const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

                // Calculate total amount and display cart items
                displayCartItems(cartItems, data);
                calculateTotalAmount(cartItems, data, totalAmountElement);

                // Add event listeners for quantity adjustment and removal
                cartItemsContainer.addEventListener('change', function (event) {
                    if (event.target.classList.contains('item-quantity')) {
                        const itemId = event.target.dataset.itemId;
                        const newQuantity = parseInt(event.target.value, 10);
                        updateCartItemQuantity(itemId, newQuantity, cartItems, data, totalAmountElement);
                    }
                });

                cartItemsContainer.addEventListener('click', function (event) {
                    if (event.target.classList.contains('remove-item')) {
                        const itemId = event.target.dataset.itemId;
                        removeCartItem(itemId, cartItems, data, totalAmountElement);
                    }
                });

                // Add event listener for "Proceed to Payment" button
                document.getElementById('proceedToPayment').addEventListener('click', function () {
                    // Redirect to the Payment Receipt page
                    window.location.href = 'payment.html';
                });
            } else {
                console.error('Invalid data format. Ensure that the JSON file is an array of books.');
            }
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
});
document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.addToCartIndex');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            const bookId = event.target.dataset.bookId;
            addToCart(bookId);
            // Display a confirmation message (you can customize this part)
            alert('Book added to cart!');
        });
    });
});

// Function to display cart items
function displayCartItems(cartItems, booksData) {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear existing content

    cartItems.forEach(cartItem => {
        const book = booksData.find(book => book.id === cartItem.itemId);

        if (book) {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <div>
                    <h5>${book.title}</h5>
                    <p>Price: $${book.price.toFixed(2)}</p>
                </div>
                <div>
                    <label for="quantity_${cartItem.itemId}" class="form-label">Quantity:</label>
                    <input type="number" class="form-control item-quantity" id="quantity_${cartItem.itemId}" value="${cartItem.quantity}" min="1" data-item-id="${cartItem.itemId}">
                    <button class="btn btn-danger remove-item" data-item-id="${cartItem.itemId}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        }
    });
}

// Function to calculate the total amount for the items in the cart
function calculateTotalAmount(cartItems, booksData, totalAmountElement) {
    const totalAmount = cartItems.reduce((acc, cartItem) => {
        const book = booksData.find(book => book.id === cartItem.itemId);
        if (book) {
            acc += book.price * cartItem.quantity;
        }
        return acc;
    }, 0);

    totalAmountElement.textContent = totalAmount.toFixed(2);
}

// Function to update the quantity of a cart item
function updateCartItemQuantity(itemId, newQuantity, cartItems, booksData, totalAmountElement) {
    const cartItemIndex = cartItems.findIndex(cartItem => cartItem.itemId === itemId);

    if (cartItemIndex !== -1) {
        cartItems[cartItemIndex].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cartItems));

        // Update the display
        displayCartItems(cartItems, booksData);
        calculateTotalAmount(cartItems, booksData, totalAmountElement);
        console.log('Updated Cart Items:', cartItems);
    }
}

// Function to remove a cart item
function removeCartItem(itemId, cartItems, booksData, totalAmountElement) {
    const updatedCartItems = cartItems.filter(cartItem => cartItem.itemId !== itemId);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));

    // Update the display
    displayCartItems(updatedCartItems, booksData);
    calculateTotalAmount(updatedCartItems, booksData, totalAmountElement);
    console.log('Updated Cart Items:', updatedCartItems);
}
