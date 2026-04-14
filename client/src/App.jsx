import { BrowserRouter, Routes, Route } from 'react-router';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ConvertPage from './pages/ConvertPage';
import ToolsPage from './pages/ToolsPage';
import PrivacyPage from './pages/PrivacyPage';
import AboutPage from './pages/AboutPage';
import GuestbookPage from './pages/GuestbookPage';
import NotFoundPage from './pages/NotFoundPage';
import DonationPage from './pages/DonationPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/convert/:type" element={<ConvertPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/guestbook" element={<GuestbookPage />} />
            <Route path="/donation" element={<DonationPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
