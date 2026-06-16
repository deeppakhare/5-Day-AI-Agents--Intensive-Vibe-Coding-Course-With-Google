import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: { about: "About", skills: "Skills", projects: "Projects", experience: "Timeline", contact: "Contact" },
      hero: { greeting: "Hi, I am", role: "MERN Developer & AI Enthusiast", cta: "View My Work" },
      about: { title: "About Me", p1: "I'm a B.Tech CSE student passionate about software development, AI systems, entrepreneurship, and solving real-world problems using technology." },
      skills: { title: "Technical Skills" },
      projects: { title: "Featured Projects", live: "Live", github: "GitHub" },
      experience: { title: "Experience & Education" },
      terminal: { title: "Developer Terminal", instruction: "Type 'help' to see available commands." },
      contact: { title: "Get in Touch" },
    }
  },
  hi: {
    translation: {
      nav: { about: "मेरे बारे में", skills: "कौशल", projects: "प्रोजेक्ट्स", experience: "अनुभव", contact: "संपर्क करें" },
      hero: { greeting: "नमस्ते, मैं हूँ", role: "मर्न डेवलपर और एआई उत्साही", cta: "मेरा काम देखें" },
      about: { title: "मेरे बारे में", p1: "मैं एक B.Tech CSE का छात्र हूं जिसे सॉफ्टवेयर विकास, AI सिस्टम, उद्यमिता और तकनीक का उपयोग करके वास्तविक दुनिया की समस्याओं को सुलझाने का शौक है।" },
      skills: { title: "तकनीकी कौशल" },
      projects: { title: "प्रमुख प्रोजेक्ट्स", live: "लाइव", github: "गिटहब" },
      experience: { title: "अनुभव और शिक्षा" },
      terminal: { title: "डेवलपर टर्मिनल", instruction: "उपलब्ध कमांड देखने के लिए 'help' टाइप करें।" },
      contact: { title: "संपर्क करें" },
    }
  },
  mr: {
    translation: {
      nav: { about: "माझ्याबद्दल", skills: "कौशल्ये", projects: "प्रकल्प", experience: "अनुभव", contact: "संपर्क" },
      hero: { greeting: "नमस्कार, मी आहे", role: "मर्न डेव्हलपर आणि एआय उत्साही", cta: "माझे काम पहा" },
      about: { title: "माझ्याबद्दल", p1: "मी एक B.Tech CSE चा विद्यार्थी आहे ज्याला सॉफ्टवेअर डेव्हलपमेंट, AI सिस्टीम, उद्योगशीलता आणि तंत्रज्ञानाचा वापर करून वास्तव जगातील समस्या सोडवण्याची आवड आहे." },
      skills: { title: "तांत्रिक कौशल्ये" },
      projects: { title: "वैशिष्ट्यीकृत प्रकल्प", live: "थेट", github: "गिटहब" },
      experience: { title: "अनुभव आणि शिक्षण" },
      terminal: { title: "डेव्हलपर टर्मिनल", instruction: "उपलब्ध कमांड पाहण्यासाठी 'help' टाइप करा." },
      contact: { title: "संपर्क साधा" },
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;
