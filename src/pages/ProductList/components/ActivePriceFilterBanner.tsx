import classNames from 'classnames'
import omit from 'lodash/omit'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import path from 'src/constants/path'
import { PRICE_FILTER_MAX, clampPriceValue } from 'src/constants/priceFilter'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { formatCurrency } from 'src/utils/utils'

function effectiveBounds(q: QueryConfig): { min: number; max: number } | null {
  const hasMin = q.price_min !== undefined && q.price_min !== ''
  const hasMax = q.price_max !== undefined && q.price_max !== ''
  if (!hasMin && !hasMax) return null
  let min = clampPriceValue(hasMin ? Number(q.price_min) : 0)
  let max = clampPriceValue(hasMax ? Number(q.price_max) : PRICE_FILTER_MAX)
  if (min > max) {
    const x = min
    min = max
    max = x
  }
  if (min <= 0 && max >= PRICE_FILTER_MAX) return null
  return { min, max }
}

type Props = {
  queryConfig: QueryConfig
  className?: string
}

export default function ActivePriceFilterBanner({ queryConfig, className }: Props) {
  const { t } = useTranslation('home')
  const navigate = useNavigate()
  const bounds = effectiveBounds(queryConfig)
  if (!bounds) return null

  const handleClearPrice = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...omit(queryConfig, ['price_min', 'price_max']),
        page: '1'
      }).toString()
    })
  }

  const { min, max } = bounds
  const minLabel = formatCurrency(min)
  const maxLabel = formatCurrency(max)

  let text: string
  if (min <= 0 && max < PRICE_FILTER_MAX) {
    text = t('aside filter.banner under', { price: `${maxLabel}₫` })
  } else if (min > 0 && max >= PRICE_FILTER_MAX) {
    text = t('aside filter.banner over', { price: `${minLabel}₫` })
  } else {
    text = t('aside filter.banner range', { min: `${minLabel}₫`, max: `${maxLabel}₫` })
  }

  return (
    <div
      className={classNames(
        'mt-3 flex flex-col gap-2 rounded-lg border border-[#2563eb]/20 bg-[#eff6ff] px-3 py-2.5 text-sm text-[#1e40af] sm:flex-row sm:items-center sm:justify-between sm:gap-3',
        className
      )}
    >
      <p className='min-w-0 flex-1 leading-snug'>
        <span className='font-semibold text-[#1d4ed8]'>{t('aside filter.banner title')}</span>
        <span className='ml-1.5 break-words'>{text}</span>
      </p>
      <button
        type='button'
        onClick={handleClearPrice}
        className='shrink-0 self-start rounded-lg border border-[#2563eb]/50 bg-white px-3 py-1.5 text-xs font-semibold text-[#2563eb] shadow-sm transition hover:bg-[#dbeafe] sm:self-auto sm:text-sm'
      >
        {t('aside filter.banner clear')}
      </button>
    </div>
  )
}
