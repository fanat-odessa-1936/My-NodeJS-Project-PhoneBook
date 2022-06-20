const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { User } = require('../../models');

const avatarsDir = path.join(__dirname, "../../", "public/avatars");

const updateAvatar = async (req, res) => {
    const id = req.user.id;
    const { path:tpmName, originalname } = req.file;
    const uploadPath = path.join(avatarsDir, id, originalname);
    try {
        const file = await Jimp.read(tpmName);
        await file.resize(250, 250).write(tpmName);
        await fs.rename(tpmName, uploadPath);
        const avatarURL = `/avatars/${id}/${originalname}`;
        await User.findByIdAndUpdate(id, { avatarURL });
        res.json({
            avatarURL:avatarURL,
        })

    }
    catch (error) {
        await fs.unlink(tpmName);
        throw error;
    }
  

}

module.exports = updateAvatar