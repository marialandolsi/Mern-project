# Utiliser l’image de base Node.js Alpine (version LTS)
FROM node:lts-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier uniquement package.json et package-lock.json (optimisation du cache)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du client
COPY . .

# Construire l’application React
RUN npm run build

# Installer le serveur HTTP léger (serve)
RUN npm install -g serve

# Exposer le port 3000
EXPOSE 3000

# Démarrer le serveur pour servir les fichiers de build
CMD ["serve", "-s", "build"]