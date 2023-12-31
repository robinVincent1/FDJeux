const { News } = require('../models')

const getAllNews = async (req, res) => {
  News.findAll()
    .then((news) => {
      res.status(200).json(news);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const createNews = async (req, res) => {
  try {
    const newNews = await News.create({
      createur: req.body.createur,
      titre: req.body.titre,
      description: req.body.description,
      favori: req.body.favori,
    });

    res.status(201).json(newNews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création de la news' });
  }
}


updateNews = async (req, res) => {
  try {
    const { createur, titre, description, favori } = req.body;
    const newsId = req.params.id;

    const existingNews = await News.findByPk(newsId);
    if (!existingNews) {
      return res.status(404).json({ error: 'News not found' });
    }

    existingNews.createur = createur;
    existingNews.titre = titre;
    existingNews.description = description;
    existingNews.favori = favori;

    await existingNews.save();

    res.status(200).json(existingNews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la news' });
  }
}

const deleteNews = async (req, res) => {
  try {
    const newsId = req.params.id;

    const existingNews = await News.findByPk(newsId);
    if (!existingNews) {
      return res.status(404).json({ error: 'News not found' });
    }

    await existingNews.destroy();

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression de la news' });
  }
}

// Récupérer toutes les news avec "favori" égal à true
const getFavoriteNews = async (req, res) => {
  try {
    const favoriteNews = await News.findAll({
      where: {
        favori: true,
      },
    });

    res.status(200).json(favoriteNews);
  } catch (error) {
    console.error('Erreur lors de la récupération des news favorites :', error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des news favorites' });
  }
};

module.exports = { createNews, updateNews, deleteNews, getAllNews, getFavoriteNews }