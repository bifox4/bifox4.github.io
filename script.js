/* Reset général */

* {

    margin: 0;

    padding: 0;

    box-sizing: border-box;

    font-family: 'Comic Sans MS', sans-serif;

}





/* Image de fond */  

.background-image {

    background: url('https://i.pinimg.com/736x/65/9f/26/659f26210d64e51331dee0de4cccf203.jpg') no-repeat center center/cover;

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: space-between;

    min-height: 100vh;

    text-align: center;

    padding-bottom: 60px;

}



/* Sections */

.section {

    display: none; /* Caché par défaut */

    width: 90%;

    max-width: 600px;

    background: #bdac7f;

    padding: 20px;

    border-radius: 10px;

    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);

    margin-top: 20px;

}



/* Section visible */

.section.active {

    display: block;

    animation: fadeIn 0.5s ease-in-out;

}



/* Animation d'apparition */

@keyframes fadeIn {

    from {

        opacity: 0;

        transform: translateY(10px);

    }

    to {

        opacity: 1;

        transform: translateY(0);

    }

}



/* Barre de navigation */

.navbar {

    position: fixed;

    bottom: 0;

    width: 100%;

    background: #59bb5e;

    display: flex;

    justify-content: space-around;

    padding: 10px 0;

    box-shadow: 0px -4px 6px rgba(0, 0, 0, 0.3);

}



.nav-btn {

    background: none;

    border: none;

    cursor: pointer;

    display: flex;

    align-items: center;

    justify-content: center;

    padding: 10px;

    width: 50px;

    height: 50px;

}



/* Icône générale */

.icon {

    width: 30px;

    height: 30px;

    position: relative;

}



/* 🏠 Icône "Accueil" (Maison) */

.home-icon {

    width: 24px;

    height: 20px;

    background: white;

    position: relative;

    clip-path: polygon(50% 0%, 100% 40%, 100% 100%, 0% 100%, 0% 40%);

}



/* 🌱 Icône "Mes Plantes" (Feuille) */

.plant-icon {

    width: 20px;

    height: 20px;

    background: white;

    border-radius: 50%;

    position: relative;

}



.plant-icon::before {

    content: "";

    width: 12px;

    height: 18px;

    background: white;

    position: absolute;

    left: 50%;

    bottom: -10px;

    transform: translateX(-50%);

    border-radius: 50% 50% 0 0;

}



/* ℹ️ Icône "À Propos" (Info) */

.info-icon {

    width: 6px;

    height: 16px;

    background: white;

    border-radius: 3px;

    position: relative;

}



.info-icon::before {

    content: "";

    width: 6px;

    height: 6px;

    background: white;

    border-radius: 50%;

    position: absolute;

    top: -10px;

    left: 50%;

    transform: translateX(-50%);

}



/* 🕶️ Icône "Réalité Augmentée" (Casque VR) */

.ar-icon {

    width: 28px;

    height: 15px;

    background: white;

    border-radius: 8px;

    position: relative;

}



.ar-icon::before, .ar-icon::after {

    content: "";

    width: 5px;

    height: 5px;

    background: #2E7D32;

    border-radius: 50%;

    position: absolute;

    top: 4px;

}



.ar-icon::before {

    left: 4px;

}



.ar-icon::after {

    right: 4px;

}



/* Animation au survol */

.nav-btn:hover .icon {

    transform: scale(1.2);

}



.nav-btn:hover {

    transform: scale(1.2);

}



.nav-btn i {

    font-size: 24px;

}



.nav-btn span {

    font-size: 12px;

    margin-top: 5px;

}



/* Responsive */

@media (max-width: 600px) {

    .navbar {

        padding: 15px 0;

    }



    .nav-btn {

        font-size: 16px;

    }

}



/* Bouton Ajouter une plante */

#add-plant-btn {

    background: #4CAF50;

    color: white;

    padding: 10px 15px;

    border: none;

    border-radius: 5px;

    cursor: pointer;

    font-size: 16px;

    margin-top: 10px;

}



#add-plant-btn:hover {

    background: #388E3C;

}



/* Liste des plantes ajoutées */

#plant-list {

    list-style: none;

    padding: 0;

    margin-top: 20px;

}



#plant-list li {

    background: white;

    padding: 10px;

    border-radius: 5px;

    margin: 5px 0;

    display: flex;

    align-items: center;

    gap: 10px;

}



/* Style de la fenêtre modale */

.modal {

    display: none;

    position: fixed;

    top: 0;

    left: 0;

    width: 100%;

    height: 100%;

    background: rgba(0, 0, 0, 0.5);

    justify-content: center;

    align-items: center;

}



.modal-content {

    background: #bdac7f;

    padding: 20px;

    border-radius: 10px;

    text-align: center;

    width: 80%;

    max-width: 500px;

}



.close {

    float: right;

    font-size: 24px;

    cursor: pointer;

}



.plant-gallery {

    display: flex;

    flex-wrap: wrap;

    gap: 10px;

    justify-content: center;

}



.plant-item {

    width: 80px;

    cursor: pointer;

    text-align: center;

}



.plant-item img {

    width: 100%;

    border-radius: 10px;

    transition: transform 0.2s;

}



.plant-item img:hover {

    transform: scale(1.1);

}



/* Conteneur principal */

.container {

    display: flex;

    flex-direction: column;

    align-items: center;

    gap: 20px; /* Espacement entre les blocs */

    width: 90%;

    max-width: 600px;

    margin: 20px auto;

}



/* Style des boîtes (calendrier et conseils) */

.box {

    width: 100%;

    background: rgba(255, 255, 255, 0.9);

    padding: 20px;

    border-radius: 10px;

    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);

    text-align: center;

}



/* Espacement spécifique pour les deux sections */

.calendrier {

    border-left: 5px solid #4CAF50; /* Bordure verte */

    margin-bottom: 20px; /* Espace sous le calendrier */

}



.conseil {

    border-left: 5px solid #FFA500; /* Bordure orange */

    margin-top: 20px; /* Espace au-dessus des conseils */

}



/* 📅 Style du calendrier */

.calendrier-box table {

    width: 100%;

    border-collapse: collapse;

}



.calendrier-box th, .calendrier-box td {

    padding: 12px;

    text-align: center;

    border: 1px solid #4CAF50;

    background: #C8E6C9;

    font-size: 16px;

    font-weight: bold;

    cursor: pointer;

}



.calendrier-box th {

    background: #388E3C;

    color: white;

}



.calendrier-box td:hover {

    background: #81C784;

}



/* 🌿 Style des conseils */

.conseil-box {

    border-left: 5px solid #4CAF50;

}



#conseil-texte {

    font-size: 18px;

    font-weight: bold;

    color: #2E7D32;

}



/* Table du calendrier */

table {

    width: 100%;

    border-collapse: collapse;

}



th, td {

    padding: 15px;

    text-align: center;

    border: 2px solid #4CAF50;

    background: #C8E6C9;

    font-size: 16px;

    font-weight: bold;

}



th {

    background: #388E3C;

    color: white;

}



td:hover {

    background: #81C784;

    cursor: pointer;

}



/* Conteneur principal */

.content-container {

    display: flex;

    flex-direction: column;

    align-items: center;

    gap: 30px; /* Augmentation de l’espace entre les rectangles */

    width: 90%;

    max-width: 600px;

    margin: 30px auto; /* Augmente la marge autour */

}



/* Empêche le tableau de dépasser son cadre */

.calendrier {

    width: 100%;

    max-width: 100%;

    padding: 10px;

    box-sizing: border-box;

}



/* Ajustement du tableau pour qu'il s'adapte */

.calendrier table {

    width: 100%;

    table-layout: fixed; /* Force une répartition égale des colonnes */

    border-collapse: collapse;

}



/* Ajustement des cellules pour ne pas qu'elles soient trop larges */

.calendrier th, 

.calendrier td {

    padding: 8px;

    font-size: 12px; /* Réduction du texte pour mobile */

    word-wrap: break-word; /* Permet au texte de s'adapter */

}



/* Réduction de la taille du texte sur petits écrans */

@media screen and (max-width: 600px) {

    .calendrier h2 {

        font-size: 16px; /* Réduit le titre pour gagner de la place */

    }

    

    .calendrier th, 

    .calendrier td {

        font-size: 10px; /* Encore plus petit sur très petits écrans */

        padding: 6px;

    }

}



h4 {

    text-align: left;

  }





  body {

    margin: 0;

    font-family: Arial, sans-serif;

    text-align: center;

    background: #f4f4f4;

}



/* Cadre caméra */

#camera-container {

    width: 90%;

    max-width: 450px;

    aspect-ratio: 4/3;

    border: 4px solid green;

    border-radius: 10px;

    overflow: hidden;

    background: black;

    margin: 10px auto;

    position: relative;

}



video {

    width: 100%;

    height: 100%;

    display: block;

}



/* Overlay RA */

#ar-overlay {

    position: absolute;

    top: 0;

    left: 0;

    width: 100%;

    height: 100%;

    pointer-events: none;

}



/* Zone d'affichage */

#info-box {

    width: 90%;

    max-width: 450px;

    margin: 10px auto;

    background: rgba(0, 0, 0, 0.7);

    color: white;

    padding: 10px;

    border-radius: 8px;

    display: none;

    text-align: center;

}



/* Boutons */

.btn-container {

    display: flex;

    justify-content: center;

    gap: 10px;

    margin: 10px;

}



button {

    padding: 12px 20px;

    font-size: 16px;

    border: none;

    border-radius: 5px;

    cursor: pointer;

}



.btn-start {

    background-color: #4caf50;

    color: white;

}



.btn-analyze {

    background-color: #f39c12;

    color: white;

    display: none;

}



.btn-camera {

    background-color: #007bff;

    color: white;

}



button:hover {

    opacity: 0.8;

}



.navbar {

    display: flex;

    justify-content: space-around;

    padding: 15px;

    position: fixed;

    bottom: 0;

    width: 100%;

}



.nav-btn {

    background: none;

    border: none;

    cursor: pointer;

    transition: transform 0.2s ease-in-out;

}



.nav-btn:hover {

    transform: scale(1.2);

}



/* 🔥 Nouvelle règle pour AGRANDIR VRAIMENT les emojis 🔥 */

.nav-btn span {

    font-size: 30px; /* Augmenter la taille des emojis */

    display: block; /* S'assure que l'emoji est bien séparé */

    line-height: 1; /* Évite que l'emoji soit trop petit */

}



.emoji {

    font-size: 40px; /* Taille des emojis */

    display: block;

    line-height: 1;

    filter: grayscale(100%); /* Rend l'emoji noir et blanc */

}



#connectBtn{

    background-color: #4caf50;

    color: white;

}



#response {

    margin-top: 20px;

    padding: 10px;

    min-height: 50px;

}

#response h3 {

    color: #333;

    font-size: 1.2em;

}

#response strong {

    color: #d9534f;

}

#response ul {

    padding-left: 20px;

}

#response li {

    margin-bottom: 5px;

}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f8f8f8;
}

.section {
  padding: 20px;
}

#RA-section {
  position: relative; /* important pour que l’absolu fonctionne dans ar-container */
  height: 30vh;
  background-color: #eaeaea;
  overflow: hidden;
}

#ar-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #000;
}

/* Bouton AR injecté dynamiquement */
#ar-container button {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  padding: 12px 24px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
