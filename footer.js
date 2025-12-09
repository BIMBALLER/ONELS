document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const trackInput = document.querySelector('.btnn1');
    const trackButton = document.querySelector('.btnn2');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }


    const map = L.map('map').setView([8.4966, 4.5421], 6); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    let marker = L.marker([8.4966, 4.5421]).addTo(map)
        .bindPopup("Shipment currently here")
        .openPopup();

    const route = [
        [8.4966, 4.5421],   
        [9.0820, 8.6753],   
        [6.5244, 3.3792]    
    ];

    let step = 0;

    function moveMarker() {
        if (step < route.length) {
            marker.setLatLng(route[step]);
            map.panTo(route[step]);
            step++;
        }
    }

    setInterval(moveMarker, 4000);


    function generateTrackingResults(trackingNumber) {
        const status = ['In Transit', 'Out for Delivery', 'Delivered'];
        const randomStatus = status[Math.floor(Math.random() * status.length)];

        return `
            <div class="result-card">
                <h2>Shipment Status: <strong>${randomStatus}</strong></h2>
                <p>Tracking Number: <strong>${trackingNumber}</strong></p>
            </div>
        `;
    }

    function handleTracking() {
        const number = trackInput.value.trim().toUpperCase();
        let resultsContainer = document.getElementById('tracking-results');
        const trackingSection = document.querySelector('.btn-sec');

        if (!resultsContainer) {
            resultsContainer = document.createElement('div');
            resultsContainer.id = 'tracking-results';
            trackingSection.after(resultsContainer);
        }

        if (number === '' || !number.match(/^ONL\d{6}$/)) {
            resultsContainer.innerHTML = `<div class="result-card"><p>Invalid tracking number.</p></div>`;
        } else {
            resultsContainer.innerHTML = generateTrackingResults(number);
        }

        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }

    trackButton.addEventListener('click', handleTracking);
});
