import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

const SOFFICE_PATHS = [
  '/usr/bin/soffice',
  '/usr/bin/libreoffice',
  '/usr/local/bin/soffice',
  '/Applications/LibreOffice.app/Contents/MacOS/soffice',
];

let sofficePathCache = null;

async function findSofficePath() {
  if (sofficePathCache) return sofficePathCache;

  for (const p of SOFFICE_PATHS) {
    try {
      await execFileAsync(p, ['--version']);
      sofficePathCache = p;
      return p;
    } catch {
      continue;
    }
  }
  throw new Error('LibreOffice not found. Install it for document conversions.');
}

export async function convertWithLibreOffice(inputPath, outputDir, outputFormat, options = {}) {
  const sofficePath = await findSofficePath();
  const args = ['--headless', '--norestore'];

  if (options.infilter) {
    args.push(`--infilter=${options.infilter}`);
  }

  const convertTo = options.exportFilter
    ? `${outputFormat}:${options.exportFilter}`
    : outputFormat;

  args.push('--convert-to', convertTo, '--outdir', outputDir, inputPath);

  const { stdout, stderr } = await execFileAsync(sofficePath, args, {
    timeout: 120000,
  });

  if (stderr && stderr.includes('Error')) {
    throw new Error(`LibreOffice conversion error: ${stderr.slice(0, 200)}`);
  }

  return { stdout, stderr };
}

export { findSofficePath };
