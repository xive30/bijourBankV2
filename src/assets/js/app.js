console.log("Bijour Bank !");
/**
 * init foundation
 */
$(document).ready(function () {
  $(document).foundation();
});



// DOM OPERATION

const form = document.querySelector("#operationForm");
form.addEventListener("submit", function (event) {
  event.preventDefault;

  
  const operator = document.querySelector("#operator");
  const titre = document.querySelector("#titre");
  const descr = document.querySelector("#desc");
  const montant = document.querySelector("#montant");
  const solde = document.querySelector("#solde");

  console.log("operator").value;
  console.log("titre").value;
  console.log("descr").value;
  console.log("montant").value;
  console.log("solde");

  document.getElementsByClassName("grid-container").setAttribute("id", "grid");/*pour attribuer l'id grid sans passer par l'html */
  let grid = document.getElementById("#grid");// grille qui contient toutes les operations

  let newDiv = document.createElement("div");// div qui va contenir une operation
  newDiv.className = "operation";
  grid.appendChild(newDiv);

  if (operator == credit) {
    newDiv.className += " credit";
  }else {
    newDiv.className += " debit";
  }

    let newDivv = document.createElement("div");// div qui va contenir les cases de l' operation
    newDivv.className = "grid-x grid-padding-x align-middle";
    newDiv.appendChild(newDivv);

      let shrink = document.createElement("div");
      shrink.classname = "cell shrink";
      newDivv.appendChild(shrink);

        let picto = document.createElement("div");
        picto.classname = "picto";
        shrink.appendChild(picto);

        // if (operator == credit) {
        //   img credit;
        // }else {
        //   img debit;
        // }

      let aut = document.createElement("div");
      aut.classname = "cell auto";
      newDivv.appendChild(aut);

        let libele = document.createElement("div");
        libele.id = "libelee";
        aut.appendChild(libele);

          let titi = document.createElement("h2");
          libele.appendChild(titi);//titre de l'operation
          titi.innerText = titre.value;

          let sma = document.createElement("small");
          libele.appendChild(sma);// description de l'operation
          sma.innerText = descr.value;

      // let  = document.createElement("div");
      // shrink.classname = "cell shrink";
      // newDivv.appendChild(shrink);



});