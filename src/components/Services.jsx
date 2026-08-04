import Reveal from './Reveal';
import './Services.css';

const SERVICES = [
  {
    icon: '🔍',
    title: 'Диагностика речи',
    text: 'Полное обследование речевого развития ребёнка, выявление причин трудностей и разработка плана коррекции.',
  },
  {
    icon: '👄',
    title: 'Постановка звуков',
    text: 'Коррекция звукопроизношения: постановка, автоматизация и введение звуков в самостоятельную речь.',
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

function Services() {
  return (
    <section id="services" className="section section-alt services">
      <div className="container">
        <Reveal className="section-header">
          <span className="eyebrow">Услуги</span>
          <h2>Чем я могу помочь вашему ребёнку</h2>
          <p>Подбираю программу занятий индивидуально, с учётом возраста и особенностей ребёнка.</p>
        </Reveal>

        <div className="services__grid">
          {SERVICES.map((service, index) => (
            <Reveal
              key={service.title}
              as="article"
              className="services__card"
              delay={(index % 3) * 100}
            >
              <div className="services__icon" aria-hidden="true">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
