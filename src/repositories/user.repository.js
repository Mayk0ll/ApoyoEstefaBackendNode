const { User, Role } = require("../models");


exports.getAllUsers = async () => {
    return await User.findAll({include: [{model: Role, as: 'role'}]});
};

exports.getUserById = async (id) => {
    return await User.findByPk(id);
}

exports.createUser = async (user) => {
    return await User.create(user);
}

exports.updateUser = async (id, user) => {
    return await User.update(user, { where: { id } });
}

exports.deleteUser = async (id) => {
    return await User.update({ active: false }, { where: { id } });
}

exports.getUserByEmail = async (email) => {
    return await User.findOne({ where: { email, active: true } });
}