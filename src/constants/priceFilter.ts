/** Giới hạn trên slider và ô «ĐẾN» khi để trống (VNĐ). Tối đa 10 triệu. */
export const PRICE_FILTER_MAX = 10_000_000

/** Bước kéo — 10.000₫ để nhỏ giá (< 2tr) vẫn chỉnh được hợp lí. */
export const PRICE_FILTER_STEP = 10_000

/** Giới hạn một giá trị VNĐ vào [0, PRICE_FILTER_MAX] (URL cũ / nhập tay). */
export function clampPriceValue(n: number): number {
  if (!Number.isFinite(n) || Number.isNaN(n)) return 0
  return Math.max(0, Math.min(PRICE_FILTER_MAX, n))
}

/** Chuẩn hoá `price_min` từ query string cho form/slider. */
export function normalizePriceMinFromQuery(raw: string | undefined): string {
  if (raw === undefined || raw === '') return ''
  const n = Number(raw)
  if (Number.isNaN(n)) return ''
  return String(clampPriceValue(n))
}

/** Chuẩn hoá `price_max` từ query string; rỗng nếu = full max. */
export function normalizePriceMaxFromQuery(raw: string | undefined): string {
  if (raw === undefined || raw === '') return ''
  const n = Number(raw)
  if (Number.isNaN(n)) return ''
  const c = clampPriceValue(n)
  if (c >= PRICE_FILTER_MAX) return ''
  return String(c)
}

/** 5 khoảng preset (VNĐ). `as const` để `id` là literal — khớp type i18n. */
export const PRICE_PRESETS = [
  { id: 'under-100k', min: 0, max: 100_000 },
  { id: '100k-500k', min: 100_000, max: 500_000 },
  { id: '500k-1m', min: 500_000, max: 1_000_000 },
  { id: '1m-2m', min: 1_000_000, max: 2_000_000 },
  { id: 'over-2m', min: 2_000_000, max: PRICE_FILTER_MAX }
] as const

export type PricePreset = (typeof PRICE_PRESETS)[number]
export type PricePresetId = PricePreset['id']

/** So khớp preset với query hiện tại (thiếu param ≡ 0 / PRICE_FILTER_MAX). */
export function getActivePresetId(params: {
  price_min?: string
  price_max?: string
}): PricePresetId | null {
  const min = params.price_min !== undefined && params.price_min !== '' ? Number(params.price_min) : 0
  const max =
    params.price_max !== undefined && params.price_max !== '' ? Number(params.price_max) : PRICE_FILTER_MAX
  if (Number.isNaN(min) || Number.isNaN(max)) return null
  const found = PRICE_PRESETS.find((p) => p.min === min && p.max === max)
  return found ? found.id : null
}
