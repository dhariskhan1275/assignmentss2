// JavaScript code for handling the contact form submission
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    // Fetch form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Validate form data (add your own validation logic)

    // Perform actions with the form data (e.g., send to server)
    console.log(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);

    // Clear form fields
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';

    // Display a success message (you can customize this)
    alert('Your message has been sent successfully!');
});
