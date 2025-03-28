// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Create video mosaic
    createVideoMosaic();
    
    // Handle form submission
    setupWaitlistForm();
});

// Create mosaic of professional faces with video play icons
function createVideoMosaic() {
    const mosaicContainer = document.getElementById('videoMosaic');
    
    // Professional roles for the mosaic
    const professionals = [
        { role: 'Software Engineer', img: 'images/engineer.jpg' },
        { role: 'Marketing Specialist', img: 'images/marketer.jpg' },
        { role: 'HR Manager', img: 'images/hr.jpg' },
        { role: 'Product Designer', img: 'images/designer.jpg' },
        { role: 'Financial Analyst', img: 'images/finance.jpg' },
        { role: 'Healthcare Professional', img: 'images/healthcare.jpg' },
        { role: 'Teacher', img: 'images/teacher.jpg' },
        { role: 'Customer Service', img: 'images/customer-service.jpg' }
    ];
    
    // If images haven't been added yet, use placeholders
    professionals.forEach(person => {
        const item = document.createElement('div');
        item.className = 'mosaic-item';
        
        // Create image with placeholder if needed
        const img = document.createElement('img');
        img.src = person.img;
        img.alt = person.role;
        img.onerror = function() {
            this.src = `https://via.placeholder.com/300x300/4a6cf7/ffffff?text=${encodeURIComponent(person.role)}`;
        };
        
        // Create play icon overlay
        const playIcon = document.createElement('div');
        playIcon.className = 'play-icon';
        playIcon.innerHTML = '<i class="fas fa-play"></i>';
        
        // Add hover animation
        item.appendChild(img);
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

// Handle waitlist form submission
function setupWaitlistForm() {
    const form = document.getElementById('waitlistForm');
    const confirmation = document.getElementById('confirmation');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        
        if (nameInput.value && emailInput.value) {
            // In a real application, you would send this data to your server
            console.log('Form submitted:', {
                name: nameInput.value,
                email: emailInput.value
            });
            
            // Show confirmation message
            form.style.display = 'none';
            confirmation.classList.remove('hidden');
            
            // Reset form
            form.reset();
        }
    });
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
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
`;
document.head.appendChild(style); 