<script setup lang="ts">
import { ref } from 'vue'
import { useVetrina } from '@/composables/useVetrina'
import Navbar from '@/components/Navbar.vue'
import EditorPanel from '@/components/EditorPanel.vue'
import PreviewStage from '@/components/PreviewStage.vue'
import { Sliders, Eye } from 'lucide-vue-next'

const { isFullScreen } = useVetrina()
const mobileView = ref<'editor' | 'preview'>('preview')
</script>

<template>
  <div class="h-screen w-screen flex flex-col bg-[#121316] text-slate-100 overflow-hidden font-sans">
    
    <!-- Fullscreen Mode: Clean display only -->
    <template v-if="isFullScreen">
      <main class="w-full h-full">
        <PreviewStage />
      </main>
    </template>

    <!-- Normal Editor Mode -->
    <template v-else>
      <!-- Top Navbar -->
      <Navbar />

      <!-- Mobile View Switcher (< lg screens) -->
      <div class="lg:hidden no-print flex items-center justify-center p-2 bg-[#191a20] border-b border-white/10 gap-2 shrink-0">
        <button
          type="button"
          @click="mobileView = 'editor'"
          :class="mobileView === 'editor' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-white/5 text-slate-400 border border-white/10'"
          class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs transition-colors"
        >
          <Sliders class="w-3.5 h-3.5" />
          <span>Configura Vetrina</span>
        </button>

        <button
          type="button"
          @click="mobileView = 'preview'"
          :class="mobileView === 'preview' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-white/5 text-slate-400 border border-white/10'"
          class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs transition-colors"
        >
          <Eye class="w-3.5 h-3.5" />
          <span>Anteprima Schermo</span>
        </button>
      </div>

      <!-- Main Workspace Split Container -->
      <main class="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">
        
        <!-- Left Panel: Configuration Controls -->
        <section
          :class="[
            mobileView === 'editor' ? 'flex' : 'hidden lg:flex',
            'w-full lg:w-[440px] xl:w-[480px] shrink-0 h-full overflow-hidden'
          ]"
        >
          <EditorPanel />
        </section>

        <!-- Right Panel: Live Preview Canvas -->
        <section
          :class="[
            mobileView === 'preview' ? 'flex' : 'hidden lg:flex',
            'flex-1 h-full min-w-0 overflow-hidden'
          ]"
        >
          <PreviewStage />
        </section>

      </main>
    </template>

  </div>
</template>
