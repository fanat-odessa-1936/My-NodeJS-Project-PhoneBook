const { Contact } = require("../../models");

const getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const total = await Contact.estimatedDocumentCount();
    const contacts = await Contact.find({},"",{skip, limit:+limit});
    res.json({
      data: {
        total,
        pages: Math.ceil(total / limit),
        contacts
      }
     });
  }
  catch (error) {
    next(error);
  }
}

module.exports = getAll;