// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Shopping Cart Functionality
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cartItems')) || [];
        this.cartSidebar = document.getElementById('cartSidebar');
        this.cartOverlay = document.getElementById('cartOverlay');
        this.cartItems = document.getElementById('cartItems');
        this.cartTotal = document.getElementById('cartTotal');
        this.cartCount = document.querySelector('.cart-count');
        this.cartBtn = document.querySelector('.cart-btn');
        this.closeCartBtn = document.querySelector('.close-cart');
        
        this.init();
    }
    
    init() {
        this.updateCartUI();
        this.bindEvents();
    }
    
    bindEvents() {
        // Open cart
        if (this.cartBtn) {
            this.cartBtn.addEventListener('click', () => this.openCart());
        }
        
        // Close cart
        if (this.closeCartBtn) {
            this.closeCartBtn.addEventListener('click', () => this.closeCart());
        }
        
        if (this.cartOverlay) {
            this.cartOverlay.addEventListener('click', () => this.closeCart());
        }
        
        // Add to cart buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart-btn')) {
                const productId = e.target.getAttribute('data-product-id');
                this.addToCart(productId, e.target);
            }
        });
        
        // Checkout button
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.checkout());
        }
    }
    
    addToCart(productId, button) {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const priceElement = productCard.querySelector('.current-price');
        const price = parseFloat(priceElement.textContent.replace('$', ''));
        
        const existingItem = this.items.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: productId,
                name: productName,
                price: price,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        this.updateCartUI();
        this.showAddToCartFeedback(button);
    }
    
    removeFromCart(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartUI();
    }
    
    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = newQuantity;
                this.saveToStorage();
                this.updateCartUI();
            }
        }
    }
    
    updateCartUI() {
        // Update cart count
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        if (this.cartCount) {
            this.cartCount.textContent = totalItems;
        }
        
        // Update cart total
        const total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (this.cartTotal) {
            this.cartTotal.textContent = total.toFixed(2);
        }
        
        // Update cart items display
        this.renderCartItems();
    }
    
    renderCartItems() {
        if (!this.cartItems) return;
        
        if (this.items.length === 0) {
            this.cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            return;
        }
        
        this.cartItems.innerHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn minus" onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                </div>
                <button class="remove-item" onclick="cart.removeFromCart('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
    
    openCart() {
        if (this.cartSidebar && this.cartOverlay) {
            this.cartSidebar.classList.add('open');
            this.cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeCart() {
        if (this.cartSidebar && this.cartOverlay) {
            this.cartSidebar.classList.remove('open');
            this.cartOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    showAddToCartFeedback(button) {
        const originalText = button.textContent;
        button.textContent = 'Added!';
        button.style.background = '#48bb78';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 1500);
    }
    
    checkout() {
        if (this.items.length === 0) {
            this.showNotification('Your cart is empty!', 'error');
            return;
        }
        
        this.showNotification('Redirecting to checkout...', 'success');
        
        // Simulate checkout process
        setTimeout(() => {
            this.items = [];
            this.saveToStorage();
            this.updateCartUI();
            this.closeCart();
            this.showNotification('Thank you for your purchase!', 'success');
        }, 2000);
    }
    
    saveToStorage() {
        localStorage.setItem('cartItems', JSON.stringify(this.items));
    }
    
    showNotification(message, type) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style notification
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#48bb78' : '#e53e3e'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            z-index: 1002;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
            font-size: 14px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }
}

// Initialize shopping cart
const cart = new ShoppingCart();

// Product Filtering
class ProductFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.productCards = document.querySelectorAll('.product-card');
        
        this.init();
    }
    
    init() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.filterProducts(filter);
                this.updateActiveButton(button);
            });
        });
    }
    
    filterProducts(filter) {
        this.productCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    updateActiveButton(activeButton) {
        this.filterButtons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }
}

// Initialize product filter
const productFilter = new ProductFilter();

// Wishlist Functionality
class Wishlist {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('wishlistItems')) || [];
        this.init();
    }
    
    init() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.wishlist-btn')) {
                const productCard = e.target.closest('.product-card');
                const productId = productCard.querySelector('.add-to-cart-btn').getAttribute('data-product-id');
                this.toggleWishlist(productId, e.target.closest('.wishlist-btn'));
            }
        });
        
        this.updateWishlistUI();
    }
    
    toggleWishlist(productId, button) {
        const isInWishlist = this.items.includes(productId);
        
        if (isInWishlist) {
            this.items = this.items.filter(id => id !== productId);
            button.innerHTML = '<i class="far fa-heart"></i>';
            this.showNotification('Removed from wishlist', 'info');
        } else {
            this.items.push(productId);
            button.innerHTML = '<i class="fas fa-heart"></i>';
            this.showNotification('Added to wishlist', 'success');
        }
        
        localStorage.setItem('wishlistItems', JSON.stringify(this.items));
    }
    
    updateWishlistUI() {
        const wishlistButtons = document.querySelectorAll('.wishlist-btn');
        wishlistButtons.forEach(button => {
            const productCard = button.closest('.product-card');
            const productId = productCard.querySelector('.add-to-cart-btn').getAttribute('data-product-id');
            
            if (this.items.includes(productId)) {
                button.innerHTML = '<i class="fas fa-heart"></i>';
            } else {
                button.innerHTML = '<i class="far fa-heart"></i>';
            }
        });
    }
    
    showNotification(message, type) {
        cart.showNotification(message, type);
    }
}

// Initialize wishlist
const wishlist = new Wishlist();

// Form Handling
const contactForm = document.querySelector('.contact-form');
const newsletterForm = document.querySelector('.newsletter-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Simulate form submission
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            cart.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            e.target.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = e.target.querySelector('input[type="email"]').value;
        
        if (email) {
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                cart.showNotification('Successfully subscribed to newsletter!', 'success');
                e.target.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
    });
}

// Search Functionality
const searchBtn = document.querySelector('.search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const searchQuery = prompt('Enter product name to search:');
        if (searchQuery) {
            searchProducts(searchQuery);
        }
    });
}

function searchProducts(query) {
    const productCards = document.querySelectorAll('.product-card');
    let found = false;
    
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(query.toLowerCase())) {
            card.style.display = 'block';
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            found = true;
        } else {
            card.style.display = 'none';
        }
    });
    
    if (!found) {
        cart.showNotification('No products found for your search.', 'error');
        // Reset display
        productCards.forEach(card => {
            card.style.display = 'block';
        });
    }
}

// Scroll Animations
const observeElements = () => {
    const elements = document.querySelectorAll('.category-card, .product-card, .feature-item, .stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
};

// Header Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = '#fff';
        navbar.style.backdropFilter = 'none';
    }
});

// Quick View Functionality
document.addEventListener('click', (e) => {
    if (e.target.closest('.quick-view-btn')) {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const price = productCard.querySelector('.current-price').textContent;
        const rating = productCard.querySelector('.rating-count').textContent;
        
        // Create quick view modal
        const modal = document.createElement('div');
        modal.className = 'quick-view-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="close-modal">&times;</button>
                <div class="quick-view-product">
                    <div class="product-image-large">
                        <div class="product-placeholder-large">
                            ${productCard.querySelector('.product-placeholder').innerHTML}
                        </div>
                    </div>
                    <div class="product-details">
                        <h2>${productName}</h2>
                        <div class="product-rating">
                            ${productCard.querySelector('.product-rating').innerHTML}
                        </div>
                        <div class="product-price">
                            <span class="current-price">${price}</span>
                        </div>
                        <p class="product-description">This is a high-quality product with excellent features and great value for money.</p>
                        <button class="add-to-cart-btn" data-product-id="${productCard.querySelector('.add-to-cart-btn').getAttribute('data-product-id')}">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Style the modal
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1003;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Close modal functionality
        const closeModal = () => {
            modal.remove();
            document.body.style.overflow = '';
        };
        
        modal.querySelector('.close-modal').addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    }
});

// Category Card Click Functionality
document.addEventListener('click', (e) => {
    if (e.target.closest('.category-card')) {
        const categoryName = e.target.closest('.category-card').querySelector('h3').textContent.toLowerCase();
        
        // Scroll to products section
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        
        // Filter products by category
        setTimeout(() => {
            const categoryMapping = {
                'fashion': 'bestseller',
                'electronics': 'new',
                'home & garden': 'sale',
                'sports': 'sale',
                'books': 'new',
                'gaming': 'bestseller'
            };
            
            const filter = categoryMapping[categoryName] || 'all';
            productFilter.filterProducts(filter);
            
            // Update filter button
            const filterBtn = document.querySelector(`[data-filter="${filter}"]`);
            if (filterBtn) {
                productFilter.updateActiveButton(filterBtn);
            }
        }, 500);
    }
});

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    observeElements();
    
    // Add entrance animation to hero
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('fade-in');
        }, 300);
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add CSS for cart items and modal
const additionalStyles = `
<style>
.cart-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid #e2e8f0;
}

.cart-item-info {
    flex: 1;
}

.cart-item-info h4 {
    margin: 0 0 0.5rem 0;
    font-size: 0.9rem;
    color: #2d3748;
}

.cart-item-price {
    margin: 0;
    color: #667eea;
    font-weight: 600;
}

.cart-item-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-btn {
    width: 24px;
    height: 24px;
    border: 1px solid #e2e8f0;
    background: white;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
}

.quantity-btn:hover {
    background: #f7fafc;
}

.quantity {
    min-width: 20px;
    text-align: center;
    font-weight: 500;
}

.remove-item {
    background: none;
    border: none;
    color: #e53e3e;
    cursor: pointer;
    padding: 4px;
}

.quick-view-modal .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
}

.quick-view-modal .modal-content {
    position: relative;
    background: white;
    border-radius: 16px;
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    z-index: 1;
}

.close-modal {
    position: absolute;
    top: 15px;
    right: 20px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #4a5568;
    z-index: 1;
}

.quick-view-product {
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: center;
}

.product-image-large {
    text-align: center;
}

.product-placeholder-large {
    font-size: 4rem;
    color: #a0aec0;
    background: #f7fafc;
    padding: 3rem;
    border-radius: 12px;
}

.product-details h2 {
    margin-bottom: 1rem;
    color: #2d3748;
}

.product-description {
    color: #718096;
    margin: 1rem 0;
    line-height: 1.6;
}

@media (max-width: 768px) {
    .quick-view-product {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles); 