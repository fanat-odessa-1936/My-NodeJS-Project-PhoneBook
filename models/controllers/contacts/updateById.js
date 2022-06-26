const { Contact } = require("../../models");

const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updateContact = await Contact.update(req.body, {
      where: { id: contactId },
    });
    if (!updateContact) {
      return res.status(404).json({
        'message': 'Not found'
      });
    }
    res.json({
      updateContact
    })
  }
  catch (error) {
    next(error)
  }
}

module.exports = updateById;
