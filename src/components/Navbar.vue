<script setup lang="ts">
import { useVetrina } from '@/composables/useVetrina'
import { Sparkles, Maximize2, Minimize2, Printer, Github } from 'lucide-vue-next'

const {
  isFullScreen,
  toggleFullScreen,
  printPoster
} = useVetrina()
</script>

<template>
  <header class="no-print h-16 border-b border-white/10 bg-[#0E0F14] px-4 sm:px-6 flex items-center justify-between z-30 shrink-0 select-none">
    <!-- Brand Title -->
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-xs">
        <Sparkles class="w-5 h-5" />
      </div>
      <div>
        <div class="flex items-center gap-2">
          <span class="font-serif italic tracking-wide text-stone-100 text-lg">
            Vetrine Digitali
          </span>
          <span class="text-3xs font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
            Studio v1.0
          </span>
        </div>
        <span class="text-2xs text-slate-400 block font-mono">
          Totem, Display Vetrina & Locandine per Boutique
        </span>
      </div>
    </div>

    <!-- Right Actions -->
    <div class="flex items-center gap-2 sm:gap-3">
      <button
        type="button"
        @click="printPoster"
        class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-medium transition-colors"
      >
        <Printer class="w-3.5 h-3.5" />
        <span>Stampa / PDF</span>
      </button>

      <button
        type="button"
        @click="toggleFullScreen"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-medium transition-colors"
      >
        <Maximize2 v-if="!isFullScreen" class="w-3.5 h-3.5" />
        <Minimize2 v-else class="w-3.5 h-3.5" />
        <span class="hidden xs:inline">{{ isFullScreen ? 'Esci Kiosk' : 'Avvia Schermo Vetrina' }}</span>
      </button>

      <a
        href="https://github.com/MCR300400/ep-vetrine"
        target="_blank"
        rel="noopener noreferrer"
        class="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
        title="GitHub Repository"
      >
        <Github class="w-4 h-4" />
      </a>
    </div>
  </header>
</template>
