import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import servicesData from '../content/services.json';
import './ServiceDetail.css';

function ServiceDetail({ id }) {
  const service = servicesData.items.find((item) => item.id === id);
  const paragraphs = (service?.details || '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (!service) return null;

  return (
    <>
      <Seo title={service.title} description={service.text} path={`/${id}`} />
      <section className="section service-detail">
        <div className="container">
          <Reveal className="service-detail__header">
            <div className="service-detail__topline">
              <Link to="/#services" className="service-detail__back">← Ко всем услугам</Link>
              <span className="eyebrow">Услуга</span>
              <span className="service-detail__spacer" aria-hidden="true" />
            </div>
            <h1>{service.title}</h1>
          </Reveal>

          {paragraphs.length > 0 && (
            <Reveal className="service-detail__block" delay={100} animate={false}>
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </Reveal>
          )}

          <Reveal className="service-detail__cta" delay={150}>
            <h2>Остались вопросы?</h2>
            <p>Расскажите о своей ситуации — оценю особенности и предложу план занятий.</p>
            <Link to="/#contacts" className="btn btn-primary">Записаться на консультацию</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default ServiceDetail;
