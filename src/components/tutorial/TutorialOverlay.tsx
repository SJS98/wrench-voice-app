
import React, { useEffect, useState } from 'react';
import { useTutorial } from '@/contexts/TutorialContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { voiceSynthesis } from '@/utils/voiceSynthesis';
import {
  Play,
  Pause,
  SkipForward,
  X,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const TutorialOverlay = () => {
  const {
    isActive,
    currentStep,
    language,
    isPaused,
    isVoiceEnabled,
    steps,
    nextStep,
    prevStep,
    skipStep,
    pauseTutorial,
    resumeTutorial,
    exitTutorial,
    toggleVoice,
  } = useTutorial();

  const [highlightedElement, setHighlightedElement] = useState<Element | null>(null);
  const [elementPosition, setElementPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentStepData = steps[currentStep];

  useEffect(() => {
    if (!isActive || !currentStepData) return;

    // Find and highlight the target element
    const targetElement = document.querySelector(currentStepData.targetSelector);
    if (targetElement) {
      setHighlightedElement(targetElement);
      const rect = targetElement.getBoundingClientRect();
      setElementPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
      });

      // Scroll element into view
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Speak the instruction if voice is enabled
      if (isVoiceEnabled && !isPaused) {
        setIsSpeaking(true);
        voiceSynthesis
          .speak(currentStepData.voice[language], language)
          .catch(console.error)
          .finally(() => setIsSpeaking(false));
      }
    }

    return () => {
      voiceSynthesis.stop();
      setIsSpeaking(false);
    };
  }, [currentStep, isActive, currentStepData, language, isVoiceEnabled, isPaused]);

  const handleNext = () => {
    voiceSynthesis.stop();
    nextStep();
  };

  const handlePrev = () => {
    voiceSynthesis.stop();
    prevStep();
  };

  const handleSkip = () => {
    voiceSynthesis.stop();
    skipStep();
  };

  const handleExit = () => {
    voiceSynthesis.stop();
    exitTutorial();
  };

  const handlePlayPause = () => {
    if (isSpeaking) {
      voiceSynthesis.stop();
      setIsSpeaking(false);
      pauseTutorial();
    } else if (isPaused) {
      resumeTutorial();
      if (isVoiceEnabled && currentStepData) {
        setIsSpeaking(true);
        voiceSynthesis
          .speak(currentStepData.voice[language], language)
          .catch(console.error)
          .finally(() => setIsSpeaking(false));
      }
    }
  };

  if (!isActive || !currentStepData) return null;

  return (
    <>
      {/* Overlay backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 pointer-events-none" />
      
      {/* Spotlight on highlighted element */}
      {highlightedElement && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            top: elementPosition.top - 8,
            left: elementPosition.left - 8,
            width: elementPosition.width + 16,
            height: elementPosition.height + 16,
          }}
        >
          <div className="w-full h-full border-4 border-garage-purple rounded-lg shadow-lg animate-pulse bg-white bg-opacity-10" />
        </div>
      )}

      {/* Tutorial instruction card */}
      <div className="fixed z-50 bottom-20 left-4 right-4 max-w-md mx-auto">
        <Card className="shadow-2xl border-garage-purple">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">
                  {currentStepData.title[language]}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {currentStepData.description[language]}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleExit}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Progress indicator */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Step {currentStep + 1} of {steps.length}</span>
                <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-garage-purple h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePlayPause}
                  className="h-8 w-8"
                >
                  {isSpeaking ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleVoice}
                  className="h-8 w-8"
                >
                  {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSkip}
                >
                  Skip
                </Button>
                <Button
                  size="sm"
                  onClick={handleNext}
                  className="bg-garage-purple hover:bg-garage-purple/90"
                >
                  {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
