import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating'
import path from 'src/constants/path'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from 'src/utils/utils'

interface Props {
  product: ProductType
}

export default function Product({ product }: Props) {
  const discount =
    product.price_before_discount > product.price
      ? Math.round(((product.price_before_discount - product.price) / product.price_before_discount) * 100)
      : 0

  return (
    <Link to={`${path.home}${generateNameId({ name: product.name, id: product._id })}`}>
      <div className='overflow-hidden rounded-md bg-white shadow-card ring-1 ring-black/[0.06] transition-all duration-200 active:scale-[0.98] sm:rounded-lg sm:hover:-translate-y-0.5 sm:hover:shadow-card-hover'>
        <div className='relative w-full pt-[100%]'>
          <img
            src={product.image}
            alt={product.name}
            className='absolute top-0 left-0 h-full w-full bg-white object-cover'
          />
          {discount > 0 && (
            <span className='absolute right-0 top-0 rounded-bl-md bg-[rgba(255,212,36,.95)] px-1.5 py-0.5 text-[10px] font-bold leading-none text-orange shadow-sm sm:text-[11px]'>
              -{discount}%
            </span>
          )}
        </div>
        <div className='overflow-hidden p-1.5 sm:p-2'>
          <div className='min-h-[2.25rem] text-[11px] leading-snug line-clamp-2 text-neutral-800 sm:min-h-[2rem] sm:text-xs'>
            {product.name}
          </div>
          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-gray-500 line-through'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className='ml-1 truncate text-orange'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>{formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <ProductRating rating={product.rating} />
            <div className='ml-2 text-sm'>
              <span>{formatNumberToSocialStyle(product.sold)}</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
