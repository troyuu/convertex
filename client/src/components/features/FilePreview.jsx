import FormatBadge from './FormatBadge';

export default function FilePreview({ file }) {
  if (!file) return null;

  const ext = file.name.substring(file.name.lastIndexOf('.'));
  const sizeMB = (file.size / 1024 / 1024).toFixed(2);
  const truncatedName = file.name.length > 30
    ? file.name.substring(0, 27) + '...'
    : file.name;

  return (
    <div className="bevel-sunken bg-white p-2 mt-2 flex items-center gap-3">
      <FormatBadge format={ext} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold truncate">{truncatedName}</p>
        <p className="text-xs text-retro-gray">{sizeMB} MB</p>
      </div>
    </div>
  );
}
