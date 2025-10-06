import Clock from './Clock';
import Trophy from './Trophy';

const icons = {
  clock: Clock,
  trophy: Trophy,
} as const;

export type IconKey = keyof typeof icons;

export default icons;
