import { ref, computed, watch } from 'vue'
import type {
  VetrinaConfig,
  TemplateId,
  DisplayFormat,
  PaletteId,
  TypographyId
} from '@/types/vetrina'
import {
  DEFAULT_CONFIGS,
  PALETTES,
  TYPOGRAPHIES,
  FORMATS
} from '@/constants/presets'

const STORAGE_KEY = 'ep_vetrina_builder_config_v1'

function getInitialConfig(): VetrinaConfig {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as VetrinaConfig
        if (parsed && parsed.templateId && parsed.modules && parsed.brand) {
          return parsed
        }
      }
    } catch (e) {
      console.warn('Impossibile ripristinare la vetrina da localStorage:', e)
    }
  }
  return JSON.parse(JSON.stringify(DEFAULT_CONFIGS['new-collection']))
}

const config = ref<VetrinaConfig>(getInitialConfig())
const activeTab = ref<'templates' | 'modules' | 'palette' | 'content' | 'media' | 'export'>('templates')
const isFullScreen = ref(false)
const zoomScale = ref(1)

// Auto-save to localStorage
watch(
  config,
  (newVal) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
      } catch (e) {
        console.error('Errore salvataggio config in localStorage:', e)
      }
    }
  },
  { deep: true }
)

export function useVetrina() {
  const currentPalette = computed(() => {
    return PALETTES.find(p => p.id === config.value.paletteId) || PALETTES[0]
  })

  const currentTypography = computed(() => {
    return TYPOGRAPHIES.find(t => t.id === config.value.typographyId) || TYPOGRAPHIES[0]
  })

  const currentFormat = computed(() => {
    return FORMATS.find(f => f.id === config.value.format) || FORMATS[0]
  })

  function selectTemplate(templateId: TemplateId) {
    const templatePreset = DEFAULT_CONFIGS[templateId]
    if (!templatePreset) return

    // Preserve brand name and contacts if already customized by user
    const currentBrand = { ...config.value.brand }
    const currentContacts = { ...config.value.contacts }
    const currentStore = { ...config.value.store }

    config.value = {
      ...JSON.parse(JSON.stringify(templatePreset)),
      brand: currentBrand.name ? currentBrand : templatePreset.brand,
      contacts: currentContacts.instagram ? currentContacts : templatePreset.contacts,
      store: currentStore.address ? currentStore : templatePreset.store
    }
  }

  function setFormat(format: DisplayFormat) {
    config.value.format = format
  }

  function setPalette(paletteId: PaletteId) {
    config.value.paletteId = paletteId
  }

  function setTypography(typographyId: TypographyId) {
    config.value.typographyId = typographyId
  }

  function toggleModule(key: keyof VetrinaConfig['modules']) {
    config.value.modules[key] = !config.value.modules[key]
  }

  function exportJson() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(config.value, null, 2))
    const downloadAnchor = document.createElement('a')
    const safeName = (config.value.brand.name || 'vetrina').toLowerCase().replace(/[^a-z0-9]/g, '_')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', `${safeName}_vetrina_config.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  async function importJson(file: File): Promise<boolean> {
    try {
      const text = await file.text()
      const parsed = JSON.parse(text) as VetrinaConfig
      if (parsed && parsed.templateId && parsed.modules && parsed.brand) {
        config.value = parsed
        return true
      }
      throw new Error('Formato JSON non conforme al modello di vetrina.')
    } catch (err) {
      console.error('Import error:', err)
      return false
    }
  }

  function resetConfig(templateId: TemplateId = 'new-collection') {
    config.value = JSON.parse(JSON.stringify(DEFAULT_CONFIGS[templateId]))
  }

  function printPoster() {
    window.print()
  }

  async function toggleFullScreen() {
    if (!document.fullscreenElement) {
      try {
        await document.documentElement.requestFullscreen()
        isFullScreen.value = true
      } catch (err) {
        console.error('Fullscreen error:', err)
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen()
        isFullScreen.value = false
      }
    }
  }

  if (typeof document !== 'undefined') {
    document.addEventListener('fullscreenchange', () => {
      isFullScreen.value = !!document.fullscreenElement
    })
  }

  return {
    config,
    activeTab,
    isFullScreen,
    zoomScale,
    currentPalette,
    currentTypography,
    currentFormat,
    selectTemplate,
    setFormat,
    setPalette,
    setTypography,
    toggleModule,
    exportJson,
    importJson,
    resetConfig,
    printPoster,
    toggleFullScreen
  }
}
