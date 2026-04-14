export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('conversion_stats', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    total_conversions: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    conversions_today: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    popular_type: {
      type: Sequelize.STRING(50),
      defaultValue: 'pdf-to-word',
    },
    total_size_processed: {
      type: Sequelize.BIGINT,
      defaultValue: 0,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('NOW()'),
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('conversion_stats');
}
