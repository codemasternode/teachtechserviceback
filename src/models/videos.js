const video = (sequelize, DataTypes) => {
  const Video = sequelize.define("video", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    authorImage: {
      type: DataTypes.STRING
    }
  });

  Video.associate = models => {
    Video.belongsTo(models.Course);
    Video.belongsToMany(models.User, { through: "uservideo" });
  };

  return Video;
};

export default video;
