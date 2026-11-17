export type LanguageCode = 'en' | 'hi' | 'hinglish';

export const LANGUAGE_OPTIONS: {code: LanguageCode; label: string; shortLabel: string}[] = [
  {code: 'en', label: 'English', shortLabel: 'EN'},
  {code: 'hi', label: 'हिन्दी', shortLabel: 'HI'},
  {code: 'hinglish', label: 'Hinglish', shortLabel: 'HN'},
];

export interface TranslationDict {
  nav: {
    home: string;
    features: string;
    screenshots: string;
    about: string;
    contact: string;
  };
  hero: {
    title: string;
    tagline: string;
    description: string;
    downloadCta: string;
    latestVersion: string;
    apkSize: string;
    directDownload: string;
    secureDownload: string;
  };
  stats: {
    happyUsers: string;
    videos: string;
    joinTitle: string;
    joinSubtitle: string;
  };
  features: {
    heading: string;
    fast: string;
    short: string;
    follow: string;
    interact: string;
    safe: string;
  };
  whyChoose: {
    heading: string;
    item1: string;
    item2: string;
    item3: string;
    item4: string;
    item5: string;
    creatorsEyebrow: string;
  };
  about: {
    heading: string;
    lead: string;
    card1Title: string;
    card1Body: string;
    card2Title: string;
    card2Body: string;
    card3Title: string;
    card3Body: string;
  };
  contact: {
    heading: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendButton: string;
    sentTitle: string;
    sentBody: string;
  };
  footer: {
    about: string;
    privacy: string;
    terms: string;
    contact: string;
    copyright: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, TranslationDict> = {
  en: {
    nav: {
      home: 'Home',
      features: 'Features',
      screenshots: 'Screenshots',
      about: 'About Us',
      contact: 'Contact Us',
    },
    hero: {
      title: 'Masti Video',
      tagline: 'Your Videos, Your World!',
      description: 'Watch, Create and Share Amazing Videos with Friends & Community.',
      downloadCta: 'Download Karen',
      latestVersion: 'Latest Version',
      apkSize: 'APK Size',
      directDownload: 'Direct APK Download',
      secureDownload: 'Secure Download',
    },
    stats: {
      happyUsers: 'Happy Users',
      videos: 'Videos',
      joinTitle: 'Join Now - Be a Star',
      joinSubtitle: 'Upload your first reel in seconds',
    },
    features: {
      heading: 'Built for Creators & Viewers',
      fast: 'Fast & Smooth Experience',
      short: 'Short & Fun Videos',
      follow: 'Follow Your Favourite Creators',
      interact: 'Like & Comment & Share',
      safe: 'Safe & Secure Platform',
    },
    whyChoose: {
      heading: 'Why Choose Masti Video?',
      item1: 'Endless Entertainment',
      item2: 'Create Your Own Content',
      item3: 'Connect with Friends',
      item4: 'Easy to Use Interface',
      item5: 'Amazing Video Quality',
      creatorsEyebrow: 'Trending Creators',
    },
    about: {
      heading: 'About Masti Video',
      lead: 'Masti Video is a creator-first short-video community engineered for instant playback, crisp HD uploads, and authentic social connection across every Android phone.',
      card1Title: 'Direct Android Access',
      card1Body: 'Download our signed Android APK directly without extra store friction, tuned to run smoothly even on entry-level devices.',
      card2Title: 'Made for Expression',
      card2Body: 'Sync trending music tracks, add visual flair, and share comedy, dance, music, and lifestyle moments in seconds.',
      card3Title: 'Community Safety',
      card3Body: 'Built-in reporting controls, creator privacy settings, and proactive moderation keep every feed welcoming.',
    },
    contact: {
      heading: 'Contact Us',
      subtitle: 'Have feedback, creator partnership inquiries, or APK installation questions? Reach out to our team.',
      nameLabel: 'Your Name',
      namePlaceholder: 'Enter your full name',
      emailLabel: 'Email Address',
      emailPlaceholder: 'you@example.com',
      messageLabel: 'Message',
      messagePlaceholder: 'Tell us how we can help...',
      sendButton: 'Send Message',
      sentTitle: 'Message Received',
      sentBody: 'Thank you for reaching out to Masti Video. Our team will respond shortly.',
    },
    footer: {
      about: 'About Us',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
      contact: 'Contact Us',
      copyright: 'All rights reserved.',
    },
  },
  hi: {
    nav: {
      home: 'होम',
      features: 'फ़ीचर्स',
      screenshots: 'स्क्रीनशॉट्स',
      about: 'हमारे बारे में',
      contact: 'संपर्क करें',
    },
    hero: {
      title: 'Masti Video',
      tagline: 'आपके वीडियो, आपकी दुनिया!',
      description: 'दोस्तों और कम्युनिटी के साथ शानदार शॉर्ट वीडियो देखें, बनाएं और शेयर करें।',
      downloadCta: 'Download Karen',
      latestVersion: 'लेटेस्ट वर्जन',
      apkSize: 'APK साइज',
      directDownload: 'डायरेक्ट APK डाउनलोड',
      secureDownload: 'सुरक्षित डाउनलोड',
    },
    stats: {
      happyUsers: 'खुश यूज़र्स',
      videos: 'वीडियो',
      joinTitle: 'Join Now - Be a Star',
      joinSubtitle: 'कुछ ही सेकंड में अपना पहला वीडियो अपलोड करें',
    },
    features: {
      heading: 'क्रिएटर्स और दर्शकों के लिए खास',
      fast: 'तेज़ और स्मूद अनुभव',
      short: 'शॉर्ट और मज़ेदार वीडियो',
      follow: 'अपने पसंदीदा क्रिएटर्स को फॉलो करें',
      interact: 'लाइक, कमेंट और शेयर करें',
      safe: 'सुरक्षित और भरोसेमंद प्लेटफ़ॉर्म',
    },
    whyChoose: {
      heading: 'Masti Video क्यों चुनें?',
      item1: 'बेहिसाब मनोरंजन',
      item2: 'अपना खुद का कंटेंट बनाएं',
      item3: 'दोस्तों से जुड़ें',
      item4: 'इस्तेमाल करने में बेहद आसान',
      item5: 'शानदार वीडियो क्वालिटी',
      creatorsEyebrow: 'लोकप्रिय क्रिएटर्स',
    },
    about: {
      heading: 'Masti Video के बारे में',
      lead: 'Masti Video एक क्रिएटर-फर्स्ट शॉर्ट-वीडियो कम्युनिटी है जिसे हर Android फोन पर तेज़ प्लेबैक और शानदार HD क्वालिटी के लिए बनाया गया है।',
      card1Title: 'डायरेक्ट Android APK',
      card1Body: 'बिना किसी झंझट के सीधा आधिकारिक APK डाउनलोड करें, जो हर डिवाइस पर स्मूद चलता है।',
      card2Title: 'अपनी कला दिखाएं',
      card2Body: 'ट्रेंडिंग म्यूज़िक, डांस, कॉमेडी और लाइफस्टाइल क्लिप्स सेकंडों में रिकॉर्ड और शेयर करें।',
      card3Title: 'सुरक्षित कम्युनिटी',
      card3Body: 'प्राइवेसी सेटिंग्स और रिपोर्टिंग टूल्स सभी क्रिएटर्स और दर्शकों को सुरक्षित अनुभव देते हैं।',
    },
    contact: {
      heading: 'संपर्क करें',
      subtitle: 'कोई सवाल, सुझाव या सहायता चाहिए? हमें संदेश भेजें।',
      nameLabel: 'आपका नाम',
      namePlaceholder: 'अपना नाम लिखें',
      emailLabel: 'ईमेल पता',
      emailPlaceholder: 'you@example.com',
      messageLabel: 'संदेश',
      messagePlaceholder: 'हम आपकी क्या मदद कर सकते हैं?',
      sendButton: 'संदेश भेजें',
      sentTitle: 'संदेश प्राप्त हुआ',
      sentBody: 'Masti Video से संपर्क करने के लिए धन्यवाद। हमारी टीम जल्द जवाब देगी।',
    },
    footer: {
      about: 'हमारे बारे में',
      privacy: 'प्राइवेसी पॉलिसी',
      terms: 'नियम एवं शर्तें',
      contact: 'संपर्क करें',
      copyright: 'सर्वाधिकार सुरक्षित।',
    },
  },
  hinglish: {
    nav: {
      home: 'Home',
      features: 'Features',
      screenshots: 'Screenshots',
      about: 'About Us',
      contact: 'Contact Us',
    },
    hero: {
      title: 'Masti Video',
      tagline: 'Your Videos, Your World!',
      description: 'Friends aur community ke saath zabardast short videos dekhein, banayein aur share karein.',
      downloadCta: 'Download Karen',
      latestVersion: 'Latest Version',
      apkSize: 'APK Size',
      directDownload: 'Direct APK Download',
      secureDownload: 'Secure Download',
    },
    stats: {
      happyUsers: 'Happy Users',
      videos: 'Videos',
      joinTitle: 'Join Now - Be a Star',
      joinSubtitle: 'Seconds mein apna pehla video upload karein',
    },
    features: {
      heading: 'Creators & Fans Ke Liye',
      fast: 'Fast & Smooth Experience',
      short: 'Short & Fun Videos',
      follow: 'Apne Favourite Creators Ko Follow Karein',
      interact: 'Like, Comment & Share Karein',
      safe: 'Safe & Secure Platform',
    },
    whyChoose: {
      heading: 'Why Choose Masti Video?',
      item1: 'Endless Entertainment',
      item2: 'Apna Khud Ka Content Banayein',
      item3: 'Friends Ke Saath Connect Karein',
      item4: 'Easy to Use Interface',
      item5: 'Amazing Video Quality',
      creatorsEyebrow: 'Trending Creators',
    },
    about: {
      heading: 'About Masti Video',
      lead: 'Masti Video ek creator-first short-video community hai jo har Android phone par ultra-smooth playback aur HD video creation ke liye banayi gayi hai.',
      card1Title: 'Direct Android APK',
      card1Body: 'Seedha official APK download karein, jo low-RAM aur flagship dono Android phones par smooth chalta hai.',
      card2Title: 'Apna Talent Dikhayein',
      card2Body: 'Trending music tracks, dance moves, comedy aur daily vlogs seconds mein record karke share karein.',
      card3Title: 'Safe Community',
      card3Body: 'Smart privacy controls aur instant reporting tools ke saath har user ke liye safe space.',
    },
    contact: {
      heading: 'Contact Us',
      subtitle: 'Koi sawaal, feedback ya creator query ho toh humein message karein.',
      nameLabel: 'Aapka Naam',
      namePlaceholder: 'Apna poora naam likhein',
      emailLabel: 'Email Address',
      emailPlaceholder: 'you@example.com',
      messageLabel: 'Message',
      messagePlaceholder: 'Hum aapki kya madad kar sakte hain?',
      sendButton: 'Message Bhejein',
      sentTitle: 'Message Mil Gaya!',
      sentBody: 'Masti Video se judne ke liye shukriya. Hamari team jaldi reply karegi.',
    },
    footer: {
      about: 'About Us',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
      contact: 'Contact Us',
      copyright: 'All rights reserved.',
    },
  },
};
