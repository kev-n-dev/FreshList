const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const config = {
  resolver: {
    alias: {
      '@': './src',
      '@components': './src/components',
      '@features': './src/features',
      '@hooks': './src/hooks',
      '@utils': './src/utils',
      '@store': './src/store',
      '@types': './src/types',
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);