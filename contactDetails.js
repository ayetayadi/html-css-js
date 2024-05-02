function displayContactDetails(contact) {
    var detailsBox = document.querySelector('.contact-details');
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

    // editer avec le bouton "Editer le contact"
    var editContactBtn = document.getElementById('edit-contact-btn');
    editContactBtn.addEventListener('click', function () {
        editContact(contact);
    });
}

function editContact(contact) {
    // Afficher le formulaire de contact
    var formulaireContact = document.getElementById('formulaire-contact');
    var detailsBox = document.querySelector('.contact-details');

    formulaireContact.style.display = 'block';
    detailsBox.style.display = 'none';

    // Remplir le formulaire avec les données du contact
    document.getElementById('civilite').value = contact.civilite;
    document.getElementById('prenom').value = contact.prenom;
    document.getElementById('nom').value = contact.nom;
    document.getElementById('telephone').value = contact.telephone;

    // Ajouter un attribut pour suivre l'id du contact en cours de modification
    formulaireContact.setAttribute('data-contact-id', contact.id);
}