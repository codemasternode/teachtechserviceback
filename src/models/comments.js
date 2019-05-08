const comment = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comment", {
    comment: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Comment.associate = models => {
    Comment.belongsTo(models.User);
    Comment.belongsTo(models.Course);
  };

  return Comment;
};

export default comment;
