import { Link } from 'react-router';
import PageContainer from '../components/layout/PageContainer';
import RetroWindow from '../components/ui/RetroWindow';

export default function NotFoundPage() {
  return (
    <PageContainer>
      <RetroWindow title="404 - Page Not Found">
        <div className="p-6 text-center">
          {/* Big 404 */}
          <div className="text-6xl font-bold text-retro-navy mb-2" style={{ textShadow: '3px 3px #C0C0C0' }}>
            404
          </div>

          <div className="construction-stripe mb-3" />

          <h2 className="font-bold text-base text-retro-red mb-2">
            ERROR: PAGE NOT FOUND
          </h2>

          <p className="text-sm mb-3">
            This page has moved to the Information Superhighway!
          </p>

          <div className="bevel-sunken bg-retro-yellow p-3 mb-3 inline-block">
            <p className="text-xs font-bold animate-blink">
              ⚠ UNDER CONSTRUCTION ⚠
            </p>
          </div>

          <div className="construction-stripe mb-3" />

          <p className="text-xs text-retro-gray mb-3">
            The page you are looking for might have been removed,
            had its name changed, or is temporarily unavailable.
          </p>

          <Link to="/" className="retro-btn inline-block text-sm no-underline text-retro-black">
            ← Back to Homepage
          </Link>

          <p className="text-[10px] text-retro-gray mt-4">
            HTTP 404 — File or directory not found.
            <br />
            Internet Information Services
          </p>
        </div>
      </RetroWindow>
    </PageContainer>
  );
}
