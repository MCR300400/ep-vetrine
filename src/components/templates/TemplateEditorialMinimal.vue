<script setup lang="ts">
import { computed } from 'vue'
import type { VetrinaConfig, PaletteDef, TypographyDef, DisplayFormat } from '@/types/vetrina'
import QrCodeRenderer from '@/components/QrCodeRenderer.vue'
import { MapPin, Clock, Compass, Instagram, Globe, Phone } from 'lucide-vue-next'

const props = defineProps<{
  config: VetrinaConfig
  palette: PaletteDef
  typography: TypographyDef
  format: DisplayFormat
}>()

const isHorizontal = computed(() => props.format === 'horizontal')

const qrDarkColor = computed(() => {
  return props.palette.isDark ? '#FAF5F8' : '#1C1B19'
})
</script>

<template>
  <div
    class="w-full h-full flex flex-col justify-between p-6 sm:p-10 lg:p-14 relative transition-all duration-300 overflow-hidden"
    :class="[
      palette.bgClass,
      palette.textPrimaryClass,
      typography.fontClass
    ]"
  >
    <!-- Outer perimeter fine rule frame -->
    <div
      class="absolute inset-3 sm:inset-5 border pointer-events-none transition-colors"
      :class="palette.borderClass"
    >
      <!-- Corner ticks -->
      <div class="absolute -top-1 -left-1 w-2.5 h-2.5 border-t border-l" :class="palette.accentClass"></div>
      <div class="absolute -top-1 -right-1 w-2.5 h-2.5 border-t border-r" :class="palette.accentClass"></div>
      <div class="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b border-l" :class="palette.accentClass"></div>
      <div class="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b border-r" :class="palette.accentClass"></div>
    </div>

    <!-- Header: Minimal Colophon & Brand -->
    <header class="relative z-10 space-y-4">
      <div
        v-if="config.modules.showInsegna"
        class="flex items-center justify-between pb-3 border-b"
        :class="palette.borderClass"
      >
        <div class="flex items-center gap-3">
          <span
            v-if="config.brand.monogram"
            class="font-display text-sm tracking-widest px-2 py-0.5 border"
            :class="[palette.borderClass, palette.accentClass]"
          >
            {{ config.brand.monogram }}
          </span>
          <div>
            <h2 class="text-sm sm:text-base font-bold tracking-widest uppercase font-display">
              {{ config.brand.name }}
            </h2>
            <p v-if="config.brand.subtitle" class="text-3xs uppercase tracking-widest opacity-60">
              {{ config.brand.subtitle }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 text-3xs uppercase tracking-widest opacity-70">
          <Compass class="w-3 h-3" :class="palette.accentClass" />
          <span>{{ config.store.city }}</span>
        </div>
      </div>

      <!-- Eyebrow & Title -->
      <div class="pt-2">
        <span class="text-3xs uppercase tracking-ultra block mb-1 font-semibold" :class="palette.accentClass">
          {{ config.content.eyebrow }}
        </span>
        <h1
          class="text-3xl sm:text-5xl lg:text-6xl font-normal leading-[0.98] tracking-tight mb-2 italic"
          :class="typography.headingFontClass"
        >
          {{ config.content.title }}
        </h1>
        <p v-if="config.content.subtitle" class="text-xs sm:text-base opacity-75 max-w-2xl font-light">
          {{ config.content.subtitle }}
        </p>
      </div>
    </header>

    <!-- Center: Main Editorial Composition -->
    <main
      class="relative z-10 my-4 sm:my-6 flex-grow flex flex-col justify-center min-h-0"
      :class="[
        isHorizontal ? 'grid grid-cols-12 gap-8 items-center' : 'space-y-4'
      ]"
    >
      <!-- Visual Showcase -->
      <div
        v-if="config.modules.showMedia"
        :class="[
          isHorizontal ? (config.modules.showStoria ? 'col-span-7' : 'col-span-12') : 'w-full flex-grow min-h-0'
        ]"
      >
        <div
          v-if="config.media.layout === 'single' || config.media.layout === 'split-two'"
          class="relative w-full h-full min-h-[220px] max-h-[560px] p-2.5 sm:p-3 border shadow-atelier"
          :class="[palette.surfaceClass, palette.borderClass]"
        >
          <div class="relative w-full h-full overflow-hidden">
            <img
              :src="config.media.primary.url"
              :alt="config.media.primary.caption || 'Opera / Prodotto'"
              class="w-full h-full object-cover object-center filter grayscale-[30%] hover:grayscale-0 transition-all duration-700"
              loading="lazy"
            />
          </div>
          <div class="pt-2 flex items-center justify-between text-3xs uppercase tracking-widest opacity-60">
            <span>{{ config.media.primary.caption || 'Atelier Selection' }}</span>
            <span v-if="config.content.curatorNote">{{ config.content.curatorNote }}</span>
          </div>
        </div>

        <!-- Triptych Composition -->
        <div
          v-else-if="config.media.layout === 'triptych'"
          class="grid grid-cols-12 gap-3 h-full min-h-[220px] max-h-[560px]"
        >
          <div
            class="col-span-7 relative p-2 border shadow-atelier overflow-hidden"
            :class="[palette.surfaceClass, palette.borderClass]"
          >
            <img
              :src="config.media.primary.url"
              :alt="config.media.primary.caption || 'Dettaglio 1'"
              class="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
          <div class="col-span-5 flex flex-col gap-3">
            <div
              class="flex-1 relative p-1.5 border shadow-atelier overflow-hidden"
              :class="[palette.surfaceClass, palette.borderClass]"
            >
              <img
                :src="config.media.secondary.url"
                :alt="config.media.secondary.caption || 'Dettaglio 2'"
                class="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <div
              class="flex-1 relative p-1.5 border shadow-atelier overflow-hidden"
              :class="[palette.surfaceClass, palette.borderClass]"
            >
              <img
                :src="config.media.tertiary.url"
                :alt="config.media.tertiary.caption || 'Dettaglio 3'"
                class="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Narrative Manifesto Box -->
      <div
        v-if="config.modules.showStoria"
        :class="[
          isHorizontal ? (config.modules.showMedia ? 'col-span-5' : 'col-span-12') : 'w-full'
        ]"
        class="space-y-3"
      >
        <div class="pl-4 border-l-2" :class="palette.accentClass">
          <p class="text-xs sm:text-sm leading-relaxed opacity-85 font-serif italic">
            "{{ config.content.storyParagraph }}"
          </p>
        </div>
      </div>
    </main>

    <!-- Footer: Quiet Elegance with Store & QR -->
    <footer
      class="relative z-10 pt-4 border-t"
      :class="palette.borderClass"
    >
      <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        
        <!-- Address & Hours -->
        <div v-if="config.modules.showOrariIndirizzo" class="space-y-1 text-2xs">
          <div class="flex items-center gap-1.5 font-medium">
            <MapPin class="w-3.5 h-3.5 shrink-0" :class="palette.accentClass" />
            <span>{{ config.store.address }} — {{ config.store.city }}</span>
          </div>
          <div class="flex items-center gap-2 opacity-70" :class="palette.textSecondaryClass">
            <Clock class="w-3 h-3 shrink-0" />
            <span>{{ config.store.hoursWeekday }}</span>
            <span v-if="config.store.badgeText" class="opacity-50">•</span>
            <span v-if="config.store.badgeText">{{ config.store.badgeText }}</span>
          </div>

          <!-- Socials -->
          <div
            v-if="config.modules.showContatti"
            class="flex items-center gap-3 pt-1 opacity-70"
            :class="palette.textSecondaryClass"
          >
            <span v-if="config.contacts.instagram" class="flex items-center gap-1">
              <Instagram class="w-3 h-3" />
              <span>{{ config.contacts.instagram }}</span>
            </span>
            <span v-if="config.contacts.website" class="flex items-center gap-1">
              <Globe class="w-3 h-3" />
              <span>{{ config.contacts.website }}</span>
            </span>
            <span v-if="config.contacts.phone" class="flex items-center gap-1">
              <Phone class="w-3 h-3" />
              <span>{{ config.contacts.phone }}</span>
            </span>
          </div>
        </div>

        <!-- Minimalist QR Code -->
        <div
          v-if="config.modules.showQrCode"
          class="flex items-center gap-3"
        >
          <div class="text-left sm:text-right text-3xs uppercase tracking-wider opacity-80">
            <span class="block font-semibold" :class="palette.textPrimaryClass">{{ config.qr.label }}</span>
            <span v-if="config.qr.sublabel" class="block opacity-60">{{ config.qr.sublabel }}</span>
          </div>
          <div class="p-1.5 rounded-xs border shadow-xs" :class="palette.surfaceClass">
            <QrCodeRenderer
              :value="config.qr.targetUrl"
              :dark-color="qrDarkColor"
              :size="52"
            />
          </div>
        </div>

      </div>
    </footer>
  </div>
</template>
