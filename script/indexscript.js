/***************** SELECTEURS *************************/
let audio = document.getElementsByTagName('audio');
const playPauseBTN = document.querySelectorAll('.playpausebtnclass');

const track = document.querySelectorAll('.track');
const faPlay = document.querySelectorAll('.faPlay');
const faPause = document.querySelectorAll('.faPause');

let btnAjoutpanier = document.querySelectorAll('.track_ajoutpanier');
let instruDescriptifs = [
  {
     title: 'Titre 1',
     time: '3:04',
     bpm: '133',
     prix: 20,
     tags: '',
     inCart: 0
  },
  {
    title: 'Titre 2',
    time: '3:35',
    bpm: '125',
    prix: 20,
    tags: '',
    inCart: 0
  },
  {
    title: 'Titre 3',
    time: '3:35',
    bpm: '110',
    prix: 20,
    tags: '',
    inCart: 0
  },
  {
    title: 'Titre 4',
    time: '3:04',
    bpm: '85',
    prix: 20,
    tags: '',
    inCart: 0
 },
 {
   title: 'Titre 5',
   time: '3:35',
   bpm: '130',
   prix: 20,
   tags: '',
   inCart: 0
 },
 {
   title: 'Titre 6',
   time: '3:35',
   bpm: '134',
   prix: 20,
   tags: '',
   inCart: 0
 }
]
/*********--------------------------------------------*********/

for (let i = 0; i < audio.length; i++) {

  faPlay[i].addEventListener('click' , (event) => {

      audio[i].play();
      

  });

  faPause[i].addEventListener('click' , (event) => {

    audio[i].pause();
  

   });


}


function onlyPlayOneIn(container) {

  container.addEventListener("play", function(event) {

   audio_elements = container.getElementsByTagName("audio")

    for(i=0; i < audio_elements.length; i++) {

      audio_element = audio_elements[i];

      if (audio_element !== event.target) {
        audio_element.pause();
      }

    }

  }, true);

}

document.addEventListener("DOMContentLoaded", function() {
  onlyPlayOneIn(document.body);
});


track.forEach(element => {

     element.addEventListener('mouseover', (e) => {

      element.style.backgroundColor = "#0000005e";

   });

   element.addEventListener('mouseleave', (e) => {

    element.style.backgroundColor = "#C2C1E0";
 
    });
   
});



/******************* SYSTEME D'AJOUT PANIER *********************/

for (let i = 0; i < btnAjoutpanier.length; i++) {
      /* Je séléctionne tout mes boutons et je leurs ajoutent un événement qui, au clique de la souris va démarrer la fonction que j'ai crée */
      btnAjoutpanier[i].addEventListener('click', () => {

        nombresInstrus(instruDescriptifs[i]);
        PrixTotal(instruDescriptifs[i]);

      }); 
}


function txt_panier_qui_reste_au_chargement () {
 
  let nombresdeProduits = localStorage.getItem('nombreInstrus');

  if (nombresdeProduits) {
    /* si il y a quelque chose dans le panier , txt du panier = ce qu'il y a dans le panier */
    document.getElementById('dollar').textContent = nombresdeProduits;
  }
          
}


function nombresInstrus (instruDescriptif) {

  let nombresdeProduits = localStorage.getItem('nombreInstrus');

  nombresdeProduits = parseInt(nombresdeProduits);
  /* Je convertis cette variable de type string en type number */

  if (nombresdeProduits) {
   /* Si il y a déja quelque chose dans le panier */
    localStorage.setItem('nombreInstrus', nombresdeProduits + 1);
    document.getElementById('dollar').textContent = nombresdeProduits + 1;
    /* Selection du txt du panier , changement du txt , affection de la variable nbrdeproduit + 1 */

  } else {
      /* Si il n'y a rien */
     localStorage.setItem('nombreInstrus', 1);
     document.getElementById('dollar').textContent = 1;
  }

  setItems(instruDescriptif);

}

function setItems(instruDescriptif) {

  let instruItems = localStorage.getItem('InstruDansLePanier');
  instruItems = JSON.parse(instruItems);

  if (instruItems != null) {

    if (instruItems[instruDescriptif.title] == undefined) {

              instruItems = {
                ...instruItems,
                 [instruDescriptif.title]: instruDescriptif
              }

    }

    instruItems[instruDescriptif.title].inCart += 1;

  } else {

    instruDescriptif.inCart = 1;
    instruItems = {
         [instruDescriptif.title]: instruDescriptif
    }

  }
  
  localStorage.setItem("InstruDansLePanier", JSON.stringify(instruItems));

}

function PrixTotal (truc) {

  let PrixInstru = localStorage.getItem('PrixTotal');
  
   console.log(PrixInstru);


   if (PrixInstru != null) {

    PrixInstru = parseInt(PrixInstru);
    localStorage.setItem("PrixTotal", PrixInstru + truc.prix);

   } else {

    localStorage.setItem("PrixTotal", truc.prix);

   }

}


function displayCart() {

     let cartItems = localStorage.getItem("InstruDansLePanier");
     cartItems = JSON.parse(cartItems);

     let container_track_panier = document.getElementById("containerpanier_track_ttbt");
     let PrixInstru = localStorage.getItem('PrixTotal');

     if (cartItems && container_track_panier) {

      container_track_panier.innerHTML = '';

      Object.values(cartItems).map(item =>  {
        
        container_track_panier.innerHTML += `
        <div class="track_panier">
        
        <div class="track_img">      
         <img src="./ressources/${item.title}.png">   
        </div>

        <div class="titre_license">
         <h3>${item.title}</h3>
         <span>MP3 LEASE</span>
        </div>   
         
        <span class="price_track">$${item.prix}</span>
        <span class="time_track">${item.time}</span>

        <div class="license_div">
          <span>LICENSE</span>
        </div>

        <div class="fa_time_container">
         <i class="fas fa-times"></i>
        </div>
       

        </div>
                
        `

      });

      container_track_panier.innerHTML += `
        <div class="div_prixtotal">
         <h4>Prix Total :</h4>
         <h4>$${PrixInstru},00</h4>
        </div>

      `

     }

}


let removeCartItemButton = document.getElementsByClassName('clearall');


for (let i = 0; i < removeCartItemButton.length; i++) {

  let removeButton = removeCartItemButton[i];

  removeButton.addEventListener('click', function () {

    console.log('wesh');
    let container_track_panier = document.getElementById("containerpanier_track_ttbt");
    container_track_panier.innerHTML = '';
    localStorage.clear();

  });    

}


txt_panier_qui_reste_au_chargement();
displayCart();
/* Les instrus restent dans le panier même après rafraichissement de la page */



/**************************** MENU HAMBURGER ***************************************/

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".barredenav");
const divInutile = document.getElementById('div_inutile');

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    divInutile.classList.add("divinutile");
}

const navLink = document.querySelectorAll(".nav_item");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    divInutile.classList.remove("divinutile");
}

window.addEventListener('scroll', () => {

  if (window.scrollY > 50) {
    console.log('scroll');
    navMenu.classList.add('navscroll');
  } else {
    navMenu.classList.remove('navscroll');
  }

});

/***************** FIN MENU HAMBURGER ***********************/
/***************** FILTRER PAR BPM ***********************/

const btn_bpm = document.querySelectorAll(".champ_bpm");

for (i = 0; i < btn_bpm.length; i++) {

   btn_bpm[i].addEventListener("click", (e) => {
             
        e.preventDefault();

        const filter = e.target.dataset.filter; 
        console.log(filter);

        track.forEach((track) => {

          if (filter == "all") {

            track.style.display = "grid";

          } else {

            if (track.classList.contains(filter)) {

              track.style.display = "grid";

             } else {

             track.style.display = "none";

             }

          }

      
        });
 
   });

}
/********************* DEROULER LE FILTER *************************/
const filterContainer = document.getElementById("filterh2contain");
const filterForm = document.getElementById("filter");
let count = 0;


filterContainer.addEventListener("click", () => {

         
          if (count == 0) {

              count = 1;
              filterForm.style.height = "340px";
                            
          } else {

              count = 0;
              filterForm.style.height = "40px";     
             
          } 

});
/******************* BARRE DE RECHERCHE **********************/
const searchBar = document.getElementById("txt_recherche");


searchBar.addEventListener("keyup", (e) => {

    e.preventDefault();
    const searchValue = searchBar.value.toLowerCase().trim();

    for (i = 0; i < track.length; i++) {

           if (track[i].classList.contains(searchValue)) {

              track[i].style.display = "grid";

           } else if (searchValue == "") {

            track[i].style.display = "grid";

           } else {
            track[i].style.display = "none";
           }

    }

});








