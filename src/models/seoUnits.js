const seoUnit = (sequelize, DataTypes) => {
  const SeoUnit = sequelize.define(
    "seounit",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      keywords: {
        type: DataTypes.STRING,
        allowNull: false
      },
      robots: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "all"
      }
    }
  );

  return SeoUnit;
};

export default seoUnit;
