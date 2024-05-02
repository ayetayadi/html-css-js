// app.js

document.addEventListener('DOMContentLoaded', function () {
    

    // Inclure les différents fichiers JavaScript
    var scripts = [
        'afficherContacts.js',
        'ajouterContact.js',
        'afficherDetails.js',
        'modifierContact.js',
        'supprimerContacts.js'
    ];

    scripts.forEach(function (script) {
        var scriptElement = document.createElement('script');
        scriptElement.src = script;
        document.body.appendChild(scriptElement);
    });
    
});
