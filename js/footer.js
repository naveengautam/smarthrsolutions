
document.querySelectorAll('.service-card, .industry-card, .usp-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Function to create contact bar dynamically
function createContactBar(data) {
    const container = document.getElementById('contactContainer');           
    // Create contact bar div
    const contactBar = document.createElement('div');
    contactBar.className = 'contact-bar';

    data.contacts.map(contact => {
        const contactItem = document.createElement('div');
        contactItem.className = 'contact-item';
        //console.log('Contact is:', contact)
        const iconSpan = document.createElement('span');
        iconSpan.textContent = contact.icon;
        
        const textSpan = document.createElement('span');
        textSpan.textContent = contact.text;
        
        contactItem.appendChild(iconSpan);
        contactItem.appendChild(textSpan);
    
        return contactItem;
    }).forEach(item => contactBar.appendChild(item));
    
    // Clear previous content and add new contact bar
    container.innerHTML = '';
    container.appendChild(contactBar);
}

// Alternative: Fetch from external JSON file
async function loadContactsFromFile() {
    try {
        const response = await fetch('js/contacts.json');
        const data = await response.json();
        //console.log(data);
        createContactBar(data);
    } catch (error) {
        console.error('Error loading contacts:', error);
        document.getElementById('contactContainer').innerHTML = 
            '<div class="loading">Error loading contacts</div>';
    }
}

// Initialize on page load
loadContactsFromFile();

function createFooter(data) {
    const footerContainer = document.querySelector('.footer-content'); // or your container
    
    data.footerSections.map(section => {
        // Create footer section div
        const footerSection = document.createElement('div');
        footerSection.className = 'footer-section';
        
        // Create heading
        const heading = document.createElement('h3');
        heading.textContent = section.title;
        footerSection.appendChild(heading);
        
        // Create ul
        const ul = document.createElement('ul');
        ul.className = 'footer-links';
        
        // Create li items
        section.links.forEach(link => {
            const li = document.createElement('li');
            
            if (link.href) {
                const a = document.createElement('a');
                a.href = link.href;
                a.textContent = link.text;
                li.appendChild(a);
            } else {
                li.textContent = link.text;
            }
            
            ul.appendChild(li);
        });
        
        footerSection.appendChild(ul);
        footerContainer.appendChild(footerSection);
    });
}

// Load from JSON file
fetch('js/footersection.json')
    .then(response => response.json())
    .then(data => createFooter(data));