# Projet IUT

# Prérequis

+ Node.js (v14 ou supérieur)

+ npm (v6 ou supérieur)

+ MySQL

# Variables d'environnement

Créez un fichier .env à la racine du projet et ajoutez les variables suivantes :
```bash
# Configuration du serveur
PORT=3000
NODE_ENV=development

# Configuration de la base de données
DB_CLIENT=mysql
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_DATABASE=database_name
DB_PORT=3306

# Configuration du serveur de mail
MAIL_HOST=smtp.ethereal.email
MAIL_PORT=587
MAIL_USER=your_ethereal_user
MAIL_PASS=your_ethereal_password
```
Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/your-username/iut-project.git
cd iut-project
```
1. Installez les dépendances :
```bash
npm install
```
1. Configurez les variables d'environnement comme décrit ci-dessus.

2. Exécutez les migrations de la base de données :
```bash
npx knex migrate:latest
```
1. Démarrez l'application :
```bash
npm start
```
Le serveur devrait maintenant fonctionner à l'adresse http://localhost:3000.

# Endpoints de l'API

## Endpoints Utilisateur

+ POST /user : Créer un nouvel utilisateur.

+ GET /users : Obtenir une liste d'utilisateurs (admin uniquement).

+ DELETE /user/{id} : Supprimer un utilisateur par ID (admin uniquement).

+ PATCH /user/{id} : Mettre à jour un utilisateur par ID (admin uniquement).

+ POST /user/login : Connexion de l'utilisateur.

## Endpoints Film

+ POST /movie : Créer un nouveau film (admin uniquement).

+ GET /movies : Obtenir une liste de films.

+ PATCH /movie/{id} : Mettre à jour un film par ID (admin uniquement).

+ DELETE /movie/{id} : Supprimer un film par ID (admin uniquement).

## Endpoints Favoris

+ POST /favorite : Ajouter un film aux favoris.

+ DELETE /favorite/{movieId} : Supprimer un film des favoris.

## Endpoints Export

+ GET /export/movies : Exporter les films en CSV et envoyer par email (admin uniquement).