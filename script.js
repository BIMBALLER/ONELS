document.addEventListener('DOMContentLoaded', () => {

  
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
     
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

        document.querySelectorAll('.nav-list a').forEach(link => {
            link.addEventListener('click', () => {
                if(navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }

    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const targets = document.querySelectorAll('.section-title, .service-card, .feature');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    targets.forEach(target => {
        target.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(target);
    });
    const trackingInput = document.querySelector('.tracking-input');
    const trackButton = document.querySelector('#tracking .btn');
    
    if (trackingInput && trackButton) {
        trackButton.addEventListener('click', (e) => {
            e.preventDefault();
            const trackingNumber = trackingInput.value.trim();

            if (trackingNumber.length > 5) {
                alert(`Tracking ${trackingNumber}... Status: Shipment is currently in Ilorin, Kwara State. Check the Tracking page for full details.`);
            } else {
                alert("Please enter a valid tracking number (e.g., ONL123456).");
            }
            trackingInput.value = '';
        });
    }
});