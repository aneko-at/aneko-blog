// ===== Page Loader Animation (first visit or hard refresh only) =====
(function () {
  const loader = document.getElementById('page-loader');
  if (!loader) return;

  const hasAnimated = sessionStorage.getItem('at-blog-animated');

  if (hasAnimated) {
    loader.style.display = 'none';
    return;
  }

  const percentEl = loader.querySelector('.loader-percent');
  let percent = 0;
  const duration = 3600;
  const startTime = performance.now();

  function updatePercent(currentTime) {
    const elapsed = currentTime - startTime;
    percent = Math.min(100, Math.round((elapsed / duration) * 100));
    if (percentEl) percentEl.textContent = percent;
    if (percent < 100) requestAnimationFrame(updatePercent);
  }

  setTimeout(() => requestAnimationFrame(updatePercent), 1600);

  setTimeout(() => {
    loader.classList.add('loaded');
    sessionStorage.setItem('at-blog-animated', 'true');
    setTimeout(() => loader.remove(), 1500);
  }, 4200);
})();

// Hide loader on View Transition navigations
document.addEventListener('astro:after-swap', () => {
  const loader = document.getElementById('page-loader');
  if (loader) {
    loader.style.display = 'none';
  }
  window.scrollTo(0, 0);
});

// ===== Scroll Reveal =====
function initScrollReveal() {
  const elements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale, .divider-animated'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('revealed');
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

// ===== Header Scroll Effect =====
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ===== Scroll Progress Bar =====
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const max =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    bar.style.width = `${(window.scrollY / max) * 100}%`;
  });
}

// ===== Back to Top Button =====
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.pageYOffset > 300);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== Magnetic Buttons =====
function initMagneticButtons() {
  document.querySelectorAll('.magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

// ===== Initialize =====
function initAll() {
  initScrollReveal();
  initHeaderScroll();
  initScrollProgress();
  initBackToTop();
  initMagneticButtons();
}

// First load
document.addEventListener('DOMContentLoaded', initAll);

// Astro View Transitions: re-init after each navigation
document.addEventListener('astro:page-load', initAll);
