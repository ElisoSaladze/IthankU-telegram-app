import { SvgIcon, SvgIconProps } from '@mui/material'

export const IconArrowDown = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 8L12.3333 16L17.6667 8H7Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  )
}
