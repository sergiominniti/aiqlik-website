(function () {
  'use strict';

  var STORAGE_KEY = 'aiqlik_cookie_consent';
  var consent = localStorage.getItem(STORAGE_KEY);
  if (consent) return; // already decided

  var banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-modal', 'false');
  banner.setAttribute('aria-label', 'Consenso cookie');
  banner.innerHTML = [
    '<div style="display:flex;align-items:flex-start;gap:16px;flex-wrap:wrap;">',
      '<div style="flex:1;min-width:220px;">',
        '<p style="font-family:\'Outfit\',sans-serif;font-weight:700;font-size:15px;color:#f1f5f9;margin:0 0 6px;">',
          '🍪 Questo sito usa i cookie',
        '</p>',
        '<p style="font-size:13px;color:#94a3b8;margin:0;line-height:1.55;">',
          'Usiamo cookie tecnici (necessari) e analitici per migliorare l\'esperienza. ',
          'Leggi la nostra <a href="/cookie" style="color:#14B8A6;text-decoration:underline;">Cookie Policy</a>.',
        '</p>',
      '</div>',
      '<div style="display:flex;gap:10px;align-items:center;flex-shrink:0;flex-wrap:wrap;">',
        '<button id="cookie-reject" style="',
          'background:transparent;border:1px solid #334155;color:#94a3b8;',
          'font-size:13px;font-weight:600;padding:8px 16px;border-radius:8px;cursor:pointer;',
          'font-family:\'DM Sans\',sans-serif;white-space:nowrap;transition:border-color .2s,color .2s;',
        '">Solo necessari</button>',
        '<button id="cookie-accept" style="',
          'background:linear-gradient(135deg,#0D9488,#14B8A6);border:none;color:#fff;',
          'font-size:13px;font-weight:700;padding:8px 20px;border-radius:8px;cursor:pointer;',
          'font-family:\'DM Sans\',sans-serif;white-space:nowrap;',
          'box-shadow:0 0 16px rgba(13,148,136,0.35);',
        '">Accetta tutti</button>',
      '</div>',
    '</div>',
  ].join('');

  Object.assign(banner.style, {
    position: 'fixed',
    bottom: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'calc(100% - 48px)',
    maxWidth: '860px',
    background: '#1E293B',
    border: '1px solid #334155',
    borderRadius: '16px',
    padding: '20px 24px',
    boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(13,148,136,0.10)',
    zIndex: '9999',
    boxSizing: 'border-box',
    animation: 'cookie-slide-up .35s ease',
  });

  // Keyframe animation
  var style = document.createElement('style');
  style.textContent = [
    '@keyframes cookie-slide-up {',
      'from { opacity:0; transform:translateX(-50%) translateY(24px); }',
      'to   { opacity:1; transform:translateX(-50%) translateY(0); }',
    '}',
    '#cookie-reject:hover { border-color:#0D9488 !important; color:#14B8A6 !important; }',
  ].join('');
  document.head.appendChild(style);

  function dismiss(value) {
    localStorage.setItem(STORAGE_KEY, value);
    banner.style.animation = 'none';
    banner.style.opacity = '0';
    banner.style.transition = 'opacity .25s';
    setTimeout(function () { banner.remove(); }, 280);
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.body.appendChild(banner);
    document.getElementById('cookie-accept').addEventListener('click', function () { dismiss('all'); });
    document.getElementById('cookie-reject').addEventListener('click', function () { dismiss('essential'); });
  });
})();
