<script setup lang="ts">
import { computed } from 'vue'
import type { VetrinaConfig, PaletteDef, TypographyDef, FormatDef } from '@/types/vetrina'
import TemplateNewCollection from './templates/TemplateNewCollection.vue'
import TemplateEditorialMinimal from './templates/TemplateEditorialMinimal.vue'
import TemplateSeasonalMood from './templates/TemplateSeasonalMood.vue'

const props = defineProps<{
  config: VetrinaConfig
  palette: PaletteDef
  typography: TypographyDef
  format: FormatDef
}>()

const activeTemplateComponent = computed(() => {
  switch (props.config.templateId) {
    case 'editorial-minimal':
      return TemplateEditorialMinimal
    case 'seasonal-mood':
      return TemplateSeasonalMood
    case 'new-collection':
    default:
      return TemplateNewCollection
  }
})
</script>

<template>
  <div
    id="vetrina-canvas-node"
    class="print-only-canvas w-full h-full select-none"
    :style="{ aspectRatio: format.aspectRatio }"
  >
    <component
      :is="activeTemplateComponent"
      :config="config"
      :palette="palette"
      :typography="typography"
      :format="format.id"
    />
  </div>
</template>
