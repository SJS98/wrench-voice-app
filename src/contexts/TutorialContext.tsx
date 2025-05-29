
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface TutorialStep {
  id: string;
  targetSelector: string;
  title: {
    en: string;
    hi: string;
  };
  description: {
    en: string;
    hi: string;
  };
  voice: {
    en: string;
    hi: string;
  };
  position?: 'top' | 'bottom' | 'left' | 'right';
  page?: string;
}

interface TutorialContextType {
  isActive: boolean;
  currentStep: number;
  language: 'en' | 'hi';
  isPaused: boolean;
  isVoiceEnabled: boolean;
  steps: TutorialStep[];
  startTutorial: (language: 'en' | 'hi') => void;
  nextStep: () => void;
  prevStep: () => void;
  skipStep: () => void;
  pauseTutorial: () => void;
  resumeTutorial: () => void;
  exitTutorial: () => void;
  toggleVoice: () => void;
  setLanguage: (lang: 'en' | 'hi') => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

// Tutorial steps configuration
const tutorialSteps: TutorialStep[] = [
  {
    id: 'welcome',
    targetSelector: '.hero-section',
    title: {
      en: 'Welcome to Mr. Mechanic',
      hi: 'मिस्टर मैकेनिक में आपका स्वागत है'
    },
    description: {
      en: 'Let me guide you through the app features',
      hi: 'मैं आपको ऐप की सुविधाओं के बारे में बताता हूं'
    },
    voice: {
      en: 'Welcome to Mr. Mechanic! Let me guide you through all the amazing features of our app.',
      hi: 'मिस्टर मैकेनिक में आपका स्वागत है! मैं आपको हमारे ऐप की सभी बेहतरीन सुविधाओं के बारे में बताता हूं।'
    },
    page: '/'
  },
  {
    id: 'book_service',
    targetSelector: '[href="/services"]',
    title: {
      en: 'Book Service',
      hi: 'सर्विस बुक करें'
    },
    description: {
      en: 'Tap here to book a service for your vehicle',
      hi: 'अपनी गाड़ी की सर्विस बुक करने के लिए यहां टैप करें'
    },
    voice: {
      en: 'Tap on Book Service to schedule maintenance or repairs for your vehicle.',
      hi: 'अपनी गाड़ी की मेंटेनेंस या रिपेयर बुक करने के लिए बुक सर्विस पर टैप करें।'
    },
    position: 'bottom',
    page: '/'
  },
  {
    id: 'spare_parts',
    targetSelector: '[href="/spare-parts"]',
    title: {
      en: 'Buy Spare Parts',
      hi: 'स्पेयर पार्ट्स खरीदें'
    },
    description: {
      en: 'Shop for genuine spare parts',
      hi: 'असली स्पेयर पार्ट्स खरीदें'
    },
    voice: {
      en: 'Browse and buy genuine spare parts for your vehicle from trusted sellers.',
      hi: 'विश्वसनीय विक्रेताओं से अपनी गाड़ी के लिए असली स्पेयर पार्ट्स देखें और खरीदें।'
    },
    position: 'bottom',
    page: '/'
  },
  {
    id: 'sos',
    targetSelector: '[href="/sos"]',
    title: {
      en: 'Emergency SOS',
      hi: 'इमरजेंसी एसओएस'
    },
    description: {
      en: 'Get immediate help in emergency situations',
      hi: 'आपातकालीन स्थितियों में तुरंत सहायता प्राप्त करें'
    },
    voice: {
      en: 'Use Emergency SOS for immediate roadside assistance when you need urgent help.',
      hi: 'जब आपको तुरंत सहायता की जरूरत हो तो रोडसाइड असिस्टेंस के लिए इमरजेंसी एसओएस का उपयोग करें।'
    },
    position: 'bottom',
    page: '/'
  },
  {
    id: 'used_vehicles',
    targetSelector: '[href="/used-vehicles"]',
    title: {
      en: 'Used Vehicles',
      hi: 'पुराने वाहन'
    },
    description: {
      en: 'Browse certified used vehicles',
      hi: 'प्रमाणित पुराने वाहन देखें'
    },
    voice: {
      en: 'Find your perfect pre-owned vehicle from our collection of certified used cars and bikes.',
      hi: 'प्रमाणित पुराने कारों और बाइकों के हमारे संग्रह से अपना परफेक्ट पुराना वाहन खोजें।'
    },
    position: 'top',
    page: '/'
  },
  {
    id: 'navigation',
    targetSelector: '.fixed.bottom-0',
    title: {
      en: 'Bottom Navigation',
      hi: 'नीचे नेवीगेशन'
    },
    description: {
      en: 'Use the bottom navigation to access different sections',
      hi: 'विभिन्न सेक्शन तक पहुंचने के लिए नीचे के नेवीगेशन का उपयोग करें'
    },
    voice: {
      en: 'Use the bottom navigation bar to quickly access Home, Services, Emergency, Parts, and your Profile.',
      hi: 'होम, सर्विसेज, इमरजेंसी, पार्ट्स और अपनी प्रोफाइल तक जल्दी पहुंचने के लिए नीचे के नेवीगेशन बार का उपयोग करें।'
    },
    position: 'top',
    page: '/'
  }
];

export const TutorialProvider = ({ children }: { children: ReactNode }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [isPaused, setIsPaused] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);

  const startTutorial = (selectedLanguage: 'en' | 'hi') => {
    setLanguage(selectedLanguage);
    setCurrentStep(0);
    setIsActive(true);
    setIsPaused(false);
  };

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      exitTutorial();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipStep = () => {
    nextStep();
  };

  const pauseTutorial = () => {
    setIsPaused(true);
  };

  const resumeTutorial = () => {
    setIsPaused(false);
  };

  const exitTutorial = () => {
    setIsActive(false);
    setCurrentStep(0);
    setIsPaused(false);
    // Save completion status to localStorage
    localStorage.setItem('tutorialCompleted', 'true');
  };

  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
  };

  return (
    <TutorialContext.Provider
      value={{
        isActive,
        currentStep,
        language,
        isPaused,
        isVoiceEnabled,
        steps: tutorialSteps,
        startTutorial,
        nextStep,
        prevStep,
        skipStep,
        pauseTutorial,
        resumeTutorial,
        exitTutorial,
        toggleVoice,
        setLanguage,
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
};

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (context === undefined) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
};
