import { useEffect, useState } from 'react';
import { getEmbedUrl } from '../utils/videoEmbed';
import './Admin.css';

const COLLECTION_LABELS = {
  prices: 'Цены',
  services: 'Услуги',
  reviews: 'Отзывы',
  pricelist: 'Полный прайс-лист',
  videos: 'Видео',
};

function useCollection(endpoint) {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/content?file=${endpoint}`, { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error('Не удалось загрузить данные');
        return res.json();
      })
      .then((data) => setItems(data.content.items))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [endpoint]);

  async function save(nextItems) {
    setSaving(true);
    setError('');
    setSavedMessage('');
    try {
      const res = await fetch(`/api/admin/content?file=${endpoint}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: nextItems }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Ошибка сохранения');
      }
      setItems(nextItems);
      setSavedMessage('Сохранено');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return { items, setItems, loading, saving, error, savedMessage, save };
}

function SaveRow({ saving, error, savedMessage, onSave }) {
  return (
    <div className="admin__save-row">
      <button type="button" className="btn btn-primary" onClick={onSave} disabled={saving}>
        {saving ? 'Сохраняем…' : 'Сохранить'}
      </button>
      {savedMessage && <span className="admin__saved">{savedMessage}</span>}
      {error && <span className="admin__error">{error}</span>}
    </div>
  );
}

const EMPTY_PRICE = { title: '', price: '', duration: '', features: [], badge: '', highlighted: false };

function PricesEditor() {
  const { items, setItems, loading, saving, error, savedMessage, save } = useCollection('prices');

  if (loading) return <p>Загрузка…</p>;
  if (!items) return <p className="admin__error">{error}</p>;

  const update = (index, patch) => setItems(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  const remove = (index) => setItems(items.filter((_, i) => i !== index));
  const add = () => setItems([...items, { ...EMPTY_PRICE }]);
  const move = (index, dir) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
  };

  return (
    <div className="admin__collection">
      {items.map((item, index) => (
        <div key={index} className="admin__card">
          <div className="admin__card-row admin__card-row--title">
            <label>
              Название
              <input value={item.title} onChange={(e) => update(index, { title: e.target.value })} />
            </label>
            <label>
              Цена
              <input value={item.price} onChange={(e) => update(index, { price: e.target.value })} />
            </label>
          </div>
          <div className="admin__card-row">
            <label>
              Подпись под ценой
              <input value={item.duration} onChange={(e) => update(index, { duration: e.target.value })} />
            </label>
            <label>
              Бейдж (необязательно)
              <input value={item.badge || ''} onChange={(e) => update(index, { badge: e.target.value })} />
            </label>
          </div>
          <label>
            Что входит (по одному пункту на строку)
            <textarea
              value={item.features.join('\n')}
              onChange={(e) => update(index, { features: e.target.value.split('\n').filter(Boolean) })}
            />
          </label>
          <label className="admin__checkbox">
            <input
              type="checkbox"
              checked={Boolean(item.highlighted)}
              onChange={(e) => update(index, { highlighted: e.target.checked })}
            />
            Выделить карточку зелёной рамкой
          </label>
          <div className="admin__card-actions">
            <button type="button" onClick={() => move(index, -1)} disabled={index === 0}>↑</button>
            <button type="button" onClick={() => move(index, 1)} disabled={index === items.length - 1}>↓</button>
            <button type="button" className="admin__remove" onClick={() => remove(index)}>Удалить</button>
          </div>
        </div>
      ))}
      <button type="button" className="btn btn-secondary" onClick={add}>+ Добавить тариф</button>
      <SaveRow saving={saving} error={error} savedMessage={savedMessage} onSave={() => save(items)} />
    </div>
  );
}

function ServicesEditor() {
  const { items, setItems, loading, saving, error, savedMessage, save } = useCollection('services');
  const [index, setIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [draftDetails, setDraftDetails] = useState('');

  if (loading) return <p>Загрузка…</p>;
  if (!items) return <p className="admin__error">{error}</p>;

  const item = items[index];
  const update = (patch) => setItems(items.map((it, i) => (i === index ? { ...it, ...patch } : it)));
  const go = (dir) => setIndex((i) => (i + dir + items.length) % items.length);

  function openDetailsModal() {
    setDraftDetails(item.details || '');
    setModalOpen(true);
  }

  function saveDetailsModal() {
    update({ details: draftDetails });
    setModalOpen(false);
  }

  return (
    <div className="admin__collection">
      <p className="admin__hint">
        Карточки услуг привязаны к разделам сайта по id — добавлять или удалять их здесь нельзя, только менять текст.
      </p>

      <div className="admin__carousel">
        <button type="button" className="admin__carousel-arrow" onClick={() => go(-1)} aria-label="Предыдущая услуга">‹</button>

        <div className="admin__carousel-page">
          <div className="admin__carousel-counter">{index + 1} / {items.length}</div>
          <div className="admin__card admin__card--full">
            <label>
              Название карточки
              <input value={item.title} onChange={(e) => update({ title: e.target.value })} />
            </label>
            <label>
              Краткое описание (на главной странице)
              <textarea value={item.text} onChange={(e) => update({ text: e.target.value })} />
            </label>
            <button type="button" className="btn btn-secondary" onClick={openDetailsModal}>
              Редактировать подробное описание →
            </button>
          </div>
        </div>

        <button type="button" className="admin__carousel-arrow" onClick={() => go(1)} aria-label="Следующая услуга">›</button>
      </div>

      <SaveRow saving={saving} error={error} savedMessage={savedMessage} onSave={() => save(items)} />

      {modalOpen && (
        <div className="admin__modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="admin__modal" onClick={(e) => e.stopPropagation()}>
            <h2>Подробное описание — {item.title}</h2>
            <p className="admin__hint">Разделяйте абзацы пустой строкой — так они будут выводиться на странице услуги.</p>
            <textarea
              className="admin__modal-textarea"
              value={draftDetails}
              onChange={(e) => setDraftDetails(e.target.value)}
            />
            <div className="admin__modal-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Отмена</button>
              <button type="button" className="btn btn-primary" onClick={saveDetailsModal}>Готово</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const EMPTY_REVIEW = { name: '', subtitle: '', vk: '', text: '', rating: 5 };

function ReviewsEditor() {
  const { items, setItems, loading, saving, error, savedMessage, save } = useCollection('reviews');

  if (loading) return <p>Загрузка…</p>;
  if (!items) return <p className="admin__error">{error}</p>;

  const update = (index, patch) => setItems(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  const remove = (index) => setItems(items.filter((_, i) => i !== index));
  const add = () => setItems([...items, { ...EMPTY_REVIEW }]);
  const move = (index, dir) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
  };

  return (
    <div className="admin__collection">
      {items.map((item, index) => (
        <div key={index} className="admin__card">
          <div className="admin__card-row">
            <label>
              Имя автора
              <input value={item.name} onChange={(e) => update(index, { name: e.target.value })} />
            </label>
            <label>
              Подпись (кто, чей ребёнок)
              <input value={item.subtitle} onChange={(e) => update(index, { subtitle: e.target.value })} />
            </label>
          </div>
          <div className="admin__card-row">
            <label>
              Ссылка на профиль VK
              <input value={item.vk} onChange={(e) => update(index, { vk: e.target.value })} />
            </label>
            <label>
              Оценка (1–5)
              <input
                type="number"
                min="1"
                max="5"
                value={item.rating}
                onChange={(e) => update(index, { rating: Number(e.target.value) })}
              />
            </label>
          </div>
          <label>
            Текст отзыва
            <textarea value={item.text} onChange={(e) => update(index, { text: e.target.value })} />
          </label>
          <div className="admin__card-actions">
            <button type="button" onClick={() => move(index, -1)} disabled={index === 0}>↑</button>
            <button type="button" onClick={() => move(index, 1)} disabled={index === items.length - 1}>↓</button>
            <button type="button" className="admin__remove" onClick={() => remove(index)}>Удалить</button>
          </div>
        </div>
      ))}
      <button type="button" className="btn btn-secondary" onClick={add}>+ Добавить отзыв</button>
      <SaveRow saving={saving} error={error} savedMessage={savedMessage} onSave={() => save(items)} />
    </div>
  );
}

const EMPTY_CATEGORY_ITEM = { name: '', price: '' };

function PriceListEditor() {
  const { items, setItems, loading, saving, error, savedMessage, save } = useCollection('pricelist');

  if (loading) return <p>Загрузка…</p>;
  if (!items) return <p className="admin__error">{error}</p>;

  const updateCategory = (catIndex, patch) =>
    setItems(items.map((cat, i) => (i === catIndex ? { ...cat, ...patch } : cat)));
  const removeCategory = (catIndex) => setItems(items.filter((_, i) => i !== catIndex));
  const addCategory = () => setItems([...items, { title: '', items: [] }]);
  const moveCategory = (catIndex, dir) => {
    const target = catIndex + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[catIndex], next[target]] = [next[target], next[catIndex]];
    setItems(next);
  };

  const updateRow = (catIndex, rowIndex, patch) => {
    const category = items[catIndex];
    const nextRows = category.items.map((row, i) => (i === rowIndex ? { ...row, ...patch } : row));
    updateCategory(catIndex, { items: nextRows });
  };
  const removeRow = (catIndex, rowIndex) => {
    const category = items[catIndex];
    updateCategory(catIndex, { items: category.items.filter((_, i) => i !== rowIndex) });
  };
  const addRow = (catIndex) => {
    const category = items[catIndex];
    updateCategory(catIndex, { items: [...category.items, { ...EMPTY_CATEGORY_ITEM }] });
  };
  const moveRow = (catIndex, rowIndex, dir) => {
    const category = items[catIndex];
    const target = rowIndex + dir;
    if (target < 0 || target >= category.items.length) return;
    const nextRows = [...category.items];
    [nextRows[rowIndex], nextRows[target]] = [nextRows[target], nextRows[rowIndex]];
    updateCategory(catIndex, { items: nextRows });
  };

  return (
    <div className="admin__collection">
      {items.map((category, catIndex) => (
        <div key={catIndex} className="admin__card">
          <div className="admin__card-row">
            <label>
              Название категории
              <input
                value={category.title}
                onChange={(e) => updateCategory(catIndex, { title: e.target.value })}
              />
            </label>
            <div className="admin__card-actions admin__card-actions--inline">
              <button type="button" onClick={() => moveCategory(catIndex, -1)} disabled={catIndex === 0}>↑</button>
              <button type="button" onClick={() => moveCategory(catIndex, 1)} disabled={catIndex === items.length - 1}>↓</button>
              <button type="button" className="admin__remove" onClick={() => removeCategory(catIndex)}>Удалить категорию</button>
            </div>
          </div>

          <div className="admin__price-rows">
            {category.items.map((row, rowIndex) => (
              <div key={rowIndex} className="admin__price-row">
                <input
                  placeholder="Название услуги"
                  value={row.name}
                  onChange={(e) => updateRow(catIndex, rowIndex, { name: e.target.value })}
                />
                <input
                  placeholder="Цена"
                  value={row.price}
                  onChange={(e) => updateRow(catIndex, rowIndex, { price: e.target.value })}
                />
                <div className="admin__card-actions">
                  <button type="button" onClick={() => moveRow(catIndex, rowIndex, -1)} disabled={rowIndex === 0}>↑</button>
                  <button type="button" onClick={() => moveRow(catIndex, rowIndex, 1)} disabled={rowIndex === category.items.length - 1}>↓</button>
                  <button type="button" className="admin__remove" onClick={() => removeRow(catIndex, rowIndex)}>Удалить</button>
                </div>
              </div>
            ))}
          </div>
          <button type="button" className="btn btn-secondary" onClick={() => addRow(catIndex)}>+ Добавить услугу</button>
        </div>
      ))}
      <button type="button" className="btn btn-secondary" onClick={addCategory}>+ Добавить категорию</button>
      <SaveRow saving={saving} error={error} savedMessage={savedMessage} onSave={() => save(items)} />
    </div>
  );
}

const EMPTY_VIDEO = { title: '', url: '' };

function VideosEditor() {
  const { items, setItems, loading, saving, error, savedMessage, save } = useCollection('videos');

  if (loading) return <p>Загрузка…</p>;
  if (!items) return <p className="admin__error">{error}</p>;

  const update = (index, patch) => setItems(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  const remove = (index) => setItems(items.filter((_, i) => i !== index));
  const add = () => setItems([...items, { ...EMPTY_VIDEO }]);
  const move = (index, dir) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
  };

  return (
    <div className="admin__collection">
      <p className="admin__hint">
        Вставьте ссылку на видео с YouTube, VK Видео или RuTube — плеер встроится на сайте автоматически.
        Ссылки с других сервисов покажутся как обычная кнопка «Смотреть видео».
      </p>
      {items.map((item, index) => {
        const embed = getEmbedUrl(item.url);
        return (
          <div key={index} className="admin__card">
            <label>
              Название (необязательно)
              <input value={item.title} onChange={(e) => update(index, { title: e.target.value })} />
            </label>
            <label>
              Ссылка на видео
              <input
                value={item.url}
                onChange={(e) => update(index, { url: e.target.value })}
                placeholder="https://..."
              />
            </label>
            {item.url && (
              embed
                ? <p className="admin__saved">Распознано: {embed.provider} — будет встроенный плеер</p>
                : <p className="admin__error">Ссылка не распознана — будет показана как обычная кнопка</p>
            )}
            <div className="admin__card-actions">
              <button type="button" onClick={() => move(index, -1)} disabled={index === 0}>↑</button>
              <button type="button" onClick={() => move(index, 1)} disabled={index === items.length - 1}>↓</button>
              <button type="button" className="admin__remove" onClick={() => remove(index)}>Удалить</button>
            </div>
          </div>
        );
      })}
      <button type="button" className="btn btn-secondary" onClick={add}>+ Добавить видео</button>
      <SaveRow saving={saving} error={error} savedMessage={savedMessage} onSave={() => save(items)} />
    </div>
  );
}

function PasswordForm() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setMessage('');
    if (newPassword !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    if (newPassword.length < 8) {
      setError('Новый пароль должен быть не короче 8 символов');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Ошибка смены пароля');
      }
      setMessage('Пароль изменён');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="admin__password-form" onSubmit={handleSubmit}>
      <label>
        Текущий пароль
        <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
      </label>
      <label>
        Новый пароль
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </label>
      <label>
        Повторите новый пароль
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </label>
      {error && <p className="admin__error">{error}</p>}
      {message && <p className="admin__saved">{message}</p>}
      <button type="submit" className="btn btn-primary" disabled={saving}>
        {saving ? 'Сохраняем…' : 'Сменить пароль'}
      </button>
    </form>
  );
}

function LoginForm({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const text = await res.text();
        setError(text || 'Неверный пароль');
        return;
      }
      onSuccess();
    } catch {
      setError('Ошибка сети');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin admin--login">
      <form className="admin__login-form" onSubmit={handleSubmit}>
        <h1>Вход в админку</h1>
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
        {error && <p className="admin__error">{error}</p>}
        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
          {loading ? 'Входим…' : 'Войти'}
        </button>
      </form>
    </div>
  );
}

function Dashboard({ onLogout }) {
  const [tab, setTab] = useState('prices');

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
    onLogout();
  }

  return (
    <div className="admin">
      <div className="admin__topbar">
        <h1>Админ-панель</h1>
        <button type="button" className="btn btn-secondary" onClick={handleLogout}>Выйти</button>
      </div>
      <nav className="admin__tabs">
        {Object.entries(COLLECTION_LABELS).map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={`admin__tab ${tab === key ? 'admin__tab--active' : ''}`}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          className={`admin__tab ${tab === 'password' ? 'admin__tab--active' : ''}`}
          onClick={() => setTab('password')}
        >
          Смена пароля
        </button>
      </nav>
      <div className="admin__content">
        {tab === 'prices' && <PricesEditor />}
        {tab === 'services' && <ServicesEditor />}
        {tab === 'reviews' && <ReviewsEditor />}
        {tab === 'pricelist' && <PriceListEditor />}
        {tab === 'videos' && <VideosEditor />}
        {tab === 'password' && <PasswordForm />}
      </div>
    </div>
  );
}

function Admin() {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    document.title = 'Админ-панель';
    let meta = document.head.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'noindex');
  }, []);

  useEffect(() => {
    fetch('/api/admin/session', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setAuthenticated(Boolean(data.authenticated)))
      .catch(() => setAuthenticated(false))
      .finally(() => setChecking(false));
  }, []);

  if (checking) {
    return <div className="admin admin--loading">Загрузка…</div>;
  }

  if (!authenticated) {
    return <LoginForm onSuccess={() => setAuthenticated(true)} />;
  }

  return <Dashboard onLogout={() => setAuthenticated(false)} />;
}

export default Admin;
