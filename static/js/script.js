document.addEventListener('DOMContentLoaded', () => {

    // 1. AUTOMATIC DARK MODE TOGGLE
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            themeIcon.style.color = '#f59e0b'; // Gold Color for Sun
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            themeIcon.style.color = '';
        }
    });

    // 2. LIVE STATS COUNTER ANIMATION ON SCROLL
    const statsSection = document.getElementById('stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function startCounter() {
        statNumbers.forEach(num => {
            const target = +num.getAttribute('data-target');
            let current = 0;
            const increment = target / 50;

            const updateNumber = () => {
                current += increment;
                if (current < target) {
                    num.textContent = Math.ceil(current);
                    setTimeout(updateNumber, 30);
                } else {
                    num.textContent = target + (target === 99 ? '%' : '+');
                }
            };
            updateNumber();
        });
    }

    window.addEventListener('scroll', () => {
        if (!statsSection) return;
        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.2;

        if (sectionPos < screenPos && !animated) {
            startCounter();
            animated = true;
        }
    });

    // 3. LIVE EMAIL FORM SUBMISSION (BINA REFRESH KIYE)
    const proForm = document.getElementById('proForm');
    const formMsg = document.getElementById('form-msg');

    proForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        formMsg.style.color = '#2563eb';
        formMsg.textContent = "Sending your message...";

        const formData = new FormData(proForm);

        try {
            const response = await fetch(proForm.action, {
                method: proForm.method,
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                formMsg.style.color = '#10b981'; // Success Green
                formMsg.textContent = "Message sent successfully! I will reply soon.";
                proForm.reset();
            } else {
                formMsg.style.color = '#dc2626'; // Error Red
                formMsg.textContent = "Oops! Something went wrong, please try again.";
            }
        } catch (error) {
            formMsg.style.color = '#dc2626';
            formMsg.textContent = "Network error! Check your internet connection.";
        }
    });

    // 4. SCROLL HIGHLIGHT ACTIVE NAV LINK
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 160)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });
});