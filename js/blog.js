document.addEventListener('DOMContentLoaded', function() {
    // Get all elements
    const searchInput = document.getElementById('blog-search');
    const searchBtn = document.getElementById('search-btn');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const blogPosts = document.querySelectorAll('.blog-post');
    const noResults = document.getElementById('no-results');
    const pageNumbers = document.querySelectorAll('.page-number');
    const prevBtn = document.querySelector('.pagination-btn.prev');
    const nextBtn = document.querySelector('.pagination-btn.next');
    
    // Current category and search term
    let currentCategory = 'all';
    let currentSearchTerm = '';
    let currentPage = 1;
    const postsPerPage = 6;
    
    // Add animation class to blog posts with delay
    function animateBlogPosts() {
        blogPosts.forEach((post, index) => {
            setTimeout(() => {
                post.classList.add('animate');
            }, index * 100);
        });
    }
    
    // Initialize animations
    animateBlogPosts();
    
    // Filter blog posts based on category and search term
    function filterBlogPosts() {
        let visiblePosts = 0;
        
        blogPosts.forEach(post => {
            const postCategory = post.getAttribute('data-category');
            const postTitle = post.querySelector('h2 a').textContent.toLowerCase();
            const postExcerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
            
            // Check if post matches current category and search term
            const matchesCategory = currentCategory === 'all' || postCategory === currentCategory;
            const matchesSearch = currentSearchTerm === '' || 
                                  postTitle.includes(currentSearchTerm) || 
                                  postExcerpt.includes(currentSearchTerm);
            
            if (matchesCategory && matchesSearch) {
                post.classList.remove('hide');
                visiblePosts++;
            } else {
                post.classList.add('hide');
            }
        });
        
        // Show "no results" message if no posts match
        if (visiblePosts === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
        
        // Update pagination
        updatePagination(visiblePosts);
        
        // Show only posts for current page
        showPostsForCurrentPage();
    }
    
    // Category button click event
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update current category
            currentCategory = this.getAttribute('data-category');
            
            // Reset to page 1
            currentPage = 1;
            updateActivePageNumber();
            
            // Filter blog posts
            filterBlogPosts();
        });
    });
    
    // Search functionality
    searchBtn.addEventListener('click', function() {
        currentSearchTerm = searchInput.value.toLowerCase().trim();
        
        // Reset to page 1
        currentPage = 1;
        updateActivePageNumber();
        
        // Filter blog posts
        filterBlogPosts();
    });
    
    // Search on enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
    
    // Clear search when input is emptied
    searchInput.addEventListener('input', function() {
        if (this.value === '' && currentSearchTerm !== '') {
            currentSearchTerm = '';
            
            // Reset to page 1
            currentPage = 1;
            updateActivePageNumber();
            
            // Filter blog posts
            filterBlogPosts();
        }
    });
    
    // Update pagination
    function updatePagination(visiblePostsCount) {
        const totalPages = Math.ceil(visiblePostsCount / postsPerPage);
        
        // Hide pagination if only one page
        if (totalPages <= 1) {
            document.querySelector('.pagination').style.display = 'none';
            return;
        } else {
            document.querySelector('.pagination').style.display = 'flex';
        }
        
        // Show only available page numbers
        pageNumbers.forEach((pageNum, index) => {
            if (index < totalPages) {
                pageNum.style.display = 'flex';
            } else {
                pageNum.style.display = 'none';
            }
        });
        
        // Update prev/next buttons
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    }
    
    // Update active page number
    function updateActivePageNumber() {
        pageNumbers.forEach((pageNum, index) => {
            if (index + 1 === currentPage) {
                pageNum.classList.add('active');
            } else {
                pageNum.classList.remove('active');
            }
        });
    }
    
    // Show posts for current page
    function showPostsForCurrentPage() {
        const visiblePosts = Array.from(blogPosts).filter(post => !post.classList.contains('hide'));
        
        visiblePosts.forEach((post, index) => {
            const postPage = Math.ceil((index + 1) / postsPerPage);
            
            if (postPage === currentPage) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    }
    
    // Page number click event
    pageNumbers.forEach((pageNum, index) => {
        pageNum.addEventListener('click', function() {
            currentPage = index + 1;
            updateActivePageNumber();
            showPostsForCurrentPage();
            
            // Update prev/next buttons
            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = currentPage === pageNumbers.length;
            
            // Scroll to top of blog section
            document.querySelector('.blog-content').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Previous page button
    prevBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            updateActivePageNumber();
            showPostsForCurrentPage();
            
            // Update prev/next buttons
            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = false;
            
            // Scroll to top of blog section
            document.querySelector('.blog-content').scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Next page button
    nextBtn.addEventListener('click', function() {
        const visiblePosts = Array.from(blogPosts).filter(post => !post.classList.contains('hide'));
        const totalPages = Math.ceil(visiblePosts.length / postsPerPage);
        
        if (currentPage < totalPages) {
            currentPage++;
            updateActivePageNumber();
            showPostsForCurrentPage();
            
            // Update prev/next buttons
            prevBtn.disabled = false;
            nextBtn.disabled = currentPage === totalPages;
            
            // Scroll to top of blog section
            document.querySelector('.blog-content').scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Initial filtering
    filterBlogPosts();
    
    // Blog post hover animation (additional interaction)
    blogPosts.forEach(post => {
        const postImage = post.querySelector('.blog-image img');
        
        post.addEventListener('mouseenter', function() {
            postImage.style.transform = 'scale(1.05)';
        });
        
        post.addEventListener('mouseleave', function() {
            postImage.style.transform = 'scale(1)';
        });
    });
});