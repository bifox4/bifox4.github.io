document.addEventListener("DOMContentLoaded", () => {
    const joursSemaine = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

    function afficherConseil(jour) {
        const conseils = {
            "Lun": "Veuillez vous connecter à un boitier E-Jardin pour commencer",
            "Mar": "Veuillez vous connecter à un boitier E-Jardin pour commencer",
            "Mer": "Veuillez vous connecter à un boitier E-Jardin pour commencer",
            "Jeu": "Veuillez vous connecter à un boitier E-Jardin pour commencer",
            "Ven": "Veuillez vous connecter à un boitier E-Jardin pour commencer",
            "Sam": "Veuillez vous connecter à un boitier E-Jardin pour commencer",
            "Dim": "Veuillez vous connecter à un boitier E-Jardin pour commencer"
        };
        
        document.getElementById("conseil-texte").textContent = conseils[jour] || "Aucun conseil disponible.";
    }

    document.querySelectorAll(".nav-btn").forEach(button => {
        button.addEventListener("click", () => {
            const targetSection = button.getAttribute("data-target");
            document.querySelectorAll(".section").forEach(section => {
                section.classList.remove("active");
            });
            document.getElementById(targetSection).classList.add("active");
        });
    });

    const modal = document.getElementById("modal");
    const addPlantBtn = document.getElementById("add-plant-btn");
    const closeModal = document.querySelector(".close");
    const plantList = document.getElementById("plant-list");
    const plantInfoModal = document.getElementById("plant-info-modal");
    const plantInfoContent = document.getElementById("plant-info-content");
    const closePlantInfo = document.getElementById("close-plant-info");

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
        if (event.target === plantInfoModal) {
            plantInfoModal.style.display = "none";
        }
    });

    document.querySelectorAll(".plant-item").forEach(item => {
        item.addEventListener("click", () => {
            const plantName = item.getAttribute("data-name");
            const plantImgSrc = item.querySelector("img").src;

            const listItem = document.createElement("li");
            listItem.setAttribute("data-name", plantName);
            listItem.setAttribute("data-description", ""); // Description vide pour que tu la remplisses plus tard
            
            const plantImg = document.createElement("img");
            plantImg.src = plantImgSrc;
            plantImg.width = 40;
            plantImg.style.borderRadius = "5px";
            
            listItem.appendChild(plantImg);
            listItem.appendChild(document.createTextNode(plantName));
            listItem.addEventListener("click", () => afficherInfoPlante(listItem));

            plantList.appendChild(listItem);
            modal.style.display = "none";
        });
    });

    function afficherInfoPlante(plantItem) {
        const plantName = plantItem.getAttribute("data-name");
        const plantDescription = plantItem.getAttribute("data-description");
    
        // Récupérer le conseil du jour
        const conseilDuJour = document.getElementById("conseil-texte").textContent;
    
        // Mettre à jour le contenu de la modale
        document.getElementById("plant-info-name").textContent = plantName;
        document.getElementById("plant-info-description").textContent = plantDescription;
        document.getElementById("plant-info-conseil").textContent = conseilDuJour; // Ajout du conseil
    
        // Afficher la modale
        document.getElementById("plant-info-modal").style.display = "flex";
    }    
});

let video, canvas, ctx, model;
let currentFacingMode = "environment"; 

document.getElementById("start-button").addEventListener("click", startCamera);
document.getElementById("analyze-button").addEventListener("click", startAnalysis);

async function startCamera() {
    document.getElementById("start-button").style.display = "none";
    document.getElementById("analyze-button").style.display = "block";

    video = document.getElementById("video");
    canvas = document.getElementById("ar-overlay");
    ctx = canvas.getContext("2d");

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 480, facingMode: currentFacingMode }
        });
        video.srcObject = stream;
        model = await mobilenet.load();
    } catch (err) {
        console.error("Erreur d'accès à la caméra:", err);
        alert("Impossible d'accéder à la caméra.");
    }
}

function switchCamera(facingMode) {
    currentFacingMode = facingMode;
    startCamera();
}

async function startAnalysis() {
    if (!video) {
        alert("Caméra non active.");
        return;
    }

    captureAndSendImage();
}

function captureAndSendImage() {
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = video.videoWidth;
    tempCanvas.height = video.videoHeight;
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);

    tempCanvas.toBlob(blob => {
        sendToPlantID(blob);
    }, "image/jpeg");
}

async function sendToPlantID(imageBlob) {
    const formData = new FormData();
    formData.append("images", imageBlob);

    try {
        const response = await fetch("https://api.plant.id/v3/identification", {
            method: "POST",
            headers: {
                "Api-Key": "7bgm7IMFOa3sQ0oyQhcELv3UcspSvyLAhe5l2jb4yLikzisn7O",
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Erreur API: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        processPlantData(data);
    } catch (error) {
        console.error("Erreur API:", error);
        alert("Erreur avec Plant.id.");
    }
}

function processPlantData(data) {
    if (data.status === "COMPLETED") {
        const suggestion = data.result.classification.suggestions[0];
        let detectedPlantScientific = suggestion.name;
        let detectedPlantCommon = plantDatabase[detectedPlantScientific] || "Nom inconnu";
        let confidenceScore = (suggestion.probability * 100).toFixed(2) + "%";

        document.getElementById("plant-name").textContent = `${detectedPlantScientific} (${detectedPlantCommon}) - ${confidenceScore}`;
        document.getElementById("info-box").style.display = "block";
    }
}

// Base de données des plantes (extrait)
const plantDatabase = {
    "Aloe vera": "Aloe vera",
        "Mentha × piperita": "Menthe poivrée",
        "Rosmarinus officinalis": "Romarin",
        "Thymus vulgaris": "Thym",
        "Lavandula angustifolia": "Lavande vraie",
        "Matricaria chamomilla": "Camomille allemande",
        "Salvia officinalis": "Sauge officinale",
        "Echinacea purpurea": "Échinacée pourpre",
        "Zingiber officinale": "Gingembre",
        "Curcuma longa": "Curcuma",
        "Melissa officinalis": "Mélisse",
        "Artemisia absinthium": "Absinthe",
        "Foeniculum vulgare": "Fenouil",
        "Cinnamomum verum": "Cannelle",
        "Piper nigrum": "Poivre noir",
        "Valeriana officinalis": "Valériane",
        "Passiflora incarnata": "Passiflore",
        "Hypericum perforatum": "Millepertuis",
        "Achillea millefolium": "Achillée millefeuille",
        "Urtica dioica": "Ortie",

        // 🌺 Plantes Ornementales
        "Rosa spp.": "Rose",
        "Tulipa spp.": "Tulipe",
        "Narcissus spp.": "Narcisse",
        "Hibiscus rosa-sinensis": "Hibiscus",
        "Orchidaceae spp.": "Orchidée",
        "Petunia hybrida": "Pétunia",
        "Begonia semperflorens": "Bégonia",
        "Dahlia pinnata": "Dahlia",
        "Lilium spp.": "Lys",
        "Chrysanthemum spp.": "Chrysanthème",

        // 🌳 Arbres et Arbustes
        "Quercus robur": "Chêne pédonculé",
        "Fagus sylvatica": "Hêtre commun",
        "Acer saccharum": "Érable à sucre",
        "Betula pendula": "Bouleau verruqueux",
        "Olea europaea": "Olivier",
        "Prunus avium": "Merisier",
        "Magnolia grandiflora": "Magnolia",
        "Pinus sylvestris": "Pin sylvestre",
        "Ginkgo biloba": "Ginkgo",
        "Cedrus atlantica": "Cèdre de l’Atlas",

        // 🍊 Plantes Fruitières
        "Malus domestica": "Pommier",
        "Pyrus communis": "Poirier",
        "Citrus × sinensis": "Oranger doux",
        "Prunus persica": "Pêcher",
        "Vitis vinifera": "Vigne",
        "Fragaria × ananassa": "Fraisier",
        "Rubus idaeus": "Framboisier",
        "Vaccinium corymbosum": "Myrtillier",
        "Musa × paradisiaca": "Bananier",
        "Coffea arabica": "Caféier",

        // 🌾 Céréales et Légumineuses
        "Zea mays": "Maïs",
        "Triticum aestivum": "Blé tendre",
        "Oryza sativa": "Riz",
        "Hordeum vulgare": "Orge",
        "Secale cereale": "Seigle",
        "Avena sativa": "Avoine",
        "Glycine max": "Soja",
        "Cicer arietinum": "Pois chiche",
        "Lens culinaris": "Lentille",
        "Phaseolus vulgaris": "Haricot commun",

        // 🌿 Plantes Sauvages et Utilitaires
        "Taraxacum officinale": "Pissenlit",
        "Plantago major": "Grand plantain",
        "Rumex acetosa": "Oseille",
        "Chenopodium album": "Chénopode blanc",
        "Sambucus nigra": "Sureau noir",
        "Trifolium pratense": "Trèfle rouge",
        "Arctium lappa": "Bardane",
        "Equisetum arvense": "Prêle des champs",
        "Viola tricolor": "Pensée sauvage",
        "Bellis perennis": "Pâquerette",

        // 🌱 Plantes Aquatiques
        "Nymphaea alba": "Nénuphar blanc",
        "Lemna minor": "Lentille d’eau",
        "Myriophyllum spicatum": "Myriophylle en épi",
        "Ceratophyllum demersum": "Cornifle immergé",
        "Sagittaria sagittifolia": "Flèche d’eau",
        "Typha latifolia": "Massette à larges feuilles",
        "Nelumbo nucifera": "Lotus sacré",
        "Hydrilla verticillata": "Hydrilla",
        "Eichhornia crassipes": "Jacinthe d’eau",
        "Utricularia vulgaris": "Utriculaire commune",

        // 🌿 Plantes Tropicales et Exotiques
        "Theobroma cacao": "Cacaoyer",
        "Ananas comosus": "Ananas",
        "Carica papaya": "Papayer",
        "Persea americana": "Avocatier",
        "Cocos nucifera": "Cocotier",
        "Mangifera indica": "Manguier",
        "Psidium guajava": "Goyavier",
        "Litchi chinensis": "Litchi",
        "Passiflora edulis": "Fruit de la passion",
        "Dioscorea alata": "Igname",
        "Euterpe oleracea": "Açaï",
        "Syzygium aromaticum": "Giroflier",
        "Annona muricata": "Corossolier",
        "Colocasia esculenta": "Taro",
        "Elettaria cardamomum": "Cardamome",
        "Bixa orellana": "Roucou",
        "Myrciaria dubia": "Camu-camu",
        "Blighia sapida": "Aki",
        "Artocarpus heterophyllus": "Jacquier",
        "Nephelium lappaceum": "Ramboutan"
    };

    function processPlantData(data) {
        if (!data.result || !data.result.classification || !data.result.classification.suggestions.length) {
            alert("Aucune plante identifiée.");
            return;
        }
    
        const suggestion = data.result.classification.suggestions[0];
        let detectedPlantScientific = suggestion.name;
        let detectedPlantCommon = plantDatabase[detectedPlantScientific] || "Nom inconnu";
        let confidenceScore = (suggestion.probability * 100).toFixed(2) + "%";
    
        document.getElementById("plant-name").textContent = `${detectedPlantScientific} (${detectedPlantCommon}) - ${confidenceScore}`;
        document.getElementById("info-box").style.display = "block";
    
        // Stocker les infos de la plante analysée
        window.lastDetectedPlant = {
            name: detectedPlantCommon,
            scientific: detectedPlantScientific,
            imageSrc: document.getElementById("ar-overlay").toDataURL("image/png")
        };
    
        // Afficher le bouton d'ajout
        document.getElementById("add-plant-from-ar").style.display = "block";
    }

    document.getElementById("add-plant-from-ar").addEventListener("click", () => {
        if (!window.lastDetectedPlant) {
            alert("Aucune plante à ajouter !");
            return;
        }
    
        const { name, scientific, imageSrc } = window.lastDetectedPlant;
        const plantList = document.getElementById("plant-list");
    
        // Créer l'élément de liste
        const listItem = document.createElement("li");
        listItem.setAttribute("data-name", scientific);
        listItem.setAttribute("data-description", "Plante identifiée par analyse.");
    
        const plantImg = document.createElement("img");
        plantImg.src = imageSrc;
        plantImg.width = 40;
        plantImg.style.borderRadius = "5px";
    
        listItem.appendChild(plantImg);
        listItem.appendChild(document.createTextNode(` ${name} (${scientific})`));
    
        // Ajouter l'événement pour afficher les infos
        listItem.addEventListener("click", () => afficherInfoPlante(listItem));
    
        plantList.appendChild(listItem);
    
        // Cacher le bouton après l'ajout
        document.getElementById("add-plant-from-ar").style.display = "none";
    
        // Réinitialiser les données stockées
        window.lastDetectedPlant = null;
    });

    document.addEventListener("DOMContentLoaded", () => {
        const plantInfoModal = document.getElementById("plant-info-modal");
        const closeInfoModal = document.getElementById("close-info-modal");
    
        let humidityChart; // Stocke le graphique
        let humidityData = []; // Stocke l’historique des valeurs
        let timeLabels = []; // Stocke les labels temporels
        let updateInterval; // Stocke l'intervalle de mise à jour
    
        function generateRandomHumidity() {
            return Math.floor(Math.random() * 81) + 10; // Génère un taux d’humidité entre 10% et 90%
        }
    
        function updateChart() {
            // Ajouter un nouvel instant T
            let now = new Date();
            let timeString = now.toLocaleTimeString();
    
            // Générer une nouvelle valeur d’humidité
            let newHumidity = generateRandomHumidity();
    
            // Ajouter les nouvelles données
            timeLabels.push(timeString);
            humidityData.push(newHumidity);
    
            // Garder seulement les 10 dernières valeurs (évite surcharge)
            if (humidityData.length > 10) {
                humidityData.shift(); // Supprime l’ancienne valeur
                timeLabels.shift();
            }
    
            // Déterminer la couleur de la ligne
            let lineColor = newHumidity >= 50 ? "blue" : "orange";
    
            // Mettre à jour le graphique
            humidityChart.data.labels = timeLabels;
            humidityChart.data.datasets[0].data = humidityData;
            humidityChart.data.datasets[0].borderColor = lineColor;
            humidityChart.update();
        }
    });
    
  
