// afficherDetails.js
function displayContactDetails(contact) {

    var detailsBox = document.querySelector('.contact-details');
    var formulaireContact = document.getElementById('formulaire-contact');

    var contactsElement = document.querySelector('.contacts');
    var initialContactsHeight = contactsElement.offsetHeight;
    contactsElement.style.height = initialContactsHeight + '%';
    
    detailsBox.innerHTML = `
    <h2>Détail du Contact</h2>
    <p>${contact.civilite} ${contact.prenom} ${contact.nom}</p>
    <p>Tel: ${contact.telephone}</p>
    <button id="edit-contact-btn" data-contact-id="${contact.id}"><span>Editer le contact</span></button>
`;

    detailsBox.style.display = 'block';
    // Ajouter un gestionnaire d'événements pour le bouton "Editer le contact"
    var editContactBtn = document.getElementById('edit-contact-btn');
    editContactBtn.addEventListener('click', function () {
        // Afficher le formulaire de contact
        formulaireContact.style.display = 'block';
        detailsBox.style.display = 'none';

        // Pré-remplir le formulaire avec les données du contact sélectionné
        document.getElementById('civilite').value = contact.civilite;
        document.getElementById('prenom').value = contact.prenom;
        document.getElementById('nom').value = contact.nom;
        document.getElementById('telephone').value = contact.telephone;

        // Ajouter un attribut pour suivre l'id du contact en cours de modification
        formulaireContact.setAttribute('data-contact-id', contact.id);
    })
}

