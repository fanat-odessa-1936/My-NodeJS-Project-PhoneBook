/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @param {import('joi')} Joi
 * @returns {{User: *, joiUserSchema: *}}
 */
module.exports = (sequelize, DataTypes, Joi) => {
    const User = sequelize.define('user', {
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Password is required'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: 'Email is required'
                }
            }
        },
        subscription: {
            type: DataTypes.ENUM,
            values: ["starter", "pro", "business"],
            defaultValue: 'starter',
        },
        token: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        avatarURL:{
            type: DataTypes.STRING,
            defaultValue: ""
        },
        verify: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        verifyToken: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Verify token is required'
                }
            }
        }
    }, {});

    const joiUserSchema = Joi.object({
        password: Joi.string(),
        email: Joi.string()
          .email({
              minDomainSegments: 2,
              tlds: { allow: ['com', 'net'] }
          }).required(),
        subscription: Joi.string(),
        avatarURL: Joi.string(),
    });

    return {
        User,
        joiUserSchema
    }
}
