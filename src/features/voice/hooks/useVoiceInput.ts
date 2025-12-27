import { useState, useCallback } from 'react';
import { Alert } from 'react-native';

interface VoiceResult {
  text: string;
  confidence: number;
}

export const useVoiceInput = () => {
  const [isListening, setIsListening] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const requestMicrophonePermission = useCallback(async () => {
    try {
      setHasPermission(true); // Simplified for now
      return true;
    } catch (error) {
      console.error('Microphone permission failed:', error);
      Alert.alert('Permission Required', 'Microphone access is needed for voice input');
      return false;
    }
  }, []);

  const startListening = useCallback(async () => {
    const permission = hasPermission ?? await requestMicrophonePermission();
    if (!permission) return;

    try {
      setIsListening(true);
      // Voice recognition would start here
    } catch (error) {
      console.error('Voice recognition failed:', error);
      setIsListening(false);
    }
  }, [hasPermission, requestMicrophonePermission]);

  const stopListening = useCallback(() => {
    setIsListening(false);
    // Voice recognition would stop here
  }, []);

  const processVoiceCommand = useCallback((text: string) => {
    const lowerText = text.toLowerCase();
    
    // Parse voice commands
    if (lowerText.includes('add') || lowerText.includes('buy')) {
      const item = lowerText.replace(/add|buy/g, '').trim();
      return { action: 'add_item', item };
    }
    
    if (lowerText.includes('remove') || lowerText.includes('delete')) {
      const item = lowerText.replace(/remove|delete/g, '').trim();
      return { action: 'remove_item', item };
    }
    
    if (lowerText.includes('check') || lowerText.includes('mark')) {
      const item = lowerText.replace(/check|mark/g, '').trim();
      return { action: 'check_item', item };
    }
    
    return { action: 'add_item', item: text };
  }, []);

  const mockVoiceInput = useCallback((text: string) => {
    const result: VoiceResult = { text, confidence: 0.95 };
    const command = processVoiceCommand(text);
    return { result, command };
  }, [processVoiceCommand]);

  return {
    isListening,
    hasPermission,
    startListening,
    stopListening,
    processVoiceCommand,
    mockVoiceInput,
    requestMicrophonePermission
  };
};