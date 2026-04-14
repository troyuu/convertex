import { DataTypes } from 'sequelize';

export default function defineConversionJob(sequelize) {
  const ConversionJob = sequelize.define('ConversionJob', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    conversionType: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'conversion_type',
    },
    inputFormat: {
      type: DataTypes.STRING(10),
      allowNull: false,
      field: 'input_format',
    },
    outputFormat: {
      type: DataTypes.STRING(10),
      allowNull: false,
      field: 'output_format',
    },
    inputSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'input_size',
    },
    outputSize: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'output_size',
    },
    status: {
      type: DataTypes.ENUM('pending', 'processing', 'completed', 'failed'),
      defaultValue: 'pending',
    },
    errorMessage: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'error_message',
    },
    processingMs: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'processing_ms',
    },
    ipHash: {
      type: DataTypes.STRING(64),
      allowNull: true,
      field: 'ip_hash',
    },
  }, {
    tableName: 'conversion_jobs',
    underscored: true,
    timestamps: true,
  });

  return ConversionJob;
}
