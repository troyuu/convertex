import { Link } from 'react-router';
import PageContainer from '../components/layout/PageContainer';
import RetroWindow from '../components/ui/RetroWindow';
import gcashQr from '../assets/gcash-qr.png';
import mayaQr from '../assets/maya-qr.png';

export default function DonationPage() {
  return (
    <PageContainer>
      <RetroWindow title="Donate — CONVERTEX">
        <div className="p-4">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-retro-navy">
              Support Convertex!
            </h1>
            <p className="text-xs text-retro-gray mt-1">
              Buy us a coffee! Keep the servers running!
            </p>
          </div>

          <div className="pixel-divider" />

          <div className="bevel-sunken bg-white p-3 mt-3 text-xs text-center">
            <p>
              Convertex is <span className="font-bold">100% free</span> and always will be.
              If you find it useful, consider dropping a few pesos in our digital tip jar!
              Every contribution helps keep the lights on and the conversions flowing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {/* GCash Card */}
            <div className="bevel-raised p-3 text-center">
              <div
                className="bevel-sunken px-3 py-1 mb-3 inline-block"
                style={{ backgroundColor: '#0070E0', color: '#FFFFFF' }}
              >
                <span className="font-bold text-sm">GCash</span>
              </div>
              <div className="bevel-sunken bg-white p-3 mx-auto" style={{ maxWidth: '300px' }}>
                <img
                  src={gcashQr}
                  alt="GCash QR Code"
                  className="w-full h-auto"
                />
              </div>
              <p className="text-xs text-retro-gray mt-2">
                Scan with GCash app
              </p>
            </div>

            {/* Maya Card */}
            <div className="bevel-raised p-3 text-center">
              <div
                className="bevel-sunken px-3 py-1 mb-3 inline-block"
                style={{ backgroundColor: '#00B140', color: '#FFFFFF' }}
              >
                <span className="font-bold text-sm">Maya</span>
              </div>
              <div className="bevel-sunken bg-white p-3 mx-auto" style={{ maxWidth: '300px' }}>
                <img
                  src={mayaQr}
                  alt="Maya QR Code"
                  className="w-full h-auto"
                />
              </div>
              <p className="text-xs text-retro-gray mt-2">
                Scan with Maya app
              </p>
            </div>
          </div>

          <div className="pixel-divider" />

          {/* Construction stripe decoration */}
          <div
            className="h-3 mt-3"
            style={{
              background: 'repeating-linear-gradient(45deg, #FFD700, #FFD700 10px, #000000 10px, #000000 20px)',
            }}
          />

          <div className="text-center text-xs mt-3">
            <p className="font-bold text-retro-navy">
              Thank you for keeping Convertex free and rad!
            </p>
            <p className="text-retro-gray mt-1">
              <Link to="/">Back to Home</Link>
              {' | '}
              <Link to="/guestbook">Sign our Guestbook</Link>
            </p>
          </div>
        </div>
      </RetroWindow>
    </PageContainer>
  );
}
