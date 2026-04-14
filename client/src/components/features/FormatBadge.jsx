const FORMAT_COLORS = {
  '.pdf': { bg: '#FF0000', text: '#FFFFFF' },
  '.doc': { bg: '#000080', text: '#FFFFFF' },
  '.docx': { bg: '#000080', text: '#FFFFFF' },
  '.xls': { bg: '#008000', text: '#FFFFFF' },
  '.xlsx': { bg: '#008000', text: '#FFFFFF' },
  '.ppt': { bg: '#FF8800', text: '#FFFFFF' },
  '.pptx': { bg: '#FF8800', text: '#FFFFFF' },
  '.png': { bg: '#008080', text: '#FFFFFF' },
  '.jpg': { bg: '#008080', text: '#FFFFFF' },
  '.jpeg': { bg: '#008080', text: '#FFFFFF' },
  '.webp': { bg: '#008080', text: '#FFFFFF' },
  '.html': { bg: '#800080', text: '#FFFFFF' },
  '.htm': { bg: '#800080', text: '#FFFFFF' },
  '.csv': { bg: '#008000', text: '#FFFFFF' },
  '.zip': { bg: '#808080', text: '#FFFFFF' },
};

export default function FormatBadge({ format }) {
  const colors = FORMAT_COLORS[format] || { bg: '#808080', text: '#FFFFFF' };
  const label = format.replace('.', '').toUpperCase();

  return (
    <span
      className="bevel-raised px-1.5 py-0.5 text-[10px] font-bold inline-block"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {label}
    </span>
  );
}
