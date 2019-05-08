const course = (sequelize, DataTypes) => {
  const Course = sequelize.define("course", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("name", value.toLowerCase().replace(" ", "-"));
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    shortDescription: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 10
      }
    },
    isAvaiable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    trailer: {
      type: DataTypes.STRING
    },
    rate: {
      type: DataTypes.INTEGER
    }
  });

  Course.associate = models => {
    Course.belongsTo(models.SeoUnit, {
      as: "SeoUnit",
      foreignKey: "seounit"
    });
    Course.belongsTo(models.Category);
    Course.hasMany(models.Video, { as: "Videos" });
  };

  return Course;
};

export default course;
