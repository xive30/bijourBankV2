console.log("Bijour Bank !");
/**
 * init foundation
 */
$(document).ready(function () {
  $(document).foundation();
});

let solde = 0;
const soldes = [0]// le tableau des constantes soldes pour le graphique
const form = document.querySelector("#operationForm");
let msg = document.querySelector("#msg")

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const operator = document.querySelector("#operator").value;
  const titre = document.querySelector("#titre").value;
  const descr = document.querySelector("#desc").value;
  const montant = document.querySelector("#montant").value;

  /*************************la grille qui contient toutes les operations*************************/
  let grid = document.querySelector("#grid");

  /*************************creation d'une div pour chaque operation****************************/
  let newDiv = document.createElement("div");
  newDiv.className = "operation";
  grid.appendChild(newDiv);

  if (operator == "credit") {
    newDiv.className += " credit";
  } else {
    newDiv.className += " debit";
  }

  let newDivv = document.createElement("div"); 
  newDivv.className = "grid-x grid-padding-x align-middle";
  newDiv.appendChild(newDivv);

  let shrink = document.createElement("div");
  shrink.className = "cell shrink";
  newDivv.appendChild(shrink);

  let picto = document.createElement("div");
  picto.className = "picto";
  shrink.appendChild(picto);

  let img = document.createElement("img");
  picto.appendChild(img);// image selon debit credit
  if (operator == "credit") {
    img.src = "./assets/images/sac-dargent.png";
    img.alt = "credit";
  } else if (operator == "debit") {
    img.src = "./assets/images/depenses.png";
    img.alt = "dedit";
  }

  let autoCell = document.createElement("div");
  autoCell.className = "cell auto";
  newDivv.appendChild(autoCell);

  let libele = document.createElement("div");
  libele.id = "libelee";
  autoCell.appendChild(libele);

  let titreOpe = document.createElement("h2");
  libele.appendChild(titreOpe); //titre de l'operation
  titreOpe.innerText = titre;

  let descOpe = document.createElement("small");
  libele.appendChild(descOpe); // description de l'operation
  descOpe.innerText = descr;

  let smallCell = document.createElement("div");
  smallCell.className = "cell small-3 text-right";
  newDivv.appendChild(smallCell);

  let newDivM = document.createElement("div");
  smallCell.appendChild(newDivM);

  let newP = document.createElement("p");
  newP.className = "count";
  newDivM.appendChild(newP);
  newP.innerText = `${montant} €`; //montant de l'operation

  let percent = document.createElement("small");
  newDivM.appendChild(percent); // pourcentage de l'operation par rapport au solde

  /**************************************les pourcentages******************************************/
  /*montant *100/ solde pour avoir le pourcentage de mon nouveau montant par rapport à mon ancien solde 
  le nouveau solde etant implemanté juste après
  math.round pour avoir un chiffre arrondi et *100 /100 pour l'avoir 2 chiffres après la virgule */
  if (solde == 0) {
    percent.innerText = "100%";
  } else {
  percent.innerText =Math.round(montant* 10000 / solde) / 100  + "%";
  }

  /************************************définir le dernier solde***********************************/
  if (operator == "credit") {
    //montants.push(parseFloat(montant));
    solde+= parseFloat(montant)
  } else {
    //montants.push(parseFloat("-" + montant));
    solde -= parseFloat(montant)
  }
document.querySelector("#solde").innerText = solde;

/*******************************message du solde*************************************************/
if (solde > 0) {
  msg.setAttribute('class', 'good');
  if (solde < 1000) {
    msg.innerText = "c'est juste là!✋";
  }else if (solde >= 1000 & solde < 10000 ){
    msg.innerText = "on est bien 😃"
  }else {
    msg.innerText = "on est vraiment trés bien là !🍻"
  }
} else {
  msg.setAttribute('class', 'bad');
  msg.innerText = "Attention ca va piquer!!! 😈";
}

/************************************la liste des soldes******************************************/
soldes.push(solde);
//je dois sauvegarder ma liste soldes en mémoire tampon pour qu'il puisse être utilisé dans le fichier graphic.js
//je dois également sauvegarder la grille "grid" dans la memoire tampon pour garder mes divs crées quand je ferme le navigateur

/*********************************la barre de navigation Tout debit credit*************************/
/*quand on click sur le lien Credit les divs Debit hidden true, les divs Credit hidden false;
quand on click sur le lien Debit les divs Credit hidden true, les divs Dedit hidden false;
quand on click sur le lien tous tous les divs Debit hidden false;*/
let btt = document.querySelector("#btt");
let btc = document.querySelector("#btc");
let btd = document.querySelector("#btd");

btt.addEventListener("click", function() {
  btt.setAttribute("class", "active");
  btc.setAttribute("class", "inactive");
  btd.setAttribute("class", "inactive");
  /*for (const  in op) {
    
  }*/
});

btc.addEventListener("click", function() {
  btt.setAttribute("class", "inactive");
  btc.setAttribute("class", "active");
  btd.setAttribute("class", "inactive");
});

btd.addEventListener("click", function() {
  btt.setAttribute("class", "inactive");
  btc.setAttribute("class", "inactive");
  btd.setAttribute("class", "active");
});
});
