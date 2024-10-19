import React, { ReactElement } from 'react';

type RotateSvg = {
  rotateToLeft?: boolean;
  rotateToRight?: boolean;
  rotateToTop?: boolean;
  rotateToBottom?: boolean;
};

type IconProps<T> = {
  size?: number | string;
  fill?: string;
  strokeWidth?: number;
  className?: string;
} & T &
  RotateSvg;

export type IconType<T> = (props: IconProps<T>) => ReactElement | null;

export const withDefaultProps =
  <T extends any>(Icon: IconType<T>) =>
  ({ size = 16, fill = 'currentColor', ...props }: IconProps<T>): JSX.Element => (
    <Icon size={size} fill={fill} {...(props as IconProps<T>)} />
  );
