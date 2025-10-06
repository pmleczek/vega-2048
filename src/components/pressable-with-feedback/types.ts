import type { PressableProps, StyleProp, ViewStyle } from 'react-native';

export type PressableWithFeedbackProps = PressableProps & {
  feedbackStyle?: StyleProp<ViewStyle>;
};
