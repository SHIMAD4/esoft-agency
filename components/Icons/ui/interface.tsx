import { withDefaultProps } from '@/components/Icons/lib';
import Svg, { Path } from 'react-native-svg';
import clsx from 'clsx';
import React from 'react';

export const SearchIcon = withDefaultProps(({ size, fill, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill={fill} {...props}>
    <Path
      d="M14.8163 14.9347L11.2102 11.3286C12.1041 10.2388 12.6429 8.84286 12.6429 7.32143C12.6429 3.83163 9.81122 1 6.32143 1C2.82857 1 0 3.83163 0 7.32143C0 10.8112 2.82857 13.6429 6.32143 13.6429C7.84286 13.6429 9.23571 13.1071 10.3255 12.2133L13.9316 15.8163C14.1765 16.0612 14.5714 16.0612 14.8163 15.8163C15.0612 15.5745 15.0612 15.1765 14.8163 14.9347ZM6.32143 12.3847C3.52653 12.3847 1.2551 10.1133 1.2551 7.32143C1.2551 4.52959 3.52653 2.2551 6.32143 2.2551C9.11327 2.2551 11.3878 4.52959 11.3878 7.32143C11.3878 10.1133 9.11327 12.3847 6.32143 12.3847Z"
      fill="#78909C"
    />
  </Svg>
));

export const EditIcon = withDefaultProps(({ size, fill, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 16 17" fill={fill} {...props}>
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13.8067 4.25329C14.0667 4.51329 14.0667 4.93329 13.8067 5.19329L12.5867 6.41329L10.0867 3.91329L11.3067 2.69329C11.5667 2.43329 11.9867 2.43329 12.2467 2.69329L13.8067 4.25329ZM2 14.5V12L9.37333 4.62663L11.8733 7.12663L4.5 14.5H2Z"
      fill="white"
    />
  </Svg>
));

export const DeleteIcon = withDefaultProps(({ size, fill, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 16 17" fill={fill} {...props}>
    <Path
      d="M5.33333 5.16667H10.6667M14 5.16667H10.6667H14ZM2 5.16667H5.33333H2ZM5.33333 5.16667V2.9C5.33333 2.79391 5.37548 2.69217 5.45049 2.61716C5.5255 2.54214 5.62725 2.5 5.73333 2.5H10.2667C10.3728 2.5 10.4745 2.54214 10.5495 2.61716C10.6245 2.69217 10.6667 2.79391 10.6667 2.9V5.16667H5.33333Z"
      stroke="white"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M12.6668 5.29993V14.0999C12.6668 14.206 12.6247 14.3078 12.5497 14.3828C12.4747 14.4578 10.9062 14.4999 10.8001 14.4999H5.60015C5.49406 14.4999 3.52567 14.4578 3.45065 14.3828C3.37564 14.3078 3.3335 14.206 3.3335 14.0999V5.29993"
      stroke="white"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
));

export const ArrowIcon = withDefaultProps(({ size, fill, ...props }) => {
  const { rotateToLeft, rotateToRight } = props;

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill={fill}
      className={clsx(rotateToLeft && 'rotate-0', rotateToRight && 'rotate-180')}
      {...props}
    >
      <Path
        d="M5.2735 0.94L4.3335 0L0.333496 4L4.3335 8L5.2735 7.06L2.22016 4L5.2735 0.94Z"
        fill="#78909C"
      />
    </Svg>
  );
});

export const PeopleIcon = withDefaultProps(({ size, fill, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill} {...props}>
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.99 8C10.99 9.66 9.66 11 8 11C6.34 11 5 9.66 5 8C5 6.34 6.34 5 8 5C9.66 5 10.99 6.34 10.99 8ZM18.99 8C18.99 9.66 17.66 11 16 11C14.34 11 13 9.66 13 8C13 6.34 14.34 5 16 5C17.66 5 18.99 6.34 18.99 8ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM15.03 13.05C15.38 13.02 15.71 13 16 13C18.33 13 23 14.17 23 16.5V19H17V16.5C17 15.02 16.19 13.89 15.03 13.05Z"
      fill="white"
    />
  </Svg>
));
