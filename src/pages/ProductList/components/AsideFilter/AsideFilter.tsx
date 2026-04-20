import classNames from 'classnames'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import path from 'src/constants/path'
import { Category } from 'src/types/category.type'
import { useForm, Controller } from 'react-hook-form'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { NoUndefinedField } from 'src/types/utils.type'
import RatingStars from '../RatingStars'
import omit from 'lodash/omit'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { useTranslation } from 'react-i18next'
import { ObjectSchema } from 'yup'
import { useEffect } from 'react'
import {
  PRICE_FILTER_MAX,
  PRICE_PRESETS,
  type PricePresetId,
  clampPriceValue,
  getActivePresetId,
  normalizePriceMaxFromQuery,
  normalizePriceMinFromQuery
} from 'src/constants/priceFilter'
import { formatCurrency } from 'src/utils/utils'
import PriceDualRange from './PriceDualRange'

type HomePresetTranslationKey = `aside filter.presets.${PricePresetId}`

function presetTranslationKey(id: PricePresetId): HomePresetTranslationKey {
  return `aside filter.presets.${id}`
}

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

type FormData = NoUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>

const priceSchema = schema.pick(['price_min', 'price_max'])

function formatDongInput(raw: string, whenEmpty: number) {
  const n = raw === '' ? whenEmpty : Number(raw)
  const safe = Number.isNaN(n) ? whenEmpty : n
  return `${formatCurrency(safe)}₫`
}

function buildPriceSearchParams(minStr: string, maxStr: string): { price_min?: string; price_max?: string } {
  const minNum = clampPriceValue(minStr === '' ? 0 : Number(minStr))
  const maxNum = clampPriceValue(maxStr === '' ? PRICE_FILTER_MAX : Number(maxStr))
  const out: { price_min?: string; price_max?: string } = {}
  if (minNum > 0) out.price_min = String(minNum)
  if (maxNum < PRICE_FILTER_MAX) out.price_max = String(maxNum)
  return out
}

export default function AsideFilter({ queryConfig, categories }: Props) {
  const { t } = useTranslation('home')
  const { category } = queryConfig
  const {
    control,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
    reset
  } = useForm<FormData>({
    defaultValues: {
      price_min: normalizePriceMinFromQuery(queryConfig.price_min),
      price_max: normalizePriceMaxFromQuery(queryConfig.price_max)
    },
    resolver: yupResolver<FormData>(priceSchema as ObjectSchema<FormData>)
  })

  useEffect(() => {
    reset({
      price_min: normalizePriceMinFromQuery(queryConfig.price_min),
      price_max: normalizePriceMaxFromQuery(queryConfig.price_max)
    })
  }, [queryConfig.price_min, queryConfig.price_max, reset])

  const navigate = useNavigate()

  const priceMinWatch = watch('price_min')
  const priceMaxWatch = watch('price_max')

  const sliderMin =
    priceMinWatch === '' || priceMinWatch === undefined ? 0 : Number(priceMinWatch)
  const sliderMax =
    priceMaxWatch === '' || priceMaxWatch === undefined ? PRICE_FILTER_MAX : Number(priceMaxWatch)

  let safeSliderMin = clampPriceValue(Number.isNaN(sliderMin) ? 0 : sliderMin)
  let safeSliderMax = clampPriceValue(Number.isNaN(sliderMax) ? PRICE_FILTER_MAX : sliderMax)
  if (safeSliderMin > safeSliderMax) {
    const t = safeSliderMin
    safeSliderMin = safeSliderMax
    safeSliderMax = t
  }

  const onSubmit = handleSubmit((data) => {
    const prices = buildPriceSearchParams(data.price_min, data.price_max)
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...omit(queryConfig, ['price_min', 'price_max', 'page']),
        page: '1',
        ...prices
      }).toString()
    })
  })

  const applyPreset = (min: number, max: number) => {
    const minStr = min <= 0 ? '' : String(min)
    const maxStr = max >= PRICE_FILTER_MAX ? '' : String(max)
    const prices = buildPriceSearchParams(minStr, maxStr)
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...omit(queryConfig, ['price_min', 'price_max', 'page']),
        page: '1',
        ...prices
      }).toString()
    })
  }

  const handleRemoveAll = () => {
    reset({ price_min: '', price_max: '' })
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])).toString()
    })
  }

  const activePreset = getActivePresetId({
    price_min: queryConfig.price_min,
    price_max: queryConfig.price_max
  })

  const onSliderChange = (min: number, max: number) => {
    setValue('price_min', min <= 0 ? '' : String(min), { shouldDirty: true })
    setValue('price_max', max >= PRICE_FILTER_MAX ? '' : String(max), { shouldDirty: true })
    void trigger(['price_min', 'price_max'])
  }

  return (
    <div className='rounded-none bg-transparent py-2 lg:rounded-2xl lg:border lg:border-neutral-100 lg:bg-white lg:p-6 lg:shadow-[0_2px_16px_rgba(15,23,42,.06)] lg:ring-1 lg:ring-black/[0.04]'>
      {/* Categories */}
      <section className='space-y-3'>
        <Link
          to={path.home}
          className={classNames(
            'group flex items-center gap-3 rounded-xl px-1 py-1 text-sm font-semibold transition-colors',
            !category ? 'text-orange' : 'text-neutral-800 hover:text-orange'
          )}
        >
          <span
            className={classNames(
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors',
              !category ? 'bg-orange/10 text-orange' : 'bg-neutral-100 text-neutral-600 group-hover:bg-orange/10 group-hover:text-orange'
            )}
          >
            <svg viewBox='0 0 12 10' className='h-4 w-3 fill-current'>
              <g fillRule='evenodd' stroke='none' strokeWidth={1}>
                <g transform='translate(-373 -208)'>
                  <g transform='translate(155 191)'>
                    <g transform='translate(218 17)'>
                      <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                      <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                      <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </span>
          {t('aside filter.all categories')}
        </Link>

        <ul className='space-y-1'>
          {categories.map((categoryItem) => {
            const isActive = category === categoryItem._id
            return (
              <li key={categoryItem._id}>
                <Link
                  to={{
                    pathname: path.home,
                    search: createSearchParams({
                      ...queryConfig,
                      category: categoryItem._id
                    }).toString()
                  }}
                  className={classNames(
                    'block rounded-lg px-3 py-2.5 text-sm transition-colors',
                    isActive
                      ? 'border border-orange/20 bg-orange/[0.08] font-semibold text-orange'
                      : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900'
                  )}
                >
                  {categoryItem.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <div className='my-5 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent' />

      {/* Filter header */}
      <div className='mb-5 flex items-center gap-3'>
        <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#2563eb]'>
          <svg viewBox='0 0 15 15' className='h-4 w-4' aria-hidden>
            <polyline
              fill='none'
              stroke='currentColor'
              strokeWidth={1.25}
              strokeLinecap='round'
              strokeLinejoin='round'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
            />
          </svg>
        </span>
        <span className='text-xs font-bold uppercase tracking-[0.12em] text-neutral-500'>{t('aside filter.filter search')}</span>
      </div>

      {/* Price — preset dọc; không overflow-hidden (tránh cắt nút slider) */}
      <section className='rounded-xl bg-neutral-50/90 p-3 ring-1 ring-neutral-100/80 sm:p-4'>
        <div className='text-sm font-semibold text-neutral-900'>{t('aside filter.price title')}</div>

        <div className='mt-3 flex max-w-full flex-col gap-2'>
          {PRICE_PRESETS.map((preset) => {
            const isActive = activePreset === preset.id
            return (
              <button
                key={preset.id}
                type='button'
                onClick={() => applyPreset(preset.min, preset.max)}
                className={classNames(
                  'w-full max-w-full rounded-lg border px-3 py-2.5 text-left text-xs font-medium leading-snug text-neutral-900 transition sm:text-sm',
                  isActive
                    ? 'border-[#2563eb] bg-[#eff6ff] text-[#1d4ed8]'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                )}
              >
                {t(presetTranslationKey(preset.id))}
              </button>
            )
          })}
        </div>

        <div className='mt-4 flex min-w-0 max-w-full flex-col gap-3'>
          <div className='flex min-w-0 gap-2 text-xs font-medium leading-snug text-[#2563eb] sm:text-sm'>
            <svg viewBox='0 0 15 15' className='mt-0.5 h-4 w-4 shrink-0' aria-hidden>
              <polyline
                fill='none'
                stroke='currentColor'
                strokeWidth={1.25}
                strokeLinecap='round'
                strokeLinejoin='round'
                points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              />
            </svg>
            <span className='min-w-0 break-words'>{t('aside filter.price slider hint')}</span>
          </div>
          <div className='min-w-0 max-w-full'>
            <PriceDualRange minValue={safeSliderMin} maxValue={safeSliderMax} onChange={onSliderChange} />
          </div>
        </div>

        <form className='mt-4 min-w-0 max-w-full' onSubmit={onSubmit}>
          <div className='grid min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => (
                <input
                  type='text'
                  inputMode='numeric'
                  autoComplete='off'
                  className='min-w-0 rounded-lg border border-neutral-200 bg-white py-2 pl-2 pr-3 text-right text-[11px] tabular-nums text-neutral-900 outline-none transition hover:border-neutral-300 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 sm:pl-2.5 sm:pr-3.5 sm:text-sm'
                  value={formatDongInput(field.value ?? '', 0)}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, '')
                    field.onChange(digits)
                    void trigger('price_max')
                  }}
                />
              )}
            />
            <span className='shrink-0 px-0.5 text-neutral-300' aria-hidden>
              —
            </span>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => (
                <input
                  type='text'
                  inputMode='numeric'
                  autoComplete='off'
                  className='min-w-0 rounded-lg border border-neutral-200 bg-white py-2 pl-2 pr-3 text-right text-[11px] tabular-nums text-neutral-900 outline-none transition hover:border-neutral-300 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 sm:pl-2.5 sm:pr-3.5 sm:text-sm'
                  value={formatDongInput(field.value ?? '', PRICE_FILTER_MAX)}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, '')
                    field.onChange(digits)
                    void trigger('price_min')
                  }}
                />
              )}
            />
          </div>
          <div className='mt-2 min-h-[1.25rem] text-center text-xs text-red-600'>
            {errors.price_min?.message || errors.price_max?.message}
          </div>
          <Button
            type='submit'
            className='mt-2 flex w-full items-center justify-center rounded-xl bg-[#2563eb] py-3 text-sm font-semibold text-white shadow-md shadow-[#2563eb]/25 transition hover:bg-[#1d4ed8] hover:shadow-lg'
          >
            {t('aside filter.apply')}
          </Button>
        </form>
      </section>

      <div className='my-5 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent' />

      <section>
        <div className='text-sm font-medium text-neutral-800'>{t('aside filter.rating')}</div>
        <RatingStars queryConfig={queryConfig} />
      </section>

      <div className='my-5 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent' />

      <Button
        type='button'
        onClick={handleRemoveAll}
        className='flex w-full items-center justify-center rounded-xl border-2 border-neutral-200 bg-white py-3 text-sm font-semibold text-neutral-700 transition hover:border-orange/35 hover:bg-orange/[0.04] hover:text-orange'
      >
        {t('aside filter.clear all')}
      </Button>
    </div>
  )
}
