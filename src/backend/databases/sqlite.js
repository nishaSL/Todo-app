const Sequelize = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./src/backend/databases/database.sqlite",
});

const users = sequelize.define("users", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const lists = sequelize.define("lists", {
  item: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  edit: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  done: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.NUMBER,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() =>
    console.log(
      "users and lists table has been successfully created, if one doesn't exist"
    )
  )
  .catch((error) => console.log("This error occurred: ", error));

module.exports = {
  Users: users,
  Lists: lists,
};
