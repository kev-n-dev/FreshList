import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export const hapticFeedback = {
  light: () => trigger(HapticFeedbackTypes.impactLight, options),
  medium: () => trigger(HapticFeedbackTypes.impactMedium, options),
  heavy: () => trigger(HapticFeedbackTypes.impactHeavy, options),
  success: () => trigger(HapticFeedbackTypes.notificationSuccess, options),
  warning: () => trigger(HapticFeedbackTypes.notificationWarning, options),
  error: () => trigger(HapticFeedbackTypes.notificationError, options),
  selection: () => trigger(HapticFeedbackTypes.selection, options),
};