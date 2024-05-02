document.addEventListener('DOMContentLoaded', function () {
    var scripts = [
        'afficherContacts.js',
        'ajouterContact.js',
        'contactDetails.js',
        'supprimerContacts.js'
    ];

    scripts.forEach(function (script) {
        var scriptElement = document.createElement('script');
        scriptElement.src = script;
        document.body.appendChild(scriptElement);
    });
    
});
