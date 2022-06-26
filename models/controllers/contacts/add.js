const { Contact } = require("../../models");

const add = async (req, res, next) => {
  try {
    const newContact = {...req.body, owner: req.user._id};
    const result = await Contact.create(newContact);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result
      }
    });
  }
  catch (error) {
    next(error)
  }
}

module.exports = add;

