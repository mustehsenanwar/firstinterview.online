// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Create video mosaic
    createVideoMosaic();
    
    // Handle form submission
    setupWaitlistForm();
    
    // Add scroll animations
    initScrollAnimations();
    
    // Add typing effect to heading
    initTypingEffect();
    
    // Add dynamic background elements
    createDynamicBackground();
});

// Create mosaic of professional faces with video play icons
function createVideoMosaic() {
    const mosaicContainer = document.getElementById('videoMosaic');
    
    // Professional roles for the mosaic with images - mixed arrangement of men and women
    // Using exact filenames as they exist in the images folder
    const professionals = [
        { role: 'UX Designer', img: 'images/man - professional_image4.jpg', gender: 'man' },
        { role: 'HR Director', img: 'images/woman - professional_image8.jpg', gender: 'woman' },
        { role: 'Financial Advisor', img: 'images/man - professional_image5.jpg', gender: 'man' },
        { role: 'Project Manager', img: 'images/man - professional_image7.jpg', gender: 'man' },
        { role: 'Customer Support', img: 'images/woman - professional_image9.jpeg', gender: 'woman' },
        { role: 'Sales Executive', img: 'images/man - professional_image6.jpg', gender: 'man' },
        { role: 'Product Manager', img: 'images/woman- professional_image9.jpg', gender: 'woman' },
        { role: 'IT Specialist', img: 'images/man - professional_image12.jpg', gender: 'man' },
        { role: 'Business Analyst', img: 'images/woman- professional_image11.jpg', gender: 'woman' },
        { role: 'Engineering Director', img: 'images/man - professional_image13.jpg', gender: 'man' }
    ];
    
    // Create mosaic items with staggered animation
    professionals.forEach((person, index) => {
        const item = document.createElement('div');
        item.className = 'mosaic-item';
        item.style.animationDelay = `${index * 0.15}s`;
        
        // Create image with fallback to placeholder if needed
        const img = document.createElement('img');
        
        if (person.img) {
            img.src = person.img;
            img.alt = person.role;
            img.onerror = function() {
                console.log(`Image not found: ${person.img}, falling back to placeholder`);
                this.src = `https://via.placeholder.com/300x300/4361ee/ffffff?text=${encodeURIComponent(person.role)}`;
            };
        } else {
            img.src = `https://via.placeholder.com/300x300/4361ee/ffffff?text=${encodeURIComponent(person.role)}`;
            img.alt = person.role;
        }
        
        // Create role label
        const roleLabel = document.createElement('div');
        roleLabel.className = 'role-label';
        roleLabel.textContent = person.role;
        
        // Create play icon overlay with color based on gender
        const playIcon = document.createElement('div');
        playIcon.className = 'play-icon';
        
        // Set blue color for men, pink for women
        if (person.gender === 'man') {
            playIcon.style.backgroundColor = 'rgba(67, 97, 238, 0.8)'; // Blue color
        } else {
            playIcon.style.backgroundColor = 'rgba(247, 37, 133, 0.8)'; // Pink color
        }
        
        playIcon.innerHTML = '<i class="fas fa-play"></i>';
        
        // Add click event to simulate video preview
        item.addEventListener('click', function() {
            simulateVideoPreview(this, person.role, person.gender);
        });
        
        // Add hover animation
        item.appendChild(img);
        item.appendChild(roleLabel);
        item.appendChild(playIcon);
        
        // Add pulsing animation to some random items
        if (Math.random() > 0.5) {
            setTimeout(() => {
                playIcon.style.animation = 'pulse 2s infinite';
            }, Math.random() * 3000);
        }
        
        mosaicContainer.appendChild(item);
    });
}

// Create dynamic background elements
function createDynamicBackground() {
    const circles = document.createElement('div');
    circles.className = 'animated-circles';
    document.body.appendChild(circles);
    
    for (let i = 0; i < 5; i++) {
        const circle = document.createElement('div');
        circle.className = 'animated-circle';
        circle.style.width = `${Math.random() * 100 + 50}px`;
        circle.style.height = circle.style.width;
        circle.style.left = `${Math.random() * 100}%`;
        circle.style.top = `${Math.random() * 100}%`;
        circle.style.animationDuration = `${Math.random() * 20 + 10}s`;
        circle.style.animationDelay = `${Math.random() * 5}s`;
        circles.appendChild(circle);
    }
    
    // Add CSS for animated circles
    const style = document.createElement('style');
    style.textContent = `
        .animated-circles {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -3;
            overflow: hidden;
            pointer-events: none;
        }
        
        .animated-circle {
            position: absolute;
            border-radius: 50%;
            background: linear-gradient(45deg, rgba(67, 97, 238, 0.05), rgba(247, 37, 133, 0.05));
            animation: float 20s ease-in-out infinite;
            opacity: 0.5;
        }
    `;
    document.head.appendChild(style);
}

// Simulate a video preview when clicked
function simulateVideoPreview(element, role, gender) {
    const playIcon = element.querySelector('.play-icon');
    
    // Change the icon to a spinner temporarily
    playIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    
    // After a short delay, show a "preview played" message
    setTimeout(() => {
        playIcon.innerHTML = '<i class="fas fa-check"></i>';
        
        // Add a notification
        const notification = document.createElement('div');
        notification.className = 'video-notification';
        
        // Set notification color based on gender
        if (gender === 'man') {
            notification.style.backgroundColor = 'var(--primary-color)'; // Blue color
        } else {
            notification.style.backgroundColor = 'var(--accent-color)'; // Pink color
        }
        
        notification.innerHTML = `
            <i class="fas fa-video"></i>
            <span>Video preview from ${role}</span>
        `;
        document.body.appendChild(notification);
        
        // Animate the notification
        setTimeout(() => {
            notification.classList.add('show');
            
            // Remove after display
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(notification);
                    
                    // Reset the play icon
                    setTimeout(() => {
                        playIcon.innerHTML = '<i class="fas fa-play"></i>';
                    }, 500);
                }, 500);
            }, 3000);
        }, 10);
    }, 1500);
}

// Handle waitlist form submission
function setupWaitlistForm() {
    const form = document.getElementById('waitlistFormElement');
    const confirmation = document.getElementById('confirmation');
    
    // Add focus effects to input fields
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.parentElement.classList.remove('focused');
            }
        });
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const websiteInput = document.getElementById('website');
        
        if (nameInput.value && emailInput.value) {
            // Show loading state on button
            const submitButton = form.querySelector('button');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitButton.disabled = true;
            
            // Prepare the data for API submission
            const formData = {
                name: nameInput.value,
                email: emailInput.value,
                website: websiteInput.value
            };
            
            // Submit to API
            fetch('https://test.dubaicv.ae/api/collect-contact/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                
                // Hide the entire waitlist-form-container
                const formContainer = document.querySelector('.waitlist-form-container');
                formContainer.style.opacity = 0;
                
                setTimeout(() => {
                    // Create payment offer container with same styling as form
                    const paymentOffer = document.createElement('div');
                    paymentOffer.className = 'waitlist-form-container';
                    paymentOffer.innerHTML = `
                        <div class="video-badge">
                            <i class="fas fa-fire"></i>
                            <span>Special Offer</span>
                        </div>
                        <div class="waitlist-form payment-container">
                            <div class="pricing-header">
                                <h2>Early Access Offer</h2>
                                <p class="limited-spots">Only 7 spots remaining!</p>
                                <p class="launch-date">Expected launch date: next week</p>
                            </div>
                            
                            <div class="price-comparison">
                                <div class="price-item regular">
                                    <div class="price-label">Regular Price</div>
                                    <div class="price-amount">$39<span>/month</span></div>
                                </div>
                                <div class="price-item special">
                                    <div class="discount-badge">74% OFF</div>
                                    <div class="price-label">Waitlist Price</div>
                                    <div class="price-amount">$10<span>/month</span></div>
                                </div>
                            </div>
                            
                            <div class="features-list">
                                <div class="feature-item"><i class="fas fa-check"></i> Early access to all features</div>
                                <div class="feature-item"><i class="fas fa-check"></i> Your monthly rate is locked for life</div>
                                <div class="feature-item"><i class="fas fa-check"></i> Cancel anytime</div>
                            </div>
                            
                            <a href="https://buy.stripe.com/4gwbMd1094o4d3y7sw" class="payment-button">
                                <i class="fas fa-lock"></i> Secure Early Access
                            </a>
                        </div>
                    `;
                    
                    // Replace the form container with the offer
                    formContainer.parentNode.replaceChild(paymentOffer, formContainer);
                    
                    // Animate in the new container
                    setTimeout(() => {
                        paymentOffer.style.opacity = 1;
                    }, 10);
                }, 300);
            })
            .catch(error => {
                console.error('Error:', error);
                // Still show offer on error
                const formContainer = document.querySelector('.waitlist-form-container');
                formContainer.style.opacity = 0;
                
                setTimeout(() => {
                    // Create payment offer container with same styling as form
                    const paymentOffer = document.createElement('div');
                    paymentOffer.className = 'waitlist-form-container';
                    paymentOffer.innerHTML = `
                        <div class="video-badge">
                            <i class="fas fa-fire"></i>
                            <span>Special Offer</span>
                        </div>
                        <div class="waitlist-form payment-container">
                            <div class="pricing-header">
                                <h2>Early Access Offer</h2>
                                <p class="limited-spots">Only 7 spots remaining!</p>
                                <p class="launch-date">Expected launch date: next week</p>
                            </div>
                            
                            <div class="price-comparison">
                                <div class="price-item regular">
                                    <div class="price-label">Regular Price</div>
                                    <div class="price-amount">$39<span>/month</span></div>
                                </div>
                                <div class="price-item special">
                                    <div class="discount-badge">74% OFF</div>
                                    <div class="price-label">Waitlist Price</div>
                                    <div class="price-amount">$10<span>/month</span></div>
                                </div>
                            </div>
                            
                            <div class="features-list">
                                <div class="feature-item"><i class="fas fa-check"></i> Early access to all features</div>
                                <div class="feature-item"><i class="fas fa-check"></i> Your monthly rate is locked for life</div>
                                <div class="feature-item"><i class="fas fa-check"></i> Cancel anytime</div>
                            </div>
                            
                            <a href="https://buy.stripe.com/4gwbMd1094o4d3y7sw" class="payment-button">
                                <i class="fas fa-lock"></i> Secure Early Access
                            </a>
                        </div>
                    `;
                    
                    // Replace the form container with the offer
                    formContainer.parentNode.replaceChild(paymentOffer, formContainer);
                    
                    // Animate in the new container
                    setTimeout(() => {
                        paymentOffer.style.opacity = 1;
                    }, 10);
                }, 300);
            })
            .finally(() => {
                // Reset form
                form.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            });
        }
    });
}

// Initialize scroll animations
function initScrollAnimations() {
    // Add a CSS class for elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.benefit-item, .video-mosaic');
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe each element
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Add typing effect to highlight text
function initTypingEffect() {
    const highlightEl = document.querySelector('.highlight');
    
    if (highlightEl) {
        const text = highlightEl.textContent;
        highlightEl.textContent = '';
        
        // Add typing cursor
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '|';
        highlightEl.appendChild(cursor);
        
        // Type out the text
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                const charSpan = document.createElement('span');
                charSpan.textContent = text.charAt(i);
                charSpan.style.opacity = '0';
                charSpan.style.animation = 'fadeIn 0.1s forwards';
                highlightEl.insertBefore(charSpan, cursor);
                i++;
            } else {
                clearInterval(typeInterval);
                // Keep cursor blinking
                cursor.classList.add('blinking');
            }
        }, 100);
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
    
    @keyframes pulse {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
        }
    }
    
    .role-label {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,0.7);
        color: white;
        padding: 8px;
        font-size: 0.9rem;
        transform: translateY(100%);
        transition: transform 0.3s ease;
        z-index: 2;
    }
    
    .mosaic-item:hover .role-label {
        transform: translateY(0);
    }
    
    .typing-cursor {
        display: inline-block;
        color: var(--accent-color);
    }
    
    .typing-cursor.blinking {
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0% { opacity: 1; }
        50% { opacity: 0; }
        100% { opacity: 1; }
    }
    
    .video-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(120%);
        transition: transform 0.3s ease;
        z-index: 1000;
    }
    
    .video-notification.show {
        transform: translateX(0);
    }
    
    .form-group.focused label {
        color: var(--primary-color);
    }
    
    .benefit-item, .video-mosaic {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .benefit-item.animated, .video-mosaic.animated {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);