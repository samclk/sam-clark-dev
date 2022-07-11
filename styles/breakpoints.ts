const size = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
}

export const device = {
  mobile: `(min-width: ${size.mobile}) and (max-width: ${size.tablet})`,
  tablet: `(min-width: ${size.tablet})`,
  desktop: `(min-width: ${size.desktop})`,
}
