import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import './Services.css';

const SERVICES = [
  {
    image: '/image/diagnostika.webp',
    title: 'Диагностика и развитие речи ЗРР',
    text: 'Полное обследование речи, выявление причин задержки развития и разработка плана коррекции — от диагностики до запуска речи.',
    link: '/diagnostika-rechi',
  },
  {
    image: '/image/postanovkazvuka.jpg',
    title: 'Постановка звуков',
    text: 'Коррекция звукопроизношения: постановка, автоматизация и введение звуков в самостоятельную речь.',
    link: '/postanovka-zvukov',
  },
  {
    image: '/image/afaziolog.png',
    title: 'Афазиолог. Восстановление речи при афазии',
    text: 'Работа со взрослыми после инсульта, травмы или операции: восстановление понимания и произношения речи.',
    link: '/afaziolog',
  },
  {
    image: '/image/logopedVzroslih.png',
    title: 'Логопед для взрослых',
    text: 'Техника речи, устранение акцента, коррекция дикции и звукопроизношения — индивидуально для взрослых.',
    link: '/logoped-dlya-vzroslyh',
  },
  {
    image: '/image/zaikolog.png',
    title: 'Коррекция заикания. Заиколог',
    text: 'Комплексная работа над плавностью и темпом речи, снятие речевых судорог и тревожности.',
    link: '/zaikolog',
  },
  {
    image: '/image/ABA.png',
    title: 'ABA-терапия для запуска речи при аутизме и алалии',
    text: 'Развитие коммуникации, поведения и мотивации к речи у неговорящих детей.',
    link: '/aba-terapiya',
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
              as={Link}
              to={service.link}
              className="services__card"
              direction={getDirection(index)}
              delay={(index % 3) * 100}
              animate={index !== 4}
            >
              <img className="services__bg" src={service.image} alt="" aria-hidden="true" />
              <div className="services__overlay" aria-hidden="true" />
              <div className="services__body">
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <span className="services__hint">Нажмите для подробной информации →</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
