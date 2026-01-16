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

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('is-active');
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Set active navigation link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const navTarget = link.getAttribute('data-nav');
        if (navTarget === currentPage) {
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
            header.classList.toggle('header-scrolled', window.scrollY > 50);
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
const inquiryForm = document.getElementById('inquiryForm');
if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Show success message (demo)
        const btn = inquiryForm.querySelector('button');
        const originalText = btn.textContent;

        btn.textContent = 'Enquiry Sent Successfully! ✓';
        btn.style.background = '#28a745';

        inquiryForm.reset();

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 3000);
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
