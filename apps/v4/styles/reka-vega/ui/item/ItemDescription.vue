<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <p
    data-slot="item-description"
    :class="cn(
      'text-muted-foreground text-left text-sm leading-normal group-data-[size=xs]/item:text-xs [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
      props.class,
    )"
  >
    <slot />
  </p>
</template>
