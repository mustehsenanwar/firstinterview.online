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
    
    // Professional roles for the mosaic with images
    const professionals = [
        { role: 'Software Engineer', img: 'images/professional_image1.jpg' },
        { role: 'Marketing Specialist', img: 'images/professional_image2.jpg' },
        { role: 'HR Manager', img: 'images/professional_image3.jpg' },
        { role: 'Product Designer', img: 'images/professional_image4.jpg' },
        { role: 'Financial Analyst', img: 'images/professional_image5.jpg' },
        { role: 'Healthcare Professional', img: 'images/professional_image6.jpg' },
        { role: 'Teacher', img: 'images/professional_image7.jpg' },
        { role: 'Customer Service', img: 'images/professional_image8.jpg' }
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
        
        // Create play icon overlay
        const playIcon = document.createElement('div');
        playIcon.className = 'play-icon';
        playIcon.innerHTML = '<i class="fas fa-play"></i>';
        
        // Add click event to simulate video preview
        item.addEventListener('click', function() {
            simulateVideoPreview(this, person.role);
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
function simulateVideoPreview(element, role) {
    const playIcon = element.querySelector('.play-icon');
    
    // Change the icon to a spinner temporarily
    playIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    
    // After a short delay, show a "preview played" message
    setTimeout(() => {
        playIcon.innerHTML = '<i class="fas fa-check"></i>';
        
        // Add a notification
        const notification = document.createElement('div');
        notification.className = 'video-notification';
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
    const form = document.getElementById('waitlistForm');
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
        
        if (nameInput.value && emailInput.value) {
            // Show loading state on button
            const submitButton = form.querySelector('button');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitButton.disabled = true;
            
            // Simulate API call with timeout
            setTimeout(() => {
                // In a real application, you would send this data to your server
                console.log('Form submitted:', {
                    name: nameInput.value,
                    email: emailInput.value
                });
                
                // Show confirmation message with animation
                form.style.opacity = 0;
                setTimeout(() => {
                    form.style.display = 'none';
                    confirmation.classList.remove('hidden');
                    setTimeout(() => {
                        confirmation.style.opacity = 1;
                    }, 10);
                }, 300);
                
                // Reset form
                form.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 1500);
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