import prod from './prod'

export type Config = {
  HOMEPAGE: string
  NAVBAR_HEIGHT: string
  FOOTER_HEIGHT: string
}

export const config = () => {

  const defaults: Config = {
    HOMEPAGE: 'http://localhost:3000/',
    
    NAVBAR_HEIGHT: '64px',
    FOOTER_HEIGHT: '32px',
  }

  if (process.env.NODE_ENV === 'production') return { ...defaults, ...prod }
  return defaults
}

export default config()