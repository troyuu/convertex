export async function up(queryInterface) {
  await queryInterface.bulkInsert('conversion_stats', [{
    total_conversions: 0,
    conversions_today: 0,
    popular_type: 'pdf-to-word',
    total_size_processed: 0,
    updated_at: new Date(),
  }]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('conversion_stats', null, {});
}
