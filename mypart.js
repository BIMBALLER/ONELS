document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            
            document.body.classList.toggle('menu-open'); 
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

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled'); 
            } else {
                header.classList.remove('scrolled');
            }
        });
    }


    const targets = document.querySelectorAll('[data-aos], .service-card');
    
    const uniqueTargets = Array.from(new Set(targets));

    uniqueTargets.forEach(element => {
        if (!element.classList.contains('fade-up')) {
            element.classList.add('fade-up');
        }
    });
    
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
  
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    uniqueTargets.forEach(target => {
        observer.observe(target);
    });
});