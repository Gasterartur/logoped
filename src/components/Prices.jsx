import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import './Prices.css';

const PLANS = [
  {
    title: 'Диагностика и консультация',
    price: 'договорная',
    duration: '60 минут',
    features: ['Обследование речи', 'Беседа с родителями', 'План коррекции'],
    badge: 'Первый шаг',
  },
  {
    title: 'Индивидуальное занятие',
    price: '2 000–2 500 ₽',
    duration: '60 минут',
    features: ['Очно в кабинете', 'Игровые упражнения', 'Рекомендации на дом'],
    badge: 'Популярно',
    highlighted: true,
  },
  {
    title: 'Онлайн-занятие',
    price: 'от 2 000 ₽',
    duration: '60 минут',
    features: ['По видеосвязи', 'Из любого города', 'Материалы после занятия'],
    badge: 'Мобильно',
  },
];

function Prices() {
  return (
    <section id="prices" className="section prices">
      <div className="container">
        <Reveal className="section-header">
          <span className="eyebrow">Цены</span>
          <h2>Стоимость занятий</h2>
          <p>Прозрачные цены без скрытых доплат. Точную стоимость программы озвучу после диагностики.</p>
        </Reveal>

        <div className="prices__grid">
          {PLANS.map((plan, index) => (
            <Reveal
              key={plan.title}
              className={`prices__card ${plan.highlighted ? 'prices__card--highlighted' : ''}`}
              delay={(index % 3) * 100}
            >
              {plan.badge && <span className="prices__badge">{plan.badge}</span>}
              <h3>{plan.title}</h3>
              <div className="prices__price">{plan.price}</div>
              <div className="prices__duration">{plan.duration}</div>
              <ul className="prices__features">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a href="#contacts" className="btn btn-block btn-secondary">
                Записаться
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="prices__more" delay={100}>
          <Link to="/uslugi-i-ceny" className="prices__more-link">
            Смотреть полный список услуг и цен →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export default Prices;
