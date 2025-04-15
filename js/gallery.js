document.addEventListener('DOMContentLoaded', function() {
    // Gallery filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Modal elements
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const closeModal = document.querySelector('.close-modal');
    const viewButtons = document.querySelectorAll('.view-btn');
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                // First remove any existing animation classes
                item.classList.remove('show');
                
                // Force a reflow to restart animation
                void item.offsetWidth;
                
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                    item.classList.add('show');
                } else {
                    item.classList.add('hide');
                    item.classList.remove('show');
                }
            });
        });
    });
    
    // Modal functionality
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const imageSrc = this.getAttribute('data-image');
            const title = this.getAttribute('data-title');
            const desc = this.getAttribute('data-desc');
            
            modalImage.src = imageSrc;
            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            
            modal.style.display = 'block';
            
            // Disable scrolling on body when modal is open
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal functionality
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        
        // Re-enable scrolling
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside of modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Image lazy loading simulation
    const galleryImages = document.querySelectorAll('.gallery-img img');
    
    // Create an Intersection Observer
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('src');
                    
                    // Simulate loading with a slight delay
                    img.style.opacity = '0.5';
                    
                    setTimeout(() => {
                        img.style.opacity = '1';
                        // Once loaded, stop observing
                        observer.unobserve(img);
                    }, 500);
                }
            });
        });
        
        galleryImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Gallery hover effects with JavaScript
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.gallery-img img').style.transform = 'scale(1.1)';
            this.querySelector('.gallery-overlay').style.opacity = '1';
            
            const title = this.querySelector('.gallery-overlay h3');
            const desc = this.querySelector('.gallery-overlay p');
            const btn = this.querySelector('.gallery-overlay .view-btn');
            
            title.style.transform = 'translateY(0)';
            desc.style.transform = 'translateY(0)';
            btn.style.transform = 'translateY(0)';
            btn.style.opacity = '1';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.gallery-img img').style.transform = 'scale(1)';
            this.querySelector('.gallery-overlay').style.opacity = '0';
            
            const title = this.querySelector('.gallery-overlay h3');
            const desc = this.querySelector('.gallery-overlay p');
            const btn = this.querySelector('.gallery-overlay .view-btn');
            
            title.style.transform = 'translateY(20px)';
            desc.style.transform = 'translateY(20px)';
            btn.style.transform = 'translateY(20px)';
            btn.style.opacity = '0';
        });
    });
    
    // Add animated transitions when filtering
    function updateLayout() {
        // Force browser to recalculate layout
        galleryItems.forEach(item => {
            if (!item.classList.contains('hide')) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Update layout when window is resized
    window.addEventListener('resize', updateLayout);
});