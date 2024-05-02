document.addEventListener('DOMContentLoaded', function () {
    var supprimerContactsBtn = document.getElementById('supprimer-contacts-btn');
    var contactsList = document.querySelector('.list-contact');
    var noContactDiv = document.querySelector('.no-contact');
    
    // Suppression des contacts
    supprimerContactsBtn.addEventListener('click', function () {
        localStorage.removeItem('contacts');

        contactsList.style.display = 'none';
        noContactDiv.style.display = 'block';
        
    });

});
