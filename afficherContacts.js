document.addEventListener('DOMContentLoaded', function () {
    var contactsList = document.querySelector('.list-contact');
    var noContactDiv = document.querySelector('.no-contact');
    var formulaireContact = document.getElementById('formulaire-contact');
    var detailsBox = document.querySelector('.contact-details');

    // Afficher les contacts enregistrés
    var contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    if (contacts.length > 0) {
        displayContacts(contacts);
        contactsList.style.display = 'block';
        noContactDiv.style.display = 'none';
    } else {
        contactsList.style.display = 'none';
        noContactDiv.style.display = 'block';
    }

    // Fonction pour afficher les contacts
    function displayContacts(contacts) {
        // Trie des contacts par ordre alphabétique du nom, puis du prénom
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

            // Affichage des détails du contact
            contactItem.addEventListener('click', function () {
                var allContactItems = document.querySelectorAll('.contact-item');
                allContactItems.forEach(function (item) {
                    item.classList.remove('selected');
                });

                formulaireContact.style.display = 'none';

                contactItem.classList.add('selected');

                // Affichage des détails du contact depuis le fichier afficherDetails.js
                displayContactDetails(contact);
            });

            // Ajout de l'élément de contact à la liste des contacts
            contactsList.appendChild(contactItem);
        });


        // Cacher les détails du contact lorsqu'on clique en dehors
        document.addEventListener('click', function (event) {
            if (!detailsBox.contains(event.target) && !contactsList.contains(event.target)) {
                detailsBox.style.display = 'none';
                var allContactItems = document.querySelectorAll('.contact-item');
                allContactItems.forEach(function (item) {
                    item.classList.remove('selected');
                });
            }

        });

    }
});
