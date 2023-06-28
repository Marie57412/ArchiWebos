let worksData, categoriesData;

/* recupération des données par l'api */
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    worksData = data;
    picture(data);
    console.log(data[0]);
    return fetch('http://localhost:5678/api/categories');
  })
  .then(response => response.json())
  .then(category => {
    categoriesData = category;
    filters(category);
    console.log(category[0]);
  })
  .catch(error => {
    console.error('Une erreur s\'est produite', error);
  });

/* fonction qui permet affiche la gallery */
function picture(data){
  for(i =0 ; i < data.length ; i++)
  {
    const gallery = document.querySelector('.gallery');

    const figure  = document.createElement("figure");

    const imageElement = document.createElement("img");
    imageElement.src = data[i].imageUrl;

    const nomElement = document.createElement("p");
    nomElement.innerText = data[i].title;

    gallery.appendChild(figure);
    figure.appendChild(imageElement);
    figure.appendChild(nomElement);
  }
}

function filters (category){
  category.unshift({ name: "Tous" });

  for(i = 0; i < category.length; i++)
  {
    const filterbtn = document.querySelector(".filters-btn");
    const filter = document.createElement("button");
    filter.innerText = category[i].name;

    filterbtn.appendChild(filter);
  }

  const filterBtnEvent = document.querySelectorAll(".filters-btn button");

  filterBtnEvent.forEach(button => {
    button.addEventListener("click", function() {
      // Efface le contenu de la galerie
      document.querySelector(".gallery").innerHTML = '';

      // Filtrage des projets en fonction de la catégorie sélectionnée
      let filteredData = worksData.filter((item) => {
        return item.category.name === button.textContent || button.textContent === "Tous";
      });

      console.log(filteredData);

      // Utilisation des projets filtrés pour afficher la galerie mise à jour
      picture(filteredData);
    });
  });
}
function checkConnection() {
  // Récupération du token depuis le sessionStorage
  const token = sessionStorage.getItem("token");

  // Cibler les éléments à modifier lors de la connexion
  const logoutBtn = document.querySelector(".logout_btn");
  const loginBtn = document.querySelector(".login_btn");
  const modifContainers = document.querySelectorAll(".modification");
  const modifBtns = document.querySelectorAll(".modif");
  const iconModifs = document.querySelectorAll(".fa-regular.fa-pen-to-square");
  
  // Cibler la bannière
  const banner = document.querySelector(".banner");

  if (token) {
    // Connecté
    console.log("Connecté");

    // Appeler les fonctions ou effectuer les actions appropriées pour l'utilisateur connecté

    logoutBtn.style.display = "block";
    loginBtn.style.display = "none";

    modifBtns.forEach(btn => {
      btn.innerHTML = "modifier";
    });

    iconModifs.forEach(icon => {
      icon.className = "fa-regular fa-pen-to-square";
    });

    logoutBtn.addEventListener("click", function() {
      // Retirer le token du sessionStorage
      sessionStorage.removeItem("token");
      console.log("Déconnexion réussie");
    });

    // Afficher les boutons "modifier"
    modifContainers.forEach(container => {
      container.style.display = "flex";
    });

    // Afficher la bannière
    banner.style.display = "flex";
  } else {
    // Non connecté
    console.log("Non connecté");

    logoutBtn.style.display = "none";
    loginBtn.style.display = "block";

    modifBtns.forEach(btn => {
      btn.innerHTML = "";
    });

    iconModifs.forEach(icon => {
      icon.className = "fa-regular fa-pen-to-square";
    });

    // Masquer les boutons "modifier"
    modifContainers.forEach(container => {
      container.style.display = "none";
    });

    // Masquer la bannière
    banner.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  checkConnection();
});