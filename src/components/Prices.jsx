import Reveal from './Reveal';
import './Prices.css';

const PLANS = [
  {
    title: 'Первичная диагностика',
    price: '1 500 ₽',
    duration: '60 минут',
    features: ['Обследование речи', 'Беседа с родителями', 'План коррекции'],
  },
  {
    title: 'Индивидуальное занятие',
    price: '1 200 ₽',
    duration: '45 минут',
    features: ['Очно в кабинете', 'Игровые упражнения', 'Рекомендации на дом'],
    highlighted: true,
  },
  {
    title: 'Абонемент на 8 занятий',
    price: '8 800 ₽',
    duration: 'экономия 1 800 ₽',
    features: ['Действует 2 месяца', 'Гибкое расписание', 'Отчёт о прогрессе'],
  },
  {
    title: 'Онлайн-занятие',
    price: '1 000 ₽',
    duration: '45 минут',
    features: ['По видеосвязи', 'Из любого города', 'Материалы после занятия'],
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
              delay={(index % 4) * 100}
            >
              {plan.highlighted && <span className="prices__badge">Популярно</span>}
              <h3>{plan.title}</h3>
              <div className="prices__price">{plan.price}</div>
              <div className="prices__duration">{plan.duration}</div>
              <ul className="prices__features">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a href="#contacts" className={`btn btn-block ${plan.highlighted ? 'btn-primary' : 'btn-secondary'}`}>
                Записаться
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Prices;
