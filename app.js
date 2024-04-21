document.addEventListener('DOMContentLoaded', function() {
    var contacts = localStorage.getItem('contacts');
    var contactsList = document.querySelector('.list-contact');
    var noContactDiv = document.querySelector('.no-contact');

    
    //Vérifier s'il y'a des contacts 
    if (contacts) {
        contacts = JSON.parse(contacts);
        if (contacts.length > 0) {
            displayContacts(contacts);
            contactsList.style.display = 'block';
            noContactDiv.style.display = 'none';
        } else {
            contactsList.style.display = 'none';
            noContactDiv.style.display = 'block';
        }
    } else {
        contactsList.style.display = 'none';
        noContactDiv.style.display = 'block';
    }
});

function displayContacts(contacts) {
    var contactsList = document.querySelector('.list-contact');
    contactsList.innerHTML = ''; 

    contacts.forEach(function(contact) {
        var contactItem = document.createElement('div');
        contactItem.classList.add('contact-item');

        // Création de l'élément d'icône et ajout de classe et de contenu
        var icon = document.createElement('img');
        icon.classList.add('contact-icon');
        icon.src = 'C:/Users/ayeta/Downloads/icons8-utilisateur-24 (1).png';
        icon.alt = 'Icon';
        contactItem.appendChild(icon);

        // Ajout du nom et du prénom
        var nameElement = document.createElement('p');
        nameElement.textContent = contact.name + ' ' + contact.surname;
        contactItem.appendChild(nameElement);

        contactsList.appendChild(contactItem);
    });
}


// Créez un tableau de contacts factices
var contacts = [
    { name: 'John', surname: 'Doe', phone: '123456789' },
    { name: 'Jane', surname: 'Smith', phone: '987654321' }
];

// Convertissez le tableau en chaîne JSON et enregistrez-le dans le localStorage sous la clé 'contacts'
localStorage.setItem('contacts', JSON.stringify(contacts));


