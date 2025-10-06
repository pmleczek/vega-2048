import type { SvgProps } from '@amazon-devices/react-native-svg';

import type { IconKey } from './icons';

export type IconProps = SvgProps & {
  icon: IconKey;
};
