console.log("script chargé");
//je déclare mes variables au début du script, quand j'en ai

// Création des mots mystères que je mets dans un tableau
const MOTMYSTERES = ["DAIKIRI", "ECOLOGIE", "ACTEUR", "SUPERMARCHE", "PLAGIAT", "INGREDIENT", "SPAGHETTI"];
// Sélectionner un mot mystère avec une constante qui rend l'index aléatoire
const indexAleatoire = Math.floor(Math.random() * MOTMYSTERES.length);
const MOTMYSTERE = MOTMYSTERES[indexAleatoire];
// Je split les lettres de mes mots mystères pour qu'elles puissent être comparées 
//aves les lettres du tableau lettres
let lettresMotMystere = MOTMYSTERE.split("");
console.log(lettresMotMystere);

//Création d'une table où mettre les boutons lettre
const tableau = document.createElement("table");
tableau.id = tableau;
document.body.appendChild(tableau);

// création du tableau avec les lettres de l'alphabet
let lettres = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
    "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

// Ensuite je crée des boutons que je mets dans mon tableau avec comme 
// valeur le contenu du tableau

for (let i = 0; i <= 25; i++) {
    let alphaButton = document.createElement("button");
    alphaButton.classList.add("alphab");
    tableau.appendChild(alphaButton);
    alphaButton.innerText = lettres[i];
}

// J'injecte mon tableau dans l'article html préalablement créé

let article = document.getElementById("alpha");
article.appendChild(tableau);

// je crée des spans de class "tiret" dans mon article html id"pendu", j'y mets le contenu "- "

for (let i = 1; i <= lettresMotMystere.length; i++) {
    let lePendu = document.createElement("span");
    lePendu.classList.add("tiret");
    let artPendu = document.getElementById("pendu");
    artPendu.appendChild(lePendu);
    lePendu.innerText = "_" + " ";
}

// Je déclare la variable lesTirets pour avoir accès aux spans
// Variable lettreValid pour sélectionner tous les boutons de l'alphabet (tableau donc foreach) 
// j'y mets un add event listener sur le click qui va désactiver la lettre cliquée
// je déclare la variable trouvé et lui donne la valeur fausse
// boucle for avec comme index de 0 à la longueur de lettresMotMystère
// if je reprends l'eventDetail.target et demande de comparer son contenu avec celui de
// lettresMotMystère[index]. L'index permet de faire la correllation entre les 2 tableaux =>
// lettresMotMystere et lesTirets
// je donne la valeur true à ma variable trouve si les 2 valeurs sont égales (==)
// je donne la valeur de LettresMotMystere[index] à lesTirets[index], je remplace ainsi les 
// les tirets par les lettres de mon mot choisi 

let lesTirets = document.querySelectorAll(".tiret");
console.log(lesTirets);
let lettreValid = document.querySelectorAll("button");
let lettresCorrectes = 0; // variable pour suivre le nombre de lettres correctes

lettreValid.forEach((element) => element.addEventListener("click", (eventDetail) => {
    eventDetail.target.disabled = true;
    let trouve = false;

    // console.log("L'utilisateur a cliqué sur la lettre : ", eventDetail.target.innerText);
    for (let index = 0; index < lettresMotMystere.length; index++) {

        if (eventDetail.target.innerText == lettresMotMystere[index]) {
            console.log("La lettre " + eventDetail.target.innerText + " est bien présente dans le mot mystère");
            trouve = true;
            lesTirets[index].innerText = lettresMotMystere[index];
            lettresCorrectes++; // incrémente le nombre de lettres correctes trouvées              
        }
    }
    // 2ème if pour le cas où la variable trouve reste fausse même après être passée dans 
    // le 1er if
    // Je déclare la variable essaisRestants et j'appelle le span dont l'id est "essais"
    // dans mon html j'écris 8 dans ce span spécifique
    // je lui donne la valeur du innerText - 1 à chaque fois que c'est faux
    // Si ce innerText arrive à 0 la variable perdu remplace le text du paragraphe html 
    // else if : si le mot est trouvé l'article contenant les lettres est caché et le
    // paragraphe est changé à Gagné !

    if (trouve == false) {
        console.log("Non, absente du mot mystère");
        let essaisRestants = document.querySelector("#essais");
        essaisRestants.innerText = (essaisRestants.innerText) - 1;

        if (essaisRestants.innerText == 0) {
            let perdu = document.querySelector("#compteur");
            perdu.innerText = "Perdu !";
        }
    }
    else if (lettresCorrectes === lettresMotMystere.length) {
        article.style.visibility = "hidden";
        let gagne = document.querySelector("#compteur");
        gagne.innerText = "Gagné !";
    
    // Ajout du bouton rejouer (c'est un input type submit qui
    // n'apparaît que quand c'est gagné)
    if (gagne.innerText == "Gagné !") {
        let rejouer = document.createElement("input");
        rejouer.type = "submit";
        rejouer.innerText = "Rejouer";
        rejouer.value = "Rejouer"
        let artRejouer = document.querySelector("#rejouer");
        artRejouer.appendChild(rejouer);
        }
    }   
}))