import Reveal from './Reveal';
import './Contacts.css';

function Contacts() {
  return (
    <section id="contacts" className="section contacts">
      <div className="container">
        <Reveal className="contacts__reveal" threshold={0.1}>
          <div className="section-header">
            <span className="eyebrow">Контакты</span>
            <h2>Запишитесь на первое занятие</h2>
            <p>Оставьте заявку, и я свяжусь с вами в течение дня, чтобы подобрать удобное время.</p>
          </div>

          <div className="contacts__grid">
            <div className="contacts__info">
              <div className="contacts__item">
                <span className="contacts__icon" aria-hidden="true">📍</span>
                <div>
                  <h3>Адрес</h3>
                  <p>ул. Петра Алабина, 2, 443032, г. Самара</p>
                </div>
              </div>

              <div className="contacts__item">
                <span className="contacts__icon" aria-hidden="true">📞</span>
                <div>
                  <h3>Телефон</h3>
                  <p><a href="tel:+79171489510">+7 (917) 148-95-10</a></p>
                </div>
              </div>
              <div className="contacts__item">
                <span className="contacts__icon" aria-hidden="true">💬</span>
                <div>
                  <h3>ВКонтакте</h3>
                  <p><a href="https://vk.com/logoped_teams_online" target="_blank" rel="noreferrer">@logoped_teams_online</a></p>
                </div>
              </div>
              <div className="contacts__item">
                <span className="contacts__icon" aria-hidden="true">🕒</span>
                <div>
                  <h3>Часы работы</h3>
                  <p>Пн–Сб: 9:00–20:00</p>
                </div>
              </div>

              <div className="contacts__map">
                <iframe
                  title="Карта проезда"
                  src="https://yandex.ru/map-widget/v1/?ll=50.073768%2C53.144759&z=17&l=map&pt=50.073768,53.144759,pm2rdm"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="contacts__cta-block">
              <h3>Напишите мне напрямую</h3>
              <p>Отвечаю в течение дня — выберите удобный способ связи.</p>
              <a
                href="https://vk.ru/im?sel=-65485890"
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary btn-block"
              >
                💬 Написать в VK
              </a>
              <a href="mailto:vukikar@yandex.ru" className="btn btn-secondary btn-block">
                ✉️ Написать на почту
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Contacts;
