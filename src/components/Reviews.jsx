import Reveal from './Reveal';
import reviewsData from '../content/reviews.json';
import './Reviews.css';

const REVIEWS = reviewsData.items;

function Reviews() {
  return (
    <section id="reviews" className="section section-alt reviews">
      <div className="container">
        <Reveal className="section-header">
          <span className="eyebrow">Отзывы</span>
          <h2>Что говорят клиенты</h2>
          <p>Реальные отзывы с обсуждения ВКонтакте — с прямыми ссылками на профили авторов.</p>
        </Reveal>

        <div className="reviews__grid">
          {REVIEWS.map((review, index) => (
            <Reveal
              key={review.name}
              as="blockquote"
              className="reviews__card"
              delay={(index % 3) * 100}
            >
              <div className="reviews__stars" aria-label={`Оценка ${review.rating} из 5`}>
                {'★'.repeat(review.rating)}
              </div>
              <p className="reviews__text">«{review.text}»</p>
              <footer className="reviews__footer">
                <a
                  href={review.vk}
                  target="_blank"
                  rel="noreferrer"
                  className="reviews__author"
                >
                  {review.name}
                </a>
                <span className="reviews__subtitle">{review.subtitle}</span>
              </footer>
            </Reveal>
          ))}
        </div>

        <Reveal className="reviews__more" delay={100}>
          <a
            href="https://vk.com/topic-65485890_29392629"
            target="_blank"
            rel="noreferrer"
            className="reviews__more-link"
          >
            Читать все отзывы ВКонтакте →
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export default Reviews;
