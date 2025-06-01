
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
  startTutorial: (language: 'en' | 'hi', tutorialType?: string) => void;
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

// Complete tutorial steps for all MVP features
const allTutorialSteps: Record<string, TutorialStep[]> = {
  // Main App Tour - covers all features
  complete: [
    {
      id: 'welcome',
      targetSelector: '.hero-section',
      title: {
        en: 'Welcome to Mr. Mechanic',
        hi: 'मिस्टर मैकेनिक में आपका स्वागत है'
      },
      description: {
        en: 'Let me guide you through all the amazing features',
        hi: 'मैं आपको सभी शानदार फीचर्स के बारे में बताता हूं'
      },
      voice: {
        en: 'Welcome to Mr. Mechanic! Let me guide you through all the amazing features of our app.',
        hi: 'मिस्टर मैकेनिक में आपका स्वागत है! मैं आपको हमारे ऐप के सभी शानदार फीचर्स के बारे में बताता हूं।'
      },
      page: '/',
      autoProgress: false
    },
    // Service Booking Flow
    {
      id: 'book_service_main',
      targetSelector: '[href="/services"]',
      title: {
        en: 'Book Vehicle Service',
        hi: 'वाहन सर्विस बुक करें'
      },
      description: {
        en: 'Start here to book any service for your vehicle',
        hi: 'अपने वाहन की कोई भी सर्विस बुक करने के लिए यहां शुरू करें'
      },
      voice: {
        en: 'Tap here to book any service for your vehicle. This is our main service booking feature.',
        hi: 'अपने वाहन की कोई भी सर्विस बुक करने के लिए यहां टैप करें। यह हमारा मुख्य सर्विस बुकिंग फीचर है।'
      },
      position: 'bottom',
      page: '/',
      action: 'click',
      autoProgress: true,
      navigationTarget: '/services'
    },
    {
      id: 'select_vehicle_service',
      targetSelector: '#vehicle-select',
      title: {
        en: 'Choose Your Vehicle',
        hi: 'अपना वाहन चुनें'
      },
      description: {
        en: 'Select your vehicle to see relevant services',
        hi: 'संबंधित सेवाएं देखने के लिए अपना वाहन चुनें'
      },
      voice: {
        en: 'First, select your vehicle from this dropdown. This helps us show services that are compatible with your vehicle.',
        hi: 'पहले, इस ड्रॉपडाउन से अपना वाहन चुनें। इससे हमें आपके वाहन के साथ संगत सेवाएं दिखाने में मदद मिलती है।'
      },
      position: 'bottom',
      page: '/services',
      action: 'select',
      autoProgress: false
    },
    {
      id: 'service_categories',
      targetSelector: '.grid.grid-cols-5',
      title: {
        en: 'Service Categories',
        hi: 'सर्विस श्रेणियां'
      },
      description: {
        en: 'Browse different types of services',
        hi: 'विभिन्न प्रकार की सेवाएं देखें'
      },
      voice: {
        en: 'These are different service categories: Popular services, Maintenance, Repairs, Tire services, and Specialized services.',
        hi: 'ये विभिन्न सर्विस श्रेणियां हैं: लोकप्रिय सेवाएं, मेंटेनेंस, रिपेयर, टायर सेवाएं, और विशेष सेवाएं।'
      },
      position: 'bottom',
      page: '/services',
      autoProgress: false
    },
    {
      id: 'select_service_card',
      targetSelector: '[data-testid="service-card"]:first-child',
      title: {
        en: 'Select a Service',
        hi: 'एक सर्विस चुनें'
      },
      description: {
        en: 'Tap to select services you need',
        hi: 'जिन सेवाओं की आपको जरूरत है उन्हें चुनने के लिए टैप करें'
      },
      voice: {
        en: 'Tap on service cards to select them. You can see price and duration for each service.',
        hi: 'सर्विस कार्ड्स पर टैप करके उन्हें चुनें। आप हर सर्विस की कीमत और समय देख सकते हैं।'
      },
      position: 'top',
      page: '/services',
      action: 'click',
      autoProgress: false
    },
    {
      id: 'continue_to_garage_selection',
      targetSelector: 'a[href*="/search"]',
      title: {
        en: 'Find Garages',
        hi: 'गैरेज खोजें'
      },
      description: {
        en: 'Proceed to find nearby service centers',
        hi: 'नजदीकी सर्विस सेंटर खोजने के लिए आगे बढ़ें'
      },
      voice: {
        en: 'After selecting services, tap here to find nearby garages that can perform these services.',
        hi: 'सेवाएं चुनने के बाद, इन सेवाओं को करने वाले नजदीकी गैरेज खोजने के लिए यहां टैप करें।'
      },
      position: 'top',
      page: '/services',
      action: 'click',
      autoProgress: true,
      navigationTarget: '/search'
    },
    {
      id: 'garage_selection',
      targetSelector: '[data-testid="garage-card"]:first-child',
      title: {
        en: 'Choose a Garage',
        hi: 'एक गैरेज चुनें'
      },
      description: {
        en: 'Select from verified service centers',
        hi: 'सत्यापित सर्विस सेंटर्स में से चुनें'
      },
      voice: {
        en: 'Choose a garage from this list. You can see their ratings, distance from you, and specializations.',
        hi: 'इस सूची से एक गैरेज चुनें। आप उनकी रेटिंग, आपसे दूरी, और विशेषज्ञता देख सकते हैं।'
      },
      position: 'bottom',
      page: '/search',
      action: 'click',
      autoProgress: false
    },
    // Used Vehicles Feature
    {
      id: 'used_vehicles_intro',
      targetSelector: '[href="/used-vehicles"]',
      title: {
        en: 'Used Vehicles Marketplace',
        hi: 'पुराने वाहनों का बाजार'
      },
      description: {
        en: 'Buy and sell pre-owned vehicles',
        hi: 'पुराने वाहन खरीदें और बेचें'
      },
      voice: {
        en: 'Now let me show you our used vehicles marketplace where you can buy and sell pre-owned vehicles.',
        hi: 'अब मैं आपको हमारा पुराने वाहनों का बाजार दिखाता हूं जहां आप पुराने वाहन खरीद और बेच सकते हैं।'
      },
      position: 'bottom',
      page: '/',
      action: 'click',
      autoProgress: true,
      navigationTarget: '/used-vehicles'
    },
    {
      id: 'vehicle_filters',
      targetSelector: 'button:contains("Filters")',
      title: {
        en: 'Filter Vehicles',
        hi: 'वाहन फिल्टर करें'
      },
      description: {
        en: 'Use filters to find your perfect vehicle',
        hi: 'अपना आदर्श वाहन खोजने के लिए फिल्टर का उपयोग करें'
      },
      voice: {
        en: 'Use the filters to narrow down vehicles by price, brand, year, fuel type and other criteria.',
        hi: 'कीमत, ब्रांड, साल, ईंधन प्रकार और अन्य मानदंडों के आधार पर वाहनों को छांटने के लिए फिल्टर का उपयोग करें।'
      },
      position: 'bottom',
      page: '/used-vehicles',
      autoProgress: false
    },
    // Spare Parts Feature
    {
      id: 'spare_parts_intro',
      targetSelector: '[href="/spare-parts"]',
      title: {
        en: 'Spare Parts Store',
        hi: 'स्पेयर पार्ट्स स्टोर'
      },
      description: {
        en: 'Find genuine spare parts for your vehicle',
        hi: 'अपने वाहन के लिए असली स्पेयर पार्ट्स खोजें'
      },
      voice: {
        en: 'Here you can find genuine spare parts for your vehicle from verified sellers.',
        hi: 'यहां आप सत्यापित विक्रेताओं से अपने वाहन के लिए असली स्पेयर पार्ट्स खोज सकते हैं।'
      },
      position: 'bottom',
      page: '/',
      action: 'click',
      autoProgress: true,
      navigationTarget: '/spare-parts'
    },
    // Emergency SOS Feature
    {
      id: 'emergency_sos',
      targetSelector: '[href="/sos"]',
      title: {
        en: 'Emergency SOS',
        hi: 'आपातकालीन SOS'
      },
      description: {
        en: 'Get help during vehicle emergencies',
        hi: 'वाहन की आपातकाल में सहायता प्राप्त करें'
      },
      voice: {
        en: 'In case of vehicle breakdown or emergency, use this SOS feature to get immediate help.',
        hi: 'वाहन खराब होने या आपातकाल की स्थिति में, तत्काल सहायता के लिए इस SOS फीचर का उपयोग करें।'
      },
      position: 'bottom',
      page: '/',
      action: 'click',
      autoProgress: true,
      navigationTarget: '/sos'
    },
    {
      id: 'emergency_features',
      targetSelector: '.grid.gap-4',
      title: {
        en: 'Emergency Services',
        hi: 'आपातकालीन सेवाएं'
      },
      description: {
        en: 'Quick access to emergency help',
        hi: 'आपातकालीन सहायता तक त्वरित पहुंच'
      },
      voice: {
        en: 'These are emergency services: Call roadside assistance, find nearby mechanics, or request emergency towing.',
        hi: 'ये आपातकालीन सेवाएं हैं: रोडसाइड असिस्टेंस कॉल करें, नजदीकी मैकेनिक खोजें, या इमरजेंसी टोइंग का अनुरोध करें।'
      },
      position: 'bottom',
      page: '/sos',
      autoProgress: false
    },
    // Profile Management
    {
      id: 'profile_management',
      targetSelector: '[href="/profile"]',
      title: {
        en: 'Your Profile',
        hi: 'आपकी प्रोफाइल'
      },
      description: {
        en: 'Manage your account and vehicles',
        hi: 'अपना खाता और वाहन प्रबंधित करें'
      },
      voice: {
        en: 'Visit your profile to manage your account, add vehicles, view booking history, and more.',
        hi: 'अपना खाता प्रबंधित करने, वाहन जोड़ने, बुकिंग इतिहास देखने और अधिक के लिए अपनी प्रोफाइल पर जाएं।'
      },
      position: 'bottom',
      page: '/',
      action: 'click',
      autoProgress: true,
      navigationTarget: '/profile'
    },
    {
      id: 'profile_sections',
      targetSelector: '.grid.grid-cols-1.md\\:grid-cols-2.gap-4',
      title: {
        en: 'Profile Features',
        hi: 'प्रोफाइल फीचर्स'
      },
      description: {
        en: 'Access all your account features',
        hi: 'अपने सभी खाता फीचर्स तक पहुंचें'
      },
      voice: {
        en: 'From here you can access your bookings, vehicles, settings, saved items, and account management.',
        hi: 'यहां से आप अपनी बुकिंग्स, वाहन, सेटिंग्स, सेव किए गए आइटम्स, और खाता प्रबंधन तक पहुंच सकते हैं।'
      },
      position: 'bottom',
      page: '/profile',
      autoProgress: false
    },
    // Settings
    {
      id: 'app_settings',
      targetSelector: '[href="/settings"]',
      title: {
        en: 'App Settings',
        hi: 'ऐप सेटिंग्स'
      },
      description: {
        en: 'Customize your app experience',
        hi: 'अपने ऐप अनुभव को कस्टमाइज़ करें'
      },
      voice: {
        en: 'Finally, visit settings to customize notifications, language, privacy, and other preferences.',
        hi: 'अंत में, नोटिफिकेशन, भाषा, प्राइवेसी, और अन्य प्राथमिकताओं को कस्टमाइज़ करने के लिए सेटिंग्स पर जाएं।'
      },
      position: 'bottom',
      page: '/profile',
      action: 'click',
      autoProgress: true,
      navigationTarget: '/settings'
    },
    {
      id: 'tutorial_complete',
      targetSelector: '.fixed.bottom-0',
      title: {
        en: 'Tutorial Complete!',
        hi: 'ट्यूटोरियल पूरा!'
      },
      description: {
        en: 'You now know all the main features',
        hi: 'अब आप सभी मुख्य फीचर्स जानते हैं'
      },
      voice: {
        en: 'Congratulations! You have completed the full app tour. You now know how to use all the main features of Mr. Mechanic.',
        hi: 'बधाई हो! आपने पूरा ऐप टूर पूरा कर लिया है। अब आप मिस्टर मैकेनिक के सभी मुख्य फीचर्स का उपयोग करना जानते हैं।'
      },
      position: 'top',
      page: '/settings',
      autoProgress: false
    }
  ],

  // Quick Service Booking Tutorial
  booking: [
    {
      id: 'booking_start',
      targetSelector: '[href="/services"]',
      title: {
        en: 'Quick Service Booking',
        hi: 'त्वरित सर्विस बुकिंग'
      },
      description: {
        en: 'Learn to book services quickly',
        hi: 'जल्दी सेवाएं बुक करना सीखें'
      },
      voice: {
        en: 'This tutorial will teach you how to quickly book services for your vehicle.',
        hi: 'यह ट्यूटोरियल आपको अपने वाहन की सेवाएं जल्दी बुक करना सिखाएगा।'
      },
      page: '/',
      action: 'click',
      autoProgress: true,
      navigationTarget: '/services'
    },
    {
      id: 'select_vehicle_quick',
      targetSelector: '#vehicle-select',
      title: {
        en: 'Select Vehicle',
        hi: 'वाहन चुनें'
      },
      description: {
        en: 'Choose your vehicle first',
        hi: 'पहले अपना वाहन चुनें'
      },
      voice: {
        en: 'Select your vehicle to see compatible services and accurate pricing.',
        hi: 'संगत सेवाएं और सटीक मूल्य देखने के लिए अपना वाहन चुनें।'
      },
      page: '/services',
      action: 'select',
      autoProgress: false
    },
    {
      id: 'pick_service_quick',
      targetSelector: '[data-testid="service-card"]:first-child',
      title: {
        en: 'Pick Services',
        hi: 'सेवाएं चुनें'
      },
      description: {
        en: 'Select the services you need',
        hi: 'आपको जो सेवाएं चाहिए उन्हें चुनें'
      },
      voice: {
        en: 'Tap on the services you need. You can select multiple services for your booking.',
        hi: 'आपको जो सेवाएं चाहिए उन पर टैप करें। आप अपनी बुकिंग के लिए कई सेवाएं चुन सकते हैं।'
      },
      page: '/services',
      action: 'click',
      autoProgress: false
    },
    {
      id: 'find_garage_quick',
      targetSelector: 'a[href*="/search"]',
      title: {
        en: 'Find Garage',
        hi: 'गैरेज खोजें'
      },
      description: {
        en: 'Proceed to garage selection',
        hi: 'गैरेज चुनने के लिए आगे बढ़ें'
      },
      voice: {
        en: 'Continue to find and select a garage for your services.',
        hi: 'अपनी सेवाओं के लिए गैरेज खोजने और चुनने के लिए जारी रखें।'
      },
      page: '/services',
      action: 'click',
      autoProgress: true,
      navigationTarget: '/search'
    },
    {
      id: 'book_now_quick',
      targetSelector: '[data-testid="garage-card"]:first-child button:contains("Book Now")',
      title: {
        en: 'Book Now',
        hi: 'अभी बुक करें'
      },
      description: {
        en: 'Complete your booking',
        hi: 'अपनी बुकिंग पूरी करें'
      },
      voice: {
        en: 'Tap Book Now to complete your service booking. That is how easy it is!',
        hi: 'अपनी सर्विस बुकिंग पूरी करने के लिए बुक नाउ पर टैप करें। यह इतना आसान है!'
      },
      page: '/search',
      action: 'click',
      autoProgress: false
    }
  ],

  // Emergency SOS Tutorial
  emergency: [
    {
      id: 'emergency_intro',
      targetSelector: '[href="/sos"]',
      title: {
        en: 'Emergency Help',
        hi: 'आपातकालीन सहायता'
      },
      description: {
        en: 'Get help during vehicle emergencies',
        hi: 'वाहन की आपात स्थिति में सहायता प्राप्त करें'
      },
      voice: {
        en: 'Learn how to get immediate help during vehicle breakdowns or emergencies.',
        hi: 'वाहन खराब होने या आपातकाल के दौरान तत्काल सहायता कैसे प्राप्त करें।'
      },
      page: '/',
      action: 'click',
      autoProgress: true,
      navigationTarget: '/sos'
    },
    {
      id: 'emergency_options',
      targetSelector: '.grid.gap-4',
      title: {
        en: 'Emergency Options',
        hi: 'आपातकालीन विकल्प'
      },
      description: {
        en: 'Choose the type of help you need',
        hi: 'आपको जिस प्रकार की सहायता चाहिए उसे चुनें'
      },
      voice: {
        en: 'These are your emergency options: roadside assistance, nearby mechanics, or emergency towing.',
        hi: 'ये आपके आपातकालीन विकल्प हैं: रोडसाइड असिस्टेंस, नजदीकी मैकेनिक्स, या इमरजेंसी टोइंग।'
      },
      page: '/sos',
      autoProgress: false
    }
  ]
};

export const TutorialProvider = ({ children }: { children: ReactNode }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [isPaused, setIsPaused] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [currentTutorialSteps, setCurrentTutorialSteps] = useState<TutorialStep[]>([]);

  const startTutorial = (selectedLanguage: 'en' | 'hi', tutorialType: string = 'complete') => {
    setLanguage(selectedLanguage);
    setCurrentStep(0);
    setCurrentTutorialSteps(allTutorialSteps[tutorialType] || allTutorialSteps.complete);
    setIsActive(true);
    setIsPaused(false);
  };

  const nextStep = () => {
    if (currentStep < currentTutorialSteps.length - 1) {
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
    const currentStepData = currentTutorialSteps[currentStep];
    if (currentStepData && currentStepData.targetSelector === selector && currentStepData.autoProgress) {
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
        steps: currentTutorialSteps,
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
