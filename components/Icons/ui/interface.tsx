import { withDefaultProps } from '@/components/Icons/lib';
import Svg, { Circle, Ellipse, G, Mask, Path } from 'react-native-svg';
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

export const EyeIcon = withDefaultProps(({ size, fill, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 14 11" fill={fill} {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 3.16663C5.71134 3.16663 4.66667 4.21129 4.66667 5.49996C4.66667 6.78862 5.71134 7.83329 7 7.83329C8.28867 7.83329 9.33333 6.78862 9.33333 5.49996C9.33333 4.21129 8.28867 3.16663 7 3.16663ZM5.66667 5.49996C5.66667 4.76358 6.26362 4.16663 7 4.16663C7.73638 4.16663 8.33333 4.76358 8.33333 5.49996C8.33333 6.23634 7.73638 6.83329 7 6.83329C6.26362 6.83329 5.66667 6.23634 5.66667 5.49996Z"
      fill="white"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 0.666626C3.36478 0.66663 1.23592 3.68018 0.540428 5.303C0.478659 5.44713 0.488082 5.61188 0.565879 5.74803C1.44712 7.2902 3.35345 10.3333 7 10.3333C10.6465 10.3333 12.5529 7.2902 13.4341 5.74803C13.5171 5.60288 13.522 5.42588 13.4472 5.27635C13.0958 4.57343 12.3958 3.43452 11.3379 2.46471C10.2764 1.49168 8.82798 0.666624 7 0.666626ZM7 9.33329C4.11769 9.33329 2.48402 7.04489 1.56161 5.47223C2.28255 3.96689 4.11629 1.66663 7 1.66663C8.50535 1.66662 9.72363 2.34157 10.6621 3.20187C11.4942 3.96461 12.0855 4.85549 12.4294 5.48749C11.5054 7.05965 9.873 9.33329 7 9.33329Z"
      fill="white"
    />
  </Svg>
));

export const EditIcon = withDefaultProps(({ size, fill, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 16 17" fill={fill} {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
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
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.6668 5.29993V14.0999C12.6668 14.206 12.6247 14.3078 12.5497 14.3828C12.4747 14.4578 10.9062 14.4999 10.8001 14.4999H5.60015C5.49406 14.4999 3.52567 14.4578 3.45065 14.3828C3.37564 14.3078 3.3335 14.206 3.3335 14.0999V5.29993"
      stroke="white"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
));

export const ArrowIcon = withDefaultProps(({ size, fill, ...props }) => {
  const { rotateToLeft, rotateToRight, rotateToTop, rotateToBottom } = props;

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill={fill}
      className={clsx(
        rotateToLeft && 'rotate-0',
        rotateToTop && 'rotate-90',
        rotateToRight && 'rotate-180',
        rotateToBottom && 'rotate-[-90deg]',
      )}
      {...props}
    >
      <Path
        d="M10.2735 4.94L9.3335 4L5.3335 8L9.3335 12L10.2735 11.06L7.22016 8L10.2735 4.94Z"
        fill="#78909C"
      />
    </Svg>
  );
});

export const PeopleIcon = withDefaultProps(({ size, fill, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill} {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.99 8C10.99 9.66 9.66 11 8 11C6.34 11 5 9.66 5 8C5 6.34 6.34 5 8 5C9.66 5 10.99 6.34 10.99 8ZM18.99 8C18.99 9.66 17.66 11 16 11C14.34 11 13 9.66 13 8C13 6.34 14.34 5 16 5C17.66 5 18.99 6.34 18.99 8ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM15.03 13.05C15.38 13.02 15.71 13 16 13C18.33 13 23 14.17 23 16.5V19H17V16.5C17 15.02 16.19 13.89 15.03 13.05Z"
      fill="white"
    />
  </Svg>
));

export const EstateIcon = withDefaultProps(({ size, fill, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill} {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 12H8V14H16V12ZM16 16H8V18H16V16ZM6 20H18V9H13V4H6V20Z"
      fill="white"
    />
  </Svg>
));

export const DealIcon = withDefaultProps(({ size, fill, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill} {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0V2H2L5.6 9.59L4.25 12.04C4.09 12.32 4 12.65 4 13C4 14.1 4.9 15 6 15H18V13H6.42C6.28 13 6.17 12.89 6.17 12.75L6.2 12.63L7.1 11H14.55C15.3 11 15.96 10.59 16.3 9.97L19.88 3.48C19.96 3.34 20 3.17 20 3C20 2.45 19.55 2 19 2H4.21L3.27 0H0ZM6 16C4.9 16 4.01 16.9 4.01 18C4.01 19.1 4.9 20 6 20C7.1 20 8 19.1 8 18C8 16.9 7.1 16 6 16ZM14.01 18C14.01 16.9 14.9 16 16 16C17.1 16 18 16.9 18 18C18 19.1 17.1 20 16 20C14.9 20 14.01 19.1 14.01 18Z"
      fill="white"
    />
  </Svg>
));

export const EventIcon = withDefaultProps(({ size, fill, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill} {...props}>
    <Path
      d="M8 0C8.26522 0 8.51957 0.105357 8.70711 0.292893C8.89464 0.48043 9 0.734784 9 1V2H15V1C15 0.734784 15.1054 0.48043 15.2929 0.292893C15.4804 0.105357 15.7348 0 16 0C16.2652 0 16.5196 0.105357 16.7071 0.292893C16.8946 0.48043 17 0.734784 17 1V2H19.778C20.2011 2 20.6201 2.08334 21.011 2.24526C21.4019 2.40718 21.7571 2.64451 22.0563 2.9437C22.3555 3.24289 22.5928 3.59808 22.7547 3.98899C22.9167 4.3799 23 4.79888 23 5.222V20.778C23 21.2011 22.9167 21.6201 22.7547 22.011C22.5928 22.4019 22.3555 22.7571 22.0563 23.0563C21.7571 23.3555 21.4019 23.5928 21.011 23.7547C20.6201 23.9167 20.2011 24 19.778 24H4.222C3.36747 24 2.54794 23.6605 1.9437 23.0563C1.33946 22.4521 1 21.6325 1 20.778V5.222C1 4.36747 1.33946 3.54794 1.9437 2.9437C2.54794 2.33946 3.36747 2 4.222 2H7V1C7 0.734784 7.10536 0.48043 7.29289 0.292893C7.48043 0.105357 7.73478 0 8 0V0ZM7 4H4.222C3.547 4 3 4.547 3 5.222V9H21V5.222C21 4.547 20.453 4 19.778 4H17V5C17 5.26522 16.8946 5.51957 16.7071 5.70711C16.5196 5.89464 16.2652 6 16 6C15.7348 6 15.4804 5.89464 15.2929 5.70711C15.1054 5.51957 15 5.26522 15 5V4H9V5C9 5.26522 8.89464 5.51957 8.70711 5.70711C8.51957 5.89464 8.26522 6 8 6C7.73478 6 7.48043 5.89464 7.29289 5.70711C7.10536 5.51957 7 5.26522 7 5V4ZM21 11H3V20.778C3 21.453 3.547 22 4.222 22H19.778C20.453 22 21 21.453 21 20.778V11Z"
      fill="white"
    />
  </Svg>
));

export const FilterIcon = withDefaultProps(({ size, fill, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill={fill} {...props}>
    <Path
      d="M4.30753 8.00002H11.6921M2.6665 4.66669H13.3332M6.76907 11.3334H9.23061"
      stroke="#37464F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
));

export const CrossIcon = withDefaultProps(({ size, fill, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill={fill} {...props}>
    <Path
      d="M14.25 4.8075L13.1925 3.75L9 7.9425L4.8075 3.75L3.75 4.8075L7.9425 9L3.75 13.1925L4.8075 14.25L9 10.0575L13.1925 14.25L14.25 13.1925L10.0575 9L14.25 4.8075Z"
      fill="#37464F"
    />
  </Svg>
));

export const DefaultAvatar = withDefaultProps(({ size, fill, ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 101 100" fill="none" {...props}>
    <Circle cx="50.5" cy="50" r="50" fill="#EBEFF1" />
    <Mask id="mask0_693_6538" maskUnits="userSpaceOnUse" x="0" y="0" width="101" height="100">
      <Circle cx="50.5" cy="50" r="50" fill="#C4C4C4" />
    </Mask>
    <G mask="url(#mask0_693_6538)">
      <Ellipse cx="50.4995" cy="88.0001" rx="38" ry="22" fill="#546E7A" />
    </G>
    <Ellipse cx="50.5005" cy="42.5002" rx="18" ry="18" fill="#546E7A" />
  </Svg>
));
