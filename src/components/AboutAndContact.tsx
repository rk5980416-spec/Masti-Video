import React, {useState} from 'react';
import {CheckCircle2, Mail, Send, Shield, Smartphone, Sparkles} from 'lucide-react';
import {SOCIAL_LINKS} from '../config/appConfig';
import {TranslationDict} from '../i18n/translations';

interface AboutAndContactProps {
  t: TranslationDict;
}

export const AboutAndContact: React.FC<AboutAndContactProps> = ({t}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2) {
      setError('Please enter your name (at least 2 characters).');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (trimmedMessage.length < 8) {
      setError('Please enter a short message (at least 8 characters).');
      return;
    }

    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  const aboutCards = [
    {
      icon: Smartphone,
      title: t.about.card1Title,
      body: t.about.card1Body,
      accent: 'text-pink-400',
    },
    {
      icon: Sparkles,
      title: t.about.card2Title,
      body: t.about.card2Body,
      accent: 'text-orange-400',
    },
    {
      icon: Shield,
      title: t.about.card3Title,
      body: t.about.card3Body,
      accent: 'text-purple-400',
    },
  ];

  return (
    <>
      {/* ABOUT US SECTION */}
      <section id="about" className="scroll-mt-24 border-t border-white/10 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="font-display text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {t.about.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-300 sm:text-lg">
              {t.about.lead}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {aboutCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="glass-bar rounded-2xl border border-white/10 p-6 transition-colors duration-200 hover:border-pink-500/35"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06] ring-1 ring-white/10">
                    <Icon className={`h-5 w-5 ${card.accent}`} aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-300">{card.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT US SECTION */}
      <section id="contact" className="scroll-mt-24 border-t border-white/10 py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-5">
            <h2 className="font-display text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {t.contact.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-300">
              {t.contact.subtitle}
            </p>

            <div className="mt-7 space-y-3 text-sm text-neutral-300">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-500/15 text-pink-400">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </span>
                <a
                  href={`mailto:${SOCIAL_LINKS.supportEmail}`}
                  className="font-medium text-white hover:text-pink-400 transition-colors"
                >
                  {SOCIAL_LINKS.supportEmail}
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="glass-bar rounded-3xl border border-white/12 p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.65)]">
              {submitted ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-white">
                    {t.contact.sentTitle}
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-neutral-300">{t.contact.sentBody}</p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 rounded-xl border border-pink-500/40 bg-pink-500/15 px-5 py-2.5 text-sm font-semibold text-pink-200 hover:bg-pink-500/25 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-1.5 block text-xs font-semibold text-neutral-300"
                      >
                        {t.contact.nameLabel}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.contact.namePlaceholder}
                        required
                        className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-1.5 block text-xs font-semibold text-neutral-300"
                      >
                        {t.contact.emailLabel}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.contact.emailPlaceholder}
                        required
                        className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-1.5 block text-xs font-semibold text-neutral-300"
                    >
                      {t.contact.messageLabel}
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t.contact.messagePlaceholder}
                      required
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                    />
                  </div>

                  {error && (
                    <p role="alert" className="text-xs font-medium text-rose-400">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF1E7A] to-[#A855F7] px-6 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(255,30,122,0.4)] transition-all duration-200 hover:brightness-110 sm:w-auto cursor-pointer"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>{t.contact.sendButton}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
