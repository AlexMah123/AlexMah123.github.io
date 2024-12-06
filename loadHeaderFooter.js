function loadHeaderFooter(headerSelector, footerSelector) {
    // Define the base URL dynamically
    const baseUrl = window.location.origin;
    const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');

    // Load the header
    if (headerSelector) {
        fetch('/header.html')
            .then(response => response.text())
            .then(data => {
                // Insert the header into the DOM
                document.querySelector(headerSelector).innerHTML = data;

                // Adjust links dynamically after the header is loaded
                const navLinks = document.querySelectorAll('.nav-link');
                navLinks.forEach(link => {
                    const hash = link.getAttribute('href');
                    if (!isHomePage) {
                        // On subpages, prepend the base URL to the hash
                        link.setAttribute('href', `${baseUrl}/index.html${hash}`);
                    }
                });
            })
            .catch(error => console.error('Error loading header:', error));
    }

    // Load the footer
    if (footerSelector) {
        fetch('/footer.html')
            .then(response => response.text())
            .then(data => {
                // Insert the footer into the DOM
                document.querySelector(footerSelector).innerHTML = data;
            })
            .catch(error => console.error('Error loading footer:', error));
    }
}
