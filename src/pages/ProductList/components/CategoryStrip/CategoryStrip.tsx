import classNames from 'classnames'
import omit from 'lodash/omit'
import { createSearchParams, Link } from 'react-router-dom'
import path from 'src/constants/path'
import { Category } from 'src/types/category.type'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { useTranslation } from 'react-i18next'

interface Props {
  categories: Category[]
  queryConfig: QueryConfig
  className?: string
}

export default function CategoryStrip({ categories, queryConfig, className }: Props) {
  const { t } = useTranslation('home')
  const { category } = queryConfig

  const chip = (isActive: boolean) =>
    classNames(
      'shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm',
      isActive
        ? 'border-orange bg-orange text-white shadow-sm'
        : 'border-neutral-200 bg-white text-neutral-700 hover:border-orange/40'
    )

  return (
    <div className={classNames('border-b border-neutral-100 bg-white', className)}>
      <div className='container'>
        <div className='-mx-4 flex gap-2 overflow-x-auto px-4 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
          <Link
            to={{ pathname: path.home, search: createSearchParams(omit(queryConfig, ['category'])).toString() }}
            className={chip(!category)}
          >
            {t('aside filter.all categories')}
          </Link>
          {categories.map((cat) => {
            const active = category === cat._id
            return (
              <Link
                key={cat._id}
                to={{
                  pathname: path.home,
                  search: createSearchParams({ ...queryConfig, category: cat._id }).toString()
                }}
                className={chip(active)}
              >
                {cat.name}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

