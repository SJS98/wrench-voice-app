
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
  action?: 'click' | 'navigate' | 'input' | 'select';
  autoProgress?: boolean;
  navigationTarget?: string;
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
  handleElementClick: (selector: string) => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

// Enhanced tutorial steps for complete booking service flow
const tutorialSteps: TutorialStep[] = [
  {
    id: 'welcome',
    targetSelector: '.hero-section',
    title: {
      en: 'Welcome to Mr. Mechanic',
      hi: 'मिस्टर मैकेनिक में आपका स्वागत है'
    },
    description: {
      en: 'Let me guide you through booking a service',
      hi: 'मैं आपको सर्विस बुक करने की प्रक्रिया बताता हूं'
    },
    voice: {
      en: 'Welcome to Mr. Mechanic! Let me guide you through how to book a service for your vehicle.',
      hi: 'मिस्टर मैकेनिक में आपका स्वागत है! मैं आपको अपनी गाड़ी की सर्विस बुक करने की प्रक्रिया बताता हूं।'
    },
    page: '/',
    autoProgress: false
  },
  {
    id: 'book_service_button',
    targetSelector: '[href="/services"]',
    title: {
      en: 'Book Service',
      hi: 'सर्विस बुक करें'
    },
    description: {
      en: 'Tap here to start booking a service',
      hi: 'सर्विस बुक करना शुरू करने के लिए यहां टैप करें'
    },
    voice: {
      en: 'Tap on the Book Service button to start booking a service for your vehicle.',
      hi: 'अपनी गाड़ी की सर्विस बुक करना शुरू करने के लिए बुक सर्विस बटन पर टैप करें।'
    },
    position: 'bottom',
    page: '/',
    action: 'click',
    autoProgress: true,
    navigationTarget: '/services'
  },
  {
    id: 'select_vehicle',
    targetSelector: '#vehicle-select',
    title: {
      en: 'Select Your Vehicle',
      hi: 'अपना वाहन चुनें'
    },
    description: {
      en: 'Choose the vehicle you want to service',
      hi: 'जिस वाहन की सर्विस कराना चाहते हैं उसे चुनें'
    },
    voice: {
      en: 'First, select your vehicle from the dropdown menu. This helps us show relevant services.',
      hi: 'पहले, ड्रॉपडाउन मेनू से अपना वाहन चुनें। इससे हमें संबंधित सेवाएं दिखाने में मदद मिलती है।'
    },
    position: 'bottom',
    page: '/services',
    action: 'select',
    autoProgress: false
  },
  {
    id: 'browse_services',
    targetSelector: '.grid.grid-cols-5',
    title: {
      en: 'Browse Service Categories',
      hi: 'सर्विस श्रेणियां देखें'
    },
    description: {
      en: 'Explore different service categories',
      hi: 'विभिन्न सर्विस श्रेणियों को देखें'
    },
    voice: {
      en: 'Browse through different service categories like Popular, Maintenance, Repair, Tires, and Specialized services.',
      hi: 'लोकप्रिय, मेंटेनेंस, रिपेयर, टायर, और विशेष सेवाओं जैसी विभिन्न सर्विस श्रेणियों को देखें।'
    },
    position: 'bottom',
    page: '/services',
    action: 'click',
    autoProgress: false
  },
  {
    id: 'select_service',
    targetSelector: '[data-testid="service-card"]:first-child',
    title: {
      en: 'Select a Service',
      hi: 'एक सर्विस चुनें'
    },
    description: {
      en: 'Tap on any service card to select it',
      hi: 'किसी भी सर्विस कार्ड पर टैप करके उसे चुनें'
    },
    voice: {
      en: 'Tap on a service card to select it. You can see the price and duration for each service.',
      hi: 'सर्विस कार्ड पर टैप करके उसे चुनें। आप हर सर्विस की कीमत और समय देख सकते हैं।'
    },
    position: 'top',
    page: '/services',
    action: 'click',
    autoProgress: false
  },
  {
    id: 'continue_to_garage',
    targetSelector: 'a[href*="/search"]',
    title: {
      en: 'Continue to Select Garage',
      hi: 'गैरेज चुनने के लिए आगे बढ़ें'
    },
    description: {
      en: 'Proceed to find nearby garages',
      hi: 'नजदीकी गैरेज खोजने के लिए आगे बढ़ें'
    },
    voice: {
      en: 'After selecting services, tap Continue to Select Garage to find nearby service centers.',
      hi: 'सेवाएं चुनने के बाद, नजदीकी सर्विस सेंटर खोजने के लिए गैरेज चुनने के लिए आगे बढ़ें पर टैप करें।'
    },
    position: 'top',
    page: '/services',
    action: 'click',
    autoProgress: true,
    navigationTarget: '/search'
  },
  {
    id: 'select_garage',
    targetSelector: '[data-testid="garage-card"]:first-child',
    title: {
      en: 'Choose a Garage',
      hi: 'एक गैरेज चुनें'
    },
    description: {
      en: 'Select a garage from the list',
      hi: 'सूची से एक गैरेज चुनें'
    },
    voice: {
      en: 'Choose a garage from the list. You can see ratings, distance, and services offered.',
      hi: 'सूची से एक गैरेज चुनें। आप रेटिंग, दूरी, और दी जाने वाली सेवाएं देख सकते हैं।'
    },
    position: 'bottom',
    page: '/search',
    action: 'click',
    autoProgress: false
  },
  {
    id: 'book_now',
    targetSelector: 'button:contains("Book Now")',
    title: {
      en: 'Book Your Service',
      hi: 'अपनी सर्विस बुक करें'
    },
    description: {
      en: 'Tap Book Now to proceed with booking',
      hi: 'बुकिंग के साथ आगे बढ़ने के लिए बुक नाउ पर टैप करें'
    },
    voice: {
      en: 'Tap Book Now to proceed with your service booking and complete the process.',
      hi: 'अपनी सर्विस बुकिंग के साथ आगे बढ़ने और प्रक्रिया पूरी करने के लिए बुक नाउ पर टैप करें।'
    },
    position: 'top',
    page: '/search',
    action: 'click',
    autoProgress: true
  },
  {
    id: 'tutorial_complete',
    targetSelector: '.fixed.bottom-0',
    title: {
      en: 'Tutorial Complete!',
      hi: 'ट्यूटोरियल पूरा!'
    },
    description: {
      en: 'You have learned how to book a service',
      hi: 'आपने सर्विस बुक करना सीख लिया है'
    },
    voice: {
      en: 'Congratulations! You have successfully learned how to book a service. You can now use the app to book services for your vehicle.',
      hi: 'बधाई हो! आपने सफलतापूर्वक सर्विस बुक करना सीख लिया है। अब आप अपनी गाड़ी की सेवाओं को बुक करने के लिए ऐप का उपयोग कर सकते हैं।'
    },
    position: 'top',
    page: '/search',
    autoProgress: false
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
    localStorage.setItem('tutorialCompleted', 'true');
  };

  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
  };

  const handleElementClick = (selector: string) => {
    const currentStepData = tutorialSteps[currentStep];
    if (currentStepData && currentStepData.targetSelector === selector && currentStepData.autoProgress) {
      // Small delay to allow the action to complete
      setTimeout(() => {
        nextStep();
      }, 500);
    }
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
        handleElementClick,
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
