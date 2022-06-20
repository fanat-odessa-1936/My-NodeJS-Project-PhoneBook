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
        const updateStatusContact = await Contact.findByIdAndUpdate(contactId, favorite, { new: true });
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