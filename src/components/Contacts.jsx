import { useState } from 'react';
import Reveal from './Reveal';
import './Contacts.css';

const INITIAL_FORM = { name: '', phone: '', message: '' };

function Contacts() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    setForm(INITIAL_FORM);
  };

  return (
    <section id="contacts" className="section contacts">
      <div className="container">
        <Reveal className="section-header">
          <span className="eyebrow">Контакты</span>
          <h2>Запишитесь на первое занятие</h2>
          <p>Оставьте заявку, и я свяжусь с вами в течение дня, чтобы подобрать удобное время.</p>
        </Reveal>

        <div className="contacts__grid">
          <Reveal className="contacts__info">
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
          </Reveal>

          <Reveal as="form" className="contacts__form" onSubmit={handleSubmit} delay={150}>
            <label>
              Ваше имя
              <input
                type="text"
                name="name"
                placeholder="Как к вам обращаться"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Телефон
              <input
                type="tel"
                name="phone"
                placeholder="+7 (___) ___-__-__"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Сообщение
              <textarea
                name="message"
                placeholder="Расскажите о трудностях ребёнка (необязательно)"
                rows="4"
                value={form.message}
                onChange={handleChange}
              />
            </label>
            <button type="submit" className="btn btn-primary btn-block">Отправить заявку</button>
            {isSubmitted && (
              <p className="contacts__success">Спасибо! Ваша заявка отправлена, я скоро свяжусь с вами.</p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default Contacts;
