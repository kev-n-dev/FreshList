import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { useAutocomplete } from '../../features/smart-suggestions/hooks/useAutocomplete';
import { useTheme } from '../../features/theme/hooks/useTheme';

interface SmartInputProps {
  placeholder: string;
  onSubmit: (text: string, category?: string) => void;
  style?: any;
}

export const SmartInput: React.FC<SmartInputProps> = ({
  placeholder,
  onSubmit,
  style,
}) => {
  const [text, setText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { theme } = useTheme();
  const suggestions = useAutocomplete(text);

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text.trim());
      setText('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionPress = (suggestion: any) => {
    onSubmit(suggestion.name, suggestion.category);
    setText('');
    setShowSuggestions(false);
  };

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.surface,
            color: theme.colors.text,
            borderColor: theme.colors.border,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        value={text}
        onChangeText={(value) => {
          setText(value);
          setShowSuggestions(value.length > 1);
        }}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
      />

      {showSuggestions && suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.id}
          style={[
            styles.suggestions,
            { backgroundColor: theme.colors.surface },
          ]}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestion}
              onPress={() => handleSuggestionPress(item)}
            >
              <Text style={[styles.suggestionText, { color: theme.colors.text }]}>
                {item.name}
              </Text>
              <Text style={[styles.categoryText, { color: theme.colors.textSecondary }]}>
                {item.category}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  input: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  suggestions: {
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    maxHeight: 200,
    borderRadius: 8,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1000,
  },
  suggestion: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  suggestionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  categoryText: {
    fontSize: 12,
    marginTop: 2,
  },
});