import icons from './icons';
import type { IconProps } from './types';

const Icon = ({ icon, ...svgProps }: IconProps) => {
  const IconComponent = icons[icon];
  return <IconComponent {...svgProps} />;
};

export default Icon;
