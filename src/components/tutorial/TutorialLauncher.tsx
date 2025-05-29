
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
import { Play, Volume2, Zap } from 'lucide-react';

interface TutorialLauncherProps {
  variant?: 'button' | 'card';
  className?: string;
}

export const TutorialLauncher = ({ variant = 'button', className }: TutorialLauncherProps) => {
  const { startTutorial } = useTutorial();
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);

  const handleStartTutorial = (language: 'en' | 'hi') => {
    startTutorial(language);
    setShowLanguageDialog(false);
  };

  const handleLaunchClick = () => {
    setShowLanguageDialog(true);
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
                <h3 className="font-semibold">App Tour</h3>
                <p className="text-sm text-muted-foreground">
                  Learn how to use the app with voice guidance
                </p>
              </div>
              <Zap className="h-5 w-5 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <LanguageSelectionDialog 
          open={showLanguageDialog}
          onOpenChange={setShowLanguageDialog}
          onLanguageSelect={handleStartTutorial}
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
        🔊 Start App Tour
      </Button>

      <LanguageSelectionDialog 
        open={showLanguageDialog}
        onOpenChange={setShowLanguageDialog}
        onLanguageSelect={handleStartTutorial}
      />
    </>
  );
};

const LanguageSelectionDialog = ({ 
  open, 
  onOpenChange, 
  onLanguageSelect 
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLanguageSelect: (language: 'en' | 'hi') => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-garage-purple" />
            Select Tutorial Language
          </DialogTitle>
          <DialogDescription>
            Choose your preferred language for voice guidance and instructions.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-3 mt-4">
          <Button
            onClick={() => onLanguageSelect('en')}
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
            onClick={() => onLanguageSelect('hi')}
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
};
