import { Link } from 'react-router';
import FormatBadge from './FormatBadge';

const ICONS = {
  pdf: '#FF0000',
  word: '#000080',
  excel: '#008000',
  ppt: '#FF8800',
  image: '#008080',
  html: '#800080',
  csv: '#008000',
};

export default function ConversionCard({ type, name, description, inputFormats, outputFormat, icon }) {
  const iconColor = ICONS[icon] || '#808080';

  return (
    <Link to={`/convert/${type}`} className="no-underline text-retro-black">
      <div className="bevel-raised bg-retro-silver p-3 hover:bg-retro-white active:bevel-sunken h-full">
        {/* Icon */}
        <div className="flex items-center gap-2 mb-2">
          <svg width="20" height="20" viewBox="0 0 20 20" shapeRendering="crispEdges">
            <rect x="2" y="1" width="16" height="18" fill={iconColor} opacity="0.2" />
            <rect x="3" y="2" width="14" height="16" fill="white" />
            <rect x="4" y="3" width="12" height="2" fill={iconColor} />
            <rect x="4" y="6" width="10" height="1" fill="#808080" />
            <rect x="4" y="8" width="12" height="1" fill="#808080" />
            <rect x="4" y="10" width="8" height="1" fill="#808080" />
            <rect x="4" y="12" width="12" height="1" fill="#808080" />
            <rect x="4" y="14" width="6" height="1" fill="#808080" />
          </svg>
          <span className="font-bold text-sm">{name}</span>
        </div>

        <p className="text-xs text-retro-dark-gray mb-2">{description}</p>

        {/* Format badges */}
        <div className="flex items-center gap-1 flex-wrap">
          {inputFormats.slice(0, 2).map((fmt) => (
            <FormatBadge key={fmt} format={fmt} />
          ))}
          <span className="text-xs font-bold">→</span>
          <FormatBadge format={outputFormat} />
        </div>
      </div>
    </Link>
  );
}
