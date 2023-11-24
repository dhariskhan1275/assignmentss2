// Sample book details for demonstration
const books = [
    { title: "The Hobbit", price: 11.75 },
    { title: "The grapes of wrath", price: 11.99 },
    
];

// Function to populate the receipt table
function populateReceiptTable() {
    const receiptTableBody = document.getElementById('receiptTableBody');
    const totalAmountElement = document.getElementById('totalAmount');
    let totalAmount = 0;

    books.forEach((book, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${book.title}</td>
            <td>${book.price.toFixed(2)}</td>
        `;
        receiptTableBody.appendChild(row);
        totalAmount += book.price;
    });

    totalAmountElement.textContent = totalAmount.toFixed(2);
}

// Call the function to populate the receipt table when the page loads
populateReceiptTable();
