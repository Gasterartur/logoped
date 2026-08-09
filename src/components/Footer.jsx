import { Link } from 'react-router-dom';
import './Footer.css';

const NAV_LINKS = [
  { href: '/#about', label: 'Обо мне' },
  { href: '/#services', label: 'Услуги' },
  { href: '/#prices', label: 'Цены' },
  { href: '/#reviews', label: 'Отзывы' },
  { href: '/#contacts', label: 'Контакты' },
  { href: '/uslugi-i-ceny', label: 'Полный прайс-лист' },
  { href: '/video', label: 'Видео' },
];

const SOCIALS = [
  { href: 'https://vk.com/logoped_teams_online', label: 'VK', icon: 'VK' },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">🗣️ Светлана Каримова</span>
          <p>Логопед-дефектолог. Помогаю детям говорить чисто и уверенно.</p>
        </div>

        <nav className="footer__nav">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}><Link to={link.href}>{link.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="footer__socials">
          {SOCIALS.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          © {year} Светлана Каримова. Все права защищены.
        </div>
        <div className="creater">
          Сайт создан студией Лабрити <a href="https://labrity.com/ru" target="_blank" rel="noreferrer">Перейти на сайт студии</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
