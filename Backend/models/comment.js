'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) {
		// define association here
		models.Comment.belongsTo(models.User, {
			foreignKey: {
				name: "id_user",
				allowNull: false,
			}
		}),
		models.Comment.belongsTo(models.Message, {
			foreignKey: {
				// name: "id_message",
				allowNull: false,
			}
		})
	}
	};
	Comment.init({
		id_user: DataTypes.INTEGER,
		MessageId: DataTypes.INTEGER,
		comment_username: DataTypes.STRING,
		comment_content: DataTypes.STRING
	}, 
	{
		sequelize,
		modelName: 'Comment',
	});
	
	return Comment;
};