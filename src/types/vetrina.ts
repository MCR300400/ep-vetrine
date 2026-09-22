export type TemplateId = 'new-collection' | 'editorial-minimal' | 'seasonal-mood'
export type DisplayFormat = 'horizontal' | 'vertical' | 'poster'
export type PaletteId = 'seta-avorio' | 'creta-terracotta' | 'atelier-nero' | 'salvia-lino' | 'bordeaux-oro'
export type TypographyId = 'serif-classic' | 'sans-modern' | 'display-cinzel'
export type MediaLayout = 'single' | 'split-two' | 'triptych'

export interface VetrinaMedia {
  url: string
  alt?: string
  caption?: string
}

export interface VetrinaConfig {
  templateId: TemplateId
  format: DisplayFormat
  paletteId: PaletteId
  typographyId: TypographyId

  modules: {
    showInsegna: boolean
    showMedia: boolean
    showStoria: boolean
    showOrariIndirizzo: boolean
    showQrCode: boolean
    showContatti: boolean
  }

  brand: {
    name: string
    monogram: string
    subtitle: string
    establishedYear?: string
  }

  content: {
    eyebrow: string
    title: string
    subtitle: string
    storyParagraph: string
    curatorNote?: string
  }

  media: {
    layout: MediaLayout
    primary: VetrinaMedia
    secondary: VetrinaMedia
    tertiary: VetrinaMedia
  }

  store: {
    address: string
    city: string
    hoursWeekday: string
    hoursWeekend: string
    badgeText?: string
  }

  qr: {
    targetUrl: string
    label: string
    sublabel?: string
  }

  contacts: {
    instagram?: string
    website?: string
    phone?: string
    email?: string
  }
}

export interface PaletteDef {
  id: PaletteId
  name: string
  subtitle: string
  bgClass: string
  surfaceClass: string
  borderClass: string
  textPrimaryClass: string
  textSecondaryClass: string
  accentClass: string
  accentBgClass: string
  isDark: boolean
  previewColor: string
}

export interface TypographyDef {
  id: TypographyId
  name: string
  fontClass: string
  headingFontClass: string
  sample: string
}

export interface FormatDef {
  id: DisplayFormat
  name: string
  aspectRatio: string
  widthPx: number
  heightPx: number
  orientation: 'landscape' | 'portrait'
  recommendedFor: string
}
