import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import pricelistData from '../content/pricelist.json';
import './PricingPage.css';

const CATEGORIES = pricelistData.items;

function PricingPage() {
  return (
    <>
      <Seo
        title="Услуги и цены"
        description="Полный прайс-лист логопеда: диагностика, постановка звуков, работа с афазией, заиканием, ABA-терапия. Цены за занятие онлайн."
        path="/uslugi-i-ceny"
      />
      <section className="section pricing-page">
      <div className="container">
        <Reveal className="pricing-page__header">
          <div className="pricing-page__topline">
            <Link to="/" className="pricing-page__back">← На главную</Link>
            <span className="eyebrow">Услуги и цены</span>
            <span className="pricing-page__spacer" aria-hidden="true" />
          </div>
          <h1>Полный прайс-лист</h1>
          <p>
            Все цены указаны за одно занятие онлайн — длительность от 40 минут, зависит от возраста
            и программы. Пункты с пометкой «договорная» зависят от сложности случая и обсуждаются
            на первой консультации. Точную стоимость и план коррекции озвучу после диагностики.
          </p>
        </Reveal>

        <div className="pricing-page__categories">
          {CATEGORIES.map((category, index) => (
            <Reveal key={category.title} className="pricing-page__category" delay={(index % 2) * 100}>
              <h2>{category.title}</h2>
              <ul className="pricing-page__list">
                {category.items.map((item) => (
                  <li key={item.name}>
                    <span className="pricing-page__name">{item.name}</span>
                    <span className="pricing-page__dots" aria-hidden="true" />
                    <span className="pricing-page__price">{item.price}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="pricing-page__cta" delay={150}>
          <h2>Остались вопросы по стоимости?</h2>
          <p>Расскажите о ситуации — подберу формат занятий и озвучу точную цену.</p>
          <Link to="/#contacts" className="btn btn-primary">Записаться на консультацию</Link>
        </Reveal>
      </div>
      </section>
    </>
  );
}

export default PricingPage;
