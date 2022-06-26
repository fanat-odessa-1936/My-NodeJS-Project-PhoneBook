/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @param {*} Joi
 * @returns {{}}
 */
module.exports = (sequelize, DataTypes, Joi) => {
    const Contact = sequelize.define('contact', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Set name for contact'
                }
            }
        },
        email: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        favorite: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }, {});

    const joiContactSchema = Joi.object({
        name: Joi.string()
          .min(3)
          .max(30)
          .required(),
        email: Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        phone: Joi.string()
          .pattern(/^[' '\-()0-9]{3,30}$/)
          .required(),
    });

    return {
        Contact,
        joiContactSchema
    }
}
