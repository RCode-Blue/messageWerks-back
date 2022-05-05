const businessModel = (sequelize, DataTypes) => {
  const Business = sequelize.define("business", {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    address_line1: {
      type: DataTypes.STRING,
    },
    address_line2: {
      type: DataTypes.STRING,
    },
    suburb: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    postcode: {
      type: DataTypes.STRING,
    },
  });

  return Business;
};

module.exports = businessModel;
