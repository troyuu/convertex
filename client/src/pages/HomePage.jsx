import { Link } from 'react-router';
import PageContainer from '../components/layout/PageContainer';
import RetroMarquee from '../components/ui/RetroMarquee';
import PixelDivider from '../components/ui/PixelDivider';
import ConversionCard from '../components/features/ConversionCard';
import ConversionHistory from '../components/features/ConversionHistory';
import VisitorCounter from '../components/features/VisitorCounter';
import { CONVERSION_TYPES, CATEGORIES } from '../utils/conversionMap';

export default function HomePage() {
  const typeEntries = Object.entries(CONVERSION_TYPES);
  const categories = Object.entries(CATEGORIES);

  return (
    <PageContainer>
      {/* Marquee */}
      <RetroMarquee speed={12}>
        *** Welcome to CONVERTEX! The Radical File Converter! *** Convert PDF, Word, Excel, PowerPoint and more! *** Your files are NEVER stored on our servers! *** FREE and FAST! ***
      </RetroMarquee>

      {/* Trust badge */}
      <div
        className="bevel-raised p-3 mt-3 text-center"
        style={{ backgroundColor: '#FFFFCC' }}
      >
        <div className="flex items-center justify-center gap-2">
          <svg width="20" height="20" viewBox="0 0 20 20" shapeRendering="crispEdges">
            <rect x="6" y="9" width="8" height="8" fill="#808080" />
            <rect x="7" y="10" width="6" height="6" fill="#C0C0C0" />
            <rect x="8" y="4" width="4" height="6" fill="none" stroke="#808080" strokeWidth="2" />
            <rect x="9" y="12" width="2" height="2" fill="#000" />
          </svg>
          <span className="font-bold text-sm" style={{ color: '#000080' }}>
            ZERO STORAGE POLICY
          </span>
        </div>
        <p className="text-xs mt-1">
          Your files are <strong>NEVER</strong> kept on our servers. Converted files are deleted immediately after download.
          No accounts. No tracking. No data collection.
        </p>
      </div>

      <PixelDivider />

      {/* Conversion grid by category */}
      {categories.map(([catKey, category]) => {
        const categoryTypes = typeEntries.filter(([, v]) => v.category === catKey);
        if (categoryTypes.length === 0) return null;

        return (
          <div key={catKey} className="mb-4">
            <h2 className="font-bold text-sm mb-2 bg-retro-navy text-white px-2 py-1 bevel-raised">
              {category.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {categoryTypes.map(([type, config]) => (
                <ConversionCard
                  key={type}
                  type={type}
                  name={config.name}
                  description={config.description}
                  inputFormats={config.inputFormats}
                  outputFormat={config.outputFormat}
                  icon={config.icon}
                />
              ))}
            </div>
          </div>
        );
      })}

      <PixelDivider />

      {/* Construction stripe decoration */}
      <div className="construction-stripe mb-3" />

      {/* Conversion history */}
      <ConversionHistory />

      {/* Bottom stats area */}
      <div className="mt-4 text-center">
        <VisitorCounter />
        <p className="text-xs text-retro-gray mt-2">
          <Link to="/guestbook">Sign our Guestbook!</Link>
          {' | '}
          <Link to="/privacy">Privacy Policy</Link>
          {' | '}
          <Link to="/about">About</Link>
        </p>
      </div>

      <div className="construction-stripe mt-3" />

      {/* Under construction notice */}
      <div className="text-center mt-2 text-xs text-retro-gray mb-2">
        <p className="animate-blink font-bold" style={{ color: '#FF0000' }}>
          ** UNDER CONSTRUCTION **
        </p>
        <p className="mt-1">More conversion types coming soon!</p>
      </div>
    </PageContainer>
  );
}
