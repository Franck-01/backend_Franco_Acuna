const MongoContainer = require('../managers/cartManager');
const User = require("../models/UserSchema");

class UserDao {
    userManager = new MongoContainer(User);
    getById = async (user) => {
        return await this.userManager.Read(user);
    }
    UploadById = async (array,user) => {
        return await this.userManager.Upload(array,user);
    }
}
module.exports = UserDao;