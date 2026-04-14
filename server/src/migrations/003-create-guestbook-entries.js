export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('guestbook_entries', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    message: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    website: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('NOW()'),
    },
  });

  await queryInterface.addIndex('guestbook_entries', ['created_at']);
}

export async function down(queryInterface) {
  await queryInterface.dropTable('guestbook_entries');
}
