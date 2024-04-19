function toggleMenu() {
    let navbar = document.getElementById("navbar");
    let icon = document.getElementById("menu-icon");
    let isMenuOpen = navbar.style.display === "block";

    // Toggle menu display and icon text
    navbar.style.display = isMenuOpen ? "none" : "block";
    icon.innerText = isMenuOpen ? '☰' : '✖';
}

// Close the menu if the user clicks outside of it
document.addEventListener('click', function(event) {
    let navbar = document.getElementById("navbar");
    let icon = document.getElementById("menu-icon");
    let menuButton = document.getElementById("menu-icon");

    // Check if the menu is open and the clicked target is not the menu button or the navbar
    if (navbar.style.display === "block" && event.target !== menuButton && !navbar.contains(event.target)) {
        navbar.style.display = "none";
        icon.innerText = '☰';
    }
});

// Stop propagation of the click event from the menu button
document.getElementById('menu-icon').addEventListener('click', function(event) {
    event.stopPropagation();
});


// function toggleMenu() {
//     let navbar = document.getElementById("navbar");
//     let icon = document.getElementById("menu-icon");
//     if (navbar.style.display === "block") {
//         navbar.style.display = "none";
//         icon.innerText = '☰'; 
//     } else {
//         navbar.style.display = "block";
//         icon.innerText = '✖';
//     }
// }

// let menuTimeout;

// function toggleMenu() {
//     let navbar = document.getElementById("navbar");
//     let icon = document.getElementById("menu-icon");
    
//     clearTimeout(menuTimeout);

//     if (navbar.style.display === "block") {
//         navbar.style.display = "none";
//         icon.innerText = '☰';
//     } else {
//         navbar.style.display = "block";
//         icon.innerText = '✖';
//         menuTimeout = setTimeout(() => {
//             navbar.style.display = "none";
//             icon.innerText = '☰';
//         }, 8000);
//     }
// }

document.addEventListener('DOMContentLoaded', function () {
    // document.getElementById('load-main').addEventListener('click', () => loadData('main'));
    document.getElementById('load-main').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default anchor behavior
        loadData('main');
        window.scrollTo(0, 0); // Scroll to the top of the page
    });
    document.getElementById('load-education').addEventListener('click', () => loadData('education'));
    document.getElementById('load-experience').addEventListener('click', () => loadData('experience'));
    document.getElementById('load-publications').addEventListener('click', () => loadData('publications'));
    document.getElementById('load-certifications').addEventListener('click', () => loadData('certifications'));
    document.getElementById('load-contact').addEventListener('click', () => loadData('contact'));
});

function loadData(section) {
    fetch('main.json')
    .then(response => response.json())
    .then(data => {
        switch (section) {
            case 'publications':
                displayPublications(data[section]);
                break;
            case 'contact':
                displayContact(data[section]);
                break;
            case 'education':
                displayEducation(data[section]);
                break;
            case 'experience':
                displayExperience(data[section]);
                break;
            case 'certifications':
                displayCertifications(data[section]);
                break;
            default:
                displayData(data[section]);
        }
    })
    .catch(error => console.error('Error loading the data: ', error));
}

// function displayData(data) {
//     const mainContainer = document.getElementById('main');
//     mainContainer.innerHTML = ''; // Clear existing content
//     data.forEach(item => {
//         const section = document.createElement('section');
//         section.className = 'profile';
//         section.innerHTML = `
//             <img src="${item.image}" alt="${item.title}" height="200" width="200">
//             <div>
//                 <h1>${item.title || ''}</h1>
//                 <p>${item.subtitle || ''}</p>
//                 <p>${item.content || ''}</p>
//             </div>
//         `;
//         mainContainer.appendChild(section);
//     });
// }

function displayData(data) {
    const mainContainer = document.getElementById('main');
    const skillSection = document.querySelector('.container.skills-section');
    mainContainer.innerHTML = ''; // Clear existing content
    skillSection.innerHTML = '';

    const item = data[0]; // Assuming there's only one main entry

    // Create profile section
    const profileSection = document.createElement('section');
    profileSection.className = 'profile';
    profileSection.innerHTML = `
        <img src="${item.image}" alt="${item.title}" height="200" width="200">
        <div>
            <h1>${item.title || ''}</h1>
            <p>${item.subtitle || ''}</p>
            <p>${item.content || ''}</p>
        </div>
    `;
    mainContainer.appendChild(profileSection);

    // skills section
    // const skillsSection = document.createElement('section');
    // skillsSection.className = 'container skills-section';
    
    const skillsTitle = document.createElement('h2');
    skillsTitle.textContent = 'Skills';
    skillSection.appendChild(skillsTitle);

    const skillsContainer = document.createElement('div');
    skillsContainer.className = 'skills-container';

    for (const [category, skills] of Object.entries(item.skills)) {
        const skillCategoryDiv = document.createElement('div');
        skillCategoryDiv.className = 'skill-category';
        
        const skillCategoryTitle = document.createElement('h3');
        skillCategoryTitle.textContent = category;
        skillCategoryDiv.appendChild(skillCategoryTitle);

        const skillList = document.createElement('ul');
        for (const skill of skills) {
            const skillListItem = document.createElement('li');
            skillListItem.textContent = skill;
            skillList.appendChild(skillListItem);
        }
        skillCategoryDiv.appendChild(skillList);
        skillsContainer.appendChild(skillCategoryDiv);
    }
    skillSection.appendChild(skillsContainer);

    // mainContainer.appendChild(skillsSection);
}


// function displayPublications(data) {
//     const mainContainer = document.getElementById('main');
//     mainContainer.innerHTML = ''; // Clear existing content
//     data.forEach(pub => {
//         const publication = document.createElement('div');
//         publication.className = 'publication';
//         publication.innerHTML = `
//             <h2>${pub.title}</h2>
//             <p><strong>Authors:</strong> ${pub.authors}</p>
//             <p><strong>Journal:</strong> ${pub.journal}, Volume ${pub.volume}, ${pub.year}</p>
//             <p><strong>Pages:</strong> ${pub.pages}</p>
//         `;
//         mainContainer.appendChild(publication);
//     });
// }

function displayPublications(data) {
    const mainContainer = document.getElementById('main');
    const skillSection = document.querySelector('.container.skills-section');
    mainContainer.innerHTML = ''; // Clear existing content
    skillSection.innerHTML = '';
    const publicationsList = document.createElement('ul');
    publicationsList.className = 'publications-list';

    data.forEach(pub => {
        const listItem = document.createElement('li');
        listItem.className = 'publication';

        // Use a template literal to build the HTML string for each publication
        listItem.innerHTML = `
            <h3>${pub.title}</h3>
            <p>${pub.authors}</p>
            <p><em>${pub.journal}, Volume ${pub.volume}, ${pub.year}</em></p>
            <p>Pages: ${pub.pages}</p>
        `;

        // Append each listItem to the publicationsList
        publicationsList.appendChild(listItem);
    });

    // Append the complete publicationsList to the mainContainer
    mainContainer.appendChild(publicationsList);
}

function displayContact(data) {
    const mainContainer = document.getElementById('main');
    const skillSection = document.querySelector('.container.skills-section');
    mainContainer.innerHTML = ''; // Clear existing content
    skillSection.innerHTML = '';

    const contactSection = document.createElement('section');
    contactSection.className = 'contact-info';

    data.forEach(contact => {
        const contactItem = document.createElement('p');
        contactItem.className = 'contact-method';
        
        // Check if the contact method is an email to create a mailto link
        if (contact.method.toLowerCase() === 'email') {
            contactItem.innerHTML = `<strong>${contact.method}:</strong> <a href="mailto:${contact.address}">${contact.address}</a>`;
        } else if (contact.method.toLowerCase() === 'linkedin' || contact.method.toLowerCase() === 'github') {
            // Assuming the contact.url is the full URL for LinkedIn and GitHub profiles
            contactItem.innerHTML = `<strong>${contact.method}:</strong> <a href="${contact.url}" target="_blank">${contact.address || contact.url}</a>`;
        } else {
            contactItem.textContent = `${contact.method}: ${contact.address || ''}`;
        }
        contactSection.appendChild(contactItem);
    });

    mainContainer.appendChild(contactSection);
}

function displayEducation(data) {
    const mainContainer = document.getElementById('main');
    const skillSection = document.querySelector('.container.skills-section');
    mainContainer.innerHTML = ''; // Clear existing content
    skillSection.innerHTML = '';

    const educationContainer = document.createElement('div');
    educationContainer.className = 'education-section';

    data.forEach(edu => {
        const educationItem = document.createElement('div');
        educationItem.className = 'card mb-3'; // Bootstrap card class
        educationItem.innerHTML = `
            <div class="row g-0">
                <div class="col-md-4 p-3">
                    <img src="${edu.image || 'path/to/default-image.png'}" class="img-fluid rounded-start" alt="${edu.degree}" height="100" width="200">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${edu.degree}</h5>
                        <p class="card-text">${edu.place}</p>
                        <p class="card-text"><small class="text-muted">${edu.dates}</small></p>
                    </div>
                </div>
            </div>
        `;
        educationContainer.appendChild(educationItem);
    });

    mainContainer.appendChild(educationContainer);
}
  
function displayExperience(data) {
    const mainContainer = document.getElementById('main');
    const skillSection = document.querySelector('.container.skills-section');
    mainContainer.innerHTML = ''; // Clear existing content
    skillSection.innerHTML = '';

    const experienceContainer = document.createElement('div');
    experienceContainer.className = 'experience-section';

    data.forEach(exp => {
        const experienceItem = document.createElement('div');
        experienceItem.className = 'card mb-3'; // Bootstrap card class
        let detailsHtml = exp.details ? exp.details.map(detail => `<li>${detail}</li>`).join('') : '';
        experienceItem.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${exp.role}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${exp.place}</h6>
                <p class="card-text"><small>${exp.dates}</small></p>
                <ul>${detailsHtml}</ul>
            </div>
        `;
        experienceContainer.appendChild(experienceItem);
    });

    mainContainer.appendChild(experienceContainer);
}

function displayCertifications(data) {
    const mainContainer = document.getElementById('main');
    const skillSection = document.querySelector('.container.skills-section');
    mainContainer.innerHTML = ''; // Clear existing content
    skillSection.innerHTML = '';

    const certificationsContainer = document.createElement('div');
    certificationsContainer.className = 'certifications-section';

    data.forEach(cert => {
        const certificationItem = document.createElement('div');
        certificationItem.className = 'card mb-3'; // Bootstrap card class
        certificationItem.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${cert.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${cert.provider}</h6>
                <p class="card-text"><small>${cert.year}</small></p>
                <a href="${cert.url}" class="card-link">Course Link</a>
            </div>
        `;
        certificationsContainer.appendChild(certificationItem);
    });

    mainContainer.appendChild(certificationsContainer);
}
