// your-custom-script.js

// Fetch book categories from books.json
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded event fired.');

    fetch('./books.json')
        .then(response => response.json())
        .then(data => {
            console.log('Data:', data);

            // Check if data is an array of books
            if (Array.isArray(data)) {
                const categoriesDropdown = document.querySelector('#categoryDropdown');
                const categoriesMenu = document.querySelector('.dropdown-menu');

                // Extract unique categories from the array of books
                const uniqueCategories = [...new Set(data.map(book => book.category))];

                // Populate categories in the dropdown
                uniqueCategories.forEach(category => {
                    const categoryItem = document.createElement('a');
                    categoryItem.classList.add('dropdown-item');
                    categoryItem.href = 'categories.html?category=' + encodeURIComponent(category);
                    categoryItem.textContent = category;
                    categoriesMenu.appendChild(categoryItem);
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
    fetch('./books.json')
        .then(response => response.json())
        .then(data => {
            const bookDisplay = document.getElementById('bookDisplay');

            data.forEach(book => {
                const bookCard = document.createElement('div');
                bookCard.classList.add('card');
                bookCard.innerHTML = `
                    <img src="${book.cover_image}" class="card-img-top" alt="${book.title}" style="width:50%" height="10%" background-color:"#e9edc9">
                    <div class="card-body" style="background-color:#e9edc9">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">${book.author}</p>
                        <p class="card-text">${book.price}</p>
                        <button class="btn btn-primary addToCart" data-book-id="${book.id}">Add to Cart</button>
                        <button class="btn btn-secondary viewCart" data-book-id="${book.id}">View Cart</button>
                    </div>
                `;
                bookDisplay.appendChild(bookCard);
            });

            // Add event listener for "Add to Cart" buttons
            document.querySelectorAll('.addToCart').forEach(button => {
                button.addEventListener('click', function (event) {
                    const bookId = event.target.dataset.bookId;
                    addToCart(bookId);
                });
            });

            // Add event listener for "View Cart" buttons
            document.querySelectorAll('.viewCart').forEach(button => {
                button.addEventListener('click', function () {
                    // Redirect to the Cart page
                    window.location.href = 'cart.html';
                });
            });
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
});

function addToCart(bookId) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const existingCartItem = cartItems.find(item => item.itemId === bookId);

    if (existingCartItem) {
        // If the item is already in the cart, increase the quantity
        existingCartItem.quantity += 1;
    } else {
        // If the item is not in the cart, add it
        cartItems.push({
            itemId: bookId,
            quantity: 1
        });
    }

    // Update the cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
}
