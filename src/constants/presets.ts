import type {
  PaletteDef,
  TypographyDef,
  FormatDef,
  VetrinaConfig,
  TemplateId
} from '@/types/vetrina'

export const PALETTES: PaletteDef[] = [
  {
    id: 'seta-avorio',
    name: 'Seta & Avorio',
    subtitle: 'Tonalità calde, ecrù e ottone satinato',
    bgClass: 'bg-[#F9F7F3]',
    surfaceClass: 'bg-[#FFFFFF]',
    borderClass: 'border-[#E6DFD3]',
    textPrimaryClass: 'text-[#1C1B19]',
    textSecondaryClass: 'text-[#6B665E]',
    accentClass: 'text-[#96784A]',
    accentBgClass: 'bg-[#96784A]/10 text-[#96784A] border-[#96784A]/30',
    isDark: false,
    previewColor: '#F9F7F3'
  },
  {
    id: 'creta-terracotta',
    name: 'Creta & Terracotta',
    subtitle: 'Atmosfere toscane, argilla e bronzo',
    bgClass: 'bg-[#F4ECE6]',
    surfaceClass: 'bg-[#FAF4F0]',
    borderClass: 'border-[#E0D0C5]',
    textPrimaryClass: 'text-[#2B211B]',
    textSecondaryClass: 'text-[#786154]',
    accentClass: 'text-[#BA5838]',
    accentBgClass: 'bg-[#BA5838]/10 text-[#BA5838] border-[#BA5838]/30',
    isDark: false,
    previewColor: '#F4ECE6'
  },
  {
    id: 'atelier-nero',
    name: 'Atelier Notte',
    subtitle: 'Nero minerale profondo, platino e gesso',
    bgClass: 'bg-[#101114]',
    surfaceClass: 'bg-[#181A20]',
    borderClass: 'border-[#2D3039]',
    textPrimaryClass: 'text-[#F5F6F8]',
    textSecondaryClass: 'text-[#9EA2AD]',
    accentClass: 'text-[#D8B468]',
    accentBgClass: 'bg-[#D8B468]/15 text-[#D8B468] border-[#D8B468]/40',
    isDark: true,
    previewColor: '#101114'
  },
  {
    id: 'salvia-lino',
    name: 'Salvia & Lino',
    subtitle: 'Verde botanico polveroso e lino grezzo',
    bgClass: 'bg-[#F3F5F1]',
    surfaceClass: 'bg-[#FAFBF9]',
    borderClass: 'border-[#D9DFD5]',
    textPrimaryClass: 'text-[#1D2B22]',
    textSecondaryClass: 'text-[#5E7064]',
    accentClass: 'text-[#4A6E57]',
    accentBgClass: 'bg-[#4A6E57]/10 text-[#4A6E57] border-[#4A6E57]/30',
    isDark: false,
    previewColor: '#F3F5F1'
  },
  {
    id: 'bordeaux-oro',
    name: 'Boutique Bordeaux',
    subtitle: 'Prugna velluto imperiale e oro zecchino',
    bgClass: 'bg-[#181116]',
    surfaceClass: 'bg-[#221820]',
    borderClass: 'border-[#3D2937]',
    textPrimaryClass: 'text-[#FAF5F8]',
    textSecondaryClass: 'text-[#B8A3B3]',
    accentClass: 'text-[#E5B869]',
    accentBgClass: 'bg-[#E5B869]/15 text-[#E5B869] border-[#E5B869]/40',
    isDark: true,
    previewColor: '#181116'
  }
]

export const TYPOGRAPHIES: TypographyDef[] = [
  {
    id: 'serif-classic',
    name: 'Serif Editoriale',
    fontClass: 'font-serif',
    headingFontClass: 'font-serif',
    sample: 'Cormorant Garamond'
  },
  {
    id: 'sans-modern',
    name: 'Sans Contemporaneo',
    fontClass: 'font-sans',
    headingFontClass: 'font-sans',
    sample: 'Plus Jakarta Sans'
  },
  {
    id: 'display-cinzel',
    name: 'Scultoreo & Monogram',
    fontClass: 'font-sans',
    headingFontClass: 'font-display',
    sample: 'Cinzel Roman'
  }
]

export const FORMATS: FormatDef[] = [
  {
    id: 'vertical',
    name: 'Totem Verticale (9:16)',
    aspectRatio: '9/16',
    widthPx: 1080,
    heightPx: 1920,
    orientation: 'portrait',
    recommendedFor: 'Totem da vetrina, display verticali a colonna, schermi digital signage'
  },
  {
    id: 'poster',
    name: 'Locandina / Poster (4:5)',
    aspectRatio: '4/5',
    widthPx: 1080,
    heightPx: 1350,
    orientation: 'portrait',
    recommendedFor: 'Stampa locandina vetrina, A4/A3, tablet, social lookbook'
  },
  {
    id: 'horizontal',
    name: 'Display Orizzontale (16:9)',
    aspectRatio: '16/9',
    widthPx: 1920,
    heightPx: 1080,
    orientation: 'landscape',
    recommendedFor: 'Schermi orizzontali in vetrina, display retro-banco, TV boutique'
  }
]

export const PHOTO_PRESETS = [
  {
    id: 'couture-coat',
    title: 'Cappotto Sartoriale & Silhouettes',
    category: 'Moda',
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'leather-bag',
    title: 'Pelletteria & Borse Artigianali',
    category: 'Accessori',
    url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'tailoring-details',
    title: 'Tessuti & Dettagli Sartoriali',
    category: 'Tessile',
    url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'artisan-ceramics',
    title: 'Design & Ceramica d’Autore',
    category: 'Design',
    url: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'high-jewelry',
    title: 'Alta Gioielleria & Metalli Nobili',
    category: 'Gioielli',
    url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'minimalist-shoes',
    title: 'Calzature in Cuoio Naturale',
    category: 'Calzature',
    url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85'
  }
]

export const DEFAULT_CONFIGS: Record<TemplateId, VetrinaConfig> = {
  'new-collection': {
    templateId: 'new-collection',
    format: 'vertical',
    paletteId: 'seta-avorio',
    typographyId: 'serif-classic',
    modules: {
      showInsegna: true,
      showMedia: true,
      showStoria: true,
      showOrariIndirizzo: true,
      showQrCode: true,
      showContatti: true
    },
    brand: {
      name: 'AURORA ATELIER',
      monogram: 'AA',
      subtitle: 'Sartoria & Creazioni Artigianali',
      establishedYear: '1984'
    },
    content: {
      eyebrow: 'NUOVA COLLEZIONE',
      title: 'Materia & Luce',
      subtitle: 'La nuova selezione di lini puri, filati nobili e tagli scultorei.',
      storyParagraph: 'Una ricerca formale che celebra l’equilibrio tra purezza del tessuto naturale e rigore contemporaneo. Ogni capo è rifinito a mano nel nostro laboratorio di Firenze.',
      curatorNote: 'Edizione limitata numerata'
    },
    media: {
      layout: 'split-two',
      primary: {
        url: PHOTO_PRESETS[0].url,
        caption: 'Silhouette Principale'
      },
      secondary: {
        url: PHOTO_PRESETS[2].url,
        caption: 'Tessitura & Dettaglio'
      },
      tertiary: {
        url: PHOTO_PRESETS[1].url,
        caption: 'Accessorio Abbinato'
      }
    },
    store: {
      address: 'Via Tornabuoni, 28',
      city: 'Firenze',
      hoursWeekday: 'Martedì – Sabato: 10:00 – 19:30',
      hoursWeekend: 'Domenica & Lunedì su appuntamento',
      badgeText: 'Atelier Aperto'
    },
    qr: {
      targetUrl: 'https://aurora-atelier.com/collezione',
      label: 'Esplora il Lookbook',
      sublabel: 'Inquadra con la fotocamera'
    },
    contacts: {
      instagram: '@aurora.atelier.firenze',
      website: 'www.aurora-atelier.com',
      phone: '+39 055 289410',
      email: 'concierge@aurora-atelier.com'
    }
  },

  'editorial-minimal': {
    templateId: 'editorial-minimal',
    format: 'poster',
    paletteId: 'atelier-nero',
    typographyId: 'display-cinzel',
    modules: {
      showInsegna: true,
      showMedia: true,
      showStoria: true,
      showOrariIndirizzo: true,
      showQrCode: true,
      showContatti: true
    },
    brand: {
      name: 'STUDIO BOTTEGA',
      monogram: 'SB',
      subtitle: 'Oggetti di Design & Ceramica Contemporanea',
      establishedYear: '2018'
    },
    content: {
      eyebrow: 'SERIE LIMITATA',
      title: 'Forma Silenziosa',
      subtitle: 'Argille selvatiche e smalti a cenere cotti a legna.',
      storyParagraph: 'Un dialogo tra imperfezione della terra cruda e geometria elementare. Forme pure plasmate per abitare lo spazio quotidiano con sobria eleganza.',
      curatorNote: 'Cottura artigianale ad alta temperatura'
    },
    media: {
      layout: 'single',
      primary: {
        url: PHOTO_PRESETS[3].url,
        caption: 'Vasi in gres torniti a mano'
      },
      secondary: {
        url: PHOTO_PRESETS[4].url,
        caption: 'Dettaglio smaltatura'
      },
      tertiary: {
        url: PHOTO_PRESETS[1].url,
        caption: 'Scultura da tavolo'
      }
    },
    store: {
      address: 'Corso Magenta, 14',
      city: 'Milano',
      hoursWeekday: 'Mercoledì – Domenica: 11:00 – 19:00',
      hoursWeekend: 'Lunedì & Martedì chiusura bottega',
      badgeText: 'Galleria & Showroom'
    },
    qr: {
      targetUrl: 'https://studiobottega.design',
      label: 'Catalogo delle Opere',
      sublabel: 'Disponibilità pezzi unici'
    },
    contacts: {
      instagram: '@studiobottega.design',
      website: 'www.studiobottega.design',
      phone: '+39 02 874291',
      email: 'atelier@studiobottega.design'
    }
  },

  'seasonal-mood': {
    templateId: 'seasonal-mood',
    format: 'horizontal',
    paletteId: 'creta-terracotta',
    typographyId: 'serif-classic',
    modules: {
      showInsegna: true,
      showMedia: true,
      showStoria: true,
      showOrariIndirizzo: true,
      showQrCode: true,
      showContatti: true
    },
    brand: {
      name: 'MAISON TESSARI',
      monogram: 'MT',
      subtitle: 'Pelletteria d’Autore & Calzature',
      establishedYear: '1972'
    },
    content: {
      eyebrow: 'ATMOSFERA DI STAGIONE',
      title: 'Terra & Radici',
      subtitle: 'Esperienza di presentazione della nuova stagione in boutique.',
      storyParagraph: 'Ti invitiamo a scoprire la consistenza dei nostri pellami toscani conciati al vegetale e i nuovi colori della stagione: cuoio naturale, vinaccia e terra d’Ombra.',
      curatorNote: 'Degustazione e consulenza su misura'
    },
    media: {
      layout: 'triptych',
      primary: {
        url: PHOTO_PRESETS[1].url,
        caption: 'Borsa a mano in cuoio pieno fiore'
      },
      secondary: {
        url: PHOTO_PRESETS[5].url,
        caption: 'Calzature da città con suola in cuoio'
      },
      tertiary: {
        url: PHOTO_PRESETS[2].url,
        caption: 'Cuciture a sella eseguite a mano'
      }
    },
    store: {
      address: 'Piazza del Popolo, 9',
      city: 'Roma',
      hoursWeekday: 'Lunedì – Sabato: 10:30 – 19:30',
      hoursWeekend: 'Domenica: 11:00 – 19:00',
      badgeText: 'Porte Aperte in Boutique'
    },
    qr: {
      targetUrl: 'https://maisontessari.it/privato',
      label: 'Invito Privato & Catalogo',
      sublabel: 'Prenota il tuo appuntamento'
    },
    contacts: {
      instagram: '@maisontessari.roma',
      website: 'www.maisontessari.it',
      phone: '+39 06 321854',
      email: 'boutique@maisontessari.it'
    }
  }
}
