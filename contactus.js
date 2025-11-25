document.addEventListener('DOMContentLoaded', () => {

    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const contactForm = document.querySelector('.contact-form');
    const infoBoxes = document.querySelectorAll('.info-box');

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
                    const icon = menuToggle.querySelector('i');
                    if (icon) {
                         icon.classList.remove('fa-times');
                         icon.classList.add('fa-bars');
                    }
                }
            });
        });
    }

    if (contactForm) {
        const formObserverOptions = {
            root: null, 
            rootMargin: '0px',
            threshold: 0.2 
        };

        const formObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');

                    observer.unobserve(entry.target);
                }
            });
        }, formObserverOptions);

        formObserver.observe(contactForm);
    }

    if (infoBoxes.length > 0) {
        const infoObserverOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 
        };
        
        const infoObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, infoObserverOptions);

        infoBoxes.forEach((box, index) => {
            box.style.opacity = '0';
            box.style.transform = 'translateY(20px)';
            box.style.transition = `all 0.6s ease-out ${index * 0.15}s`; 
            
            infoObserver.observe(box);
        });
    }
});