const category = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "category",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue("name", value.toLowerCase().replace(" ", "-"));
        }
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }
  );

  Category.associate = models => {
    Category.belongsTo(models.SeoUnit, {
      as: "SeoUnit",
      foreignKey: "seounit"
    });
    Category.hasMany(models.Course, { as: "Courses" });
  };

  return Category;
};

export default category;
