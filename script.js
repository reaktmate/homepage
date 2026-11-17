// スマホ用メニューの開閉
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

function closeMenu() {
  nav.classList.remove('is-open');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-label', 'メニューを開く');
}

menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

// 実績の絞り込み（HOMEのみ）
const filterBtns = document.querySelectorAll('.filter-btn');
const works = document.querySelectorAll('.work');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.filter;

    filterBtns.forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    works.forEach((work) => {
      const show = type === 'all' || work.dataset.type === type;
      work.classList.toggle('is-hidden', !show);
    });
  });
});

// 表示中のセクションに合わせてナビを強調（HOMEのみ）
if (document.body.dataset.page === 'home') {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle('is-current', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

// フッターの年
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
