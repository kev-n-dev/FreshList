import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../../features/theme/hooks/useTheme';

interface CategorySectionProps {
  category: string;
  items: any[];
  renderItem: ({ item }: { item: any }) => React.ReactElement;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  items,
  renderItem,
}) => {
  const { theme } = useTheme();

  if (items.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text
        style={[
          styles.categoryHeader,
          { color: theme.colors.textSecondary },
        ]}
      >
        {category.toUpperCase()} ({items.length})
      </Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </View>
  );
};

interface CategorizedListProps {
  items: any[];
  renderItem: ({ item }: { item: any }) => React.ReactElement;
  getCategoryName: (item: any) => string;
}

export const CategorizedList: React.FC<CategorizedListProps> = ({
  items,
  renderItem,
  getCategoryName,
}) => {
  const categorizedItems = React.useMemo(() => {
    const categories: { [key: string]: any[] } = {};
    
    items.forEach(item => {
      const category = getCategoryName(item);
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(item);
    });

    return Object.entries(categories).sort(([a], [b]) => a.localeCompare(b));
  }, [items, getCategoryName]);

  return (
    <FlatList
      data={categorizedItems}
      keyExtractor={([category]) => category}
      renderItem={({ item: [category, categoryItems] }) => (
        <CategorySection
          category={category}
          items={categoryItems}
          renderItem={renderItem}
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  categoryHeader: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
});