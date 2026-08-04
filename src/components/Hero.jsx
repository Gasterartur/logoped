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
        src="/video/logoped.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      <div className="container hero__inner">
        <div className="hero__content">
          <h1>
            Решу любую проблему с речью, даже в сложных случаях, когда другие
            логопеды не смогли помочь, у детей (от 2 лет) и взрослых
          </h1>
          <p className="hero__text">
            Диагностика, постановка звуков, развитие речи, подготовка к школе — и
            работа со взрослыми: афазия, техника речи, устранение акцента.
            Работаю очно и онлайн.
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
