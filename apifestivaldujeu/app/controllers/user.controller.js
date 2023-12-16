
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

    res.send({ accessToken: token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: error.message });
  }
};

const create = async (req, res) => {
  try {
    // console.log(req.body)
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

    });

    const token = jwt.sign({ id: user.idUser, admin : user.role === 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.send({ accessToken: token });
  } catch (error) {
    res.status(400).send({ errors: error.message });
  }
};


module.exports = { getMe, getById, create, login };
