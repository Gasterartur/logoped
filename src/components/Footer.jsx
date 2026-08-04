import { Link } from 'react-router-dom';
import './Footer.css';

const NAV_LINKS = [
  { href: '/#about', label: 'Обо мне' },
  { href: '/#services', label: 'Услуги' },
  { href: '/#prices', label: 'Цены' },
  { href: '/#reviews', label: 'Отзывы' },
  { href: '/#contacts', label: 'Контакты' },
  { href: '/uslugi-i-ceny', label: 'Полный прайс-лист' },
];

const SOCIALS = [
  { href: 'https://vk.com', label: 'VK', icon: 'VK' },
  { href: 'https://t.me', label: 'Telegram', icon: '✈️' },
  { href: 'https://wa.me', label: 'WhatsApp', icon: '💬' },
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
          © {year} Светлана Каримова. Логопедический сайт-шаблон. Все права защищены.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
