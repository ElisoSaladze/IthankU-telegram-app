import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export const IconArrow = ({
  direction = 'down',
  ...props
}: SvgIconProps & {
  direction?: 'right' | 'left' | 'up' | 'down';
}) => {
  let rotateValue;

  switch (direction) {
    case 'up': {
      rotateValue = 'rotate(90deg)';
      break;
    }
    case 'down': {
      rotateValue = 'rotate(-90deg)';
      break;
    }
    case 'left': {
      rotateValue = 'rotate(0deg)';
      break;
    }
    case 'right': {
      rotateValue = 'rotate(180deg)';
      break;
    }
  }

  return (
    <SvgIcon {...props} width="15" height="27" viewBox="0 0 15 27" sx={{ transform: rotateValue, ...props.sx }}>
      <path
        d="M14.485 0.528777C13.8008 -0.176259 12.6975 -0.176259 12.0133 0.528777L0.408472 12.4856C-0.136157 13.0468 -0.136157 13.9532 0.408472 14.5144L12.0133 26.4712C12.6975 27.1763 13.8008 27.1763 14.485 26.4712C15.1693 25.7662 15.1693 24.6295 14.485 23.9245L4.37449 13.4928L14.499 3.06115C15.1693 2.3705 15.1693 1.21942 14.485 0.528777Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};
