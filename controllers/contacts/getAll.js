const { Contact } = require("../../models");

const getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const { count: total, rows: contacts } = await Contact.findAndCountAll({
      offset: skip,
      limit: +limit
    });
    res.json({
      data: {
        total,
        pages: Math.ceil(total / limit),
        contacts
      }
     });
  }
  catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = getAll;
