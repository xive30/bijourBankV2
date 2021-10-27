console.log("Bijour Bank !");
/**
 * init foundation
 */
$(document).ready(function () {
  $(document).foundation();
});

/*************************La déclaration de variables *******************************************/
let solde = 0;
const soldes = [0]; // le tableau des constantes soldes pour le graphique
const form = document.querySelector("#operationForm");
let msg = document.querySelector("#msg");
const operations = [];
let operation = {};

/************************************************************************************************
 ******** déclaration de la fonction qui recuper et stocke les données de mon formulaire ********
 ************************************************************************************************/
form.addEventListener("submit", function (event) {
  event.preventDefault();
  
  //tableau d'opération qui collecte lesdonnées de chaque opération
  operation = {
    operator: document.querySelector("#operator").value,
    titre: document.querySelector("#titre").value,
    desc: document.querySelector("#desc").value,
    montant: document.querySelector("#montant").value,
  };
  
  // le tableau operation est envoyé dans le tableau des oprérations
  operations.push(operation);
  // j'appelle la fonction structureOperation qui va traiter les données des opérations 
  structureOperation(operation);  
});

/******************enregistrement des opeartions dans localStorage ****************************/
// Declaration de la variable "operationsEnregistreDansLocaStorage" dans laquelle on met les key et les values qui sont dans localStorage
let operationsEnregistreDansLocaStorage = JSON.parse(
  localStorage.getItem("opes")
);
form.addEventListener("submit", function (event){

// si il y a des operations dans localStorage
if (operationsEnregistreDansLocaStorage) {
  operationsEnregistreDansLocaStorage.push(operation);
  //la transformation au format JSON et l'envoyer dans la key opes du localStorage
  localStorage.setItem("opes", JSON.stringify(operationsEnregistreDansLocaStorage));
}
//si il n'ya pas d'operation dans localStorage
else {
  operationsEnregistreDansLocaStorage = [];
  operationsEnregistreDansLocaStorage.push(operation);
  //la transformation au format JSON et l'envoyer dans la key opes du localStorage
  localStorage.setItem("opes", JSON.stringify(operationsEnregistreDansLocaStorage));
  }
});

for(let i = 0; i < operationsEnregistreDansLocaStorage.length; i++){
  let pastOp=(operationsEnregistreDansLocaStorage[i]);
  structureOperation(pastOp);
}

  /***********************************************************************************************
   **************** fonction qui va traiter les données des opérations ***************************
   **********************************************************************************************/
function structureOperation(operation) {
  
  //la grille qui contient toutes les operations
  let grid = document.querySelector("#grid");
  
  /*************************creation d'une div pour chaque operation ****************************/
  let newDiv = document.createElement("div");
  newDiv.className = "operation";
  grid.appendChild(newDiv);
  if (operation.operator == "credit") {
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
  picto.appendChild(img);
  // image selon debit credit
  if (operation.operator == "credit") {
    img.src = "./assets/images/sac-dargent.png";
    img.alt = "credit";
  } else if (operation.operator == "debit") {
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
  libele.appendChild(titreOpe);
  titreOpe.innerText = operation.titre; //titre de l'operation
  
  let descOpe = document.createElement("small");
  libele.appendChild(descOpe);
  // description de l'operation
  descOpe.innerText = operation.desc; 
  
  let smallCell = document.createElement("div");
  smallCell.className = "cell small-3 text-right";
  newDivv.appendChild(smallCell);
  
  let newDivM = document.createElement("div");
  smallCell.appendChild(newDivM);
  
  let newP = document.createElement("p");
  newP.className = "count";
  newDivM.appendChild(newP);
  newP.innerText = `${operation.montant} €`; //montant de l'operation
  
  let percent = document.createElement("small"); // element pourcentage de l'operation par rapport au solde
  newDivM.appendChild(percent);
  
  /**************************************les pourcentages******************************************/
  /*montant *100/ solde pour avoir le pourcentage de mon nouveau montant par rapport à mon ancien solde 
  le nouveau solde etant implemanté juste après
  math.round pour avoir un chiffre arrondi et *100 /100 pour l'avoir 2 chiffres après la virgule */
  if (solde == 0) {
    percent.innerText = "100%";
  } else {
    percent.innerText = Math.round((operation.montant * 10000) / solde) / 100 + "%";
  }
  
  /************************************définir le dernier solde***********************************/
  if (operation.operator == "credit") {
    solde += parseFloat(operation.montant);
  } else {
    solde -= parseFloat(operation.montant);
  }
  document.querySelector("#solde").innerText = solde;
  
  /*******************************message du solde*************************************************/
  if (solde > 0) {
    msg.setAttribute("class", "good");
    if (solde < 1000) {
      msg.innerText = "c'est juste là!✋";
    } else if ((solde >= 1000) & (solde < 10000)) {
      msg.innerText = "on est bien 😃";
    } else {
      msg.innerText = "on est vraiment trés bien là !🍻";
    }
  } else {
    msg.setAttribute("class", "bad");
    msg.innerText = "Attention ca va piquer!!! 😈";
  }
  
  /************************************la liste des soldes******************************************/
  soldes.push(solde);
}

  /************************************************************************************************
  ******************* la barre de navigation Tout Debit Credit*************************************
  *************************************************************************************************/

  /*quand on click sur le lien Credit les divs Debit hidden true, les divs Credit hidden false;
quand on click sur le lien Debit les divs Credit hidden true, les divs Dedit hidden false;
quand on click sur le lien tous tous les divs Debit hidden false;*/
let btt = document.querySelector("#btt");
let btc = document.querySelector("#btc");
let btd = document.querySelector("#btd");
let opdebit = document.getElementsByClassName("debit");
let opcredit = document.getElementsByClassName("credit");

btt.addEventListener("click", function () /*toutes les operations */ {
  btt.setAttribute("class", "active");
  btc.setAttribute("class", "inactive");
  btd.setAttribute("class", "inactive");
  for (let i = 0; i < opdebit.length; i++) {
    opdebit[i].style.display = "block";
  }
  for (let i = 0; i < opcredit.length; i++) {
    opcredit[i].style.display = "block";
  }
});

btc.addEventListener("click", function () /*Les operations credit*/ {
  btt.setAttribute("class", "inactive");
  btc.setAttribute("class", "active");
  btd.setAttribute("class", "inactive");
  for (let i = 0; i < opdebit.length; i++) {
    opdebit[i].style.display = "none";
  }
  for (let i = 0; i < opcredit.length; i++) {
    opcredit[i].style.display = "block";
  }
});

btd.addEventListener("click", function () /*Les operations debit */ {
  btt.setAttribute("class", "inactive");
  btc.setAttribute("class", "inactive");
  btd.setAttribute("class", "active");
  for (let i = 0; i < opdebit.length; i++) {
    opdebit[i].style.display = "block";
  }
  for (let i = 0; i < opcredit.length; i++) {
    opcredit[i].style.display = "none";
  }
});
