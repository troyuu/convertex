export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('conversion_jobs', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    conversion_type: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    input_format: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    output_format: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    input_size: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    output_size: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    status: {
      type: Sequelize.ENUM('pending', 'processing', 'completed', 'failed'),
      defaultValue: 'pending',
    },
    error_message: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    processing_ms: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    ip_hash: {
      type: Sequelize.STRING(64),
      allowNull: true,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('NOW()'),
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('NOW()'),
    },
  });

  await queryInterface.addIndex('conversion_jobs', ['status']);
  await queryInterface.addIndex('conversion_jobs', ['created_at']);
  await queryInterface.addIndex('conversion_jobs', ['conversion_type']);
}

export async function down(queryInterface) {
  await queryInterface.dropTable('conversion_jobs');
}
