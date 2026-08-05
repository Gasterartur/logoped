import heroVideo from '../assets/video/logoped1.webm';
import './Hero.css';

const STATS = [
  { value: '20+ лет', label: 'опыта работы' },
  { value: '500+', label: 'учеников' },
  { value: '98%', label: 'довольных родителей' },
];

function Hero() {
  return (
    <section id="home" className="hero">
      <video
        className="hero__bg-video"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      />

      <div className="container hero__inner">
        <div className="hero__content">
          <h1>
            Решу любую<br />
            проблему<br />
            с речью<br />
            у детей (от 2 лет)<br />
            и у взрослых.
            <span className="hero__subtle">
              Даже в сложных случаях, когда другие логопеды не смогли помочь.
            </span>
          </h1>
          <p className="hero__text">
            Диагностика, постановка звуков, развитие речи, подготовка к школе — и
            работа со взрослыми: афазия, техника речи, устранение акцента.
            Работаю онлайн.
          </p>
          <div className="hero__actions">
            <a href="#contacts" className="btn btn-primary">Записаться на диагностику</a>
            <a href="#prices" className="btn btn-secondary">Узнать цены</a>
          </div>

          <dl className="hero__stats">
            {STATS.map((stat) => (
              <div key={stat.label} className="hero__stat">
                <dt>{stat.value}</dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export default Hero;
