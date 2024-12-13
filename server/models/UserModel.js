import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db/db.js";
import bcrypt from "bcrypt";

// Define a model Users using Sequelize
// Define user table with the following columns: id, username, etc
const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
    },

    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },

    password_hash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },

    updated_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

// Hash the password before creating and updating
// Prehook because "beforeSave", combination of before create and before update
// BeforeSave will hash password with BCrypt
Users.addHook("beforeSave", async (users) => {
  console.log("😗 Currently Hashing Password...");
  try {
    const oldPW = users.password_hash;
    const SALT_ROUND = await bcrypt.genSalt(10);
    users.password_hash = await bcrypt.hash(oldPW, SALT_ROUND);
    console.log("✅ Hashed Password!");
  } catch (error) {
    console.error(`😳 Unable to hash password: ${error}`);
  }
});

export default Users;