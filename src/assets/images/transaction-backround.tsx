import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export const TransactionBackground = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 414 314" fill="none">
      <path
        d="M0 0H414V79.5C405.659 132.017 369.674 175.968 319.836 194.51L0 313.5V0Z"
        fill={props.color || "#000"}
      />
    </SvgIcon>
  );
};
