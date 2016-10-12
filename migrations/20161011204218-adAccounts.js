'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('ad_accounts', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        account_name: {type: Sequelize.STRING, allowNull: false},
        created_at: {type: Sequelize.DATE, allowNull: false },
        updated_at: {type: Sequelize.DATE, allowNull: true }
      },
      {
        timestamps: true,
        underscored: true,
        freezeTableName: true,
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('adAccounts');
  }
};
