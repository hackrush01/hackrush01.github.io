// Function to load HTML components
async function loadComponent(id, url) {
    try {
        const response = await fetch(url);
        const content = await response.text();
        document.getElementById(id).innerHTML = content;
        return true;
    } catch (error) {
        console.error(`Error loading component from ${url}:`, error);
        return false;
    }
}

// Initialize components and related features
async function initApp() {
    // Disable automatic browser scroll restoration
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    const headerLoaded = await loadComponent('header-placeholder', 'components/header.html');
    const footerLoaded = await loadComponent('footer-placeholder', 'components/footer.html');

    if (headerLoaded) {
        setupHeaderFeatures();
    }

    // Ensure page starts at top if no hash is present
    if (!window.location.hash) {
        window.scrollTo(0, 0);
    }
}

function setupHeaderFeatures() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            // Toggle hidden class to show/hide menu
            navLinks.classList.toggle('hidden');
            navLinks.classList.toggle('flex');

            // Animation for hamburger menu (simple rotation/transform if needed, or keep as is if CSS handles it)
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('bg-accent-gold')); // Example interaction feedback
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) { // Only on mobile
                navLinks.classList.add('hidden');
                navLinks.classList.remove('flex');
            }
        });
    });

    // Set active navigation link
    const path = window.location.pathname;
    const currentPage = path.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-links a').forEach(link => {
        let navTarget = link.getAttribute('data-nav');

        // Match logic: 
        // 1. If navTarget is './', it matches 'index.html'
        // 2. Exact match
        const isHomeMatch = (navTarget === './' || navTarget === 'index.html') && (currentPage === 'index.html');
        const isExactMatch = navTarget === currentPage;

        if (isHomeMatch || isExactMatch) {
            link.classList.add('text-accent-gold', 'border-b-2', 'border-accent-gold');
            link.classList.remove('text-text-dark');
        } else {
            link.classList.add('text-text-dark');
            link.classList.remove('text-accent-gold', 'border-b-2', 'border-accent-gold');
        }
    });

    // Navbar background change on scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.remove('py-4');
                header.classList.add('py-2', 'shadow-md');
            } else {
                header.classList.add('py-4');
                header.classList.remove('py-2', 'shadow-md');
            }
        });
    }
}

// Run initialization
initApp();

// Smooth scrolling for navigation links (delegated to document for dynamic content)
document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (anchor) {
        const href = anchor.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 80, // Account for fixed header
                behavior: 'smooth'
            });
        }
    }
});

// Simple Form Submission Handling
// Form Submission Handling
const FORMEASY_URL = "https://script.google.com/macros/s/AKfycbzbJOh3FoBl1o1CzJQJJPzVgqx9W0mxVzIwdrDY334gsCfZd1CuUxd68wKOLHQJd4I/exec";

const enquiryForm = document.getElementById('enquiryForm');
if (enquiryForm) {
    enquiryForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = enquiryForm.querySelector('button');
        const originalText = btn.textContent;

        // Show loading state
        btn.textContent = 'Sending...';
        btn.disabled = true;

        try {
            const formData = new FormData(enquiryForm);
            const data = Object.fromEntries(formData);

            const response = await fetch(FORMEASY_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }


            // Success
            btn.textContent = 'Enquiry Sent Successfully! ✓';
            btn.style.background = '#28a745';

            enquiryForm.reset();

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);

        } catch (error) {
            console.error('Error submitting form:', error);

            // Error feedback
            btn.textContent = 'Error Sending. Try Again.';
            btn.style.background = '#dc3545';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('animate-on-scroll');
    observer.observe(section);
});
