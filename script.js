document.addEventListener('DOMContentLoaded', () => {
    // Handle file downloads
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const fileUrl = this.getAttribute('href');
            const fileName = decodeURIComponent(fileUrl);
            let downloadStarted = false;

            // Try direct download first
            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = fileName;
            link.target = '_blank';
            
            link.addEventListener('click', () => {
                downloadStarted = true;
            });
            
            link.click();

            // Fallback to fetch only if direct download didn't work
            setTimeout(() => {
                if (!downloadStarted) {
                    fetch(encodeURI(fileUrl))
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.blob();
                        })
                        .then(blob => {
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.style.display = 'none';
                            a.href = url;
                            a.download = fileName;
                            document.body.appendChild(a);
                            a.click();
                            window.URL.revokeObjectURL(url);
                            document.body.removeChild(a);
                        })
                        .catch(err => {
                            console.error('Download failed:', err);
                            // Final fallback - open in new tab
                            window.open(fileUrl, '_blank');
                        });
                }
            }, 1000);
        });
    });

    // Add ripple effect to checklist items
    const checklistItems = document.querySelectorAll('.checklist-item');
    
    checklistItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            if (e.target !== checkbox) {
                checkbox.checked = !checkbox.checked;
                triggerRipple(e, item);
            }
        });
    });

    // Ripple effect function
    function triggerRipple(event, element) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        const rect = element.getBoundingClientRect();
        
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        element.appendChild(ripple);
        
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    }

    // Add hover effect to instruction sections
    const sections = document.querySelectorAll('.instruction-section');
    
    sections.forEach(section => {
        section.addEventListener('mouseenter', () => {
            section.style.transform = 'translateY(-10px)';
            section.style.boxShadow = '0 0 50px rgba(0, 255, 255, 0.3)';
        });
        
        section.addEventListener('mouseleave', () => {
            section.style.transform = 'translateY(0)';
            section.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.1)';
        });
    });

    // Add parallax effect to header
    const header = document.querySelector('.header');
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        header.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
    });

    // Add smooth scroll to top when clicking the header
    header.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add typing effect to subtitle
    const subtitle = document.querySelector('.subtitle');
    const text = subtitle.textContent;
    subtitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);

    // Add hover effect to list items
    const listItems = document.querySelectorAll('.instruction-list li');
    listItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });

    // Add background particles effect
    const createParticle = () => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = Math.random() * 3 + 2 + 's';
        document.body.appendChild(particle);
        
        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    };

    // Create particles periodically
    setInterval(createParticle, 300);
}); 