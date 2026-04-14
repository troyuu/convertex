import PageContainer from '../components/layout/PageContainer';
import RetroWindow from '../components/ui/RetroWindow';
import GuestBook from '../components/features/GuestBook';

export default function GuestbookPage() {
  return (
    <PageContainer>
      <RetroWindow title="Guestbook — CONVERTEX">
        <div className="p-4">
          <div className="text-center mb-3">
            <h2 className="font-bold text-lg text-retro-navy">Sign our Guestbook!</h2>
            <p className="text-xs text-retro-gray">
              Let us know what you think of Convertex. All visitors welcome!
            </p>
          </div>
          <div className="pixel-divider" />
        </div>
      </RetroWindow>

      <div className="mt-3">
        <GuestBook />
      </div>
    </PageContainer>
  );
}
