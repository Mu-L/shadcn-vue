<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useClipboard } from '@vueuse/core'
import { cn } from '@/lib/utils'
import { Button } from '@/registry/new-york-v4/ui/button'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const params = useDesignSystemSearchParams()
const { copy, copied } = useClipboard()

const presetCode = computed(() => {
  const parts: string[] = []
  if (params.style.value)
    parts.push(`--style ${params.style.value}`)
  if (params.baseColor.value)
    parts.push(`--base-color ${params.baseColor.value}`)
  if (params.theme.value && params.theme.value !== params.baseColor.value)
    parts.push(`--theme ${params.theme.value}`)
  if (params.font.value)
    parts.push(`--font ${params.font.value}`)
  if (params.fontHeading.value && params.fontHeading.value !== 'inherit')
    parts.push(`--font-heading ${params.fontHeading.value}`)
  if (params.radius.value && params.radius.value !== 'default')
    parts.push(`--radius ${params.radius.value}`)
  if (params.iconLibrary.value)
    parts.push(`--icon-library ${params.iconLibrary.value}`)
  if (params.menuColor.value && params.menuColor.value !== 'default')
    parts.push(`--menu-color ${params.menuColor.value}`)
  if (params.menuAccent.value && params.menuAccent.value !== 'subtle')
    parts.push(`--menu-accent ${params.menuAccent.value}`)
  return parts.join(' ')
})

function handleCopy() {
  copy(presetCode.value)
}
</script>

<template>
  <Button
    variant="outline"
    :class="cn(
      'touch-manipulation bg-transparent! px-2! py-0! text-sm! transition-none select-none hover:bg-muted! pointer-coarse:h-10!',
      props.class,
    )"
    @click="handleCopy"
  >
    <span>{{ copied ? 'Copied' : presetCode || 'Copy Preset' }}</span>
  </Button>
</template>
