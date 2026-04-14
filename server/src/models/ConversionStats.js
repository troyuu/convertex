import { DataTypes } from 'sequelize';

export default function defineConversionStats(sequelize) {
  const ConversionStats = sequelize.define('ConversionStats', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    totalConversions: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'total_conversions',
    },
    conversionsToday: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'conversions_today',
    },
    popularType: {
      type: DataTypes.STRING(50),
      defaultValue: 'pdf-to-word',
      field: 'popular_type',
    },
    totalSizeProcessed: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      field: 'total_size_processed',
    },
  }, {
    tableName: 'conversion_stats',
    underscored: true,
    timestamps: true,
    createdAt: false,
    updatedAt: 'updated_at',
  });

  return ConversionStats;
}
