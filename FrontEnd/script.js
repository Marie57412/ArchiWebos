
function array (data){
  for(i = 0; i < data.length; i++)
  {
    const gallery = document.querySelector(".gallery");
    const figure = document.createElement("figure");
    const picture = document.createElement("img");
    picture.src = data[i].imageUrl;
    const name = document.createElement("h2");
    name.innerText = data[i].title;

    gallery.appendChild(figure)
    figure.appendChild(picture)
    figure.appendChild(name)
  }
}

fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {                                               //recup donné api
    array(data);
    console.log(data[0]);
  })
  .catch(error => {
    console.error('Une erreur s\'est produite :', error);
  });


  function filters(category) {
    for(i = 0; i < category.length; i++){
    const filterContainer = document.querySelector(".filters-btn");
    
  
  
    // Créer les boutons de filtre pour chaque catégorie
    category.forEach(category => {
      const button = document.createElement("button");
      button.innerText = category;
  
      // Ajouter un événement de clic pour appliquer le filtre
      button.addEventListener("click", () => {
        const filteredData = category.filters(item => item.category === category);
        array(filteredData);
      });
  
         filterContainer.appendChild(button);
     });
  }}
  
  fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(category => {
      filters(category);
      console.log(category[i]);
    })
    .catch(error => {
      console.error('Une erreur s\'est produite', error);
    });