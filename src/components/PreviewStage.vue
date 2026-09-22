<script setup lang="ts">
import { computed } from 'vue'
import { useVetrina } from '@/composables/useVetrina'
import VetrinaCanvas from './VetrinaCanvas.vue'
import { FORMATS } from '@/constants/presets'
import type { DisplayFormat } from '@/types/vetrina'
import {
  Maximize2,
  Minimize2,
  Printer,
  Download,
  ShieldCheck,
  Monitor,
  Smartphone,
  FileText
} from 'lucide-vue-next'

const {
  config,
  currentPalette,
  currentTypography,
  currentFormat,
  setFormat,
  printPoster,
  exportJson,
  toggleFullScreen,
  isFullScreen
} = useVetrina()

function getFormatIcon(id: DisplayFormat) {
  switch (id) {
    case 'horizontal': return Monitor
    case 'vertical': return Smartphone
    case 'poster': return FileText
    default: return Monitor
  }
}

// Container sizing based on format to fit comfortably in preview area
const stageMaxDimensions = computed(() => {
  if (config.value.format === 'vertical') {
    return 'max-w-[480px] max-h-[85vh]'
  }
  if (config.value.format === 'poster') {
    return 'max-w-[580px] max-h-[85vh]'
  }
  return 'max-w-[960px] max-h-[75vh]'
})
</script>

<template>
  <div class="h-full flex flex-col bg-[#0A0B0E] relative overflow-hidden">
    <!-- Top Preview Controls Bar (Hidden in Fullscreen Kiosk mode) -->
    <div
      v-if="!isFullScreen"
      class="no-print h-14 border-b border-white/10 bg-[#121318]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-3 shrink-0 z-20"
    >
      <!-- Format Switcher -->
      <div class="flex items-center gap-1.5 p-1 rounded-lg bg-black/40 border border-white/10">
        <button
          v-for="fmt in FORMATS"
          :key="fmt.id"
          type="button"
          @click="setFormat(fmt.id)"
          :class="[
            config.format === fmt.id
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-xs'
              : 'text-slate-400 hover:text-slate-200 border border-transparent'
          ]"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all"
          :title="fmt.recommendedFor"
        >
          <component :is="getFormatIcon(fmt.id)" class="w-3.5 h-3.5" />
          <span class="hidden md:inline">{{ fmt.name.split(' ')[0] }}</span>
          <span class="text-3xs opacity-60">({{ fmt.aspectRatio }})</span>
        </button>
      </div>

      <!-- Center notice: 100% Brand Identity, 0% Discounts -->
      <div class="hidden lg:flex items-center gap-1.5 text-2xs font-mono text-emerald-400/90 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-full">
        <ShieldCheck class="w-3.5 h-3.5" />
        <span>Brand Identity & Nuovi Arrivi (Zero Saldi/Prezzi)</span>
      </div>

      <!-- Action Buttons: Print, Export, FullScreen -->
      <div class="flex items-center gap-2 shrink-0">
        <button
          type="button"
          @click="printPoster"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-medium transition-colors"
          title="Stampa ad alta risoluzione o Salva come PDF"
        >
          <Printer class="w-3.5 h-3.5" />
          <span class="hidden sm:inline">Stampa / PDF</span>
        </button>

        <button
          type="button"
          @click="exportJson"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-medium transition-colors"
          title="Esporta configurazione JSON"
        >
          <Download class="w-3.5 h-3.5" />
          <span class="hidden sm:inline">JSON</span>
        </button>

        <button
          type="button"
          @click="toggleFullScreen"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 text-xs transition-colors shadow-xs"
          title="Modalità Schermo Intero / Totem Vetrina"
        >
          <Maximize2 v-if="!isFullScreen" class="w-3.5 h-3.5" />
          <Minimize2 v-else class="w-3.5 h-3.5" />
          <span>{{ isFullScreen ? 'Esci' : 'Kiosk Totem' }}</span>
        </button>
      </div>
    </div>

    <!-- Live Preview Stage Area -->
    <div
      class="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center relative"
      :class="isFullScreen ? 'p-0 bg-black' : 'bg-[#08090C]'"
    >
      <!-- Subtly styled canvas box -->
      <div
        class="w-full transition-all duration-300 flex items-center justify-center"
        :class="[
          isFullScreen ? 'h-screen max-w-none max-h-none' : stageMaxDimensions
        ]"
      >
        <div
          class="w-full shadow-2xl rounded-sm overflow-hidden transition-all duration-300"
          :class="[
            !isFullScreen ? 'ring-1 ring-white/10' : ''
          ]"
        >
          <VetrinaCanvas
            :config="config"
            :palette="currentPalette"
            :typography="currentTypography"
            :format="currentFormat"
          />
        </div>
      </div>

      <!-- Floating exit button if Fullscreen -->
      <button
        v-if="isFullScreen"
        type="button"
        @click="toggleFullScreen"
        class="no-print absolute top-4 right-4 z-50 p-2.5 rounded-full bg-black/70 hover:bg-black text-white/80 hover:text-white border border-white/20 backdrop-blur-md transition-all opacity-20 hover:opacity-100"
        title="Esci da Schermo Intero (Esc)"
      >
        <Minimize2 class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>
