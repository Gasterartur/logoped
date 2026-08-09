import { useState } from 'react';
import { Link } from 'react-router-dom';
import karimova1 from '../assets/images/karimova1.png';
import './Header.css';

const NAV_LINKS = [
  { href: '/#about', label: 'Обо мне' },
  { href: '/#services', label: 'Услуги' },
  { href: '/#prices', label: 'Цены' },
  { href: '/#reviews', label: 'Отзывы' },
  { href: '/video', label: 'Видео' },
  { href: '/#contacts', label: 'Контакты' },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__logo" onClick={closeMenu}>
          <img className="header__logo-photo" src={karimova1} alt="Светлана Каримова" />
          <span>
            Светлана Каримова
            <small>логопед-дефектолог</small>
          </span>
        </Link>

        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link to={link.href} onClick={closeMenu}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <a href="tel:+79171489510" className="header__phone">+7 (917) 148-95-10</a>
          <Link to="/#contacts" className="btn btn-primary" onClick={closeMenu}>Записаться</Link>
        </nav>

        <button
          className={`header__burger ${isMenuOpen ? 'header__burger--open' : ''}`}
          aria-label="Открыть меню"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

export default Header;
