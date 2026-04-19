import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { BRAND_NAME, BRAND_WORDMARK_LEAD, BRAND_WORDMARK_TAIL } from 'src/constants/brand'

type Variant = 'light' | 'primary'

interface BrandLogoProps {
  variant?: Variant
  className?: string
  to?: string
  /** Đặt false khi đã bọc trong `<Link>` bên ngoài */
  withLink?: boolean
}

export default function BrandLogo({
  variant = 'primary',
  className,
  to = '/',
  withLink = true
}: BrandLogoProps) {
  const inner = (
    <span
      className={classNames(
        'inline-flex items-baseline font-extrabold tracking-tight',
        variant === 'light' ? 'text-white' : 'text-orange',
        className
      )}
      aria-label={BRAND_NAME}
    >
      <span className='text-xl md:text-2xl'>{BRAND_WORDMARK_LEAD}</span>
      <span className='text-xl font-semibold md:text-2xl'>{BRAND_WORDMARK_TAIL}</span>
    </span>
  )

  if (!withLink) {
    return inner
  }

  return (
    <Link
      to={to}
      className='shrink-0 rounded outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'
    >
      {inner}
    </Link>
  )
}
