export const ROUTES = [
  { path: '/', label: 'Home', icon: 'home' },
  { path: '/tools', label: 'Tools', icon: 'tools' },
  { path: '/privacy', label: 'Privacy', icon: 'lock' },
  { path: '/about', label: 'About', icon: 'info' },
  { path: '/guestbook', label: 'Guestbook', icon: 'book' },
  { path: '/donation', label: 'Donate', icon: 'donate' },
];

export const getRoute = (path) => ROUTES.find((r) => r.path === path);
