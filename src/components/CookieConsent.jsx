import { useEffect, useState } from 'react';
import './CookieConsent.css';

const STORAGE_KEY = 'cookie-consent';

function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-consent" role="dialog" aria-label="Согласие на использование cookie">
      <p>
        Мы используем файлы cookie для персонализации сервисов и повышения удобства пользования
        сайтом. Файлы cookie — это небольшие текстовые файлы, которые сохраняются в вашем браузере.
        Вы можете изменить настройки браузера или покинуть сайт, если не согласны с их
        использованием. Продолжая пользоваться сайтом, вы даёте согласие на использование файлов
        cookie.
      </p>
      <button type="button" className="btn btn-primary" onClick={accept}>Хорошо</button>
    </div>
  );
}

export default CookieConsent;
