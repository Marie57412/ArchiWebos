fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {                                               //recup donné api gallery
    array(data);
    console.log(data[0]);
  })
  .catch(error => {
    console.error('Une erreur s\'est produite :', error);
  });
    
  fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(category => {                                            // recup donné category
      filters(category);
      console.log(category[i]);
    })
    .catch(error => {
      console.error('Une erreur s\'est produite', error);
    });

//generer la galérie 
function array (data){
  for(i = 0; i < data.length; i++)
  {
    const gallery = document.querySelector(".gallery");
    const figure = document.createElement("figure");
    const picture = document.createElement("img");
    picture.src = data[i].imageUrl;
    const name = document.createElement("p");
    name.innerText = data[i].title;

    gallery.appendChild(figure)
    figure.appendChild(picture)
    figure.appendChild(name)
  }
}

//générer les boutons filtres
function filters (category){

  category.unshift({ name: "Tous" });

  for(i = 0; i < category.length; i++)
  {
    const filterbtn = document.querySelector(".filters-btn")
    const filter = document.createElement("button");
    filter.innerText = category[i].name;
    
    filterbtn.appendChild(filter);
  }
  
}


