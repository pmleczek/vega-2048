import {
  LinearGradient,
  LinearGradientProps,
} from '@amazon-devices/expo-linear-gradient';
import { Color } from '@utils';
import { StyleSheet } from 'react-native';

import type { GradientBackgroundProps } from './types';

const gradientConfig: LinearGradientProps = {
  colors: [Color.gradientStart, Color.gradientEnd],
  start: { x: 0.5, y: 0 },
  end: { x: 0.5, y: 1 },
  locations: [0, 1],
};

const GradientBackground = ({ children, style }: GradientBackgroundProps) => {
  return (
    <LinearGradient style={[styles.container, style]} {...gradientConfig}>
      {children}
    </LinearGradient>
  );
};

export default GradientBackground;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
