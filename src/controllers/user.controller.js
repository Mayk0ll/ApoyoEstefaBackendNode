const bcrypt = require('bcrypt');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, getUserByEmail } = require("../repositories/user.repository");
const { generateToken } = require('../utils/generateToken');


exports.getAllUsers = async (req, res) => {
  try {
    console.log(req.email);
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getUserById = async (req, res) => {
    try {
        const { id_user } = req.params;
        console.log(id_user);
        const user = await getUserById(id_user);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.createUser = async (req, res) => {
    try {
        console.log(req.body);
        const {password, ...user} = req.body;
        user.password = bcrypt.hashSync(password, 10);
        await createUser(user);
        res.status(201).json({msg: 'usuario creado exitosamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.body;
        await updateUser(id, user);
        res.status(204).end();
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.query;
        await deleteUser(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);

        if(!user && !bcrypt.compareSync(password, user.password)) return res.status(401).json({msg: 'Datos invalidos'})
        const token = generateToken(user)
        res.status(200).json({token});

    } catch (error) {
        res.status(500).json(error);
    }
}