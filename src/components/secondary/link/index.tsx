import { Link as MuiLink, Tooltip } from '@mui/material'
import { ReactNode } from 'react'
type LinkProps = {
  href: string
  children?: ReactNode
}

/**
 * Props accepted by the Link component.
 *
 * @typedef {Object} LinkProps
 * @property {string} href - The URL the link should navigate to.
 * @property {ReactNode} [children] - The content to be rendered within the link. If not provided, the href will be used as the content.
 */

/**
 * Link component renders a clickable link with optional tooltip displaying the full URL.
 * If the provided href does not start with 'http://' or 'https://', it will be prefixed with 'https://'.
 *
 * @component
 * @param {LinkProps} link - The props for the Link component.
 * @param {string} link.href - The URL the link should navigate to.
 * @param {ReactNode} [link.children] - The content to be rendered within the link. If not provided, the href will be used as the content.
 * @returns {JSX.Element} The rendered Link component.
 */
const Link = (link: LinkProps) => {
  // Check if href starts with 'http://' or 'https://'
  const href =
    link.href.startsWith('http://') || link.href.startsWith('https://')
      ? link.href
      : `https://${link.href}`
  return (
    <Tooltip title={href}>
      <MuiLink href={href} target="_blank" underline="none">
        {link.children || href}
      </MuiLink>
    </Tooltip>
  )
}
export default Link
