# P7 Créez un réseau social d’entreprise

## Prérequis
Mysql, Sequelize cli

## Installation

### Front-End

__1.__ `cd Frontend` pour se rendre dans le dossier __Frontend__

__2.__ `npm i` pour installer les dépendances du __Frontend__

### Back-End

__1.__ `cd Backend` pour se rendre dans le dossier __Backend__

__2.__ `npm i` pour installer les dépendances du __Backend__

__3.__ `sequelize db:create` pour créer une base de donnée __Mysql__

__4.__ `sequelize db:migrate` pour créer les tables __Mysql__

## Connexion base de donnée

Dans le dossier __Backend__ vous trouverez un dossier __config__ contenant un fichier de configuration [config.json](Backend/config/config.json) pour la connexion au service __Mysql__, si les informations par défaut pour le __username__ et le __password__ ne sont pas correctes modifiées les valeurs en fonction de la configuration de votre service Mysql.

## Lancer l'application

Pour lancer l'application :

__1.__ Rendez-vous dans le dossier __Frontend__ puis exécuter cette commande `npm start` dans une terminal, une page devrez s'ouvrir sur votre navigateur.

__2.__ Rendez-vous dans le dossier __Backend__ puis exécuter cette commande `node server` dans un terminal.

__IMPORTANT__ le Frontend s'exécute sur le port 3000 et le Backend sur le port 3001, veillez à ce que les deux ports soit disponibles
