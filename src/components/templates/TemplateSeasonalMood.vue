<script setup lang="ts">
import { computed } from 'vue'
import type { VetrinaConfig, PaletteDef, TypographyDef, DisplayFormat } from '@/types/vetrina'
import QrCodeRenderer from '@/components/QrCodeRenderer.vue'
import { MapPin, Clock, Calendar, Instagram, Globe, Phone, Award } from 'lucide-vue-next'

const props = defineProps<{
  config: VetrinaConfig
  palette: PaletteDef
  typography: TypographyDef
  format: DisplayFormat
}>()

const isHorizontal = computed(() => props.format === 'horizontal')

const qrDarkColor = computed(() => {
  return props.palette.isDark ? '#F5F6F8' : '#2B211B'
})
</script>

<template>
  <div
    class="w-full h-full flex flex-col justify-between p-6 sm:p-10 lg:p-12 relative transition-all duration-300 overflow-hidden"
    :class="[
      palette.bgClass,
      palette.textPrimaryClass,
      typography.fontClass
    ]"
  >
    <!-- Top Warm Banner & Store Identity -->
    <header class="relative z-10 space-y-4">
      <!-- Insegna -->
      <div
        v-if="config.modules.showInsegna"
        class="flex items-center justify-between pb-3.5 border-b"
        :class="palette.borderClass"
      >
        <div class="flex items-center gap-3.5">
          <div
            v-if="config.brand.monogram"
            class="w-10 h-10 rounded-full border-2 flex items-center justify-center font-serif text-sm font-bold tracking-wider shadow-xs"
            :class="[palette.borderClass, palette.surfaceClass, palette.accentClass]"
          >
            {{ config.brand.monogram }}
          </div>
          <div>
            <h2 class="text-base sm:text-xl font-bold tracking-wider uppercase font-serif">
              {{ config.brand.name }}
            </h2>
            <p v-if="config.brand.subtitle" class="text-2xs uppercase tracking-widest opacity-75" :class="palette.textSecondaryClass">
              {{ config.brand.subtitle }}
            </p>
          </div>
        </div>

        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-3xs uppercase tracking-widest font-semibold" :class="palette.accentBgClass">
          <Award class="w-3 h-3" />
          <span>{{ config.store.badgeText || 'Boutique Aperta' }}</span>
        </div>
      </div>

      <!-- Event/Season Headline -->
      <div class="pt-1">
        <div class="flex items-center gap-2 mb-1 text-2xs uppercase tracking-widest font-semibold" :class="palette.accentClass">
          <Calendar class="w-3.5 h-3.5" />
          <span>{{ config.content.eyebrow }}</span>
        </div>
        <h1
          class="text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.02] tracking-tight mb-2"
          :class="typography.headingFontClass"
        >
          {{ config.content.title }}
        </h1>
        <p v-if="config.content.subtitle" class="text-xs sm:text-base opacity-85 max-w-3xl leading-relaxed" :class="palette.textSecondaryClass">
          {{ config.content.subtitle }}
        </p>
      </div>
    </header>

    <!-- Center: Moodboard Gallery & Experience Story -->
    <main
      class="relative z-10 my-4 sm:my-6 flex-grow flex flex-col justify-center min-h-0"
      :class="[
        isHorizontal ? 'grid grid-cols-12 gap-6 items-center' : 'space-y-4'
      ]"
    >
      <!-- Media Gallery -->
      <div
        v-if="config.modules.showMedia"
        :class="[
          isHorizontal ? (config.modules.showStoria ? 'col-span-7' : 'col-span-12') : 'w-full flex-grow min-h-0'
        ]"
      >
        <!-- Single Photo -->
        <div
          v-if="config.media.layout === 'single'"
          class="relative w-full h-full min-h-[220px] max-h-[580px] rounded-sm overflow-hidden border shadow-atelier group"
          :class="palette.borderClass"
        >
          <img
            :src="config.media.primary.url"
            :alt="config.media.primary.caption || 'Foto Atmosfera'"
            class="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
            loading="lazy"
          />
        </div>

        <!-- Split-Two Photos -->
        <div
          v-else-if="config.media.layout === 'split-two'"
          class="grid grid-cols-12 gap-3 sm:gap-4 h-full min-h-[220px] max-h-[580px]"
        >
          <div
            class="col-span-7 relative rounded-sm overflow-hidden border shadow-atelier"
            :class="palette.borderClass"
          >
            <img
              :src="config.media.primary.url"
              :alt="config.media.primary.caption || 'Focus 1'"
              class="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
          <div
            class="col-span-5 relative rounded-sm overflow-hidden border shadow-atelier"
            :class="palette.borderClass"
          >
            <img
              :src="config.media.secondary.url"
              :alt="config.media.secondary.caption || 'Focus 2'"
              class="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
        </div>

        <!-- Triptych Moodboard -->
        <div
          v-else-if="config.media.layout === 'triptych'"
          class="grid grid-cols-12 gap-3 sm:gap-4 h-full min-h-[220px] max-h-[580px]"
        >
          <div
            class="col-span-6 relative rounded-sm overflow-hidden border shadow-atelier"
            :class="palette.borderClass"
          >
            <img
              :src="config.media.primary.url"
              :alt="config.media.primary.caption || 'Foto 1'"
              class="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
          <div
            class="col-span-3 relative rounded-sm overflow-hidden border shadow-atelier"
            :class="palette.borderClass"
          >
            <img
              :src="config.media.secondary.url"
              :alt="config.media.secondary.caption || 'Foto 2'"
              class="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
          <div
            class="col-span-3 relative rounded-sm overflow-hidden border shadow-atelier"
            :class="palette.borderClass"
          >
            <img
              :src="config.media.tertiary.url"
              :alt="config.media.tertiary.caption || 'Foto 3'"
              class="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <!-- Experience & Invitation Box -->
      <div
        v-if="config.modules.showStoria"
        :class="[
          isHorizontal ? (config.modules.showMedia ? 'col-span-5' : 'col-span-12') : 'w-full'
        ]"
      >
        <div
          class="p-4 sm:p-6 rounded-sm border shadow-xs transition-colors space-y-3"
          :class="[palette.surfaceClass, palette.borderClass]"
        >
          <div class="flex items-center justify-between">
            <span class="text-3xs uppercase tracking-widest font-semibold" :class="palette.accentClass">
              Esperienza in Negozio
            </span>
            <span v-if="config.content.curatorNote" class="text-3xs italic opacity-70">
              {{ config.content.curatorNote }}
            </span>
          </div>

          <p class="text-xs sm:text-sm leading-relaxed opacity-85 font-serif">
            {{ config.content.storyParagraph }}
          </p>
        </div>
      </div>
    </main>

    <!-- Bottom: Reception, Hours & Appointment QR -->
    <footer
      class="relative z-10 pt-4 border-t"
      :class="palette.borderClass"
    >
      <div class="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-end">
        
        <!-- Address, Hours & Contacts -->
        <div
          v-if="config.modules.showOrariIndirizzo"
          :class="[
            config.modules.showQrCode ? 'sm:col-span-7 lg:col-span-8' : 'sm:col-span-12'
          ]"
          class="space-y-2"
        >
          <div class="flex items-center gap-2">
            <MapPin class="w-3.5 h-3.5 shrink-0" :class="palette.accentClass" />
            <span class="text-xs sm:text-sm font-medium">
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

          <!-- Contacts -->
          <div
            v-if="config.modules.showContatti"
            class="flex flex-wrap items-center gap-3 pt-1 text-2xs"
            :class="palette.textSecondaryClass"
          >
            <span v-if="config.contacts.instagram" class="flex items-center gap-1">
              <Instagram class="w-3 h-3" />
              <span>{{ config.contacts.instagram }}</span>
            </span>
            <span v-if="config.contacts.phone" class="flex items-center gap-1">
              <Phone class="w-3 h-3" />
              <span>{{ config.contacts.phone }}</span>
            </span>
            <span v-if="config.contacts.website" class="flex items-center gap-1">
              <Globe class="w-3 h-3" />
              <span>{{ config.contacts.website }}</span>
            </span>
          </div>
        </div>

        <!-- Appointment / Catalog QR -->
        <div
          v-if="config.modules.showQrCode"
          class="sm:col-span-5 lg:col-span-4 flex items-center justify-start sm:justify-end gap-3 p-2.5 rounded-sm border"
          :class="[palette.surfaceClass, palette.borderClass]"
        >
          <div class="text-right">
            <span class="block text-2xs font-semibold uppercase tracking-wider" :class="palette.textPrimaryClass">
              {{ config.qr.label }}
            </span>
            <span v-if="config.qr.sublabel" class="block text-3xs opacity-70" :class="palette.textSecondaryClass">
              {{ config.qr.sublabel }}
            </span>
          </div>

          <QrCodeRenderer
            :value="config.qr.targetUrl"
            :dark-color="qrDarkColor"
            :size="62"
          />
        </div>

      </div>
    </footer>
  </div>
</template>
