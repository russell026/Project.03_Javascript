document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('success-message');
    
    // Add event listeners for input fields
    addInputListeners(nameInput);
    addInputListeners(emailInput);
    addInputListeners(subjectInput);
    addInputListeners(messageInput);
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous validations
            resetValidation();
            
            // Validate inputs
            let isValid = true;
            
            if (!validateName(nameInput.value)) {
                showError(nameInput, 'Nama tidak boleh kosong');
                isValid = false;
            }
            
            if (!validateEmail(emailInput.value)) {
                showError(emailInput, 'Masukkan alamat email yang valid');
                isValid = false;
            }
            
            if (!validateSubject(subjectInput.value)) {
                showError(subjectInput, 'Subjek tidak boleh kosong');
                isValid = false;
            }
            
            if (!validateMessage(messageInput.value)) {
                showError(messageInput, 'Pesan tidak boleh kosong');
                isValid = false;
            }
            
            // If form is valid, submit it (simulate submission)
            if (isValid) {
                submitForm();
            }
        });
    }
    
    // Input field event listeners
    function addInputListeners(input) {
        if (input) {
            // Validate on blur
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Reset error on focus
            input.addEventListener('focus', function() {
                resetFieldError(this);
            });
            
            // Live validation for email
            if (input.id === 'email') {
                input.addEventListener('input', function() {
                    if (this.value.length > 3) {
                        validateField(this);
                    }
                });
            }
        }
    }
    
    // Validate individual field
    function validateField(field) {
        if (field.id === 'name') {
            if (!validateName(field.value)) {
                showError(field, 'Nama tidak boleh kosong');
            }
        } else if (field.id === 'email') {
            if (!validateEmail(field.value)) {
                showError(field, 'Masukkan alamat email yang valid');
            }
        } else if (field.id === 'subject') {
            if (!validateSubject(field.value)) {
                showError(field, 'Subjek tidak boleh kosong');
            }
        } else if (field.id === 'message') {
            if (!validateMessage(field.value)) {
                showError(field, 'Pesan tidak boleh kosong');
            }
        }
    }
    
    // Validation functions
    function validateName(name) {
        return name.trim() !== '';
    }
    
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    function validateSubject(subject) {
        return subject.trim() !== '';
    }
    
    function validateMessage(message) {
        return message.trim() !== '';
    }
    
    // Show error message
    function showError(input, message) {
        const formGroup = input.parentElement;
        formGroup.classList.add('error');
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    // Reset field error
    function resetFieldError(input) {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
    }
    
    // Reset all validation
    function resetValidation() {
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error');
        });
        
        successMessage.style.display = 'none';
    }
    
    // Submit form (simulation)
    function submitForm() {
        // Disable submit button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Mengirim...';
        
        // Simulate API call delay
        setTimeout(function() {
            // Show success message
            successMessage.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Restore submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Kirim Pesan';
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                if (successMessage.style.display === 'block') {
                    successMessage.style.display = 'none';
                }
            }, 5000);
        }, 1500);
    }
    
    // Add some interactive effects for better UX
    const formControls = document.querySelectorAll('.form-control');
    
    formControls.forEach(control => {
        // Add focus effect
        control.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.2)';
        });
        
        // Remove focus effect
        control.addEventListener('blur', function() {
            this.style.boxShadow = 'none';
        });
        
        // Add typing effect for textarea
        if (control.tagName.toLowerCase() === 'textarea') {
            control.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + 'px';
            });
        }
    });
    
    // Character counter for message
    if (messageInput) {
        // Create character counter element
        const charCounter = document.createElement('div');
        charCounter.className = 'char-counter';
        charCounter.style.textAlign = 'right';
        charCounter.style.fontSize = '14px';
        charCounter.style.color = '#777';
        charCounter.style.marginTop = '5px';
        charCounter.textContent = '0 karakter';
        
        // Insert after textarea
        messageInput.parentNode.insertBefore(charCounter, messageInput.nextSibling);
        
        // Update character count on input
        messageInput.addEventListener('input', function() {
            const count = this.value.length;
            charCounter.textContent = count + ' karakter';
            
            // Change color based on length
            if (count > 500) {
                charCounter.style.color = '#e74c3c';
            } else if (count > 200) {
                charCounter.style.color = '#f39c12';
            } else {
                charCounter.style.color = '#777';
            }
        });
    }
});