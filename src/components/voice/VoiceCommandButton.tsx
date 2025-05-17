
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// Define types for the SpeechRecognition API
interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
        confidence: number;
      }
    }
  }
}

interface SpeechRecognitionInterface {
  start: () => void;
  stop: () => void;
  addEventListener: (event: string, callback: any) => void;
  lang?: string;
}

// Add TypeScript declarations for the Web Speech API
declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInterface;
    webkitSpeechRecognition?: new () => SpeechRecognitionInterface;
  }
}

// Mock function for speech recognition
const createMockSpeechRecognition = (): SpeechRecognitionInterface => {
  let isListening = false;
  let onresult: ((event: any) => void) | null = null;
  let onend: (() => void) | null = null;
  
  return {
    start: () => {
      isListening = true;
      // Simulate voice recognition after 2 seconds
      setTimeout(() => {
        if (isListening && onresult) {
          const mockEvent = {
            results: [
              [
                {
                  transcript: "book oil change",
                  confidence: 0.9
                }
              ]
            ]
          };
          onresult(mockEvent);
        }
      }, 2000);
    },
    stop: () => {
      isListening = false;
      if (onend) onend();
    },
    addEventListener: (event: string, callback: any) => {
      if (event === 'result') onresult = callback;
      if (event === 'end') onend = callback;
    }
  };
};

// Process voice commands
const processVoiceCommand = (command: string): { action: string; param?: string } => {
  const lowerCommand = command.toLowerCase();
  
  if (lowerCommand.includes('book') && lowerCommand.includes('oil change')) {
    return { action: 'book', param: 'oil-change' };
  }
  
  if (lowerCommand.includes('book') && lowerCommand.includes('tire')) {
    return { action: 'book', param: 'tire-service' };
  }
  
  if (lowerCommand.includes('sos') || lowerCommand.includes('emergency')) {
    return { action: 'sos' };
  }
  
  if (lowerCommand.includes('find') && lowerCommand.includes('garage')) {
    return { action: 'search' };
  }
  
  return { action: 'unknown' };
};

const VoiceCommandButton = () => {
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const startListening = () => {
    setIsListening(true);
    setResult('');

    // Use browser's SpeechRecognition if available, otherwise use our mock
    const SpeechRecognition = window.SpeechRecognition || 
                             window.webkitSpeechRecognition ||
                             createMockSpeechRecognition;
    
    const recognition = new SpeechRecognition();
    if ('lang' in recognition) {
      recognition.lang = 'en-US';
    }
    
    recognition.addEventListener('result', (event: any) => {
      const transcript = event.results[0][0].transcript;
      setResult(transcript);
      
      const command = processVoiceCommand(transcript);
      handleCommand(command);
    });
    
    recognition.addEventListener('end', () => {
      setIsListening(false);
    });
    
    recognition.start();
  };
  
  const handleCommand = (command: { action: string; param?: string }) => {
    switch(command.action) {
      case 'book':
        toast({
          title: "Voice command recognized",
          description: `Booking service: ${command.param}`,
        });
        navigate('/services');
        break;
      case 'sos':
        toast({
          title: "Emergency SOS activated",
          description: "Contacting nearby service centers",
          variant: "destructive"
        });
        navigate('/sos');
        break;
      case 'search':
        toast({
          title: "Voice command recognized",
          description: "Finding garages near you",
        });
        navigate('/search');
        break;
      default:
        toast({
          title: "Command not recognized",
          description: "Please try again with a valid command",
          variant: "destructive"
        });
    }
  };
  
  return (
    <div className="fixed bottom-20 right-4 z-40">
      <Button
        onClick={startListening}
        disabled={isListening}
        className={`rounded-full h-14 w-14 shadow-lg flex items-center justify-center ${
          isListening ? 'bg-red-500 animate-pulse-soft' : 'bg-garage-purple'
        }`}
      >
        <Mic className="h-6 w-6" />
      </Button>
      
      {isListening && (
        <div className="absolute bottom-full right-0 mb-2 bg-white p-3 rounded-lg shadow-lg text-sm min-w-[200px]">
          <p>Listening for commands...</p>
          <p className="text-xs text-muted-foreground mt-1">
            Try: "Book oil change" or "SOS"
          </p>
        </div>
      )}
      
      {result && (
        <div className="absolute bottom-full right-0 mb-2 bg-white p-3 rounded-lg shadow-lg text-sm min-w-[200px]">
          <p>Recognized: "{result}"</p>
        </div>
      )}
    </div>
  );
};

export default VoiceCommandButton;
