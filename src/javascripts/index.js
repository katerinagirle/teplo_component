import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import '../stylesheets/style.css'

import cardStrength from '../assets/card-strength.png'
import cardLove from '../assets/card-love.png'
import cardHome from '../assets/card-home.png'
import cardCat from '../assets/card-cat.png'
import cardBack from '../assets/card-blue-back.png'

const designs = [
  { id: 'strength', name: 'Сила в тебе', color: '#b8e4f5', image: cardStrength },
  { id: 'love', name: 'Любить не перелюбить', color: '#f4d8d4', image: cardLove },
  { id: 'home', name: 'Дом там, где ты', color: '#c8e8f4', image: cardHome },
  { id: 'cat', name: 'Миру мур', color: '#f4edc6', image: cardCat }
]

const amounts = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 10000]
const steps = ['Дизайн', 'Номинал', 'Для кого', 'Комментарий', 'Оплата']

function formatPrice(value) {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₽'
}

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7" /></svg>
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="ТЕПЛО — главная">ТЕПЛО</a>
      <nav className="top-nav" aria-label="Основная навигация">
        <span>Мастер-классы</span>
        <span>Аренда</span>
        <span>Магазин</span>
        <span>Сертификаты</span>
        <span>О пространстве</span>
      </nav>
      <a className="schedule-link" href="#schedule">Расписание и запись <span aria-hidden="true">&gt;</span></a>
    </header>
  )
}

function StepNav({ current, onSelect }) {
  return (
    <nav className="step-nav" aria-label="Этапы оформления">
      {steps.map((step, index) => (
        <button
          key={step}
          type="button"
          className={`step-link ${current === index ? 'is-current' : ''} ${current > index ? 'is-done' : ''}`}
          onClick={() => onSelect(index)}
        >
          <span className="step-number">{current > index ? '✓' : String(index + 1).padStart(2, '0')}</span>
          <span>{step}</span>
        </button>
      ))}
    </nav>
  )
}

function CertificatePreview({ design, tilted, amount, recipientName, greeting }) {
  return (
    <div className={`preview-stage ${tilted ? 'is-tilted' : ''}`}>
      <img className="certificate-back" src={cardBack} alt="" />
      <div className="certificate-card">
        <img className="certificate-art" src={design.image} alt={`Дизайн сертификата «${design.name}»`} />
        {amount !== null && <span className="preview-amount">{formatPrice(amount)}</span>}
        {(recipientName || greeting) && (
          <div className="preview-personalization">
            {recipientName && <span>Для {recipientName}</span>}
            {greeting && <small>{greeting}</small>}
          </div>
        )}
      </div>
      <span className="preview-caption">электронный сертификат</span>
    </div>
  )
}

function DesignStep({ selected, onSelect }) {
  return (
    <>
      <p className="eyebrow">01 / ВАШ ПОДАРОК</p>
      <h1>Выберите<br />дизайн сертификата</h1>
      <p className="step-description">Пусть маленькая открытка скажет о большом.</p>
      <div className="design-options" role="radiogroup" aria-label="Дизайн сертификата">
        {designs.map((design, index) => (
          <button
            key={design.id}
            type="button"
            className={`design-swatch ${selected === index ? 'selected' : ''}`}
            style={{ '--swatch-color': design.color }}
            onClick={() => onSelect(index)}
            role="radio"
            aria-checked={selected === index}
            aria-label={design.name}
            title={design.name}
          >
            <span className="swatch-inner" />
          </button>
        ))}
      </div>
      <p className="selected-design-name">{designs[selected].name}</p>
    </>
  )
}

function AmountStep({ amount, onSelect }) {
  return (
    <>
      <p className="eyebrow">02 / СКОЛЬКО ТЕПЛА</p>
      <h1>Выберите<br />номинал</h1>
      <div className="amount-options">
        {amounts.map(value => (
          <button key={value} type="button" onClick={() => onSelect(value)} className={`amount-option ${amount === value ? 'selected' : ''}`}>
            {formatPrice(value)}
          </button>
        ))}
      </div>
    </>
  )
}

function RecipientStep({ phone, onPhoneChange }) {
  return (
    <>
      <p className="eyebrow">03 / КОМУ ПОДАРОК</p>
      <h1>Кому отправим<br />немного тепла?</h1>
      <p className="step-description">Укажите номер телефона получателя — сертификат придёт ему в сообщения.</p>
      <label className="field-label" htmlFor="recipient-phone">Номер телефона</label>
      <div className="input-wrap phone-wrap">
        <span className="phone-prefix">+7</span>
        <input
          id="recipient-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="999 123-45-67"
          value={phone}
          onChange={event => onPhoneChange(event.target.value)}
          maxLength={14}
        />
      </div>
    </>
  )
}

function GreetingStep({ name, onNameChange, greeting, onGreetingChange }) {
  return (
    <>
      <p className="eyebrow">04 / СЛОВА ОТ СЕРДЦА</p>
      <h1>Добавьте<br />личное послание</h1>
      <p className="step-description">Несколько слов, которые сделают подарок ещё теплее.</p>
      <label className="field-label" htmlFor="recipient-name">Имя получателя <span>необязательно</span></label>
      <div className="input-wrap">
        <input id="recipient-name" type="text" placeholder="Например, Маша" value={name} onChange={event => onNameChange(event.target.value)} maxLength={40} />
      </div>
      <label className="field-label greeting-label" htmlFor="greeting-text">Поздравление <span>необязательно</span></label>
      <div className="input-wrap textarea-wrap">
        <textarea id="greeting-text" placeholder="Напишите что-нибудь тёплое..." value={greeting} onChange={event => onGreetingChange(event.target.value)} rows="3" maxLength={240} />
        <span className="character-count">{greeting.length}/240</span>
      </div>
    </>
  )
}

function PaymentStep({ phone, amount }) {
  const cleanPhone = phone.trim() ? `+7 ${phone.trim()}` : 'Не указан'
  return (
    <>
      <p className="eyebrow">05 / ПОСЛЕДНИЙ ШТРИХ</p>
      <h1>Всё готово<br />к отправке</h1>
      <p className="step-description">Проверьте детали вашего подарка.</p>
      <div className="order-summary">
        <div><span>Получатель</span><strong>{cleanPhone}</strong></div>
        <div className="summary-total"><span>Итого</span><strong>{formatPrice(amount)}</strong></div>
      </div>
    </>
  )
}

function Footer() {
  return (
    <footer className="site-footer" id="contacts">
      <div className="footer-top">
        <a className="brand footer-brand" href="#top">ТЕПЛО</a>
      </div>
      <div className="footer-columns">
        <div><h3>покупателю</h3><a href="#top">Главная</a><a href="#master-classes">Мастер-классы</a><a href="#rent">Аренда</a><a href="#shop">Магазин</a><a href="#certificate">Сертификаты</a><a href="#about">О нас</a></div>
        <div><h3>каталог</h3><a href="#mugs">Кружки</a><a href="#plates">Тарелки</a><a href="#jewelry">Украшения</a><a href="#postcards">Открытки</a><a href="#paintings">Картины</a><a href="#other">Другое</a></div>
        <div><h3>о нас</h3><a href="#cooperation">Сотрудничество</a><a href="#terms">Пользовательское соглашение</a><a href="#privacy">Политика конфиденциальности</a></div>
        <div><h3>контакты</h3><span>Нижний Новгород, Рождественская 8б</span><a href="#vk">Сообщество ВК</a></div>
      </div>
      <div className="footer-bottom"><span>© ТЕПЛО, 2026</span><span>Сделано с теплом ♡</span></div>
    </footer>
  )
}

function App() {
  const [step, setStep] = useState(0)
  const [selectedDesign, setSelectedDesign] = useState(0)
  const [amount, setAmount] = useState(5000)
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [greeting, setGreeting] = useState('')

  const canContinue = step !== 2 || phone.replace(/\D/g, '').length >= 10
  const goNext = () => { if (step < 4 && canContinue) setStep(current => current + 1) }
  const goBack = () => { if (step > 0) setStep(current => current - 1) }

  return (
    <div id="top" className="app-shell">
      <Header />
      <main>
        <div className="breadcrumbs"><a href="#top">Главная</a><span>/</span><a href="#catalog">Сертификаты</a><span>/</span><span>Электронный</span></div>
        <section className="configurator">
          <div className="configurator-copy">
            <StepNav current={step} onSelect={setStep} />
            <div className="step-content" key={step}>
              {step === 0 && <DesignStep selected={selectedDesign} onSelect={setSelectedDesign} />}
              {step === 1 && <AmountStep amount={amount} onSelect={setAmount} />}
              {step === 2 && <RecipientStep phone={phone} onPhoneChange={setPhone} />}
              {step === 3 && <GreetingStep name={name} onNameChange={setName} greeting={greeting} onGreetingChange={setGreeting} />}
              {step === 4 && <PaymentStep phone={phone} amount={amount} />}
            </div>
            <div className="step-actions">
              {step > 0 && <button className="back-button" type="button" onClick={goBack}>Назад</button>}
              <button className={`primary-button ${step === 4 ? 'is-disabled' : ''}`} type="button" onClick={goNext} disabled={step === 4 || !canContinue}>
                <span>{step === 4 ? 'Оплатить' : 'Далее'}</span>{step !== 4 && <ArrowIcon />}
              </button>
            </div>
            {step === 2 && !canContinue && phone.length > 0 && <p className="validation-message">Введите номер полностью, чтобы продолжить.</p>}
          </div>
          <div className="configurator-preview">
            <CertificatePreview design={designs[selectedDesign]} tilted={step >= 2} amount={step >= 1 ? amount : null} recipientName={step >= 3 ? name : ''} greeting={step >= 3 ? greeting : ''} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
