<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <p
    data-slot="field-description"
    :class="cn(
      'text-muted-foreground text-left text-xs/relaxed [[data-variant=legend]+&]:-mt-1.5 group-has-[[data-orientation=horizontal]]/field:text-balance last:mt-0 nth-last-2:-mt-1',
      '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
      props.class,
    )"
  >
    <slot />
  </p>
</template>
