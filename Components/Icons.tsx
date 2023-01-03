import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size: number;
  color: string;
}

const HeartEmpty = ({ size, color }: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <Path
        fill={color}
        d="M40.3334 61.8333L40.0001 62.1667L39.6334 61.8333C23.8001 47.4667 13.3334 37.9667 13.3334 28.3333C13.3334 21.6667 18.3334 16.6667 25.0001 16.6667C30.1334 16.6667 35.1334 20 36.9001 24.5333H43.1001C44.8667 20 49.8667 16.6667 55.0001 16.6667C61.6667 16.6667 66.6667 21.6667 66.6667 28.3333C66.6667 37.9667 56.2001 47.4667 40.3334 61.8333ZM55.0001 10C49.2001 10 43.6334 12.7 40.0001 16.9333C36.3667 12.7 30.8001 10 25.0001 10C14.7334 10 6.66675 18.0333 6.66675 28.3333C6.66675 40.9 18.0001 51.2 35.1667 66.7667L40.0001 71.1667L44.8334 66.7667C62.0001 51.2 73.3334 40.9 73.3334 28.3333C73.3334 18.0333 65.2667 10 55.0001 10Z"
      />
    </Svg>
  );
};

const HeartFull = ({ size, color }: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <Path
        fill={color}
        d="M40.0001 71.1667L35.1667 66.7667C18.0001 51.2 6.66675 40.9 6.66675 28.3333C6.66675 18.0333 14.7334 10 25.0001 10C30.8001 10 36.3667 12.7 40.0001 16.9333C43.6334 12.7 49.2001 10 55.0001 10C65.2667 10 73.3334 18.0333 73.3334 28.3333C73.3334 40.9 62.0001 51.2 44.8334 66.7667L40.0001 71.1667Z"
      />
    </Svg>
  );
};

const Back = ({ size, color }: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <Path
        fill={color}
        d="M63.3332 36.6667H26.0999L42.3666 20.4C43.6666 19.1 43.6666 16.9667 42.3666 15.6667C42.0582 15.3577 41.6919 15.1125 41.2887 14.9453C40.8854 14.778 40.4531 14.6919 40.0166 14.6919C39.58 14.6919 39.1477 14.778 38.7445 14.9453C38.3413 15.1125 37.975 15.3577 37.6666 15.6667L15.6999 37.6334C15.3909 37.9418 15.1457 38.308 14.9785 38.7113C14.8112 39.1145 14.7251 39.5468 14.7251 39.9834C14.7251 40.4199 14.8112 40.8522 14.9785 41.2555C15.1457 41.6587 15.3909 42.025 15.6999 42.3334L37.6666 64.3C37.9752 64.6086 38.3416 64.8534 38.7448 65.0205C39.148 65.1875 39.5801 65.2734 40.0166 65.2734C40.453 65.2734 40.8852 65.1875 41.2884 65.0205C41.6916 64.8534 42.058 64.6086 42.3666 64.3C42.6752 63.9914 42.92 63.6251 43.087 63.2218C43.254 62.8186 43.34 62.3865 43.34 61.95C43.34 61.5136 43.254 61.0814 43.087 60.6782C42.92 60.275 42.6752 59.9086 42.3666 59.6L26.0999 43.3334H63.3332C65.1666 43.3334 66.6666 41.8334 66.6666 40C66.6666 38.1667 65.1666 36.6667 63.3332 36.6667Z"
      />
    </Svg>
  );
};

const Share = ({ size, color }: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <Path
        fill={color}
        d="M70 40.0001L46.6667 16.6667V30.0001C23.3333 33.3334 13.3333 50.0001 10 66.6667C18.3333 55.0001 30 49.6667 46.6667 49.6667V63.3334L70 40.0001Z"
      />
    </Svg>
  );
};

const OpenLink = ({ size, color }: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <Path
        fill={color}
        d="M64.75 49H60.25C59.6533 49 59.081 49.2371 58.659 49.659C58.2371 50.081 58 50.6533 58 51.25V67H13V22H33.25C33.8467 22 34.419 21.7629 34.841 21.341C35.2629 20.919 35.5 20.3467 35.5 19.75V15.25C35.5 14.6533 35.2629 14.081 34.841 13.659C34.419 13.2371 33.8467 13 33.25 13H10.75C8.95979 13 7.2429 13.7112 5.97703 14.977C4.71116 16.2429 4 17.9598 4 19.75L4 69.25C4 71.0402 4.71116 72.7571 5.97703 74.023C7.2429 75.2888 8.95979 76 10.75 76H60.25C62.0402 76 63.7571 75.2888 65.023 74.023C66.2888 72.7571 67 71.0402 67 69.25V51.25C67 50.6533 66.7629 50.081 66.341 49.659C65.919 49.2371 65.3467 49 64.75 49ZM72.625 4H54.625C51.6198 4 50.118 7.64359 52.2344 9.76562L57.2589 14.7902L22.9844 49.052C22.6697 49.3656 22.4201 49.7382 22.2497 50.1484C22.0794 50.5586 21.9917 50.9985 21.9917 51.4427C21.9917 51.8869 22.0794 52.3267 22.2497 52.7369C22.4201 53.1472 22.6697 53.5197 22.9844 53.8333L26.1723 57.0156C26.4859 57.3303 26.8585 57.5799 27.2687 57.7503C27.6789 57.9206 28.1188 58.0083 28.563 58.0083C29.0072 58.0083 29.447 57.9206 29.8572 57.7503C30.2675 57.5799 30.64 57.3303 30.9536 57.0156L65.2112 22.7481L70.2344 27.7656C72.3438 29.875 76 28.3984 76 25.375V7.375C76 6.47989 75.6444 5.62145 75.0115 4.98851C74.3785 4.35558 73.5201 4 72.625 4V4Z"
      />
    </Svg>
  );
};

export { HeartEmpty, HeartFull, Back, Share, OpenLink };
