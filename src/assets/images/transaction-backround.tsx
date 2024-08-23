import { SvgIconProps } from "@mui/material/SvgIcon";

export const TransactionBackground = (props: SvgIconProps) => {
  return (
    <svg
      width="414"
      height="314"
      viewBox="0 0 414 314"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 0H414V79.5C405.659 132.017 369.674 175.968 319.836 194.51L0 313.5V0Z"
        fill={props.fill}
      />
    </svg>
  );
};
