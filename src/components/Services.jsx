import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import diagnostikaImage from '../assets/images/diagnostika.webp';
import postanovkaZvukaImage from '../assets/images/postanovkazvuka.jpg';
import afaziologImage from '../assets/images/afaziolog.png';
import logopedVzroslihImage from '../assets/images/logopedVzroslih.png';
import zaikologImage from '../assets/images/zaikolog.png';
import abaImage from '../assets/images/ABA.png';
import servicesData from '../content/services.json';
import './Services.css';

// Image and link stay in code (tied to bundled assets and routes); only the
// title/text are editable content, matched to this list by id.
const SERVICE_LINKS = [
  { id: 'diagnostika-rechi', image: diagnostikaImage, link: '/diagnostika-rechi' },
  { id: 'postanovka-zvukov', image: postanovkaZvukaImage, link: '/postanovka-zvukov' },
  { id: 'afaziolog', image: afaziologImage, link: '/afaziolog' },
  { id: 'logoped-dlya-vzroslyh', image: logopedVzroslihImage, link: '/logoped-dlya-vzroslyh' },
  { id: 'zaikolog', image: zaikologImage, link: '/zaikolog' },
  { id: 'aba-terapiya', image: abaImage, link: '/aba-terapiya' },
];

const SERVICES = SERVICE_LINKS.map((link) => ({
  ...link,
  ...servicesData.items.find((item) => item.id === link.id),
}));

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
