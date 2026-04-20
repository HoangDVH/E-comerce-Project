import classNames from 'classnames'
import { useCallback, useEffect, useRef, useState } from 'react'
import { PRICE_FILTER_MAX, PRICE_FILTER_STEP } from 'src/constants/priceFilter'

type DragTarget = 'min' | 'max' | null

type Props = {
  minValue: number
  maxValue: number
  onChange: (min: number, max: number) => void
  className?: string
}

const MIN_BOUND = 0

export default function PriceDualRange({ minValue, maxValue, onChange, className }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState<DragTarget>(null)

  const valueFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current
    if (!el) return MIN_BOUND
    const rect = el.getBoundingClientRect()
    const t = rect.width <= 0 ? 0 : (clientX - rect.left) / rect.width
    const raw = MIN_BOUND + Math.max(0, Math.min(1, t)) * (PRICE_FILTER_MAX - MIN_BOUND)
    const snapped = Math.round(raw / PRICE_FILTER_STEP) * PRICE_FILTER_STEP
    return Math.max(MIN_BOUND, Math.min(PRICE_FILTER_MAX, snapped))
  }, [])

  const applyMin = useCallback(
    (clamped: number) => {
      if (clamped <= maxValue) {
        onChange(clamped, maxValue)
      } else {
        onChange(maxValue, clamped)
      }
    },
    [maxValue, onChange]
  )

  const applyMax = useCallback(
    (clamped: number) => {
      if (clamped >= minValue) {
        onChange(minValue, clamped)
      } else {
        onChange(clamped, minValue)
      }
    },
    [minValue, onChange]
  )

  useEffect(() => {
    if (!dragging) return

    const onMove = (clientX: number) => {
      const v = valueFromClientX(clientX)
      if (dragging === 'min') applyMin(v)
      else if (dragging === 'max') applyMax(v)
    }

    const handleMouseMove = (e: MouseEvent) => onMove(e.clientX)
    const handleTouchMove: EventListener = (e) => {
      const te = e as TouchEvent
      if (te.touches[0]) {
        te.preventDefault()
        onMove(te.touches[0].clientX)
      }
    }

    const end = () => setDragging(null)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', end)
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', end)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', end)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', end)
    }
  }, [dragging, applyMin, applyMax, valueFromClientX])

  const handleTrackPointer = (clientX: number) => {
    const v = valueFromClientX(clientX)
    const distMin = Math.abs(v - minValue)
    const distMax = Math.abs(v - maxValue)
    if (distMin <= distMax) applyMin(v)
    else applyMax(v)
  }

  const leftPct = (minValue / PRICE_FILTER_MAX) * 100
  const rightPct = (maxValue / PRICE_FILTER_MAX) * 100

  return (
    <div className={classNames('w-full min-w-0 max-w-full', className)}>
      {/* px: chỗ đặt tâm nút kéo ở 0%/100% — tránh bị cắt (overflow + translate -50%) */}
      <div className='px-3 sm:px-3.5'>
        <div
          ref={trackRef}
          className='relative h-11 w-full touch-none select-none py-5'
          role='presentation'
          onMouseDown={(e) => handleTrackPointer(e.clientX)}
          onTouchStart={(e) => {
            const t = e.touches[0]
            if (t) handleTrackPointer(t.clientX)
          }}
        >
          <div className='pointer-events-none absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-neutral-200' />
          <div
            className='pointer-events-none absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#2563eb]'
            style={{
              left: `${leftPct}%`,
              width: `${Math.max(0, rightPct - leftPct)}%`
            }}
          />
          <div className='absolute inset-x-0 top-1/2 z-[1] h-8 -translate-y-1/2 cursor-pointer' />

          <button
            type='button'
            aria-label='Giá tối thiểu'
            className='absolute top-1/2 z-[3] flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full border-2 border-white bg-[#2563eb] shadow-md active:cursor-grabbing'
            style={{ left: `${leftPct}%` }}
            onMouseDown={(e) => {
              e.stopPropagation()
              setDragging('min')
            }}
            onTouchStart={(e) => {
              e.stopPropagation()
              setDragging('min')
            }}
          />
          <button
            type='button'
            aria-label='Giá tối đa'
            className='absolute top-1/2 z-[4] flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full border-2 border-white bg-[#2563eb] shadow-md active:cursor-grabbing'
            style={{ left: `${rightPct}%` }}
            onMouseDown={(e) => {
              e.stopPropagation()
              setDragging('max')
            }}
            onTouchStart={(e) => {
              e.stopPropagation()
              setDragging('max')
            }}
          />
        </div>
      </div>
    </div>
  )
}
