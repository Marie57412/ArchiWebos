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


//modale 
const modal = document.getElementById('modal1');
const modifBtnModal = document.querySelector('.modifmodal');

function openModal() {
  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
}

modifBtnModal.addEventListener('click', function() {
  openModal();
  pictureInModal(worksData);
});

document.addEventListener('click', function(event) {
  if (!modal.contains(event.target) && event.target !== modifBtnModal) {
    closeModal();
  }
});

modal.addEventListener('click', function(event) {
  if (event.target === modal) {
    closeModal();
  }
});
//galerie modal

function pictureInModal(data) {
  const modalWrapper = document.querySelector('.modal-wrapper');
  modalWrapper.innerHTML = '';

  // Ajout croix
  const xmarkIcon = document.createElement('i');
  xmarkIcon.classList.add('fas', 'fa-times');
  xmarkIcon.addEventListener('click', function () {
    closeModal();
  });

  modalWrapper.appendChild(xmarkIcon);

  // Ajout du titre de la galerie
  const galleryTitle = document.createElement('h2');
  galleryTitle.innerText = 'Galerie Photo';
  galleryTitle.classList.add('modal-title');
  modalWrapper.appendChild(galleryTitle);

  const gallery = document.createElement('div');
  gallery.classList.add('modal-gallery');

  for (let i = 0; i < data.length; i++) {
    const figure = document.createElement('figure');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    const imageElement = document.createElement('img');
    imageElement.src = data[i].imageUrl;
    imageElement.classList.add('modal-image');

    const iconsContainer = document.createElement('div');
    iconsContainer.classList.add('icons-container');

    const trashIcon = document.createElement('i');
    trashIcon.classList.add('fa-regular', 'fa-trash-can');
    trashIcon.addEventListener('click', (event) => {
      event.stopPropagation(); // Empêcher la propagation de l'événement de clic
      deletePhoto(i);
    });

    const arrowsIcon = document.createElement('i');
    arrowsIcon.classList.add('fa-solid', 'fa-arrows-up-down-left-right');

    iconsContainer.appendChild(trashIcon);
    iconsContainer.appendChild(arrowsIcon);

    imageContainer.appendChild(imageElement);
    imageContainer.appendChild(iconsContainer);
    figure.appendChild(imageContainer);

    const textElement = document.createElement('p');
    textElement.innerText = 'éditer';

    figure.appendChild(textElement);
    gallery.appendChild(figure);
  }

  modalWrapper.appendChild(gallery);

  // Ajout de l'élément hr
  const hrElement = document.createElement('hr');
  modalWrapper.appendChild(hrElement);

  // Ajout du conteneur du bouton
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');

  // Ajout du bouton "Ajouter une photo"
  const addButton = document.createElement('button');
  addButton.innerText = 'Ajouter une photo';
  addButton.classList.add('add-photo-button');

  // Ajout Supprimer la galerie
  const deleteGalleryElement = document.createElement('p');
  deleteGalleryElement.innerText = 'Supprimer la galerie';
  deleteGalleryElement.classList.add('delete-gallery');
  deleteGalleryElement.addEventListener('click', deleteGallery);

  modalWrapper.appendChild(buttonContainer);
  buttonContainer.appendChild(addButton);
  buttonContainer.appendChild(deleteGalleryElement);

  function deletePhoto(index) {
    // Supprimer la photo du tableau de données
    const deletedItem = data.splice(index, 1)[0];
  
    // Mettre à jour l'affichage de la galerie dans la modal
    pictureInModal(data);
  
    // Mettre à jour l'affichage de la galerie en dehors de la modal
    const gallery = document.querySelector('.gallery');
    const galleryItems = gallery.querySelectorAll('figure');
  
    // Trouver l'élément correspondant à la photo supprimée et le supprimer de la galerie en dehors de la modal
    for (let i = 0; i < galleryItems.length; i++) {
      const item = galleryItems[i];
      const imageElement = item.querySelector('img');
      if (imageElement.src === deletedItem.imageUrl) {
        gallery.removeChild(item);
        break;
      }
    }
  }

  function deleteGallery() {
    // Vider le tableau de données
    data = [];
  
    // Mettre à jour l'affichage de la galerie dans la modal
    pictureInModal(data);
  
    // Mettre à jour l'affichage de la galerie en dehors de la modal
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
  
    // Ajouter le message "Supprimer la galerie" dans la modal
    const deleteGalleryElement = document.createElement('p');
    deleteGalleryElement.innerText = 'Supprimer la galerie';
    deleteGalleryElement.classList.add('delete-gallery');
    deleteGalleryElement.addEventListener('click', deleteGallery);
  
    modalWrapper.appendChild(deleteGalleryElement);
  }}