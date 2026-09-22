<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import QRCode from 'qrcode'

const props = withDefaults(
  defineProps<{
    value: string
    darkColor?: string
    lightColor?: string
    size?: number
  }>(),
  {
    darkColor: '#1A1918',
    lightColor: 'transparent',
    size: 110
  }
)

const svgDataUri = ref<string>('')

async function renderQr() {
  if (!props.value) {
    svgDataUri.value = ''
    return
  }
  try {
    const url = await QRCode.toDataURL(props.value, {
      margin: 1,
      width: props.size * 2,
      color: {
        dark: props.darkColor,
        light: props.lightColor === 'transparent' ? '#00000000' : props.lightColor
      },
      errorCorrectionLevel: 'M'
    })
    svgDataUri.value = url
  } catch (err) {
    console.error('Error generating QR code:', err)
  }
}

watch(
  () => [props.value, props.darkColor, props.lightColor, props.size],
  () => {
    renderQr()
  },
  { deep: true }
)

onMounted(() => {
  renderQr()
})
</script>

<template>
  <div class="inline-block flex-shrink-0">
    <img
      v-if="svgDataUri"
      :src="svgDataUri"
      :alt="`QR Code: ${value}`"
      :style="{ width: `${size}px`, height: `${size}px` }"
      class="object-contain block transition-opacity duration-200"
      loading="lazy"
    />
    <div
      v-else
      :style="{ width: `${size}px`, height: `${size}px` }"
      class="bg-black/5 flex items-center justify-center text-3xs uppercase tracking-widest text-slate-400"
    >
      QR
    </div>
  </div>
</template>
