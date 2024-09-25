const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('task_tag_relations', {
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tasks',
        key: 'id'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'task_tags',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'task_tag_relations',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "task_id" },
          { name: "tag_id" },
        ]
      },
      {
        name: "tag_id",
        using: "BTREE",
        fields: [
          { name: "tag_id" },
        ]
      },
    ]
  });
};
