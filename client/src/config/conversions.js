export const CATEGORY_CONFIG = {
  document: {
    displayName: 'Documents',
    color: '#000080',
    bgColor: '#C0C0C0',
    icon: 'doc',
  },
  image: {
    displayName: 'Images',
    color: '#008080',
    bgColor: '#C0C0C0',
    icon: 'img',
  },
  spreadsheet: {
    displayName: 'Spreadsheets',
    color: '#008000',
    bgColor: '#C0C0C0',
    icon: 'xls',
  },
  presentation: {
    displayName: 'Presentations',
    color: '#FF8800',
    bgColor: '#C0C0C0',
    icon: 'ppt',
  },
  'pdf-tools': {
    displayName: 'PDF Tools',
    color: '#FF0000',
    bgColor: '#C0C0C0',
    icon: 'pdf',
  },
};

export const FORMAT_COLORS = {
  '.pdf': { bg: '#FF0000', text: '#FFFFFF' },
  '.doc': { bg: '#000080', text: '#FFFFFF' },
  '.docx': { bg: '#000080', text: '#FFFFFF' },
  '.xls': { bg: '#008000', text: '#FFFFFF' },
  '.xlsx': { bg: '#008000', text: '#FFFFFF' },
  '.ppt': { bg: '#FF8800', text: '#000000' },
  '.pptx': { bg: '#FF8800', text: '#000000' },
  '.png': { bg: '#008080', text: '#FFFFFF' },
  '.jpg': { bg: '#008080', text: '#FFFFFF' },
  '.jpeg': { bg: '#008080', text: '#FFFFFF' },
  '.webp': { bg: '#008080', text: '#FFFFFF' },
  '.html': { bg: '#800080', text: '#FFFFFF' },
  '.htm': { bg: '#800080', text: '#FFFFFF' },
  '.csv': { bg: '#808080', text: '#FFFFFF' },
  '.zip': { bg: '#404040', text: '#FFFFFF' },
};

export const ICON_SVGS = {
  pdf: (
    `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="1" width="12" height="14" fill="#FF0000" stroke="#000" stroke-width="1"/>
      <rect x="4" y="3" width="8" height="2" fill="#FFF"/>
      <rect x="4" y="7" width="8" height="2" fill="#FFF"/>
      <rect x="4" y="11" width="5" height="2" fill="#FFF"/>
    </svg>`
  ),
  word: (
    `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="1" width="12" height="14" fill="#000080" stroke="#000" stroke-width="1"/>
      <text x="8" y="11" text-anchor="middle" fill="#FFF" font-size="8" font-family="monospace">W</text>
    </svg>`
  ),
  excel: (
    `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="1" width="12" height="14" fill="#008000" stroke="#000" stroke-width="1"/>
      <text x="8" y="11" text-anchor="middle" fill="#FFF" font-size="8" font-family="monospace">X</text>
    </svg>`
  ),
  ppt: (
    `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="1" width="12" height="14" fill="#FF8800" stroke="#000" stroke-width="1"/>
      <text x="8" y="11" text-anchor="middle" fill="#000" font-size="8" font-family="monospace">P</text>
    </svg>`
  ),
  image: (
    `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="1" width="12" height="14" fill="#008080" stroke="#000" stroke-width="1"/>
      <rect x="4" y="4" width="4" height="4" fill="#FFFF00"/>
      <polygon points="4,12 8,8 12,12" fill="#00FF00"/>
    </svg>`
  ),
  html: (
    `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="1" width="12" height="14" fill="#800080" stroke="#000" stroke-width="1"/>
      <text x="8" y="11" text-anchor="middle" fill="#FFF" font-size="6" font-family="monospace">&lt;/&gt;</text>
    </svg>`
  ),
  csv: (
    `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="1" width="12" height="14" fill="#808080" stroke="#000" stroke-width="1"/>
      <rect x="4" y="3" width="3" height="2" fill="#FFF"/>
      <rect x="9" y="3" width="3" height="2" fill="#FFF"/>
      <rect x="4" y="7" width="3" height="2" fill="#FFF"/>
      <rect x="9" y="7" width="3" height="2" fill="#FFF"/>
      <rect x="4" y="11" width="3" height="2" fill="#FFF"/>
      <rect x="9" y="11" width="3" height="2" fill="#FFF"/>
    </svg>`
  ),
};
