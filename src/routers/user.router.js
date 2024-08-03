// const router = require("express").Router();
const { Router } = require("express");
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, login } = require("../controllers/user.controller");
const { verifyToken } = require("../utils/verifyToken");
const { validateRoleAdmin, emailExist } = require("../validators/role.validator");
const router = Router();

router.get('/user', [verifyToken, validateRoleAdmin], getAllUsers);

router.get('/user/:id_user', [], getUserById);

router.post('/user', [emailExist], createUser);

router.put('/user/:id', [], updateUser);

router.delete('/user', [], deleteUser);

router.post('/login', [], login);




module.exports = router;