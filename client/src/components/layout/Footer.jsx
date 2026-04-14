import { Link } from 'react-router';
import PixelDivider from '../ui/PixelDivider';
import VisitorCounter from '../features/VisitorCounter';

export default function Footer() {
  return (
    <footer className="bg-retro-silver bevel-raised mt-4">
      <PixelDivider />
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Left: Privacy notice */}
          <div className="text-xs">
            <span className="font-bold" style={{ color: '#FF0000' }}>
              *
            </span>{' '}
            Files auto-delete after conversion. Your privacy is our priority.
          </div>

          {/* Center: Netscape badge */}
          <div
            className="bevel-raised px-2 py-1 text-xs text-center"
            style={{ backgroundColor: '#000080', color: '#FFFFFF' }}
          >
            Best viewed in
            <br />
            Netscape Navigator 4.0
            <br />
            <span style={{ color: '#00FF00' }}>800x600</span>
          </div>

          {/* Right: Visitor counter */}
          <VisitorCounter />
        </div>

        {/* Bottom links and copyright */}
        <div className="text-center text-xs mt-3 pt-2" style={{ borderTop: '1px solid #808080' }}>
          <div className="mb-1">
            <Link to="/">Home</Link>
            {' | '}
            <Link to="/tools">Tools</Link>
            {' | '}
            <Link to="/privacy">Privacy</Link>
            {' | '}
            <Link to="/about">About</Link>
            {' | '}
            <Link to="/guestbook">Sign our Guestbook!</Link>
            {' | '}
            <Link to="/donation">Donate</Link>
          </div>
          <div className="flex justify-center items-center gap-3 mb-2 flex-wrap">
            <span className="bevel-raised bg-retro-silver px-2 py-1 text-[10px]">
              HTML 3.2 Compliant
            </span>
            <span className="bevel-raised bg-retro-silver px-2 py-1 text-[10px]">
              Made with 90s vibes
            </span>
          </div>
          <p className="text-retro-gray">
            &copy; 1997-2026 Convertex. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
