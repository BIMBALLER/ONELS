document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar ---
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            document.body.classList.toggle('menu-open'); 
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
        document.querySelectorAll('.nav-list a').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                document.body.classList.remove('menu-open');
                const icon = menuToggle.querySelector('i');
                if(icon){ icon.classList.remove('fa-times'); icon.classList.add('fa-bars'); }
            });
        });
    }

    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // --- Service Modal ---
    const serviceButtons = document.querySelectorAll('.book-service-btn');
    const modal = document.getElementById('serviceModal');
    const modalClose = modal.querySelector('.close');
    const modalTitle = document.getElementById('modalServiceName');
    const serviceForm = document.getElementById('serviceForm');

    serviceButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.display = 'block';
            modalTitle.textContent = btn.dataset.service;
        });
    });

    modalClose.addEventListener('click', () => { modal.style.display = 'none'; });
    window.addEventListener('click', e => { if(e.target == modal){ modal.style.display = 'none'; }});

    // --- Payment Section ---
    const paymentSection = document.getElementById('paymentSection');
    const successSection = document.getElementById('successSection');
    const paymentSummary = document.getElementById('paymentSummary');
    const transactionDetails = document.getElementById('transactionDetails');

    let currentTrackingID = '';

    serviceForm.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(serviceForm);

        // Generate tracking ID
        currentTrackingID = 'ONL' + Math.floor(100000 + Math.random() * 900000);

        const summaryHTML = `
            <h3>Service: ${modalTitle.textContent}</h3>
            <p><strong>Tracking ID:</strong> ${currentTrackingID}</p>
            <p><strong>Sender:</strong> ${formData.get('senderName')} (${formData.get('senderPhone')}, ${formData.get('senderEmail')})</p>
            <p><strong>Receiver:</strong> ${formData.get('receiverName')} (${formData.get('receiverPhone')}, ${formData.get('receiverEmail')})</p>
            <p><strong>Package:</strong> ${formData.get('packageDesc')} (${formData.get('packageWeight')} kg)</p>
            <p><strong>Delivery Option:</strong> ${formData.get('deliveryOption')}</p>
        `;
        paymentSummary.innerHTML = summaryHTML;
        modal.style.display = 'none';
        paymentSection.style.display = 'block';
        window.scrollTo({ top: paymentSection.offsetTop, behavior: 'smooth' });
    });

    // --- Payment Simulation ---
    const simulatePaymentSuccess = (method) => {
        transactionDetails.innerHTML = `
            <p><strong>Tracking ID:</strong> ${currentTrackingID}</p>
            <p><strong>Payment Method:</strong> ${method}</p>
            <p><strong>Transaction ID:</strong> ${Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            <p><strong>Amount Paid:</strong> $${(Math.random()*100+20).toFixed(2)}</p>
        `;
        paymentSection.style.display = 'none';
        successSection.style.display = 'block';
        window.scrollTo({ top: successSection.offsetTop, behavior: 'smooth' });
    };

    document.getElementById('flutterwave-pay').addEventListener('click', () => simulatePaymentSuccess('Flutterwave'));
    document.getElementById('stripe-pay').addEventListener('click', () => simulatePaymentSuccess('Stripe'));
    document.getElementById('bank-pay').addEventListener('click', () => simulatePaymentSuccess('Bank Transfer'));

    // --- PayPal Button Integration ---
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: { value: "50.00" } 
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                simulatePaymentSuccess('PayPal');
            });
        }
    }).render('#paypal-button-container');

});
