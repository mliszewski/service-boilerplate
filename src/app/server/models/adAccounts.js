module.exports = function(sequelize, DataTypes) {
  return sequelize.define('adaccounts',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      accountName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'account_name'
      }
    },
    {
      tableName: 'ad_accounts',
      timestamps: true,
      underscored: true,
      freezeTableName: true,
    });
};
