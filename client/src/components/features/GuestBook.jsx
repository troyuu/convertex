import { useState, useEffect, useCallback } from 'react';
import { get, post } from '../../services/api';
import RetroWindow from '../ui/RetroWindow';
import RetroInput from '../ui/RetroInput';
import RetroButton from '../ui/RetroButton';

export default function GuestBook() {
  const [entries, setEntries] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchEntries = useCallback(async (p) => {
    try {
      const data = await get(`/guestbook?page=${p}`);
      setEntries(data.entries || []);
      setTotalPages(data.totalPages || 1);
    } catch {
      // Silent fail
    }
  }, []);

  useEffect(() => {
    fetchEntries(page);
  }, [page, fetchEntries]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!name.trim() || !message.trim()) {
      setError('Please fill in your name and message!');
      return;
    }

    setLoading(true);
    try {
      await post('/guestbook', {
        name: name.trim(),
        message: message.trim(),
        website: website.trim() || undefined,
      });
      setName('');
      setMessage('');
      setWebsite('');
      setSuccess(true);
      setPage(1);
      fetchEntries(1);
    } catch (err) {
      setError(err.message || 'Failed to sign guestbook. Try again later!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Sign form */}
      <RetroWindow title="Sign the Guestbook">
        <form onSubmit={handleSubmit} className="space-y-2 p-3">
          <div>
            <label className="text-xs font-bold block mb-1">Your Name: *</label>
            <RetroInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              placeholder="CoolSurfer99"
            />
          </div>
          <div>
            <label className="text-xs font-bold block mb-1">Message: *</label>
            <textarea
              className="bevel-sunken w-full p-1 text-sm bg-white font-[var(--font-retro)] outline-none"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={1000}
              placeholder="This site is totally rad!"
            />
          </div>
          <div>
            <label className="text-xs font-bold block mb-1">Your Homepage (optional):</label>
            <RetroInput
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="http://www.geocities.com/~yourname"
              maxLength={255}
            />
          </div>

          {error && (
            <p className="text-xs font-bold" style={{ color: '#FF0000' }}>
              ERROR: {error}
            </p>
          )}
          {success && (
            <p className="text-xs font-bold" style={{ color: '#008000' }}>
              Thanks for signing! Your entry has been added.
            </p>
          )}

          <RetroButton type="submit" disabled={loading}>
            {loading ? 'Signing...' : 'Sign Guestbook'}
          </RetroButton>
        </form>
      </RetroWindow>

      {/* Entries */}
      <div className="mt-4 space-y-2">
        {entries.length === 0 && (
          <div className="bevel-sunken bg-white p-3 text-center text-xs text-retro-gray">
            No entries yet. Be the first to sign!
          </div>
        )}
        {entries.map((entry) => (
          <div key={entry.id} className="bevel-raised bg-retro-silver p-3">
            <div className="flex justify-between items-start mb-1">
              <span className="font-bold text-sm text-retro-navy">{entry.name}</span>
              <span className="text-[10px] text-retro-gray">
                {new Date(entry.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-xs mb-1">{entry.message}</p>
            {entry.website && (
              <a
                href={entry.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px]"
              >
                {entry.website}
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          <RetroButton
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            {'<'} Prev
          </RetroButton>
          <span className="text-xs self-center bevel-sunken bg-white px-2 py-1">
            Page {page} of {totalPages}
          </span>
          <RetroButton
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next {'>'}
          </RetroButton>
        </div>
      )}
    </div>
  );
}
