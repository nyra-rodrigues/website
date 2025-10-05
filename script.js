let menuIcon= document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelector('section');
let navLinks = document.querySelector('header nav a');


window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute;
        if (top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a [href*=' + id + ']').classList.add ('active')
            } )
        }
    })
}

menuIcon.onclick= () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// Contact Form Handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formStatus = document.getElementById('form-status');
    const submitButton = this.querySelector('input[type="submit"]');
    
    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.value = 'Sending...';
    
    // Get form data
    const formData = new FormData(this);
    const formDataObj = {};
    formData.forEach((value, key) => formDataObj[key] = value);
    
    // Send data to Google Sheets
    fetch(this.action, {
        method: 'POST',
        body: JSON.stringify(formDataObj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            formStatus.style.display = 'block';
            formStatus.style.color = '#bb83de';
            formStatus.textContent = 'Message sent successfully!';
            this.reset();
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        formStatus.style.display = 'block';
        formStatus.style.color = '#ff4444';
        formStatus.textContent = 'Error sending message. Please try again.';
        console.error('Error:', error);
    })
    .finally(() => {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.value = 'Send Message';
        
        // Hide status message after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    });
});

// Project Filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectBoxes = document.querySelectorAll('.project-box');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectBoxes.forEach(project => {
                if (filterValue === 'all' || project.getAttribute('data-category') === filterValue) {
                    project.classList.remove('hide');
                } else {
                    project.classList.add('hide');
                }
            });
        });
    });
});