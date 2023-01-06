const btn_tous = document.getElementById("btn_tous");
const gallery = document.querySelector(".gallery");
let token = localStorage.getItem("token");

function deleteProject(id) {
  fetch("http://localhost:5678/api/works/" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())

    .catch((err) => console.log("il y a un problème" + err));
}

if (localStorage.getItem("id")) {
  let getId = JSON.parse(localStorage.getItem("id"));

  for (let id of getId) {
    deleteProject(id);
    tout();
    console.log("le ID ", id);
  }

  localStorage.removeItem("id");
}

function info(work) {
  const card = `
    <figure id ="A${work?.id}" >
    <img src="${work?.imageUrl} "crossOrigin="anonymous">
      <figcaption>${work?.title}</figcaption>
    </figure>
          `;
  document.querySelector(".gallery").insertAdjacentHTML("beforeend", card);
}

function tout() {
  fetch("http://localhost:5678/api/works").then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        console.log( data);
        document.querySelector(".gallery").innerHTML = "";

        for (let i = 0; i <= data.length - 1; i++) {
          info(data[i]);
        }
      });
    }
  });
}

btn_tous.addEventListener("click", tout);

function supprime() {
  // supprimer les données quand on ferme
  document.getElementById("model_ajout_container").style.display = null;
  document.getElementById("image_telecharger_images").style.display = "none";
  //supprimer les données de titre

  const input_titre_ajout = document.getElementById("input_model");
  input_titre_ajout.value = null;

  //supprime l'url des photos
  const input_photo_url = document.getElementById("img_input");
  input_photo_url.value = null;

  //supprime les données de categorie
  const category = document.getElementById("categorie");
  category.value = null;
}

function photos(works) {
  const photo_modal = `
      <figure id ="B${works.id}">
   
                <div id="repertoire_modal" class="photo_model_efface">
      <img src="${works?.imageUrl} "crossOrigin="anonymous">
              <i id ="${works.id}" class="fa-regular fa-trash-can "></i>
             </div>
                  <figcaption>éditer</figcaption>
      </figure>
            `;

  document
    .getElementById("model_gallery")
    .insertAdjacentHTML("beforeend", photo_modal);
}
function afficheModel() {
  fetch("http://localhost:5678/api/works").then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        document.getElementById("model_gallery").innerHTML = "";

        for (let i = 0; i <= data.length - 1; i++) {
          photos(data[i]);
        }
      });
    }
  });
}

/////  CREER DES BOUTON OBJECT  ////

fetch("http://localhost:5678/api/works").then((res) => {
  if (res.ok) {
    res.json().then((data) => {
      const numSlid = data.length;
      //  FETCH CATEGORIE //
      fetch("http://localhost:5678/api/categories").then((res) => {
        if (res.ok) {
          res.json().then((category) => {
            for (let count = 0; count <= category.length - 1; count++) {
              const object = document.createElement("button");
              object.type = "button";
              object.innerHTML = category[count].name;
              object.className = "btn_option";
              object.onclick = function () {
                document.querySelector(".gallery").innerHTML = "";

                for (let i = 0; i <= numSlid; i++) {
                  if (data[i]?.category.name === category[count].name) {
                    info(data[i]);
                  }
                }
              };
  ////  ENLEVER LES BOUTONS DANS LE MODE LOGIN  ////
              if (localStorage.getItem("token")) {
                console.log("Bienvenu Sophie");
              } else {
                const button = document.getElementById("btn");
                button.appendChild(object);
              }
            }

          });
        }
      });

    });
  } 
  tout();
});

/////entrer a la page model
if (localStorage.getItem("token")) {
  let tableauId = [];
  //replacer le login par logout
  document.getElementById("login").innerText = "logout";
  //remove btn tous
  document.getElementById("btn").remove(btn_tous);

  /////crée div de modification

  document.getElementById("modifer").style.backgroundColor = "black";

  //edition
  const edition = document.createElement("p");
  edition.type = "button";

  //////la fonction modifier/////
  const modification = `
<div>
<i class="fa-regular fa-pen-to-square"></i>
<p>Mode édition</p>  </div>`;
  edition.insertAdjacentHTML("afterbegin", modification);
  edition.className = "edition";
  //edition.onclick = function () {}
  const modifier = `
<div id= "modifier">
<i class="fa-regular fa-pen-to-square"></i>
<p>modifier</p>  </div>`;

  const modifier_model = `
<a href ="#modal"></a>
<div id= "modifier_model">
<i class="fa-regular fa-pen-to-square"></i>
<p>modifier</p>  </div>`;

  document
    .getElementById("portfolio_titre")
    .insertAdjacentHTML("afterend", modifier_model);
  document
    .getElementById("introduction_article")
    .insertAdjacentHTML("afterbegin", modifier);
  document
    .getElementById("introduction_photo")
    .insertAdjacentHTML("beforeend", modifier);

  afficheModel();

  ////////////  SUPPRIMER  //////////////:

  function suppression() {
    fetch("http://localhost:5678/api/works").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          for (let counter = 0; counter <= data.length; counter++) {
            function delet() {
              data[counter].id;

              console.log(`${data[counter]?.id}`);

              console.log(data[counter].id);
              //supprimer les projets

              var element = document.getElementById(`B${data[counter].id}`);

              element?.remove();

              var element2 = document.getElementById(`A${data[counter].id}`);

              element2?.remove();

              tableauId.push(data[counter].id);
              console.log(tableauId);
              localStorage.setItem("id", JSON.stringify(tableauId));
            }

            var id = document.getElementById(`${data[counter]?.id}`);
            if (id) {
              id.addEventListener("click", delet);
            }
            console.log(localStorage.getItem("id"));
          }

          function deleteProject(id) {
            fetch("http://localhost:5678/api/works/" + id, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((res) => res.json())

              .catch((err) => console.log("il y a un problème" + err));
          }

          if (localStorage.getItem("id")) {
            let getId = JSON.parse(localStorage.getItem("id"));
            for (let id of getId) {
              deleteProject(id);
              tout();
              console.log("le ID ", id);
            }

            localStorage.removeItem("id");
            console.log("supprimer");
          }
        });
      }
    });
  }

  suppression();
  let page = null;

  ///////////////////////ouvre modal////////////////////
  function ouvre_modal(e) {
    e.preventDefault;
    const target = document.getElementById("modal");
    target.style.display = null;
    target.removeAttribute("aria-hidden");
    page = target;
    page?.addEventListener("click", ferme_modal);
    page
      .querySelector(".js_modal_stop")
      .addEventListener("click", stopPropagation);

    //le modal ferme quand on click d'hors
    suppression();
  }

  document
    .getElementById("modifier_model")
    .addEventListener("click", ouvre_modal);
  //////la fleche de retour
  document.getElementById("left").addEventListener("click", ouvre_modal);

  /////ouvrir modal avec clavier
  window.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      ouvre_modal(e);
    }
    //pour fermer le model quand on clic dessus

    const stopPropagation = function (e) {
      e.stopPropagation();
    };
  });

  ///////////////FERMER le modal//////////////
  function ferme_modal(e) {
    e.preventDefault;
    const page = document.getElementById("modal");
    page.style.display = "none";
    page.setAttribute("aria-hidden", "true");
    page?.removeEventListener("click", ferme_modal);
  }
  document
    .getElementById("model_fermer")
    .addEventListener("click", ferme_modal);
  document
    .getElementById("model_ajoute")
    .addEventListener("click", ferme_modal);

  /////////////fermer modal avec clavier

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
      ferme_modal(e);
    }
  });
  ///////desactiver le repetition de modifier ///////////
  edition.onclick = function () {
    document
      .getElementById("portfolio_titre")
      .removeAttribute("modifier_model");
    document.getElementById("introduction_article").removeAttribute("modifier");
    document.getElementById("introduction_photo").removeAttribute("modifier");
  };
  //};

  const edit = document.getElementById("modifer");
  edit.appendChild(edition);

  /////ouvre la page ajoute photo///

  let model_ajout = null;
  //ouvre modal
  function ouvre_modal_ajoute(e) {
    e.preventDefault;
    const model_page = document.getElementById("modal_ajout");
    model_page.style.display = null;
    model_page.removeAttribute("aria-hidden");
    model_ajout = model_page;
    model_ajout?.addEventListener("click", ferme_modal_ajoute);
    model_ajout
      .querySelector(".js_modal_stop")
      .addEventListener("click", stopPropagation);

    //l'affichage de category null
    const category = document.getElementById("categorie");
    category.value = null;
    //ferme le modal quand on click dehors
  }

  document
    .getElementById("model_ajoute")
    .addEventListener("click", ouvre_modal_ajoute);

  //ouvrir le modal avec clavier
  window.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      ouvre_modal_ajoute(e);
    }
  });

  //pour fermer le model quand on click dessus

  const stopPropagation = function (e) {
    e.stopPropagation();
  };

  ////FERMER le modal d'ajout photo ///
  function ferme_modal_ajoute(e) {
    e.preventDefault;
    const model_ajout = document.getElementById("modal_ajout");
    model_ajout.style.display = "none";
    model_ajout.setAttribute("aria-hidden", "true");
    model_ajout?.removeEventListener("click", ferme_modal_ajoute);

    // supprimer les données quand on ferme
    supprime();

    //supprimer le message d'erreur
    document.getElementById("msg_err").innerHTML = "";
  }
  document
    .getElementById("model_fermer_ajouter")
    .addEventListener("click", ferme_modal_ajoute);
  //la fleche de retour
  document.getElementById("left").addEventListener("click", ferme_modal_ajoute);

  //ferme modal avec clavier

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
      ferme_modal_ajoute(e);
    }
  });

  /////telecharger les photos/////
  function telecharger() {
    const input = document.getElementById("img_input");

    var telecharger_image = "";

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      telecharger_image = reader.result;
      const photo = document.getElementById("image_telecharger");
      document.getElementById("image_telecharger_images").style.display = null;

      photo.style.backgroundImage = `url(${telecharger_image} )`;
      document.getElementById("model_ajout_container").style.display = "none";
    });
    reader.readAsDataURL(this.files[0]);
  }

  document.getElementById("img_input").addEventListener("change", telecharger);

  ///////////////////Envoi des fichiers a API///////////////////

  document.getElementById("modal_ajout").addEventListener("submit", (e) => {
    e.preventDefault();

    const photo = document.getElementById("img_input");
    const category = document.getElementById("categorie");
    const title = document.getElementById("input_model");

    // un message d'erreur si le formulaire n'est pas rempli
    if (photo.value === "" || title.value === "" || category.value === "") {
      document.getElementById("msg_err").innerHTML =
        "il faut remplir le formulaire ";
    } else {
      document.getElementById("msg_err").innerHTML = "";

      fetch("http://localhost:5678/api/categories").then((res) => {
        console.log(res);
        if (res.ok) {
          res.json().then((categorydata) => {
            for (let i = 0; i <= categorydata.length - 1; i++) {
              if (category.value === categorydata[i].name) {
                categorydata[i].name = categorydata[i].id;
                console.log(categorydata[i].id);
                console.log(category.value);

                const image = document.getElementById("img_input").files[0];

                let token = localStorage.getItem("token");
                console.log(`Bearer  ${token}`);
                const titre = document.getElementById("input_model").value;

                //////taille de la photo////
                if (image.size < 4 * 1048576) {
                  const formData = new FormData();
                  formData.append("image", image);
                  formData.append("title", titre);
                  formData.append("category", categorydata[i].id);

                  //fetch works
                  const setNewProject = async (data) => {
                    try {
                      const requete = await fetch(
                        "http://localhost:5678/api/works",
                        {
                          method: "POST",
                          headers: {
                            Authorization: `Bearer ${token}`,
                            accept: "application/json",
                          },
                          body: data,
                        }
                      );
                      if (requete.status === 201) {
                        document.querySelector(".gallery").innerHTML = "";
                        document.getElementById("model_gallery").innerHTML = "";
                        tout();
                        afficheModel();
                      } else {
                        throw "Un problème est survenu";
                      }
                    } catch (e) {
                      console.log(e);
                    }
                  };
                  setNewProject(formData);
                } else {
                  document.getElementById("msg_err").innerHTML =
                    "la taille de la photo est plus de 4mo  ";
                  photo.value = null;
                  document.getElementById(
                    "model_ajout_container"
                  ).style.display = null;
                  document.getElementById(
                    "image_telecharger_images"
                  ).style.display = "none";
                }
                supprime();
              }
            }
          });
        }
      });
    }
  });

  ///////////////publier les changements
  const changment = document.createElement("button");
  changment.type = "button";

  const modification_changment = `
<p>publier les changements</p>  `;
  changment.insertAdjacentHTML("beforeend", modification_changment);
  changment.className = "publier";

  changment.onclick = function () {
    
  };
  const changements = document.getElementById("modifer");
  changements.appendChild(changment);
}
//sortir de la page model
document.getElementById("login").addEventListener("click", function () {
  localStorage.clear();
});
