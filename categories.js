document.addEventListener("DOMContentLoaded", function () {
    let booksData = []; // Global variable to store the original book data

    // Fetch book details from the books.json file
    fetch('books.json')
        .then(response => response.json())
        .then(data => {
            // Store the original book data
            booksData = data;

            // Display book categories
            displayCategories(data);

            // Initial display of books
            displayBooks(data);

            // Add event listener for category clicks
            document.getElementById('book-categories').addEventListener('click', function (event) {
                if (event.target.classList.contains('card-category')) {
                    const selectedCategory = event.target.dataset.category;
                    filterBooksByCategory(selectedCategory);
                }
            });

            // Add event listener for search button click
            document.getElementById('searchButton').addEventListener('click', function () {
                const searchTerm = document.getElementById('searchInput').value;
                const filterBy = document.getElementById('filterBy').value;
                filterBooks(searchTerm, filterBy);
            });
        })
        .catch(error => console.error('Error fetching book data:', error));

    // Function to display book categories
    function displayCategories(data) {
        const categories = data.reduce((acc, book) => {
            if (!acc.includes(book.category)) {
                acc.push(book.category);
            }
            return acc;
        }, []);

        const categoryContainer = document.getElementById('book-categories');
        categories.forEach(category => {
            const card = document.createElement('div');
            card.className = 'col-md-4 mb-4';
            card.innerHTML = `
                <div class="card card-category" data-category="${category}">
                    <div class="card-body">
                        <h5 class="card-title">${category}</h5>
                    </div>
                </div>
            `;
            categoryContainer.appendChild(card);
        });
    }

    // Function to display books based on the selected category
    function displayBooks(data) {
        const categoryContainer = document.getElementById('book-categories');
        categoryContainer.innerHTML = ''; // Clear existing content

        // Group books by category
        const booksByCategory = data.reduce((acc, book) => {
            acc[book.category] = acc[book.category] || [];
            acc[book.category].push(book);
            return acc;
        }, {});

        // Display books
        Object.keys(booksByCategory).forEach(category => {
            const booksInCategory = booksByCategory[category];
            booksInCategory.forEach(book => {
                const card = document.createElement('div');
                card.className = 'col-md-4 mb-4';
                card.innerHTML = `
                    <div class="card">
                        <img src="${book.cover_image}" class="card-img-top" alt="${book.title}">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text">${book.author}</p>
                            <p class="card-text">${book.description}</p>
                            <p class="card-text">Price: $${book.price}</p>
                        </div>
                    </div>
                `;
                categoryContainer.appendChild(card);
            });
        });
    }

    // Function to filter books based on the selected category
    function filterBooksByCategory(category) {
        const filteredBooks = booksData.filter(book => book.category === category);
        displayBooks(filteredBooks);
    }

    // Function to filter books based on search term and filter option
    function filterBooks(searchTerm, filterBy) {
        let filteredBooks = [];
        if (filterBy === 'category') {
            filteredBooks = booksData.filter(book => book.category.toLowerCase().includes(searchTerm.toLowerCase()));
        } else if (filterBy === 'title') {
            filteredBooks = booksData.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        displayBooks(filteredBooks);
    }
});
