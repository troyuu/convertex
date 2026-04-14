import { Link, useLocation } from 'react-router';
import { ROUTES } from '../../config/routes';

export default function Header() {
  const location = useLocation();

  return (
    <header>
      {/* Title Bar */}
      <div className="title-bar" style={{ padding: '4px 8px' }}>
        <div className="flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            shapeRendering="crispEdges"
            className="flex-shrink-0"
          >
            <rect x="2" y="1" width="12" height="14" fill="#008080" stroke="#FFF" strokeWidth="1" />
            <rect x="4" y="3" width="8" height="2" fill="#FFFF00" />
            <rect x="4" y="7" width="8" height="2" fill="#00FF00" />
            <rect x="4" y="11" width="5" height="2" fill="#00FFFF" />
          </svg>
          <span className="font-bold tracking-wide">CONVERTEX</span>
          <span className="text-xs opacity-75">-- The Radical File Converter</span>
        </div>
        <div className="title-bar-controls flex">
          <button aria-label="Minimize">_</button>
          <button aria-label="Maximize">[]</button>
          <button aria-label="Close">X</button>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bevel-raised bg-retro-silver px-2 py-1">
        <div className="flex items-center gap-1 max-w-6xl mx-auto flex-wrap">
          <Link
            to="/"
            className="font-bold text-base mr-3 tracking-widest"
            style={{ textDecoration: 'none', color: '#000080' }}
          >
            CONVERTEX
          </Link>
          <div className="flex gap-0.5 flex-wrap">
            {ROUTES.map((route) => {
              const isActive = location.pathname === route.path;
              return (
                <Link
                  key={route.path}
                  to={route.path}
                  className="retro-btn text-xs inline-block"
                  style={{
                    textDecoration: 'none',
                    color: '#000000',
                    minWidth: '60px',
                    padding: isActive ? '5px 15px 3px 17px' : '4px 16px',
                    borderColor: isActive
                      ? '#808080 #ffffff #ffffff #808080'
                      : '#ffffff #808080 #808080 #ffffff',
                    backgroundColor: isActive ? '#FFFFFF' : '#C0C0C0',
                  }}
                >
                  {route.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Construction Stripe */}
      <div className="construction-stripe" />
    </header>
  );
}
