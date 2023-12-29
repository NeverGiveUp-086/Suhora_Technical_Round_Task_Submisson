const bcrypt = require('bcryptjs');

exports.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

exports.comparePassword = async (enteredPassword, userPassword) => {
    return await bcrypt.compare(enteredPassword, userPassword);
}