import type { WritableComputedRef } from 'vue'
import type { PresetFieldKey } from '@/lib/preset-encoding'
import type { BaseColorName, BaseName, FontValue, IconLibraryName, MenuAccentValue, MenuColorValue, RadiusValue, StyleName, ThemeName } from '@/registry/config'
import { useRouteQuery } from '@vueuse/router'
import { computed } from 'vue'
import { decodePreset, encodePreset, PRESET_FIELD_KEYS } from '@/lib/preset-encoding'
import { DEFAULT_CONFIG } from '@/registry/config'

const PRESET_DEFAULTS: Record<PresetFieldKey, string> = {
  style: DEFAULT_CONFIG.style,
  baseColor: DEFAULT_CONFIG.baseColor,
  theme: DEFAULT_CONFIG.theme,
  font: DEFAULT_CONFIG.font,
  fontHeading: DEFAULT_CONFIG.font,
  radius: DEFAULT_CONFIG.radius,
  iconLibrary: DEFAULT_CONFIG.iconLibrary,
  menuColor: DEFAULT_CONFIG.menuColor,
  menuAccent: DEFAULT_CONFIG.menuAccent,
  chartColor: 'emerald',
}

const DEFAULT_PRESET = encodePreset(PRESET_DEFAULTS)

export function useDesignSystemSearchParams(mode: 'push' | 'replace' = 'push') {
  const DEFAULT_OPTIONS = { mode, route: useRoute(), router: useRouter() }

  const base = useRouteQuery<BaseName>('base', DEFAULT_CONFIG.base, DEFAULT_OPTIONS)
  const item = useRouteQuery<string>('item', 'preview-02', DEFAULT_OPTIONS)
  const template = useRouteQuery<'nuxt' | 'vite' | 'laravel' | 'astro'>('template', 'nuxt', DEFAULT_OPTIONS)
  const size = useRouteQuery<number>('size', 100, DEFAULT_OPTIONS)

  const preset = useRouteQuery<string>('preset', DEFAULT_PRESET, DEFAULT_OPTIONS)

  /**
   * Build a writable computed for one preset field.
   * Reads decode the current preset; writes re-encode with the new value.
   * Sequential writes within the same tick are safe — vueuse useRouteQuery
   * updates its internal cache synchronously on set, so subsequent reads
   * see the just-written value.
   */
  function presetField<T extends string>(key: PresetFieldKey): WritableComputedRef<T> {
    return computed<T>({
      get: () => decodePreset(preset.value)[key] as T,
      set: (value) => {
        const decoded = decodePreset(preset.value)
        decoded[key] = value
        preset.value = encodePreset(decoded)
      },
    })
  }

  const style = presetField<StyleName>('style')
  const baseColor = presetField<BaseColorName>('baseColor')
  const theme = presetField<ThemeName>('theme')
  const font = presetField<FontValue>('font')
  const fontHeading = presetField<string>('fontHeading')
  const radius = presetField<RadiusValue>('radius')
  const iconLibrary = presetField<IconLibraryName>('iconLibrary')
  const menuColor = presetField<MenuColorValue>('menuColor')
  const menuAccent = presetField<MenuAccentValue>('menuAccent')
  const chartColor = presetField<string>('chartColor')

  return {
    base,
    item,
    iconLibrary,
    style,
    theme,
    font,
    fontHeading,
    chartColor,
    baseColor,
    menuAccent,
    menuColor,
    radius,
    template,
    size,
    preset,
  }
}

export type DesignSystemSearchParams = Record<keyof ReturnType<typeof useDesignSystemSearchParams>, any>
export { PRESET_FIELD_KEYS }
