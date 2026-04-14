import { DataTypes } from 'sequelize';

export default function defineGuestBookEntry(sequelize) {
  const GuestBookEntry = sequelize.define('GuestBookEntry', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  }, {
    tableName: 'guestbook_entries',
    underscored: true,
    timestamps: true,
    updatedAt: false,
    createdAt: 'created_at',
  });

  return GuestBookEntry;
}
