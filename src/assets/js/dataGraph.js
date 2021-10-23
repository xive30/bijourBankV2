// <block:setup:1>
const datapoints = [0,]; //solde apres chaque opérations
const DATA_COUNT = datapoints.length + 2; //nombres d'operations dans le graphique
const labels = []; //voir si on peut rajouter sur le label a part le numero de l'ope
for (let i = 0; i < DATA_COUNT; ++i) {
  labels.push(i.toString());
}

const data = {
  labels: labels,
  datasets: [
    {
      label: "Compte",
      data: datapoints,
      borderColor: "purple",
      // fill: true,
      cubicInterpolationMode: "monotone",
    },
  ],
};
// </block:setup>

// <block:config:0>
const config = {
  type: "line",
  data: data,
  options: {
    elements: {
      point: {
        radius: 0,
      },
    },
    responsive: true,
    plugins: {
      legend: false,
      // title: {
      //   display: true,
      //   text: "Chart.js Line Chart - Cubic interpolation mode",
      // },
    },
    interaction: {
      intersect: false,
    },
    scales: {// fait apparaitre une grille dans le graphique
      x: {
        display: true,
        min: 1,
        // j'implémente une valeur minimale à 1 pour garder le solde 0 nulle et invisible
      },
      y: {
        display: true,
      }, 
    },
  },
};

/*Le contexte du canevas HTML */
context = document.getElementById("myChart").getContext("2d");
/* Création du graphique */
chart = new Chart(context, config);

/* Générer des données aléatoires */
function generateData() {
  randomTemperature = (Math.random() * Math.floor(50)).toFixed(2); // Deux chiffres après la virgule
  addTemperature(new Date().toLocaleTimeString(), randomTemperature);
}

function addTemperature(time, temperature) {
  /* Ajoute la valeur en X */
  config.data.labels.push(time);

  /* Ajoute la valeur */
  config.data.datasets[0].data.push(temperature);

  /* Rafraichir le graphique */
  chart.update();
}
