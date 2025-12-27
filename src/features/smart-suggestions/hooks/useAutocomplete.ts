import { useState, useEffect } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { selectPurchaseHistory } from '../../../store/slices/historySlice';

interface AutocompleteItem {
  id: string;
  name: string;
  category: string;
  frequency: number;
}

export const useAutocomplete = (query: string) => {
  const [suggestions, setSuggestions] = useState<AutocompleteItem[]>([]);
  const purchaseHistory = useAppSelector(selectPurchaseHistory);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const filtered = purchaseHistory
      .filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase())
      )
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 5);

    setSuggestions(filtered);
  }, [query, purchaseHistory]);

  return suggestions;
};