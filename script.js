function setActiveLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    link.classList.toggle('active', linkPage === currentPage);
  });
}

function injectCookieBanner() {
  if (document.getElementById('cookie-banner')) {
    return;
  }

  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.className = 'cookie-banner';
  banner.innerHTML = `
    <div class="cookie-content">
      <div>
        <strong>We value your privacy.</strong>
        <p>We use cookies to improve your shopping experience and remember your choices.</p>
      </div>
      <div class="cookie-actions">
        <button type="button" data-action="accept">Accept all</button>
        <button type="button" data-action="decline" class="secondary">Only essentials</button>
      </div>
    </div>
  `;

  document.body.appendChild(banner);

  const storedChoice = localStorage.getItem('pocketly-cookie-consent');
  if (storedChoice) {
    banner.remove();
    return;
  }

  banner.querySelector('[data-action="accept"]').addEventListener('click', () => {
    localStorage.setItem('pocketly-cookie-consent', 'accepted');
    banner.remove();
  });

  banner.querySelector('[data-action="decline"]').addEventListener('click', () => {
    localStorage.setItem('pocketly-cookie-consent', 'declined');
    banner.remove();
  });
}

fetch('header.html')
  .then(response => {
    if (!response.ok) {
      throw new Error('Header could not be loaded');
    }
    return response.text();
  })
  .then(data => {
    const header = document.getElementById('header');
    if (header) {
      header.innerHTML = data;
      setActiveLink();
    }
  })
  .catch(error => {
    console.error(error);
  });

fetch('footer.html')
  .then(response => {
    if (!response.ok) {
      throw new Error('Footer could not be loaded');
    }
    return response.text();
  })
  .then(data => {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.innerHTML = data;
    }
  })
  .catch(error => {
    console.error(error);
  });

window.addEventListener('DOMContentLoaded', injectCookieBanner);