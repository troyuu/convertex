import PageContainer from '../components/layout/PageContainer';
import RetroWindow from '../components/ui/RetroWindow';

export default function PrivacyPage() {
  return (
    <PageContainer>
      <RetroWindow title="privacy.txt - Notepad">
        <div className="bg-white p-4 font-mono text-xs leading-relaxed max-h-[70vh] overflow-y-auto">
          <pre className="whitespace-pre-wrap">
{`==============================================
  CONVERTEX PRIVACY POLICY
  Last Updated: 2026
  File: privacy.txt
==============================================

WHAT HAPPENS WHEN YOU UPLOAD
-----------------------------
Your file is sent over an encrypted HTTPS
connection to our server. It is saved in a
temporary private folder that ONLY your
conversion job can access. No other user or
process can see your file.

WHAT HAPPENS DURING CONVERSION
-------------------------------
Your file is converted using open-source
tools (LibreOffice, Sharp, etc.) running
on our server. No human ever sees, reads,
or accesses your document. The conversion
is fully automated.

WHAT HAPPENS AFTER CONVERSION
------------------------------
The MOMENT you download your converted file,
both the original AND converted files are
PERMANENTLY DELETED from our server. Gone.
Wiped. Destroyed. No recovery possible.

Even if you forget to download, files are
automatically deleted after 30 minutes.
No file EVER survives longer than 30 minutes
on our server.

WHAT WE STORE
--------------
Only anonymous statistics:
- Total number of conversions performed
- Most popular conversion type
- File sizes (just the numbers, NOT the files)

We do NOT store:
- File names
- File contents
- Your IP address (we hash it for rate
  limiting, but the hash is non-reversible)

WHAT WE DON'T DO
-----------------
[x] We DON'T sell your data
[x] We DON'T use analytics trackers
[x] We DON'T use tracking cookies
[x] We DON'T store IP addresses
[x] We DON'T have user accounts
    (because we don't want your data)
[x] We DON'T use cloud storage
    (files never leave our server)
[x] We DON'T keep backups of your files
[x] We DON'T share anything with third parties

THE BOTTOM LINE
----------------
We built Convertex because we wanted a file
converter that we ourselves would trust with
our own documents. Your files are safe here.

If you have questions, sign our guestbook!

==============================================
  END OF FILE
==============================================`}
          </pre>
        </div>
      </RetroWindow>
    </PageContainer>
  );
}
