const {News} = require('../models')


const getById = async (req, res) => {
    try {
      const news = await News.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!news) throw new Error('News not found');
      res.send(news);
    } catch (error) {
      console.log(error);
      res.status(400).send({ errors: error.message });
    }
  };

  createNews = async (req, res) => {
    try {
      const { createur, titre, description, favori } = req.body;
      const newNews = await News.create({
        createur,
        titre,
        description,
        favori,
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

  deleteNews = async (req, res) => {
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

  module.exports = { getById, createNews, updateNews, deleteNews}