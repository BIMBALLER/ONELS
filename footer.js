document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const trackInput = document.querySelector('.btnn1');
    const trackButton = document.querySelector('.btnn2');
    
    // --- 1. Mobile Menu Toggle ---
    if (menuToggle && navList) {
        // Event listener for opening/closing the menu
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            
            // Toggle body class to prevent background scroll
            document.body.classList.toggle('menu-open'); 

            // Icon toggle logic (fa-bars <-> fa-times)
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navList.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-list a').forEach(link => {
            link.addEventListener('click', () => {
                if(navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    // Reset icon
                    const icon = menuToggle.querySelector('i');
                    if (icon) {
                         icon.classList.remove('fa-times');
                         icon.classList.add('fa-bars');
                    }
                }
            });
        });
    }

    // --- 2. Header Scroll Effect (Adds .scrolled class for CSS polish) ---
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled'); 
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- 3. Tracking Functionality ---

    // Helper function to create the HTML for tracking results
    const generateTrackingResults = (trackingNumber) => {
        // Dummy data generation
        const status = ['In Transit', 'Out for Delivery', 'Delivered', 'Pending Scan', 'Delayed'];
        const randomStatus = status[Math.floor(Math.random() * status.length)];
        const today = new Date().toLocaleDateString();

        return `
            <div class="result-card">
                <h2>Shipment Status: <strong class="tracking-status">${randomStatus}</strong></h2>
                <p>Tracking Number: <strong>${trackingNumber}</strong></p>
                
                <hr style="margin: 15px 0; border: none; border-top: 1px dashed #ddd;">

                <div class="status-line">
                    <span>Origin:</span> <strong>Offa, Kwara State</strong>
                </div>
                <div class="status-line">
                    <span>Destination:</span> <strong>Lagos, Nigeria</strong>
                </div>
                <div class="status-line">
                    <span>Estimated Delivery:</span> <strong>December 5, 2025</strong>
                </div>
                
                <hr style="margin: 15px 0; border: none; border-top: 1px dashed #ddd;">

                <h3>Tracking History</h3>
                <div class="status-line">
                    <span>${today} 10:30 AM:</span> <span>Package received at Offa Hub</span>
                </div>
                <div class="status-line">
                    <span>${today} 02:00 PM:</span> <span>Departed Offa Processing Center</span>
                </div>
                <div class="status-line">
                    <span>${today} 08:00 PM:</span> <span>In Transit to Destination</span>
                </div>
            </div>
        `;
    };

    // Main handler for tracking logic
    const handleTracking = () => {
        const number = trackInput.value.trim().toUpperCase();
        let resultsContainer = document.getElementById('tracking-results');
        const trackingSection = document.querySelector('.btn-sec'); // The element the results should follow

        // Create results container if it doesn't exist
        if (!resultsContainer) {
            resultsContainer = document.createElement('div');
            resultsContainer.id = 'tracking-results';
            trackingSection.after(resultsContainer);
        }

        // Simple validation check
        if (number === '' || !number.match(/^ONL\d{6}$/)) {
            resultsContainer.innerHTML = `
                <div class="result-card" style="border-left: 5px solid ${trackInput.value === '' ? 'var(--orange)' : 'red'};">
                    <h2>Tracking Error</h2>
                    <p>${trackInput.value === '' ? 'Please enter a tracking number.' : 'Invalid format. Please use the format ONLxxxxxx (e.g., ONL123456).'}</p>
                </div>
            `;
        } else {
            // Display dummy results
            resultsContainer.innerHTML = generateTrackingResults(number);
        }
        
        // Scroll to the results for better UX
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Attach event listeners
    if (trackButton) {
        trackButton.addEventListener('click', handleTracking);
    }
    
    if (trackInput) {
        // Allow tracking via Enter key
        trackInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); // Prevent form submission
                handleTracking();
            }
        });
    }
});