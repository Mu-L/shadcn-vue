<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  as: "div",
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn('cn-button-group-text flex items-center [&_svg]:pointer-events-none', props.class)"
  >
    <slot />
  </Primitive>
</template>
