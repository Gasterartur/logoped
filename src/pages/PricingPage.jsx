import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import './PricingPage.css';

const CATEGORIES = [
  {
    title: 'Логопедическая помощь',
    items: [
      { name: 'Логопед (дети)', price: '2 000 — 2 500 ₽' },
      { name: 'Логопед для взрослых', price: '2 000 ₽' },
      { name: 'Логопед-дефектолог', price: '2 500 ₽' },
      { name: 'Постановка звуков', price: 'договорная' },
      { name: 'Развитие речи', price: 'договорная' },
      { name: 'Логопедический массаж', price: '3 000 ₽' },
      { name: 'Техника речи / актёрское мастерство', price: 'договорная' },
    ],
  },
  {
    title: 'Речевые нарушения и диагнозы',
    items: [
      { name: 'ОНР', price: '2 000 ₽' },
      { name: 'ФФНР', price: 'договорная' },
      { name: 'Алалия', price: '2 000 ₽' },
      { name: 'Дислалия', price: '2 670 ₽' },
      { name: 'Дизартрия', price: '2 000 ₽' },
      { name: 'Заикание', price: '2 000 ₽' },
      { name: 'Афазия', price: '2 000 ₽' },
      { name: 'Дислексия', price: '2 000 ₽' },
      { name: 'Ринолалия', price: '1 600 ₽' },
    ],
  },
  {
    title: 'Особые потребности и коррекционная педагогика',
    items: [
      { name: 'Коррекционная педагогика', price: '2 000 ₽' },
      { name: 'Аутизм', price: '2 500 ₽' },
      { name: 'ABA-терапия', price: '2 500 ₽' },
      { name: 'Миофункциональная коррекция', price: '2 500 ₽' },
      { name: 'Фонопедия', price: '2 000 ₽' },
    ],
  },
  {
    title: 'Развивающие занятия',
    items: [
      { name: 'Развитие фонематического слуха', price: 'договорная' },
      { name: 'Развитие речевого дыхания', price: 'договорная' },
      { name: 'Пальчиковая гимнастика', price: 'договорная' },
      { name: 'Логоритмика', price: 'договорная' },
      { name: 'Подготовка к поступлению в 1 класс', price: 'договорная' },
    ],
  },
];

function PricingPage() {
  return (
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
            Все цены указаны за занятие продолжительностью 60 минут, очно (Самара) или онлайн.
            Пункты с пометкой «договорная» зависят от сложности случая и обсуждаются на первой
            консультации. Точную стоимость и план коррекции озвучу после диагностики.
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
  );
}

export default PricingPage;
