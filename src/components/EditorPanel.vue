<script setup lang="ts">
import { ref } from 'vue'
import { useVetrina } from '@/composables/useVetrina'
import { PALETTES, TYPOGRAPHIES, PHOTO_PRESETS } from '@/constants/presets'
import {
  LayoutTemplate,
  Sliders,
  Palette,
  Type,
  Image as ImageIcon,
  FileJson,
  Upload,
  RotateCcw,
  Check,
  Building2,
  Sparkles,
  BookOpen,
  Calendar,
  Layers
} from 'lucide-vue-next'

const {
  config,
  activeTab,
  selectTemplate,
  setPalette,
  setTypography,
  toggleModule,
  exportJson,
  importJson,
  resetConfig
} = useVetrina()

const fileInputRef = ref<HTMLInputElement | null>(null)
const jsonInputRef = ref<HTMLInputElement | null>(null)
const mediaTargetSlot = ref<'primary' | 'secondary' | 'tertiary'>('primary')

function handleFileUpload(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    const reader = new FileReader()
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string
      if (result) {
        config.value.media[mediaTargetSlot.value].url = result
      }
    }
    reader.readAsDataURL(file)
  }
}

async function handleJsonImport(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const success = await importJson(target.files[0])
    if (success) {
      alert('Configurazione vetrina caricata con successo!')
    } else {
      alert('Errore nel caricamento del file JSON. Formato non valido.')
    }
    target.value = ''
  }
}

function applyPhotoPreset(url: string) {
  config.value.media[mediaTargetSlot.value].url = url
}
</script>

<template>
  <aside class="no-print h-full flex flex-col bg-[#121318] border-r border-white/10 w-full select-none">
    
    <!-- Editor Tabs Header -->
    <div class="p-3 border-b border-white/10 bg-[#16181F] flex items-center gap-1 overflow-x-auto scrollbar-none">
      <button
        type="button"
        @click="activeTab = 'templates'"
        :class="activeTab === 'templates' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'text-slate-400 hover:text-white border-transparent'"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all shrink-0"
      >
        <LayoutTemplate class="w-3.5 h-3.5" />
        <span>Template</span>
      </button>

      <button
        type="button"
        @click="activeTab = 'modules'"
        :class="activeTab === 'modules' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'text-slate-400 hover:text-white border-transparent'"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all shrink-0"
      >
        <Sliders class="w-3.5 h-3.5" />
        <span>Moduli</span>
      </button>

      <button
        type="button"
        @click="activeTab = 'palette'"
        :class="activeTab === 'palette' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'text-slate-400 hover:text-white border-transparent'"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all shrink-0"
      >
        <Palette class="w-3.5 h-3.5" />
        <span>Design</span>
      </button>

      <button
        type="button"
        @click="activeTab = 'content'"
        :class="activeTab === 'content' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'text-slate-400 hover:text-white border-transparent'"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all shrink-0"
      >
        <Type class="w-3.5 h-3.5" />
        <span>Testi</span>
      </button>

      <button
        type="button"
        @click="activeTab = 'media'"
        :class="activeTab === 'media' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'text-slate-400 hover:text-white border-transparent'"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all shrink-0"
      >
        <ImageIcon class="w-3.5 h-3.5" />
        <span>Media</span>
      </button>

      <button
        type="button"
        @click="activeTab = 'export'"
        :class="activeTab === 'export' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'text-slate-400 hover:text-white border-transparent'"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all shrink-0"
      >
        <FileJson class="w-3.5 h-3.5" />
        <span>Salvataggio</span>
      </button>
    </div>

    <!-- Scrollable Config Section Body -->
    <div class="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6 text-slate-200">
      
      <!-- ================= TAB: TEMPLATES ================= -->
      <div v-if="activeTab === 'templates'" class="space-y-4">
        <div>
          <h3 class="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">
            Template Estetici d'Autore
          </h3>
          <p class="text-2xs text-slate-500">
            Layout studiati per valorizzare l'identità del brand e i nuovi arrivi, rigorosamente senza sconti o ribassi.
          </p>
        </div>

        <div class="space-y-3">
          <!-- Template 1: Nuova Collezione -->
          <div
            @click="selectTemplate('new-collection')"
            :class="config.templateId === 'new-collection' ? 'border-amber-500/80 bg-amber-500/10 ring-1 ring-amber-500/40' : 'border-white/10 bg-white/5 hover:border-white/20'"
            class="p-4 rounded-xl border cursor-pointer transition-all space-y-2 group"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Sparkles class="w-4 h-4 text-amber-400" />
                <h4 class="text-sm font-semibold text-white">Nuova Collezione / Capsule</h4>
              </div>
              <Check v-if="config.templateId === 'new-collection'" class="w-4 h-4 text-amber-400" />
            </div>
            <p class="text-xs text-slate-400 leading-relaxed">
              Equilibrio dinamico tra fotografia in primo piano, dettagli di tessuto e badge di stagione. Ideale per moda e accessori.
            </p>
          </div>

          <!-- Template 2: Editoriale Minimal -->
          <div
            @click="selectTemplate('editorial-minimal')"
            :class="config.templateId === 'editorial-minimal' ? 'border-amber-500/80 bg-amber-500/10 ring-1 ring-amber-500/40' : 'border-white/10 bg-white/5 hover:border-white/20'"
            class="p-4 rounded-xl border cursor-pointer transition-all space-y-2 group"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <BookOpen class="w-4 h-4 text-amber-400" />
                <h4 class="text-sm font-semibold text-white">Atelier & Manifattura</h4>
              </div>
              <Check v-if="config.templateId === 'editorial-minimal'" class="w-4 h-4 text-amber-400" />
            </div>
            <p class="text-xs text-slate-400 leading-relaxed">
              Layout editoriale da rivista d’arte, asimmetria calibrata, ampi spazi e tipografia classica. Per atelier, ceramica e design.
            </p>
          </div>

          <!-- Template 3: Mood Stagionale -->
          <div
            @click="selectTemplate('seasonal-mood')"
            :class="config.templateId === 'seasonal-mood' ? 'border-amber-500/80 bg-amber-500/10 ring-1 ring-amber-500/40' : 'border-white/10 bg-white/5 hover:border-white/20'"
            class="p-4 rounded-xl border cursor-pointer transition-all space-y-2 group"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Calendar class="w-4 h-4 text-amber-400" />
                <h4 class="text-sm font-semibold text-white">Atmosfera di Stagione & Porte Aperte</h4>
              </div>
              <Check v-if="config.templateId === 'seasonal-mood'" class="w-4 h-4 text-amber-400" />
            </div>
            <p class="text-xs text-slate-400 leading-relaxed">
              Focus sull'accoglienza in boutique, date speciali, orari di apertura e presentazione sensoriale dei materiali.
            </p>
          </div>
        </div>
      </div>

      <!-- ================= TAB: MODULI ON/OFF ================= -->
      <div v-else-if="activeTab === 'modules'" class="space-y-4">
        <div>
          <h3 class="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">
            Gestione Modulare della Vetrina
          </h3>
          <p class="text-2xs text-slate-500">
            Attiva o disattiva i singoli elementi a seconda del supporto e delle esigenze del tuo negozio.
          </p>
        </div>

        <div class="space-y-2.5">
          <!-- Toggle Insegna -->
          <label class="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
            <div class="flex items-center gap-2.5">
              <Building2 class="w-4 h-4 text-slate-400" />
              <div>
                <span class="text-xs font-medium text-white block">Insegna, Nome & Monogramma</span>
                <span class="text-3xs text-slate-400">Mostra logo o monogramma e sottotitolo boutique</span>
              </div>
            </div>
            <input
              type="checkbox"
              :checked="config.modules.showInsegna"
              @change="toggleModule('showInsegna')"
              class="w-4 h-4 accent-amber-500 rounded cursor-pointer"
            />
          </label>

          <!-- Toggle Media -->
          <label class="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
            <div class="flex items-center gap-2.5">
              <ImageIcon class="w-4 h-4 text-slate-400" />
              <div>
                <span class="text-xs font-medium text-white block">Fotografia & Media Prodotti</span>
                <span class="text-3xs text-slate-400">Scatto singolo, split due foto o trittico lookbook</span>
              </div>
            </div>
            <input
              type="checkbox"
              :checked="config.modules.showMedia"
              @change="toggleModule('showMedia')"
              class="w-4 h-4 accent-amber-500 rounded cursor-pointer"
            />
          </label>

          <!-- Toggle Storia -->
          <label class="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
            <div class="flex items-center gap-2.5">
              <BookOpen class="w-4 h-4 text-slate-400" />
              <div>
                <span class="text-xs font-medium text-white block">Storia & Manifesto Collezione</span>
                <span class="text-3xs text-slate-400">Paragrafo narrativo sul concept e sui materiali</span>
              </div>
            </div>
            <input
              type="checkbox"
              :checked="config.modules.showStoria"
              @change="toggleModule('showStoria')"
              class="w-4 h-4 accent-amber-500 rounded cursor-pointer"
            />
          </label>

          <!-- Toggle Orari e Indirizzo -->
          <label class="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
            <div class="flex items-center gap-2.5">
              <Calendar class="w-4 h-4 text-slate-400" />
              <div>
                <span class="text-xs font-medium text-white block">Orari di Apertura & Indirizzo</span>
                <span class="text-3xs text-slate-400">Indirizzo fisico della boutique e fasce orarie</span>
              </div>
            </div>
            <input
              type="checkbox"
              :checked="config.modules.showOrariIndirizzo"
              @change="toggleModule('showOrariIndirizzo')"
              class="w-4 h-4 accent-amber-500 rounded cursor-pointer"
            />
          </label>

          <!-- Toggle QR Code -->
          <label class="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
            <div class="flex items-center gap-2.5">
              <Layers class="w-4 h-4 text-slate-400" />
              <div>
                <span class="text-xs font-medium text-white block">QR Code Interattivo</span>
                <span class="text-3xs text-slate-400">Rimando a catalogo online, lookbook o social</span>
              </div>
            </div>
            <input
              type="checkbox"
              :checked="config.modules.showQrCode"
              @change="toggleModule('showQrCode')"
              class="w-4 h-4 accent-amber-500 rounded cursor-pointer"
            />
          </label>

          <!-- Toggle Contatti Social -->
          <label class="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
            <div class="flex items-center gap-2.5">
              <Sparkles class="w-4 h-4 text-slate-400" />
              <div>
                <span class="text-xs font-medium text-white block">Contatti & Canali Social</span>
                <span class="text-3xs text-slate-400">Instagram, telefono, sito web e concierge</span>
              </div>
            </div>
            <input
              type="checkbox"
              :checked="config.modules.showContatti"
              @change="toggleModule('showContatti')"
              class="w-4 h-4 accent-amber-500 rounded cursor-pointer"
            />
          </label>
        </div>
      </div>

      <!-- ================= TAB: PALETTE & DESIGN ================= -->
      <div v-else-if="activeTab === 'palette'" class="space-y-6">
        <!-- Palette Cromatiche -->
        <div class="space-y-3">
          <div>
            <h3 class="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">
              Palette Cromatiche Predefinite
            </h3>
            <p class="text-2xs text-slate-500">
              Armonie visive calibrate per trasmettere eleganza e coerenza materica.
            </p>
          </div>

          <div class="grid grid-cols-1 gap-2.5">
            <button
              v-for="p in PALETTES"
              :key="p.id"
              type="button"
              @click="setPalette(p.id)"
              :class="config.paletteId === p.id ? 'border-amber-500 bg-white/10 ring-1 ring-amber-500/50' : 'border-white/10 bg-white/5 hover:border-white/20'"
              class="p-3 rounded-xl border flex items-center justify-between text-left transition-all"
            >
              <div class="flex items-center gap-3">
                <span
                  class="w-7 h-7 rounded-full border border-black/20 shadow-xs flex-shrink-0"
                  :style="{ backgroundColor: p.previewColor }"
                ></span>
                <div>
                  <span class="text-xs font-semibold text-white block">{{ p.name }}</span>
                  <span class="text-3xs text-slate-400">{{ p.subtitle }}</span>
                </div>
              </div>
              <Check v-if="config.paletteId === p.id" class="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>

        <!-- Tipografia -->
        <div class="space-y-3 pt-4 border-t border-white/10">
          <div>
            <h3 class="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">
              Tipografia & Accenti
            </h3>
            <p class="text-2xs text-slate-500">
              Seleziona lo stile dei caratteri per dare voce al tono della tua boutique.
            </p>
          </div>

          <div class="grid grid-cols-1 gap-2.5">
            <button
              v-for="t in TYPOGRAPHIES"
              :key="t.id"
              type="button"
              @click="setTypography(t.id)"
              :class="config.typographyId === t.id ? 'border-amber-500 bg-white/10 ring-1 ring-amber-500/50' : 'border-white/10 bg-white/5 hover:border-white/20'"
              class="p-3 rounded-xl border flex items-center justify-between text-left transition-all"
            >
              <div>
                <span class="text-xs font-semibold text-white block">{{ t.name }}</span>
                <span class="text-2xs text-slate-400" :class="t.headingFontClass">{{ t.sample }}</span>
              </div>
              <Check v-if="config.typographyId === t.id" class="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      </div>

      <!-- ================= TAB: TESTI & BRAND ================= -->
      <div v-else-if="activeTab === 'content'" class="space-y-6">
        <!-- Insegna Negozio -->
        <div class="space-y-3">
          <h3 class="text-xs uppercase tracking-widest text-amber-400 font-semibold">
            Insegna & Marchio
          </h3>
          <div class="space-y-3">
            <div>
              <label class="text-2xs text-slate-400 block mb-1">Nome Boutique / Negozio</label>
              <input
                v-model="config.brand.name"
                type="text"
                class="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:border-amber-500 outline-none"
              />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="text-2xs text-slate-400 block mb-1">Monogramma (1-2 lett.)</label>
                <input
                  v-model="config.brand.monogram"
                  type="text"
                  maxlength="3"
                  class="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs font-mono uppercase focus:border-amber-500 outline-none"
                />
              </div>
              <div>
                <label class="text-2xs text-slate-400 block mb-1">Anno di Fondazione</label>
                <input
                  v-model="config.brand.establishedYear"
                  type="text"
                  placeholder="Es. 1984"
                  class="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label class="text-2xs text-slate-400 block mb-1">Sottotitolo Insegna</label>
              <input
                v-model="config.brand.subtitle"
                type="text"
                class="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:border-amber-500 outline-none"
              />
            </div>
          </div>
        </div>

        <!-- Contenuti Vetrina -->
        <div class="space-y-3 pt-4 border-t border-white/10">
          <h3 class="text-xs uppercase tracking-widest text-amber-400 font-semibold">
            Contenuti della Vetrina
          </h3>
          <div class="space-y-3">
            <div>
              <label class="text-2xs text-slate-400 block mb-1">Etichetta Superiore (Eyebrow)</label>
              <input
                v-model="config.content.eyebrow"
                type="text"
                placeholder="Es. NUOVA COLLEZIONE"
                class="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label class="text-2xs text-slate-400 block mb-1">Titolo Principale</label>
              <input
                v-model="config.content.title"
                type="text"
                class="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label class="text-2xs text-slate-400 block mb-1">Sottotitolo Descrittivo</label>
              <input
                v-model="config.content.subtitle"
                type="text"
                class="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label class="text-2xs text-slate-400 block mb-1">Storia / Manifesto della Collezione</label>
              <textarea
                v-model="config.content.storyParagraph"
                rows="3"
                class="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs leading-relaxed focus:border-amber-500 outline-none resize-none"
              ></textarea>
            </div>

            <div>
              <label class="text-2xs text-slate-400 block mb-1">Nota di Chiusura / Curatore</label>
              <input
                v-model="config.content.curatorNote"
                type="text"
                placeholder="Es. Edizione limitata numerata"
                class="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:border-amber-500 outline-none"
              />
            </div>
          </div>
        </div>

        <!-- Orari e Sede -->
        <div class="space-y-3 pt-4 border-t border-white/10">
          <h3 class="text-xs uppercase tracking-widest text-amber-400 font-semibold">
            Orari & Indirizzo
          </h3>
          <div class="space-y-3">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="text-2xs text-slate-400 block mb-1">Indirizzo</label>
                <input
                  v-model="config.store.address"
                  type="text"
                  class="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:border-amber-500 outline-none"
                />
              </div>
              <div>
                <label class="text-2xs text-slate-400 block mb-1">Città</label>
                <input
                  v-model="config.store.city"
                  type="text"
                  class="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label class="text-2xs text-slate-400 block mb-1">Orari Settimanali</label>
              <input
                v-model="config.store.hoursWeekday"
                type="text"
                class="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label class="text-2xs text-slate-400 block mb-1">Orari Fine Settimana</label>
              <input
                v-model="config.store.hoursWeekend"
                type="text"
                class="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label class="text-2xs text-slate-400 block mb-1">Badge Stato Boutique</label>
              <input
                v-model="config.store.badgeText"
                type="text"
                placeholder="Es. Atelier Aperto"
                class="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:border-amber-500 outline-none"
              />
            </div>
          </div>
        </div>

        <!-- QR Code & Contatti -->
        <div class="space-y-3 pt-4 border-t border-white/10">
          <h3 class="text-xs uppercase tracking-widest text-amber-400 font-semibold">
            QR Code & Social
          </h3>
          <div class="space-y-3">
            <div>
              <label class="text-2xs text-slate-400 block mb-1">Destinazione QR Code (URL)</label>
              <input
                v-model="config.qr.targetUrl"
                type="url"
                class="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs font-mono focus:border-amber-500 outline-none"
              />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="text-2xs text-slate-400 block mb-1">Etichetta QR</label>
                <input
                  v-model="config.qr.label"
                  type="text"
                  class="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:border-amber-500 outline-none"
                />
              </div>
              <div>
                <label class="text-2xs text-slate-400 block mb-1">Sottoetichetta</label>
                <input
                  v-model="config.qr.sublabel"
                  type="text"
                  class="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label class="text-2xs text-slate-400 block mb-1">Instagram</label>
              <input
                v-model="config.contacts.instagram"
                type="text"
                placeholder="@nome.boutique"
                class="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label class="text-2xs text-slate-400 block mb-1">Sito Web</label>
              <input
                v-model="config.contacts.website"
                type="text"
                placeholder="www.atelier.com"
                class="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:border-amber-500 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- ================= TAB: MEDIA & FOTO ================= -->
      <div v-else-if="activeTab === 'media'" class="space-y-5">
        <div>
          <h3 class="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">
            Composizione Fotografica
          </h3>
          <p class="text-2xs text-slate-500">
            Scegli il layout delle immagini e personalizza i soggetti.
          </p>
        </div>

        <!-- Layout Selector -->
        <div>
          <label class="text-2xs text-slate-400 block mb-2 font-medium">Numero e Disposizione Immagini</label>
          <div class="grid grid-cols-3 gap-2">
            <button
              type="button"
              @click="config.media.layout = 'single'"
              :class="config.media.layout === 'single' ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' : 'bg-white/5 text-slate-400 border-white/10'"
              class="p-2.5 rounded-lg border text-xs font-medium text-center transition-all"
            >
              Singola
            </button>
            <button
              type="button"
              @click="config.media.layout = 'split-two'"
              :class="config.media.layout === 'split-two' ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' : 'bg-white/5 text-slate-400 border-white/10'"
              class="p-2.5 rounded-lg border text-xs font-medium text-center transition-all"
            >
              Split 2 Foto
            </button>
            <button
              type="button"
              @click="config.media.layout = 'triptych'"
              :class="config.media.layout === 'triptych' ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' : 'bg-white/5 text-slate-400 border-white/10'"
              class="p-2.5 rounded-lg border text-xs font-medium text-center transition-all"
            >
              Trittico
            </button>
          </div>
        </div>

        <!-- Slot Selector (Which photo are we replacing?) -->
        <div class="p-3 rounded-lg bg-black/40 border border-white/10 space-y-2">
          <span class="text-2xs text-slate-400 font-medium block">Foto da modificare o sostituire:</span>
          <div class="flex items-center gap-2">
            <button
              type="button"
              @click="mediaTargetSlot = 'primary'"
              :class="mediaTargetSlot === 'primary' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-white/10 text-slate-300'"
              class="px-2.5 py-1 rounded text-xs transition-colors"
            >
              Primaria
            </button>
            <button
              v-if="config.media.layout !== 'single'"
              type="button"
              @click="mediaTargetSlot = 'secondary'"
              :class="mediaTargetSlot === 'secondary' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-white/10 text-slate-300'"
              class="px-2.5 py-1 rounded text-xs transition-colors"
            >
              Secondaria
            </button>
            <button
              v-if="config.media.layout === 'triptych'"
              type="button"
              @click="mediaTargetSlot = 'tertiary'"
              :class="mediaTargetSlot === 'tertiary' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-white/10 text-slate-300'"
              class="px-2.5 py-1 rounded text-xs transition-colors"
            >
              Terziaria
            </button>
          </div>

          <!-- URL Input & File Upload -->
          <div class="pt-2 space-y-2">
            <div>
              <label class="text-3xs text-slate-400 block mb-1">URL Immagine</label>
              <input
                v-model="config.media[mediaTargetSlot].url"
                type="text"
                class="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-white text-xs font-mono outline-none"
              />
            </div>

            <div>
              <label class="text-3xs text-slate-400 block mb-1">Didascalia / Titolo scatto</label>
              <input
                v-model="config.media[mediaTargetSlot].caption"
                type="text"
                placeholder="Es. Silhouette o Dettaglio"
                class="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-white text-xs outline-none"
              />
            </div>

            <div>
              <input
                ref="fileInputRef"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleFileUpload"
              />
              <button
                type="button"
                @click="fileInputRef?.click()"
                class="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-dashed border-white/20 bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors"
              >
                <Upload class="w-3.5 h-3.5" />
                <span>Carica Foto dal Dispositivo</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Presets Gallery -->
        <div class="space-y-2.5 pt-2">
          <span class="text-2xs text-slate-400 font-medium block">
            Oppure seleziona uno scatto d'autore curato:
          </span>
          <div class="grid grid-cols-3 gap-2">
            <div
              v-for="photo in PHOTO_PRESETS"
              :key="photo.id"
              @click="applyPhotoPreset(photo.url)"
              class="aspect-[4/5] rounded-lg overflow-hidden border border-white/10 cursor-pointer relative group hover:border-amber-500 transition-all shadow-xs"
            >
              <img :src="photo.url" :alt="photo.title" class="w-full h-full object-cover" loading="lazy" />
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-1 text-center">
                <span class="text-3xs text-white font-medium leading-tight">{{ photo.title }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= TAB: SALVATAGGIO & EXPORT ================= -->
      <div v-else-if="activeTab === 'export'" class="space-y-5">
        <div>
          <h3 class="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">
            Salvataggio & Backup Configurazione
          </h3>
          <p class="text-2xs text-slate-500">
            Salva il tuo progetto su file JSON per riutilizzarlo in qualsiasi momento o ricaricarlo su un altro computer.
          </p>
        </div>

        <div class="space-y-3">
          <button
            type="button"
            @click="exportJson"
            class="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 text-xs transition-colors shadow-xs"
          >
            <FileJson class="w-4 h-4" />
            <span>Scarica Configurazione (JSON)</span>
          </button>

          <div>
            <input
              ref="jsonInputRef"
              type="file"
              accept=".json"
              class="hidden"
              @change="handleJsonImport"
            />
            <button
              type="button"
              @click="jsonInputRef?.click()"
              class="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-xs text-white font-medium transition-colors"
            >
              <Upload class="w-4 h-4 text-amber-400" />
              <span>Carica File JSON Esistente</span>
            </button>
          </div>

          <button
            type="button"
            @click="resetConfig(config.templateId)"
            class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-rose-500/30 text-rose-300 hover:bg-rose-500/10 text-xs transition-colors"
          >
            <RotateCcw class="w-3.5 h-3.5" />
            <span>Ripristina Valori Iniziali</span>
          </button>
        </div>

        <div class="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1.5 text-2xs text-slate-400">
          <span class="text-white font-medium block">Salvataggio Automatico</span>
          <p>
            Ogni modifica apportata viene memorizzata in tempo reale nella memoria locale (<code class="text-amber-400">localStorage</code>) del browser.
          </p>
        </div>
      </div>

    </div>
  </aside>
</template>
