import PageContainer from '../components/layout/PageContainer';
import RetroWindow from '../components/ui/RetroWindow';
import ConversionCard from '../components/features/ConversionCard';
import { CONVERSION_TYPES, CATEGORIES } from '../utils/conversionMap';

export default function ToolsPage() {
  const typeEntries = Object.entries(CONVERSION_TYPES);
  const categories = Object.entries(CATEGORIES);

  return (
    <PageContainer>
      <RetroWindow title="All Conversion Tools — CONVERTEX">
        <div className="p-4">
          <p className="text-xs text-retro-gray mb-4">
            Choose a conversion tool below. All conversions are free, private, and instant.
            Your files are deleted immediately after download.
          </p>

          {categories.map(([catKey, category]) => {
            const categoryTypes = typeEntries.filter(([, v]) => v.category === catKey);
            if (categoryTypes.length === 0) return null;

            return (
              <div key={catKey} className="mb-4">
                <h3 className="font-bold text-sm text-retro-navy bevel-sunken bg-white px-2 py-1 inline-block mb-2">
                  {category.name}
                </h3>
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
        </div>
      </RetroWindow>
    </PageContainer>
  );
}
