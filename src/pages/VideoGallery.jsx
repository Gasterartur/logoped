import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import videosData from '../content/videos.json';
import { getEmbedUrl } from '../utils/videoEmbed';
import './VideoGallery.css';

function VideoGallery() {
  const videos = videosData.items;

  return (
    <>
      <Seo
        title="Видео"
        description="Видео с разбором логопедических случаев, советами и упражнениями — смотрите прямо на сайте."
        path="/video"
      />
      <section className="section video-page">
        <div className="container">
          <Reveal className="video-page__header">
            <div className="video-page__topline">
              <Link to="/" className="video-page__back">← На главную</Link>
              <span className="eyebrow">Видео</span>
              <span className="video-page__spacer" aria-hidden="true" />
            </div>
            <h1>Видео</h1>
            <p>Разборы случаев, советы и упражнения — можно посмотреть прямо здесь.</p>
          </Reveal>

          {videos.length === 0 ? (
            <p className="video-page__empty">Видео скоро появятся.</p>
          ) : (
            <div className="video-page__grid">
              {videos.map((video, index) => {
                const embed = getEmbedUrl(video.url);
                return (
                  <Reveal key={index} className="video-page__card" delay={(index % 3) * 100}>
                    {embed ? (
                      <div className="video-page__player">
                        <iframe
                          src={embed.embedUrl}
                          title={video.title || 'Видео'}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <a className="video-page__fallback" href={video.url} target="_blank" rel="noreferrer">
                        ▶ Смотреть видео
                      </a>
                    )}
                    {video.title && <h3>{video.title}</h3>}
                  </Reveal>
                );
              })}
            </div>
          )}

          <Reveal className="video-page__cta" delay={100}>
            <h2>Остались вопросы?</h2>
            <p>Расскажите о своей ситуации — оценю особенности и предложу план занятий.</p>
            <Link to="/#contacts" className="btn btn-primary">Записаться на консультацию</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default VideoGallery;
