console.log("Bijour Bank !");
/**
 * init foundation
 */
$(document).ready(function () {
  $(document).foundation();
});
const montants = [0]; // le solde doit contenir la liste des montants positifs et negatifs
let solde = 0;

const form = document.querySelector("#operationForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const operator = document.querySelector("#operator").value;
  const titre = document.querySelector("#titre").value;
  const descr = document.querySelector("#desc").value;
  const montant = document.querySelector("#montant").value;

  // let percent =parseFloat

  // console.log(operator);
  // console.log(titre);
  // console.log(descr);
  // console.log(montant);

  let grid = document.querySelector("#grid"); // grille qui contient toutes les operations

  let newDiv = document.createElement("div"); // div qui va contenir une operation
  newDiv.className = "operation";
  grid.appendChild(newDiv);

  if (operator == "credit") {
    newDiv.className += " credit";
  } else {
    newDiv.className += " debit";
  }

  let newDivv = document.createElement("div"); // div qui va contenir les cases de l' operation
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
  newP.innerText = `${montant} €`;

  let percent = document.createElement("small");
  if (solde == 0) {         //pourcentage  si il n'y a pas de montant précédent = 100%
    percent.innerText = "100%";
  } else {
  percent.innerText =Math.round(montant* 10000 / solde) / 100  + "%";
  /*montant *100/ solde pour avoir le pourcentage de mon nouveau montant par rapport à mon ancien solde 
  le nouveau solde etant implemanté juste après
  math.round pour avoir un chiffre arrondi et *100 /100 pour l'avoir 2 chiffres après la virgule */
  }
  newDivM.appendChild(percent);

  //définir le solde : pour l'instant je ne sais pas si le tableau montants sert a quelque chose
  if (operator == "credit") {
    montants.push(parseFloat(montant));
    solde+= parseFloat(montant)
  } else {
    montants.push(parseFloat("-" + montant));
    solde -= parseFloat(montant)
  }
document.querySelector("#solde").innerText = solde;

//pour avoir le pourcentage
});
