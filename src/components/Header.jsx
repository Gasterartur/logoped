import { useState } from 'react';
import './Header.css';

const NAV_LINKS = [
  { href: '#about', label: 'Обо мне' },
  { href: '#services', label: 'Услуги' },
  { href: '#prices', label: 'Цены' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#contacts', label: 'Контакты' },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#home" className="header__logo" onClick={closeMenu}>
          <img className="header__logo-photo" src="/image/karimova1.jpg" alt="Светлана Каримова" />
          <span>
            Светлана Каримова
            <small>логопед-дефектолог</small>
          </span>
        </a>

        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={closeMenu}>{link.label}</a>
              </li>
            ))}
          </ul>
          <a href="tel:+79991234567" className="header__phone">+7 (999) 123-45-67</a>
          <a href="#contacts" className="btn btn-primary" onClick={closeMenu}>Записаться</a>
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
