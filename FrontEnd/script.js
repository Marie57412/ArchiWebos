let worksData, categoriesData;

/* recupération des données par l'api */

async function init() {
  /* Récupération des données de l'API */
  const responseWorks = await fetch("http://localhost:5678/api/works");
  const works = await responseWorks.json();
  worksData = works;
  picture(worksData);
  const responseCategories = await fetch(
    "http://localhost:5678/api/categories"
  );
  const categories = await responseCategories.json();
  categoriesData = categories;
  filters(categoriesData);
}

init();

async function loadWorks() {
  /* Récupération des données de l'API */
  const responseWorks = fetch("http://localhost:5678/api/works");
  responseWorks
    .then((reponse) => {
      return reponse.json();
    })
    .then((json) => {
      worksData = json;
      picture(worksData);
    });
}
/* fonction qui permet affiche la gallery */
function picture(data) {
  for (i = 0; i < data.length; i++) {
    const gallery = document.querySelector(".gallery");

    const figure = document.createElement("figure");

    const imageElement = document.createElement("img");
    imageElement.src = data[i].imageUrl;

    const nomElement = document.createElement("p");
    nomElement.innerText = data[i].title;

    gallery.appendChild(figure);
    figure.appendChild(imageElement);
    figure.appendChild(nomElement);
  }
}

function filters(category) {
  category.unshift({id: 0, name: "Tous" });

  for (i = 0; i < category.length; i++) {
    const filterbtn = document.querySelector(".filters-btn");
    const filter = document.createElement("button");
    filter.innerText = category[i].name;

    filterbtn.appendChild(filter);
  }

  const filterBtnEvent = document.querySelectorAll(".filters-btn button");

  filterBtnEvent.forEach((button) => {
    button.addEventListener("click", function () {
      // Efface le contenu de la galerie
      document.querySelector(".gallery").innerHTML = "";

      // Filtrage des projets en fonction de la catégorie sélectionnée
      let filteredData = worksData.filter((item) => {
        return (
          item.category.name === button.textContent ||
          button.textContent === "Tous"
        );
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

  // Cibler les filtres
  const filtersContainer = document.querySelector(".filters-btn");

  // Cibler la bannière
  const banner = document.querySelector(".banner");

  if (token) {
    // Connecté
    console.log("Connecté");

    // Appeler les fonctions ou effectuer les actions appropriées pour l'utilisateur connecté

    logoutBtn.style.display = "block";
    loginBtn.style.display = "none";

    modifBtns.forEach((btn) => {
      btn.innerHTML = "modifier";
    });

    iconModifs.forEach((icon) => {
      icon.className = "fa-regular fa-pen-to-square";
    });

    logoutBtn.addEventListener("click", function () {
      // Retirer le token du sessionStorage
      sessionStorage.removeItem("token");
      console.log("Déconnexion réussie");
    });

    // Afficher les boutons "modifier"
    modifContainers.forEach((container) => {
      container.style.display = "flex";
    });

    // Masquer les filtres
    filtersContainer.style.display = "none";

    // Afficher la bannière
    banner.style.display = "flex";
  } else {
    // Non connecté
    console.log("Non connecté");

    logoutBtn.style.display = "none";
    loginBtn.style.display = "block";

    modifBtns.forEach((btn) => {
      btn.innerHTML = "";
    });

    iconModifs.forEach((icon) => {
      icon.className = "fa-regular fa-pen-to-square";
    });

    // Masquer les boutons "modifier"
    modifContainers.forEach((container) => {
      container.style.display = "none";
    });

    // Afficher les filtres
    filtersContainer.style.display = "block";

    // Masquer la bannière
    banner.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  checkConnection();
});

///////////////////////////////////modale//////////////////////////

const modal = document.getElementById("modal1");
const modifBtnModal = document.querySelector(".modifmodal");

function openModal() {
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

modifBtnModal.addEventListener("click", function () {
  openModal();
  pictureInModal(worksData);
});

document.addEventListener("click", function (event) {
  if (!modal.contains(event.target) && event.target !== modifBtnModal) {
    closeModal();
  }
});

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

//galerie modal
function pictureInModal(data) {
  const modalWrapper = document.querySelector(".modal-wrapper");
  modalWrapper.innerHTML = "";

  // Ajout croix
  const xmarkIcon = document.createElement("i");
  xmarkIcon.classList.add("fas", "fa-times");
  xmarkIcon.addEventListener("click", function () {
    closeModal();
  });

  modalWrapper.appendChild(xmarkIcon);

  // Ajout du titre de la galerie
  const galleryTitle = document.createElement("h2");
  galleryTitle.innerText = "Galerie Photo";
  galleryTitle.classList.add("modal-title");
  modalWrapper.appendChild(galleryTitle);

  const gallery = document.createElement("div");
  gallery.classList.add("modal-gallery");

  for (let i = 0; i < data.length; i++) {
    const figure = document.createElement("figure");

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");

    const imageElement = document.createElement("img");
    imageElement.src = data[i].imageUrl;
    imageElement.classList.add("modal-image");

    const iconsContainer = document.createElement("div");
    iconsContainer.classList.add("icons-container");

    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-regular", "fa-trash-can");
    trashIcon.addEventListener("click", (event) => {
      event.stopPropagation(); // Empêcher la propagation de l'événement de clic
      deletePhoto(i);
    });

    const arrowsIcon = document.createElement("i");
    arrowsIcon.classList.add("fa-solid", "fa-arrows-up-down-left-right");

    iconsContainer.appendChild(trashIcon);
    iconsContainer.appendChild(arrowsIcon);

    imageContainer.appendChild(imageElement);
    imageContainer.appendChild(iconsContainer);
    figure.appendChild(imageContainer);

    const textElement = document.createElement("p");
    textElement.innerText = "éditer";

    figure.appendChild(textElement);
    gallery.appendChild(figure);
  }

  modalWrapper.appendChild(gallery);

  // Ajout de l'élément hr
  const hrElement = document.createElement("hr");
  modalWrapper.appendChild(hrElement);

  // Ajout du conteneur du bouton
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  // Ajout du bouton "Ajouter une photo"
  const addButton = document.createElement("button");
  addButton.innerText = "Ajouter une photo";
  addButton.classList.add("add-photo-button");

  addButton.addEventListener("click", function () {
    // Masquer la première fenêtre (modalWrapper)
    modalWrapper.style.display = "none";

    // Créer la deuxième fenêtre
    const window2 = document.createElement("div");
    window2.classList.add("window2", "modal");

    const leftArrow = document.createElement("i");
    leftArrow.classList.add("fa", "fa-arrow-left");
    leftArrow.addEventListener("click", function () {
      modalWrapper.style.display = "flex";
      const window2 = document.querySelector(".window2"); //retour fenêtre 1
      window2.style.display = "none";
    });

    const cross = document.createElement("i");
    cross.classList.add("fa", "fa-times");
    cross.addEventListener("click", function () {
      closeModal();
    });

    const titleWindow = document.createElement("h2");
    titleWindow.innerText = "Ajout photo";
    titleWindow.classList.add("title-window");

    const addPicture = document.createElement("div");
    addPicture.classList.add("addphoto");

    const addImage = document.createElement("i");
    addImage.classList.add("fa", "fa-image");

    const addImgButton = document.createElement("button");
    addImgButton.innerText = "+ Ajouter photo";
    addImgButton.classList.add("addImgButton");
    inputFileBtn = document.createElement("input");
    inputFileBtn.type = "file";
    inputFileBtn.accept = ".jpg, .png";
    inputFileBtn.classList.add("inputFileBtn");

    const previewImage = document.createElement("img");
    previewImage.classList.add("previewImage");
    inputFileBtn.addEventListener("change", () => {
      const [file] = inputFileBtn.files;
      if (file) {
        previewImage.src = URL.createObjectURL(file);
        addImgButton.classList.add("hideBtn");
      } // Déclenche l'ouverture de la boîte de dialogue de sélection de fichier
    });

    //
    inputFileBtn.addEventListener("change", function (event) {
      const file = event.target.files[0];

      console.log(file);
    });

    const textFormat = document.createElement("p");
    textFormat.innerText = "jpg, png : 4mo max";
    textFormat.classList.add("text-format");

    //formulaire

    const formContenair = document.createElement("div");
    formContenair.classList.add("form-contenair");

    const labelElement = document.createElement("label");
    labelElement.setAttribute("for", "title");
    labelElement.classList.add("label");
    labelElement.innerText = "Titre";

    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "text");
    inputElement.classList.add("labelModal");
    inputElement.setAttribute("id", "title");
    inputElement.setAttribute("name", "title");

    const labelCategory = document.createElement("label");
    labelCategory.setAttribute("for", "category");
    labelCategory.classList.add("label");
    labelCategory.innerText = "Catégorie";

    const hrWindow2 = document.createElement("hr");

    //element select
    const selectCategory = document.createElement("select");
    selectCategory.classList.add("labelModal");
    selectCategory.setAttribute("id", "category");
    selectCategory.setAttribute("name", "category");

    // Parcourir les données de catégories et créer des options
    categoriesData.forEach((category) => {
      // Créer une option pour chaque catégorie
      const option = document.createElement("option");
      option.value = category.id;
      option.text = category.name;

      // Ajoute l'option à la liste déroulante
      selectCategory.appendChild(option);
      formContenair.appendChild(labelCategory);
      labelCategory.appendChild(selectCategory);
    });

    // Mettre à jour la première option avec "Choisissez une catégorie"
    const firstOption = selectCategory.options[0];
    if (firstOption.text === "Tous") {
      firstOption.text = "Choisissez une catégorie";
    }

    const btnCheck = document.createElement("button");
    btnCheck.classList.add("checkBtn");
    btnCheck.id = "btnCheck";
    btnCheck.addEventListener("click", (e) => {
      submitForm(inputFileBtn, inputElement, selectCategory);
      e.preventDefault();
    });

    
    
    inputElement.addEventListener("input", checkFormFields);
    selectCategory.addEventListener("change", checkFormFields);
    inputFileBtn.addEventListener("change", checkFormFields);
    
    
    function checkFormFields() {
      if (
        inputFileBtn.files.length > 0 &&
        inputElement.value !== "" &&
        selectCategory.value !== "0"
      ) {
        btnCheck.style.backgroundColor = "green";
      } else {
        btnCheck.style.backgroundColor = "";
      }
    }

    // Ajout des éléments à l'élément div

    modal.appendChild(window2);
    window2.appendChild(leftArrow);
    window2.appendChild(cross);
    window2.appendChild(titleWindow);
    window2.appendChild(addPicture);
    addPicture.appendChild(addImage);
    addPicture.appendChild(addImgButton);
    addPicture.appendChild(inputFileBtn);
    addPicture.appendChild(previewImage);
    addPicture.appendChild(textFormat);
    window2.appendChild(formContenair);
    formContenair.appendChild(labelElement);
    formContenair.appendChild(inputElement);
    formContenair.appendChild(labelCategory);
    window2.appendChild(hrWindow2);
    window2.appendChild(btnCheck);
    btnCheck.appendChild(checkText);
  });

  // Ajout Supprimer la galerie
  const deleteGalleryElement = document.createElement("p");
  deleteGalleryElement.innerText = "Supprimer la galerie";
  deleteGalleryElement.classList.add("delete-gallery");
  deleteGalleryElement.addEventListener("click", deleteGallery);

  modalWrapper.appendChild(buttonContainer);
  buttonContainer.appendChild(addButton);
  buttonContainer.appendChild(deleteGalleryElement);

  async function deletePhoto(index) {
    const deletedItem = data[index];

    // Supprimer la photo du tableau de données
    data.splice(index, 1);

    // Mettre à jour l'affichage de la galerie dans la modal
    pictureInModal(data);

    // Mettre à jour l'affichage de la galerie en dehors de la modal
    const gallery = document.querySelector(".gallery");
    const galleryItems = gallery.querySelectorAll("figure");

    // Trouver l'élément correspondant à la photo supprimée et le supprimer de la galerie en dehors de la modal
    for (let i = 0; i < galleryItems.length; i++) {
      const item = galleryItems[i];
      const imageElement = item.querySelector("img");
      if (imageElement.src === deletedItem.imageUrl) {
        gallery.removeChild(item);
        break;
      }
    }

    // Supprimer la photo via l'API
    const token = sessionStorage.getItem("token");
    const response = await fetch(
      `http://localhost:5678/api/works/${deletedItem.id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      console.log("Photo supprimée avec succès");
    } else {
      console.log("Erreur lors de la suppression de la photo côté serveur");
    }
  }

  function deleteGallery() {
    // Vide le tableau de données
    data = [];

    // Mettre à jour l'affichage de la galerie dans la modal
    pictureInModal(data);

    // Mettre à jour l'affichage de la galerie en dehors de la modal
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";

    // Ajoute le message "Supprimer la galerie" dans la modal
    const deleteGalleryElement = document.createElement("p");
    deleteGalleryElement.innerText = "Supprimer la galerie";
    deleteGalleryElement.classList.add("delete-gallery");
    deleteGalleryElement.addEventListener("click", deleteGallery);

    modalWrapper.appendChild(deleteGalleryElement);
  }
}

//envoi du formulaire

const checkText = document.createElement("p");
checkText.classList.add("checkcolor");
checkText.innerText = "Valider";

// ...

// Fonction pour envoyer le formulaire
async function submitForm(inputFileBtn, inputElement, selectCategory) {
  const formData = new FormData();
  const newWorkImg = inputFileBtn.files[0];
  const newWorkTitle = inputElement.value;
  const newWorkCategory = selectCategory.value;
  token = sessionStorage.getItem("token");

  if (!newWorkImg || !newWorkTitle || newWorkCategory === "0") {
    alert("Veuillez remplir tous les champs du formulaire.");
    return;
  }

  formData.append("image", newWorkImg);
  formData.append("title", newWorkTitle);
  formData.append("category", newWorkCategory);

  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if (response.ok) {
    worksData = await loadWorks();
  }
}
