// 1. Pega os elementos que vamos manipular
const root = document.documentElement;          // a tag <html>
const toggleButton = document.getElementById('theme-toggle');
const avatar = document.querySelector('.hero-avatar');

// 2. Função que aplica o tema (light ou dark) e atualiza tudo que depende dele
function applyTheme(isLight) {
  root.classList.toggle('light', isLight);

  toggleButton.textContent = isLight ? '☀️' : '🌙';
  toggleButton.setAttribute('aria-pressed', String(isLight));
  toggleButton.setAttribute(
    'aria-label',
    isLight ? 'Alternar para modo escuro' : 'Alternar para modo claro'
  );

  // troca a foto de perfil pela versão certa
  avatar.src = isLight ? './assets/avatar-light.png' : './assets/avatar.png';
}

// 3. Ao carregar a página: usa o que a pessoa escolheu antes (localStorage)
//    ou, se nunca escolheu, respeita a preferência do sistema operacional
const savedTheme = localStorage.getItem('theme');
const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

applyTheme(savedTheme ? savedTheme === 'light' : systemPrefersLight);

// 4. Ao clicar no botão: inverte o tema atual e salva a escolha
toggleButton.addEventListener('click', () => {
  const isLight = !root.classList.contains('light');
  applyTheme(isLight);
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});