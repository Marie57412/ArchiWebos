document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login_form').addEventListener('submit', async function(event) {
      event.preventDefault(); // Empêche l'envoi du formulaire
  
      let email = document.getElementById('email').value;
      let password = document.getElementById('password').value;
  
      // Effectuer la requête vers l'API pour vérifier les informations d'identification
      try {
        const response = await fetch('http://localhost:5678/api/users/login', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        });
  
        if (response.ok) {
          const data = await response.json();
          const token = data.token;
  
          // Stockage du token dans le sessionStorage
          sessionStorage.setItem('token', token);
  
          // Redirection vers la page d'accueil
          window.location.href = 'index.html';
        } else {
          // Affichage du message d'erreur
          document.getElementById('error-message').textContent = 'Informations utilisateur/mot de passe incorrectes. Veuillez réessayer.';
          document.getElementById('error-message').style.display = 'block';
        }
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la requête vers l\'API:', error);
      }
    });
  });

