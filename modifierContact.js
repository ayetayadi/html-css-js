// modifierContact.js

document.addEventListener('DOMContentLoaded', function () {
    var formulaireContact = document.getElementById('formulaire-contact');

    // Ajouter un gestionnaire d'événements pour le bouton "Editer le contact"
    document.addEventListener('click', function (event) {
        var target = event.target;
        if (target && target.id === 'edit-contact-btn') {
            var contactId = target.getAttribute('data-contact-id');
            var contact = getContactById(contactId);
            if (contact) {
                // Afficher le formulaire de contact
                formulaireContact.style.display = 'block';
                var detailsBox = document.querySelector('.contact-details');
                detailsBox.style.display = 'none';

                // Pré-remplir le formulaire avec les données du contact sélectionné
                document.getElementById('civilite').value = contact.civilite;
                document.getElementById('prenom').value = contact.prenom;
                document.getElementById('nom').value = contact.nom;
                document.getElementById('telephone').value = contact.telephone;

                // Ajouter un attribut pour suivre l'id du contact en cours de modification
                formulaireContact.setAttribute('data-contact-id', contact.id);
            }
        }
    });

    function getContactById(contactId) {
        var contacts = localStorage.getItem('contacts') ? JSON.parse(localStorage.getItem('contacts')) : [];
        return contacts.find(function (contact) {
            return contact.id === parseInt(contactId);
        });
    }
});
