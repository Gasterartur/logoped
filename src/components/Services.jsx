import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import './Services.css';

const SERVICES = [
  {
    icon: '🔍',
    title: 'Диагностика речи',
    text: 'Полное обследование речевого развития ребёнка, выявление причин трудностей и разработка плана коррекции.',
    link: '/diagnostika-rechi',
  },
  {
    icon: '👄',
    title: 'Постановка звуков',
    text: 'Коррекция звукопроизношения: постановка, автоматизация и введение звуков в самостоятельную речь.',
    link: '/postanovka-zvukov',
  },
  {
    icon: '💬',
    title: 'Развитие речи (ЗРР)',
    text: 'Работа с неговорящими и малоговорящими детьми: запуск речи, расширение словаря, построение фраз.',
  },
  {
    icon: '🎒',
    title: 'Подготовка к школе',
    text: 'Развитие фонематического слуха, обучение грамоте, профилактика дисграфии и дислексии.',
  },
  {
    icon: '🌊',
    title: 'Коррекция заикания',
    text: 'Комплексная работа над плавностью и темпом речи, снятие речевых судорог и тревожности.',
  },
  {
    icon: '💻',
    title: 'Онлайн-занятия',
    text: 'Эффективные логопедические занятия по видеосвязи для детей из любого города.',
  },
];

// Cards sit in a 3-column x 2-row grid: side columns fly in from their
// nearest edge, the middle column falls back to top (row 1) / bottom (row 2).
function getDirection(index) {
  const column = index % 3;
  if (column === 0) return 'left';
  if (column === 2) return 'right';
  return index < 3 ? 'top' : 'bottom';
}

function Services() {
  return (
    <section id="services" className="section section-alt services">
      <div className="container">
        <Reveal className="section-header">
          <span className="eyebrow">Услуги</span>
          <h2>Чем я могу помочь Вам или вашему ребёнку</h2>
          <p>Подбираю программу занятий индивидуально, с учётом возраста и особенностей.</p>
        </Reveal>

        <div className="services__grid">
          {SERVICES.map((service, index) => (
            <Reveal
              key={service.title}
              as={service.link ? Link : 'article'}
              to={service.link}
              className={`services__card ${service.link ? 'services__card--linked' : ''}`}
              direction={getDirection(index)}
              delay={(index % 3) * 100}
            >
              <div className="services__icon" aria-hidden="true">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              {service.link && (
                <span className="services__hint">Нажмите для подробной информации →</span>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
