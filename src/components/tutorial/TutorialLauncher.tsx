
import React, { useState } from 'react';
import { useTutorial } from '@/contexts/TutorialContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Volume2, Zap, BookOpen, AlertTriangle, Car } from 'lucide-react';

interface TutorialLauncherProps {
  variant?: 'button' | 'card';
  className?: string;
  tutorialType?: string;
}

const tutorialOptions = [
  {
    id: 'complete',
    title: { en: 'Complete App Tour', hi: 'पूरा ऐप टूर' },
    description: { en: 'Full walkthrough of all features', hi: 'सभी फीचर्स का पूरा वॉकथ्रू' },
    icon: BookOpen,
    duration: { en: '~5 minutes', hi: '~5 मिनट' }
  },
  {
    id: 'booking',
    title: { en: 'Quick Service Booking', hi: 'त्वरित सर्विस बुकिंग' },
    description: { en: 'Learn to book services fast', hi: 'जल्दी सेवाएं बुक करना सीखें' },
    icon: Car,
    duration: { en: '~2 minutes', hi: '~2 मिनट' }
  },
  {
    id: 'emergency',
    title: { en: 'Emergency SOS', hi: 'आपातकालीन SOS' },
    description: { en: 'Get help during emergencies', hi: 'आपातकाल में सहायता प्राप्त करें' },
    icon: AlertTriangle,
    duration: { en: '~1 minute', hi: '~1 मिनट' }
  }
];

export const TutorialLauncher = ({ variant = 'button', className, tutorialType }: TutorialLauncherProps) => {
  const { startTutorial } = useTutorial();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedTutorial, setSelectedTutorial] = useState<string>('complete');

  const handleStartTutorial = (language: 'en' | 'hi') => {
    const tutorial = tutorialType || selectedTutorial;
    startTutorial(language, tutorial);
    setShowDialog(false);
  };

  const handleLaunchClick = () => {
    if (tutorialType) {
      // If specific tutorial type is provided, show language selection directly
      setSelectedTutorial(tutorialType);
    }
    setShowDialog(true);
  };

  if (variant === 'card') {
    return (
      <>
        <Card className={`cursor-pointer hover:shadow-md transition-shadow ${className}`} onClick={handleLaunchClick}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-garage-purple/10 rounded-full">
                <Play className="h-6 w-6 text-garage-purple" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">App Tutorials</h3>
                <p className="text-sm text-muted-foreground">
                  Learn how to use the app with voice guidance
                </p>
              </div>
              <Zap className="h-5 w-5 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <TutorialSelectionDialog 
          open={showDialog}
          onOpenChange={setShowDialog}
          onTutorialSelect={handleStartTutorial}
          selectedTutorial={selectedTutorial}
          setSelectedTutorial={setSelectedTutorial}
          showTutorialSelection={!tutorialType}
        />
      </>
    );
  }

  return (
    <>
      <Button
        onClick={handleLaunchClick}
        className={`bg-garage-purple hover:bg-garage-purple/90 ${className}`}
        size="sm"
      >
        <Play className="h-4 w-4 mr-2" />
        🔊 Start Tutorial
      </Button>

      <TutorialSelectionDialog 
        open={showDialog}
        onOpenChange={setShowDialog}
        onTutorialSelect={handleStartTutorial}
        selectedTutorial={selectedTutorial}
        setSelectedTutorial={setSelectedTutorial}
        showTutorialSelection={!tutorialType}
      />
    </>
  );
};

const TutorialSelectionDialog = ({ 
  open, 
  onOpenChange, 
  onTutorialSelect,
  selectedTutorial,
  setSelectedTutorial,
  showTutorialSelection
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTutorialSelect: (language: 'en' | 'hi') => void;
  selectedTutorial: string;
  setSelectedTutorial: (tutorial: string) => void;
  showTutorialSelection: boolean;
}) => {
  const [showLanguageSelection, setShowLanguageSelection] = useState(false);

  const handleTutorialSelect = (tutorialId: string) => {
    setSelectedTutorial(tutorialId);
    setShowLanguageSelection(true);
  };

  const handleLanguageSelect = (language: 'en' | 'hi') => {
    onTutorialSelect(language);
    setShowLanguageSelection(false);
    onOpenChange(false);
  };

  const handleBack = () => {
    setShowLanguageSelection(false);
  };

  if (showLanguageSelection || !showTutorialSelection) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-garage-purple" />
              Select Tutorial Language
              {showTutorialSelection && (
                <Button variant="ghost" size="sm" onClick={handleBack} className="ml-auto">
                  ← Back
                </Button>
              )}
            </DialogTitle>
            <DialogDescription>
              Choose your preferred language for voice guidance and instructions.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 gap-3 mt-4">
            <Button
              onClick={() => handleLanguageSelect('en')}
              variant="outline"
              className="h-16 text-left justify-start"
            >
              <div>
                <div className="font-semibold">🇺🇸 English</div>
                <div className="text-sm text-muted-foreground">
                  Get guided tour in English
                </div>
              </div>
            </Button>
            
            <Button
              onClick={() => handleLanguageSelect('hi')}
              variant="outline"
              className="h-16 text-left justify-start"
            >
              <div>
                <div className="font-semibold">🇮🇳 हिंदी (Hindi)</div>
                <div className="text-sm text-muted-foreground">
                  हिंदी में गाइडेड टूर प्राप्त करें
                </div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-garage-purple" />
            Choose Tutorial
          </DialogTitle>
          <DialogDescription>
            Select which tutorial you'd like to experience with voice guidance.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-3 mt-4">
          {tutorialOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <Button
                key={option.id}
                onClick={() => handleTutorialSelect(option.id)}
                variant="outline"
                className="h-20 text-left justify-start p-4"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="p-2 bg-garage-purple/10 rounded-full">
                    <IconComponent className="h-5 w-5 text-garage-purple" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{option.title.en}</div>
                    <div className="text-sm text-muted-foreground">
                      {option.description.en}
                    </div>
                    <div className="text-xs text-garage-purple mt-1">
                      {option.duration.en}
                    </div>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
