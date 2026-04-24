import type { ComponentType, CSSProperties, ReactNode } from 'react';

export interface LogoItem {
  src: string;
  alt?: string;
  href?: string;
  title?: string;
}

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right';
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
  renderItem?: (item: LogoItem) => ReactNode;
}

declare const LogoLoop: ComponentType<LogoLoopProps>;
export default LogoLoop;
