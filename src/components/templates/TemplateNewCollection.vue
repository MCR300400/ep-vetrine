<script setup lang="ts">
import { computed } from 'vue'
import type { VetrinaConfig, PaletteDef, TypographyDef, DisplayFormat } from '@/types/vetrina'
import QrCodeRenderer from '@/components/QrCodeRenderer.vue'
import { MapPin, Clock, Instagram, Globe, Phone, Sparkles } from 'lucide-vue-next'

const props = defineProps<{
  config: VetrinaConfig
  palette: PaletteDef
  typography: TypographyDef
  format: DisplayFormat
}>()

const isHorizontal = computed(() => props.format === 'horizontal')

const qrDarkColor = computed(() => {
  return props.palette.isDark ? '#F5F6F8' : '#1C1B19'
})
</script>

<template>
  <div
    class="w-full h-full flex flex-col justify-between p-6 sm:p-10 lg:p-12 transition-all duration-300 relative overflow-hidden"
    :class="[
      palette.bgClass,
      palette.textPrimaryClass,
      typography.fontClass
    ]"
  >
    <!-- Background architectural grid accents (subtle) -->
    <div class="absolute inset-0 pointer-events-none opacity-20">
      <div class="absolute top-0 right-1/4 w-px h-full" :class="palette.isDark ? 'bg-white/15' : 'bg-black/10'"></div>
      <div class="absolute top-1/3 left-0 w-full h-px" :class="palette.isDark ? 'bg-white/10' : 'bg-black/10'"></div>
    </div>

    <!-- Top: Header / Insegna / Eyebrow -->
    <header class="relative z-10 space-y-4">
      <!-- Insegna Block -->
      <div
        v-if="config.modules.showInsegna"
        class="flex items-center justify-between pb-4 border-b transition-colors"
        :class="palette.borderClass"
      >
        <div class="flex items-center gap-3.5">
          <div
            v-if="config.brand.monogram"
            class="w-10 h-10 rounded-sm border flex items-center justify-center font-display font-bold text-xs tracking-wider transition-colors shadow-xs"
            :class="[palette.borderClass, palette.surfaceClass, palette.accentClass]"
          >
            {{ config.brand.monogram }}
          </div>
          <div>
            <h2
              class="text-base sm:text-lg font-bold tracking-widest uppercase transition-colors"
              :class="typography.headingFontClass"
            >
              {{ config.brand.name }}
            </h2>
            <p v-if="config.brand.subtitle" class="text-2xs uppercase tracking-wider opacity-75" :class="palette.textSecondaryClass">
              {{ config.brand.subtitle }}
            </p>
          </div>
        </div>

        <div v-if="config.brand.establishedYear" class="hidden sm:block text-right">
          <span class="text-3xs uppercase tracking-widest opacity-60 block" :class="palette.textSecondaryClass">Boutique</span>
          <span class="text-2xs font-mono font-medium tracking-wider">Est. {{ config.brand.establishedYear }}</span>
        </div>
      </div>

      <!-- Eyebrow Tag / Collection Headline -->
      <div class="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-xs border text-2xs uppercase tracking-widest font-semibold transition-colors" :class="palette.accentBgClass">
          <Sparkles class="w-3 h-3" />
          <span>{{ config.content.eyebrow }}</span>
        </div>

        <span
          v-if="config.content.curatorNote"
          class="text-2xs tracking-widest uppercase opacity-75 italic"
          :class="palette.textSecondaryClass"
        >
          {{ config.content.curatorNote }}
        </span>
      </div>

      <!-- Main Headline Title & Subtitle -->
      <div>
        <h1
          class="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.02] mb-2"
          :class="typography.headingFontClass"
        >
          {{ config.content.title }}
        </h1>
        <p
          v-if="config.content.subtitle"
          class="text-sm sm:text-lg opacity-85 max-w-3xl leading-relaxed"
          :class="palette.textSecondaryClass"
        >
          {{ config.content.subtitle }}
        </p>
      </div>
    </header>

    <!-- Center: Media Layout & Narrative Story -->
    <main
      class="relative z-10 my-4 sm:my-6 flex-grow flex flex-col justify-center min-h-0"
      :class="[
        isHorizontal ? 'grid grid-cols-12 gap-6 items-center' : 'space-y-4'
      ]"
    >
      <!-- Media Section -->
      <div
        v-if="config.modules.showMedia"
        :class="[
          isHorizontal ? (config.modules.showStoria ? 'col-span-7' : 'col-span-12') : 'w-full flex-grow min-h-0'
        ]"
      >
        <!-- Single Photo Layout -->
        <div
          v-if="config.media.layout === 'single'"
          class="relative w-full h-full min-h-[220px] max-h-[580px] rounded-xs overflow-hidden border shadow-atelier group"
          :class="palette.borderClass"
        >
          <img
            :src="config.media.primary.url"
            :alt="config.media.primary.caption || 'Foto Collezione'"
            class="w-full h-full object-cover object-center transform group-hover:scale-102 transition-transform duration-700"
            loading="lazy"
          />
          <div
            v-if="config.media.primary.caption"
            class="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-xs backdrop-blur-md text-3xs uppercase tracking-widest border"
            :class="palette.isDark ? 'bg-black/60 border-white/10 text-white' : 'bg-white/80 border-black/10 text-black'"
          >
            {{ config.media.primary.caption }}
          </div>
        </div>

        <!-- Split-Two Photos Layout -->
        <div
          v-else-if="config.media.layout === 'split-two'"
          class="grid grid-cols-12 gap-3 sm:gap-4 h-full min-h-[220px] max-h-[580px]"
        >
          <div
            class="col-span-8 relative rounded-xs overflow-hidden border shadow-atelier group"
            :class="palette.borderClass"
          >
            <img
              :src="config.media.primary.url"
              :alt="config.media.primary.caption || 'Focus Primario'"
              class="w-full h-full object-cover object-center transform group-hover:scale-102 transition-transform duration-700"
              loading="lazy"
            />
            <div
              v-if="config.media.primary.caption"
              class="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-xs backdrop-blur-md text-3xs uppercase tracking-widest border"
              :class="palette.isDark ? 'bg-black/60 border-white/10 text-white' : 'bg-white/80 border-black/10 text-black'"
            >
              {{ config.media.primary.caption }}
            </div>
          </div>

          <div
            class="col-span-4 relative rounded-xs overflow-hidden border shadow-atelier group"
            :class="palette.borderClass"
          >
            <img
              :src="config.media.secondary.url"
              :alt="config.media.secondary.caption || 'Dettaglio'"
              class="w-full h-full object-cover object-center transform group-hover:scale-102 transition-transform duration-700"
              loading="lazy"
            />
            <div
              v-if="config.media.secondary.caption"
              class="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-xs backdrop-blur-md text-3xs uppercase tracking-widest border"
              :class="palette.isDark ? 'bg-black/60 border-white/10 text-white' : 'bg-white/80 border-black/10 text-black'"
            >
              {{ config.media.secondary.caption }}
            </div>
          </div>
        </div>

        <!-- Triptych Layout -->
        <div
          v-else-if="config.media.layout === 'triptych'"
          class="grid grid-cols-12 gap-3 sm:gap-4 h-full min-h-[220px] max-h-[580px]"
        >
          <div
            class="col-span-6 relative rounded-xs overflow-hidden border shadow-atelier"
            :class="palette.borderClass"
          >
            <img
              :src="config.media.primary.url"
              :alt="config.media.primary.caption || 'Lookbook 1'"
              class="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
          <div
            class="col-span-3 relative rounded-xs overflow-hidden border shadow-atelier"
            :class="palette.borderClass"
          >
            <img
              :src="config.media.secondary.url"
              :alt="config.media.secondary.caption || 'Lookbook 2'"
              class="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
          <div
            class="col-span-3 relative rounded-xs overflow-hidden border shadow-atelier"
            :class="palette.borderClass"
          >
            <img
              :src="config.media.tertiary.url"
              :alt="config.media.tertiary.caption || 'Lookbook 3'"
              class="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <!-- Narrative Story Box -->
      <div
        v-if="config.modules.showStoria"
        :class="[
          isHorizontal ? (config.modules.showMedia ? 'col-span-5' : 'col-span-12') : 'w-full'
        ]"
      >
        <div
          class="p-4 sm:p-6 rounded-xs border transition-colors shadow-xs"
          :class="[palette.surfaceClass, palette.borderClass]"
        >
          <span class="text-3xs uppercase tracking-widest block mb-2 font-semibold" :class="palette.accentClass">
            Manifesto della Collezione
          </span>
          <p class="text-xs sm:text-sm leading-relaxed opacity-85 italic font-serif">
            "{{ config.content.storyParagraph }}"
          </p>
        </div>
      </div>
    </main>

    <!-- Bottom: Footer with Store, QR and Contacts -->
    <footer
      class="relative z-10 pt-4 border-t transition-colors"
      :class="palette.borderClass"
    >
      <div class="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-end">
        
        <!-- Store Hours & Address -->
        <div
          v-if="config.modules.showOrariIndirizzo"
          :class="[
            config.modules.showQrCode ? 'sm:col-span-7 lg:col-span-8' : 'sm:col-span-12'
          ]"
          class="space-y-2"
        >
          <div class="flex items-center gap-2">
            <MapPin class="w-3.5 h-3.5 shrink-0" :class="palette.accentClass" />
            <span class="text-xs sm:text-sm font-medium tracking-wide">
              {{ config.store.address }} — {{ config.store.city }}
            </span>
          </div>

          <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-2xs opacity-80" :class="palette.textSecondaryClass">
            <div class="flex items-center gap-1.5">
              <Clock class="w-3 h-3 shrink-0" />
              <span>{{ config.store.hoursWeekday }}</span>
            </div>
            <span v-if="config.store.hoursWeekend" class="opacity-40">•</span>
            <span v-if="config.store.hoursWeekend">{{ config.store.hoursWeekend }}</span>
          </div>

          <!-- Social Contacts -->
          <div
            v-if="config.modules.showContatti"
            class="flex flex-wrap items-center gap-3 pt-1 text-2xs"
            :class="palette.textSecondaryClass"
          >
            <span v-if="config.contacts.instagram" class="inline-flex items-center gap-1">
              <Instagram class="w-3 h-3" />
              <span>{{ config.contacts.instagram }}</span>
            </span>
            <span v-if="config.contacts.website" class="inline-flex items-center gap-1">
              <Globe class="w-3 h-3" />
              <span>{{ config.contacts.website }}</span>
            </span>
            <span v-if="config.contacts.phone" class="inline-flex items-center gap-1">
              <Phone class="w-3 h-3" />
              <span>{{ config.contacts.phone }}</span>
            </span>
          </div>
        </div>

        <!-- QR Code Block -->
        <div
          v-if="config.modules.showQrCode"
          class="sm:col-span-5 lg:col-span-4 flex items-center justify-start sm:justify-end gap-3.5 p-2.5 rounded-xs border"
          :class="[palette.surfaceClass, palette.borderClass]"
        >
          <div class="text-right">
            <span class="block text-2xs font-semibold uppercase tracking-wider" :class="palette.textPrimaryClass">
              {{ config.qr.label }}
            </span>
            <span v-if="config.qr.sublabel" class="block text-3xs opacity-75" :class="palette.textSecondaryClass">
              {{ config.qr.sublabel }}
            </span>
          </div>

          <QrCodeRenderer
            :value="config.qr.targetUrl"
            :dark-color="qrDarkColor"
            :size="64"
          />
        </div>

      </div>
    </footer>
  </div>
</template>
