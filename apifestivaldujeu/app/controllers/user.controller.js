
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const getMe = (req, res) => {
  res.send({ ...req.user.toJSON(), role: req.user.role });
};

const getById = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!user) throw new Error('User not found');
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: error.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) throw new Error('User not found');

    const isMatching = await bcrypt.compare(req.body.password, user.password);

    if (!isMatching) throw new Error('Invalid password');

    const token = jwt.sign({ id: user.idUser , admin : user.role === 'admin'}, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.send({ id: user.idUser, accessToken: token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: error.message });
  }
};

const create = async (req, res) => {
  try {
    console.log(req.body)
    const errors = [];

    if (!/\S+@\S+\.\S{2,3}/.test(req.body.email)) errors.push('Invalid email');
    if (!/^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}$/.test(req.body.password)) errors.push('Invalid password format');

    const alreadyCreate = await User.findOne({ where: { email: req.body.email } });
    if (alreadyCreate) errors.push('Email already used !');

    if (errors.length > 0) throw new Error(errors);
    if (!req.body.firstName) errors.push('First name is required');
    if (!req.body.lastName) errors.push('Last name is required');

    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      association: req.body.association,
      nbEdition: req.body.nbEdition,
      pseudo: req.body.pseudo,
      postalAdress: req.body.postalAdress,
      propo: req.body.propo,
      telephone: req.body.telephone,
      photoProfil: req.body.photoProfil,
      idFestival: req.body.idFestival,
      flexible: req.body.flexible,
    });

    const token = jwt.sign({ id: user.idUser, admin : user.role === 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.send({ id: user.idUser, accessToken: token });
  } catch (error) {
    res.status(400).send({ errors: error.message });
  }
};

const addFestivalToUser = async (req, res) => {
  const { festivalId, flexible, userId } = req.body;
  console.log(userId);
  try {
    // Récupérer l'utilisateur
    const user = await User.findByPk(userId);

    if (!user) {
      console.log('Erreur lors de la recherche de l\'utilisateur :');
      return res.status(404).json({ error: 'Utilisateur non trouvé' });

    }

    // Mettre à jour la liste d'ID de festival
    user.idFestival = festivalId;
    user.flexible = flexible;

    // Sauvegarder les modifications
    await user.save();

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};


module.exports = { getMe, getById, create, login, addFestivalToUser };
