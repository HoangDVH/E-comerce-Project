import classNames from 'classnames'
import { Link } from 'react-router-dom'
import Skeleton from 'src/components/Skeleton'
import path from 'src/constants/path'
import useSearchProducts from 'src/hooks/useSearchProducts'
import { formatCurrency, generateNameId } from 'src/utils/utils'

type Variant = 'header' | 'cart'

interface Props {
  variant?: Variant
  formClassName?: string
}

export default function SearchBar({ variant = 'header', formClassName }: Props) {
  const {
    onSubmitSearch,
    suggestions,
    isSuggestionsFetching,
    debouncedKeyword,
    registerSearchInput,
    panelOpen,
    closeSuggestions,
    showSuggestionsEmpty
  } = useSearchProducts()

  const canSuggest = debouncedKeyword.trim().length >= 1
  const showPanel = panelOpen && canSuggest

  return (
    <form
      className={classNames('relative', formClassName)}
      onSubmit={onSubmitSearch}
      autoComplete='off'
    >
      <div
        className={classNames('flex', {
          'rounded-md bg-white p-1 shadow-sm': variant === 'header',
          'rounded-sm border-2 border-orange': variant === 'cart'
        })}
      >
        <input
          type='search'
          className={classNames('min-w-0 flex-grow border-none bg-transparent outline-none', {
            'px-3 py-2 text-sm text-black md:text-base': variant === 'header',
            'px-3 py-1 text-black': variant === 'cart'
          })}
          placeholder='Free Ship Đơn Từ 0Đ'
          {...registerSearchInput}
        />
        <button
          type='submit'
          className={classNames(
            'flex-shrink-0 rounded-md hover:opacity-90 md:px-6',
            variant === 'header' && 'bg-orange px-4 py-2 text-white',
            variant === 'cart' && 'rounded-sm bg-orange px-8 py-2 text-white'
          )}
          aria-label='Tìm kiếm'
          onMouseDown={(e) => {
            e.preventDefault()
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={classNames('h-6 w-6', variant === 'cart' && 'h-5 w-5')}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
            />
          </svg>
        </button>
      </div>

      {showPanel && (
        <div
          className='absolute left-0 right-0 top-full z-[200] mt-1 max-h-[min(70vh,400px)] overflow-y-auto overscroll-contain rounded-md border border-neutral-200 bg-white py-1 text-left text-sm shadow-lg'
          role='listbox'
          aria-label='Gợi ý sản phẩm'
        >
          {isSuggestionsFetching && suggestions.length === 0 && (
            <div className='space-y-2 p-2'>
              {Array.from({ length: 5 }).map((_, i) => (
                <div className='flex gap-2' key={i}>
                  <Skeleton className='h-12 w-12 shrink-0 rounded' />
                  <div className='flex min-w-0 flex-1 flex-col justify-center gap-2'>
                    <Skeleton className='h-3 w-full' />
                    <Skeleton className='h-4 w-24' />
                  </div>
                </div>
              ))}
            </div>
          )}
          {!isSuggestionsFetching &&
            suggestions.map((product) => (
              <Link
                key={product._id}
                role='option'
                to={`${path.home}${generateNameId({ name: product.name, id: product._id })}`}
                className='flex gap-2 px-2 py-2 hover:bg-neutral-50'
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => closeSuggestions()}
              >
                <img src={product.image} alt='' className='h-12 w-12 shrink-0 rounded bg-neutral-100 object-cover' />
                <div className='min-w-0 flex-1'>
                  <div className='line-clamp-2 text-neutral-800'>{product.name}</div>
                  <div className='mt-1 text-orange'>
                    <span className='text-xs'>₫</span>
                    <span>{formatCurrency(product.price)}</span>
                  </div>
                </div>
              </Link>
            ))}
          {showSuggestionsEmpty && (
            <div className='px-3 py-6 text-center text-neutral-500'>Không tìm thấy sản phẩm phù hợp</div>
          )}
        </div>
      )}
    </form>
  )
}
