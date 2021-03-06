const { Contact } = require("../../models");

const updateFavorite = async (req, res, next) => {
  try {
      const { contactId } = req.params;
      const favorite = { favorite: req.body.favorite };
      if (!favorite) {
          return res.status(400).json({
            'message': 'missing field favorite'
        });
      }
    await Contact.update(favorite, {
          where: { id: contactId },
    });
    const updateStatusContact = await Contact.findOne({
      where: { id: contactId },
    })
        if (!updateStatusContact) {
        return res.status(404).json({
            'message': 'Not found'
        });
        }
        res.json({
        updateStatusContact
        })
  }
  catch (error) {
    next(error)
  }
}

module.exports = updateFavorite;
