import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import pricesData from '../content/prices.json';
import './Prices.css';

const PLANS = pricesData.items;

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
          <p className="prices__hint">Занятие — от 40 минут, точная длительность зависит от возраста и программы.</p>
          <Link to="/uslugi-i-ceny" className="prices__more-link">
            Смотреть полный список услуг и цен →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export default Prices;
