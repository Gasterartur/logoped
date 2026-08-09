import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import './CookiePolicy.css';

function CookiePolicy() {
  return (
    <>
      <Seo
        title="Использование файлов cookie"
        description="Какие файлы cookie использует сайт, зачем они нужны и как их отключить в настройках браузера."
        path="/politika-cookie"
      />
      <section className="section cookie-policy">
        <div className="container">
          <Reveal className="cookie-policy__header">
            <div className="cookie-policy__topline">
              <Link to="/" className="cookie-policy__back">← На главную</Link>
              <span className="eyebrow">Файлы cookie</span>
              <span className="cookie-policy__spacer" aria-hidden="true" />
            </div>
            <h1>Использование файлов cookie</h1>
          </Reveal>

          <Reveal className="cookie-policy__block" delay={100}>
            <h2>Что такое cookie</h2>
            <p>
              Файлы cookie — это небольшие текстовые файлы, которые сайт сохраняет в вашем браузере.
              Они нужны для корректной работы отдельных элементов страницы, например встроенных карт
              и видеоплееров, и не позволяют напрямую идентифицировать вас как конкретного человека.
            </p>
          </Reveal>

          <Reveal className="cookie-policy__block" delay={150}>
            <h2>Какие cookie использует сайт</h2>
            <p>
              Сам сайт не устанавливает никаких собственных аналитических или рекламных cookie и не
              ведёт трекинг посетителей. Cookie на страницах сайта появляются только от сторонних
              встроенных сервисов:
            </p>
            <ul>
              <li>Яндекс.Карты — виджет с адресом на странице «Контакты»;</li>
              <li>YouTube и VK Видео — встроенные плееры на странице «Видео».</li>
            </ul>
            <p>
              Эти cookie устанавливаются самими сервисами по их собственным правилам — подробнее
              можно посмотреть в политиках конфиденциальности Яндекса, YouTube (Google) и VK.
            </p>
          </Reveal>

          <Reveal className="cookie-policy__block" delay={200}>
            <h2>Как отключить cookie</h2>
            <p>
              Вы можете в любой момент запретить или удалить cookie в настройках своего браузера —
              обычно это раздел «Конфиденциальность и безопасность» или «Cookie и данные сайтов».
              Обратите внимание: при полном отключении cookie некоторые элементы страниц (карта,
              видео) могут отображаться некорректно или не загружаться совсем.
            </p>
          </Reveal>

          <Reveal className="cookie-policy__block" delay={250}>
            <h2>Вопросы</h2>
            <p>
              Если у вас остались вопросы — напишите на{' '}
              <a href="mailto:vukikar@yandex.ru">vukikar@yandex.ru</a>.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default CookiePolicy;
