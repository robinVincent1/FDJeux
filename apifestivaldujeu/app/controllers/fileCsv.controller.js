const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');
const db = require('../models');
const Csv = db.Csv;

const importCsv = async (req, res) => {
    const filePath = path.join(__dirname, '../../../frontfestivaldujeu/public/exportjeux.csv');

    // Suppression des données existantes
    try {
        await Csv.destroy({
            where: {}, // Un objet vide signifie aucun critère de filtrage
            truncate: true // Cette option assure que la table est complètement vidée
        });
        console.log('Toutes les données existantes ont été supprimées');
    } catch (error) {
        console.error('Erreur lors de la suppression des données existantes:', error);
        return res.status(500).json({ error: 'Erreur lors de la suppression des données existantes' });
    }

    // Lecture et insertion des nouvelles données
    fs.createReadStream(filePath)
        // .pipe(iconv.decodeStream('win1252')) // Convertir de Windows-1252 à UTF-8
        // .pipe(iconv.encodeStream('utf8')) // Encodage en UTF-8
        .pipe(csv({ separator: ';' }))
        .on('data', async (row) => {
            const produitData = {
                idJeu: row['idJeu'],
                nameGame: row['Nom du jeu'],
                author: row['Auteur'],
                editor: row['Éditeur'],
                nbPlayers: row['nb joueurs'],
                minAge: row['âge min'],
                duration: row['Durée'],
                type: row['Type'],
                notice: row['Notice'],
                planZone: row['Zone plan'],
                volunteerZone: row['Zone bénévole'],
                idZone: row['idZone'],
                toAnimate: row['À animer'],
                received: row['Reçu'],
                mechanisms: row['Mécanismes'],
                themes: row['Thèmes'],
                tags: row['Tags'],
                description: row['Description'],
                image: row['Image'],
                logo: row['Logo'],
                video: row['Vidéo']
            };

            try {
                // Vérifier si un produit avec le même nom existe déjà
                const existingProduct = await Csv.findOne({ where: { nameGame: produitData.nameGame } });
                if (existingProduct) {
                    console.log(`Le produit "${produitData.nameGame}" existe déjà, il ne sera pas inséré à nouveau.`);
                } else {
                    // Insérer les nouvelles données dans la base de données
                    await Csv.create(produitData);
                    console.log(`Enregistrement inséré avec succès: ${produitData.nameGame}`);
                }
            } catch (error) {
                // Gérez les erreurs d'insertion ici
                console.error('Erreur lors de l\'insertion de l\'enregistrement:', error);
            }
        })
        .on('end', () => {
            console.log('Importation terminée');
            res.json({ message: 'Importation des données CSV terminée avec succès' });
        })
        .on('error', (error) => {
            console.error('Erreur lors de la lecture du fichier CSV:', error);
            res.status(500).json({ error: 'Erreur lors de l\'importation des données CSV' });
        });
};


// Fonction pour récupérer les données de la table Produit
const getCsv = async (req, res) => {
    try {
        const produits = await Csv.findAll();
        res.json(produits);
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    }
};

module.exports = { importCsv, getCsv };