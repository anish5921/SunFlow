document.addEventListener('DOMContentLoaded', () => {

    /* =============================================================
       1. PORTFOLIO DATA (Add your photos here)
       ============================================================= */
    const portfolioData = [
        {
            img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
            category: "nature",
            title: "Highland Mist",
            subtitle: "Outdoor"
        },
        {
            img: "https://images.unsplash.com/photo-1570872626485-d8ffea69f463",
            category: "clubs",
            title: "Neon Nights",
            subtitle: "Clubs"
        },
        {
            img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
            category: "restaurants",
            title: "The Golden Fork",
            subtitle: "Restaurants"
        },
        {
            img: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
            category: "nature",
            title: "Serenity",
            subtitle: "Outdoor"
        },
        {
            img: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
            category: "restaurants",
            title: "Plated Perfection",
            subtitle: "Restaurants"
        }
        // To add a new photo, copy the block above (from { to }), paste it here, and change details.
    ];

    /* =============================================================
       2. RENDER GRID (Automatically creates HTML)
       ============================================================= */
    const gridContainer = document.querySelector('.portfolio-grid');
    
    // Clear existing content to avoid duplicates
    if (gridContainer) {
        gridContainer.innerHTML = '';

        portfolioData.forEach(item => {
            // Create the Item Div
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('portfolio-item');
            itemDiv.setAttribute('data-category', item.category);

            // Fill it with the image and overlay
            itemDiv.innerHTML = `
                <img src="${item.img}" alt="${item.title}">
                <div class="overlay">
                    <h3>${item.title}</h3>
                    <p>${item.subtitle}</p>
                </div>
            `;

            // Add to the grid
            gridContainer.appendChild(itemDiv);
        });
    }

    /* =============================================================
       3. FILTERING LOGIC
       ============================================================= */
    const filterButtons = document.querySelectorAll('.filter-btn');
    // We select items AFTER they have been rendered above
    const portfolioItems = document.querySelectorAll('.portfolio-item'); 

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                // Show 'all' or matching category
                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.classList.remove('hide');
                    // Reset animation to play it again
                    item.style.animation = 'none';
                    item.offsetHeight; /* trigger reflow */
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    /* =============================================================
       4. MOBILE NAVIGATION (Burger Menu)
       ============================================================= */
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Burger Animation (turn into X)
            burger.classList.toggle('toggle');
        });
    }

    /* =============================================================
       5. SMOOTH SCROLLING
       ============================================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
