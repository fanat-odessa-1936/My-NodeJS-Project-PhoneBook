const { Sequelize, DataTypes } = require('sequelize');
const Joi = require('joi');

const sequelize = new Sequelize(process.env.DB_HOST, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const {Contact, joiContactSchema} = require('./contact')(sequelize, DataTypes, Joi);
const {User, joiUserSchema} = require('./user')(sequelize, DataTypes, Joi);

const models = {
  Contact,
  User
}

const schemas = {
  joiContactSchema,
  joiUserSchema
}

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = {
  ...models,
  ...schemas,
  sequelize
}
