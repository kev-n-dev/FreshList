import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { useVoiceInput } from '../hooks/useVoiceInput';

interface VoiceInputButtonProps {
  onVoiceCommand: (command: { action: string; item: string }) => void;
}

export const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({ onVoiceCommand }) => {
  const { isListening, startListening, stopListening, mockVoiceInput } = useVoiceInput();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (isListening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, { toValue: 1.2, duration: 500, useNativeDriver: true }),
          Animated.timing(scaleAnim, { toValue: 1, duration: 500, useNativeDriver: true })
        ])
      ).start();
    } else {
      scaleAnim.setValue(1);
    }
  }, [isListening, scaleAnim]);

  const handlePress = async () => {
    if (isListening) {
      stopListening();
    } else {
      await startListening();
      
      // Mock voice input after 2 seconds
      setTimeout(() => {
        const { command } = mockVoiceInput('add milk');
        onVoiceCommand(command);
        stopListening();
      }, 2000);
    }
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        style={[styles.button, isListening && styles.listening]}
        onPress={handlePress}
      >
        <Text style={styles.icon}>🎤</Text>
        <Text style={styles.text}>
          {isListening ? 'Listening...' : 'Voice'}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  listening: {
    backgroundColor: '#FF3B30',
  },
  icon: {
    fontSize: 20,
  },
  text: {
    color: '#fff',
    fontSize: 10,
    marginTop: 2,
    fontWeight: '600',
  },
});