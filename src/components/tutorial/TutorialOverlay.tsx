
import React, { useEffect, useState } from 'react';
import { useTutorial } from '@/contexts/TutorialContext';
import { useLocation, useNavigate } from 'react-router-dom';
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
    handleElementClick,
  } = useTutorial();

  const location = useLocation();
  const navigate = useNavigate();
  const [highlightedElement, setHighlightedElement] = useState<Element | null>(null);
  const [elementPosition, setElementPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0, position: 'bottom' });
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentStepData = steps[currentStep];

  // Calculate optimal popup position
  const calculatePopupPosition = (elementRect: DOMRect) => {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const popupHeight = 280; // Estimated popup height
    const popupWidth = 384; // max-w-md = 384px
    const margin = 16;

    let position = 'bottom';
    let top = elementRect.bottom + window.scrollY + margin;
    let left = elementRect.left + window.scrollX + (elementRect.width / 2) - (popupWidth / 2);

    // Check if popup fits below the element
    if (elementRect.bottom + popupHeight + margin > viewportHeight) {
      // Try positioning above
      if (elementRect.top - popupHeight - margin > 0) {
        position = 'top';
        top = elementRect.top + window.scrollY - popupHeight - margin;
      } else {
        // Try positioning to the side
        if (elementRect.right + popupWidth + margin < viewportWidth) {
          position = 'right';
          top = elementRect.top + window.scrollY + (elementRect.height / 2) - (popupHeight / 2);
          left = elementRect.right + window.scrollX + margin;
        } else if (elementRect.left - popupWidth - margin > 0) {
          position = 'left';
          top = elementRect.top + window.scrollY + (elementRect.height / 2) - (popupHeight / 2);
          left = elementRect.left + window.scrollX - popupWidth - margin;
        } else {
          // Fall back to bottom with viewport constraint
          position = 'bottom';
          top = Math.min(
            elementRect.bottom + window.scrollY + margin,
            window.scrollY + viewportHeight - popupHeight - margin
          );
        }
      }
    }

    // Ensure popup stays within horizontal viewport bounds
    if (position === 'top' || position === 'bottom') {
      left = Math.max(margin, Math.min(left, viewportWidth - popupWidth - margin));
    }

    // Ensure popup stays within vertical viewport bounds for side positions
    if (position === 'left' || position === 'right') {
      top = Math.max(
        window.scrollY + margin,
        Math.min(top, window.scrollY + viewportHeight - popupHeight - margin)
      );
    }

    return { top, left, position };
  };

  // Check if we need to navigate to the correct page for the current step
  useEffect(() => {
    if (isActive && currentStepData && currentStepData.page && location.pathname !== currentStepData.page) {
      navigate(currentStepData.page);
    }
  }, [currentStep, isActive, currentStepData, location.pathname, navigate]);

  useEffect(() => {
    if (!isActive || !currentStepData) return;

    // Wait a bit for page to load if we just navigated
    const timeout = setTimeout(() => {
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

        // Calculate and set popup position
        const popupPos = calculatePopupPosition(rect);
        setPopupPosition(popupPos);

        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Add click listener for auto-progression
        if (currentStepData.autoProgress) {
          const clickHandler = (event: Event) => {
            event.preventDefault();
            event.stopPropagation();
            handleElementClick(currentStepData.targetSelector);
            
            // Allow the original action after tutorial progression
            setTimeout(() => {
              if (currentStepData.navigationTarget) {
                navigate(currentStepData.navigationTarget);
              } else {
                // Re-trigger the original click
                const originalElement = event.target as HTMLElement;
                if (originalElement && originalElement.click) {
                  originalElement.click();
                }
              }
            }, 100);
          };
          
          targetElement.addEventListener('click', clickHandler, { once: true });
        }

        if (isVoiceEnabled && !isPaused) {
          setIsSpeaking(true);
          voiceSynthesis
            .speak(currentStepData.voice[language], language)
            .catch(console.error)
            .finally(() => setIsSpeaking(false));
        }
      } else {
        console.warn(`Tutorial: Element not found for selector: ${currentStepData.targetSelector}`);
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
      voiceSynthesis.stop();
      setIsSpeaking(false);
    };
  }, [currentStep, isActive, currentStepData, language, isVoiceEnabled, isPaused, handleElementClick, navigate]);

  // Recalculate popup position on window resize or scroll
  useEffect(() => {
    const handleReposition = () => {
      if (highlightedElement) {
        const rect = highlightedElement.getBoundingClientRect();
        const popupPos = calculatePopupPosition(rect);
        setPopupPosition(popupPos);
      }
    };

    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition);

    return () => {
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition);
    };
  }, [highlightedElement]);

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

  // Get arrow indicator based on popup position
  const getArrowClasses = () => {
    switch (popupPosition.position) {
      case 'top':
        return 'after:absolute after:top-full after:left-1/2 after:transform after:-translate-x-1/2 after:border-8 after:border-t-white after:border-transparent after:border-b-0';
      case 'bottom':
        return 'before:absolute before:bottom-full before:left-1/2 before:transform before:-translate-x-1/2 before:border-8 before:border-b-white before:border-transparent before:border-t-0';
      case 'left':
        return 'after:absolute after:left-full after:top-1/2 after:transform after:-translate-y-1/2 after:border-8 after:border-l-white after:border-transparent after:border-r-0';
      case 'right':
        return 'before:absolute before:right-full before:top-1/2 before:transform before:-translate-y-1/2 before:border-8 before:border-r-white before:border-transparent before:border-l-0';
      default:
        return '';
    }
  };

  return (
    <>
      {/* Overlay backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 pointer-events-none" />
      
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

      {/* Tutorial instruction card with dynamic positioning */}
      <div 
        className={`fixed z-50 max-w-md ${getArrowClasses()}`}
        style={{
          top: popupPosition.top,
          left: popupPosition.left,
        }}
      >
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

            {/* Auto-progress indicator */}
            {currentStepData.autoProgress && (
              <div className="mb-3 p-2 bg-garage-purple/10 rounded-md">
                <p className="text-xs text-garage-purple">
                  {language === 'en' 
                    ? '👆 Tap the highlighted element to continue' 
                    : '👆 जारी रखने के लिए हाइलाइट किए गए तत्व पर टैप करें'
                  }
                </p>
              </div>
            )}

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
                  {language === 'en' ? 'Skip' : 'छोड़ें'}
                </Button>
                <Button
                  size="sm"
                  onClick={handleNext}
                  className="bg-garage-purple hover:bg-garage-purple/90"
                  disabled={currentStepData.autoProgress}
                >
                  {currentStep === steps.length - 1 
                    ? (language === 'en' ? 'Finish' : 'समाप्त') 
                    : (language === 'en' ? 'Next' : 'अगला')
                  }
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
