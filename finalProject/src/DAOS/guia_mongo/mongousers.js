const MongoContainer = require('../managers/cartManager');
const User = require('../models/user');

class UserDao {
    userManager = new MongoContainer(User);

    UploadById = async (array,user) => {
        return await this.userManager.UploadById(array,user);
    }
}
module.exports = UserDao;