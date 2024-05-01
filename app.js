document.addEventListener('DOMContentLoaded', function () {
    var contacts = localStorage.getItem('contacts');
    var contactsList = document.querySelector('.list-contact');
    var noContactDiv = document.querySelector('.no-contact');
    var ajouterContactBtn = document.getElementById('ajouter-contact-btn');
    var formulaireContact = document.getElementById('formulaire-contact');
    var enregistrerBtn = document.getElementById('enregistrer-btn');
    var effacerBtn = document.getElementById('effacer-btn');
    var supprimerContactsBtn = document.getElementById('supprimer-contacts-btn');

    // Ajouter un contact
    ajouterContactBtn.addEventListener('click', function () {
        formulaireContact.style.display = 'block';
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

        var contactExists = contacts.some(function (contact) {
            return contact.prenom.toUpperCase() === prenom.toUpperCase() && contact.nom.toUpperCase() === nom.toUpperCase();
        });

        if (contactExists) {
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

    // Vérification de l'existence de contacts et affichage de la liste des contacts en conséquence
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

    // Suppression des contacts
    supprimerContactsBtn.addEventListener('click', function () {
        localStorage.removeItem('contacts');

        contactsList.style.display = 'none';
        noContactDiv.style.display = 'block';
    });

    // Fonction pour afficher les contacts
    function displayContacts(contacts) {
        // Tri des contacts par ordre alphabétique du nom, puis du prénom
        contacts.sort(function (a, b) {

            var nom1 = a.nom.toUpperCase();
            var nom2 = b.nom.toUpperCase();
            if (nom1 < nom2) {
                return -1;
            }
            if (nom1 > nom2) {
                return 1;
            }
            // Si les noms de famille sont égaux, comparaison par prénom
            var prenom1 = a.prenom.toUpperCase();
            var prenom2 = b.prenom.toUpperCase();
            if (prenom1 < prenom2) {
                return -1;
            }
            if (prenom1 > prenom2) {
                return 1;
            }
            return 0;
        });

        contactsList.innerHTML = '';

        contacts.forEach(function (contact) {
            var contactItem = document.createElement('div');
            contactItem.classList.add('contact-item');

            var icon = document.createElement('img');
            icon.classList.add('contact-icon');
            icon.src = 'C:/Users/ayeta/Downloads/icons8-utilisateur-24 (1).png';
            icon.alt = 'Icon';
            contactItem.appendChild(icon);

            var nameElement = document.createElement('p');
            nameElement.textContent = contact.prenom + ' ' + contact.nom;
            contactItem.appendChild(nameElement);

            // Affichage les détails du contact
            contactItem.addEventListener('click', function () {
                var allContactItems = document.querySelectorAll('.contact-item');
                allContactItems.forEach(function (item) {
                    item.classList.remove('selected');
                });

                formulaireContact.style.display = 'none';

                contactItem.classList.add('selected');

                // Affichage de details du contact
                var detailsBox = document.querySelector('.contact-details');
                detailsBox.innerHTML = `
                    <h2>Détail du Contact</h2>
                    <p>${contact.civilite} ${contact.prenom} ${contact.nom}</p>
                    <p>Tel: ${contact.telephone}</p>
                    <button id="edit-contact-btn" data-contact-id="${contact.id}"><span>Editer le contact</span></button>
                `;

                // Affichage de la boîte des détails du contact
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
                });
            });

            // Ajout de l'élément de contact à la liste des contacts
            contactsList.appendChild(contactItem);
        });

        //  Si on clique dehors
        document.addEventListener('click', function (event) {
            var detailsBox = document.querySelector('.contact-details');
            if (!detailsBox.contains(event.target) && !contactsList.contains(event.target)) {
                detailsBox.style.display = 'none';
                var allContactItems = document.querySelectorAll('.contact-item');
                allContactItems.forEach(function (item) {
                    item.classList.remove('selected');
                });
            }
        });
    }

    // Fonction pour ajuster la taille de l'élément .contacts
    function tailleContacts() {
        var contactsElement = document.querySelector('.contacts');
        var formulaireContact = document.getElementById('formulaire-contact');
        var initialContactsHeight = contactsElement.offsetHeight;
        var contactDetailsElement = document.querySelector('.contact-details');
        if (formulaireContact.style.display === 'block' || contactDetailsElement.style.display === 'block') {
            contactsElement.style.height = initialContactsHeight + 'px';
        } else {
            contactsElement.style.height = initialContactsHeight + 'px';
        }
    }
    tailleContacts();
});
