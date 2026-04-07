<script setup lang="ts">
import type { ComboboxInputEmits, ComboboxInputProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ComboboxInput, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'
import { IconPlaceholder } from '@/registry/bases/reka/components/icon-placeholder'
import { InputGroup, InputGroupAddon } from '@/registry/bases/reka/ui/input-group'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<ComboboxInputProps & {
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<ComboboxInputEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <InputGroup>
    <InputGroupAddon>
      <IconPlaceholder lucide="SearchIcon" tabler="IconSearch" hugeicons="Search01Icon" phosphor="MagnifyingGlassIcon" remixicon="RiSearchLine" class="size-4 shrink-0 opacity-50" />
    </InputGroupAddon>
    <ComboboxInput
      data-slot="combobox-input"
      :class="cn('rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 aria-invalid:ring-0 dark:bg-transparent flex-1 outline-hidden disabled:cursor-not-allowed disabled:opacity-50', props.class)"
      v-bind="{ ...$attrs, ...forwarded }"
    />
  </InputGroup>
</template>
