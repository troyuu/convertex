import { Link } from 'react-router';
import PageContainer from '../components/layout/PageContainer';
import RetroWindow from '../components/ui/RetroWindow';

export default function AboutPage() {
  return (
    <PageContainer>
      <RetroWindow title="About CONVERTEX">
        <div className="p-4">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-retro-navy">CONVERTEX</h1>
            <p className="text-xs text-retro-gray">Version 1.0 — Est. 1997 (not really)</p>
          </div>

          <div className="pixel-divider" />

          <div className="space-y-3 text-xs mt-3">
            <div className="bevel-sunken bg-white p-3">
              <h3 className="font-bold text-sm text-retro-navy mb-1">What is Convertex?</h3>
              <p>
                Convertex is a free, open-source file conversion tool with a radical 90s aesthetic.
                Convert PDFs, images, documents, spreadsheets, and presentations — all without
                creating an account or worrying about your privacy.
              </p>
            </div>

            <div className="bevel-sunken bg-white p-3">
              <h3 className="font-bold text-sm text-retro-navy mb-1">Our Mission</h3>
              <p>
                We believe file conversion should be free, fast, and private. No sign-ups.
                No tracking. No data collection. Your files are deleted the moment you download them.
              </p>
            </div>

            <div className="bevel-sunken bg-white p-3">
              <h3 className="font-bold text-sm text-retro-navy mb-1">Tech Stack</h3>
              <p>
                Built with React, Express.js, PostgreSQL, and a bunch of awesome open-source
                conversion tools including LibreOffice, Sharp, pdf-lib, Tesseract.js, and more.
                Styled with Tailwind CSS (but made to look like it&apos;s 1997).
              </p>
            </div>

            <div className="bevel-sunken bg-white p-3">
              <h3 className="font-bold text-sm text-retro-navy mb-1">18 Conversion Types</h3>
              <p>
                PDF ↔ Word, PDF ↔ Image, PDF ↔ Excel, PDF ↔ PowerPoint, Word ↔ Image,
                Word → HTML, HTML → PDF, CSV ↔ Excel, Merge PDF, Split PDF,
                Compress PDF, Compress Image. More coming soon!
              </p>
            </div>
          </div>

          <div className="pixel-divider" />

          <div className="text-center text-xs mt-3">
            <p>
              Read our <Link to="/privacy">Privacy Policy</Link>
              {' | '}
              <Link to="/guestbook">Sign our Guestbook</Link>
            </p>
          </div>
        </div>
      </RetroWindow>
    </PageContainer>
  );
}
