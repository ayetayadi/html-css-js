//ajouterContact.js

document.addEventListener('DOMContentLoaded', function () {
    var ajouterContactBtn = document.getElementById('ajouter-contact-btn');
    var formulaireContact = document.getElementById('formulaire-contact');
    var enregistrerBtn = document.getElementById('enregistrer-btn');
    var effacerBtn = document.getElementById('effacer-btn');

    ajouterContactBtn.addEventListener('click', function () {
        formulaireContact.style.display = 'block';

        var contactsElement = document.querySelector('.contacts');
        var initialContactsHeight = contactsElement.offsetHeight;
        contactsElement.style.height = initialContactsHeight + '%';

    });

    // Ajouter le nouveau contact avec le bouton enregistrer
    enregistrerBtn.addEventListener('click', function () {
        var civilite = document.getElementById('civilite').value;
        var prenom = document.getElementById('prenom').value;
        var nom = document.getElementById('nom').value;
        var telephone = document.getElementById('telephone').value;

        if (civilite === '' || prenom === '' || nom === '' || telephone === '') {
            alert('Veuillez remplir tous les champs.');
            return;
        }

        var contactId = formulaireContact.getAttribute('data-contact-id');

        var contacts = localStorage.getItem('contacts') ? JSON.parse(localStorage.getItem('contacts')) : [];

        var contactExiste = contacts.some(function (contact) {
            return contact.prenom.toUpperCase() === prenom.toUpperCase() && contact.nom.toUpperCase() === nom.toUpperCase();
        });

        if (contactExiste) {
            alert("Ce contact existe déjà.");
            return;
        }

        // Si un id de contact existe, mise à jour des données du contact existant
        if (contactId) {
            contacts.forEach(function (contact) {
                if (contact.id === parseInt(contactId)) {
                    contact.civilite = civilite;
                    contact.prenom = prenom;
                    contact.nom = nom;
                    contact.telephone = telephone;
                }
            });
        } else {
            // Sinon, ajout d'un nouveau contact avec un nouvel identifiant généré
            var maxId = contacts.reduce((max, contact) => Math.max(max, contact.id), 0);
            var id = maxId + 1;

            var nouveauContact = {
                id: id,
                civilite: civilite,
                prenom: prenom,
                nom: nom,
                telephone: telephone
            };

            contacts.push(nouveauContact);
        }

        localStorage.setItem('contacts', JSON.stringify(contacts));

        displayContacts(contacts);

        formulaireContact.style.display = 'none';
    });

    // Effacer un contact
    effacerBtn.addEventListener('click', function () {
        // Reinitialiser des champs du formulaire
        document.getElementById('civilite').value = 'Madame';
        document.getElementById('prenom').value = '';
        document.getElementById('nom').value = '';
        document.getElementById('telephone').value = '';

        // Affichage des contacts existants
        var storedContacts = localStorage.getItem('contacts');
        if (storedContacts) {
            var contacts = JSON.parse(storedContacts);
            displayContacts(contacts);
        }
    });

});
