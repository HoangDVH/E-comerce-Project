import classNames from 'classnames'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import InputNumber from 'src/components/InputNumber'
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

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

type FormData = NoUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>

const priceSchema = schema.pick(['price_min', 'price_max'])

const inputNumberClass =
  'w-full rounded-lg border border-neutral-200 bg-white py-2.5 px-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 hover:border-neutral-300 focus:border-orange focus:ring-2 focus:ring-orange/15'

export default function AsideFilter({ queryConfig, categories }: Props) {
  const { t } = useTranslation('home')
  const { category } = queryConfig
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
    reset
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver<FormData>(priceSchema as ObjectSchema<FormData>)
  })
  const navigate = useNavigate()
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })

  const handleRemoveAll = () => {
    reset()
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])).toString()
    })
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

      {/* Price */}
      <section className='rounded-xl bg-neutral-50/90 p-4 ring-1 ring-neutral-100/80'>
        <div className='text-sm font-medium text-neutral-800'>{t('aside filter.price range')}</div>
        <form className='mt-3' onSubmit={onSubmit}>
          <div className='flex flex-wrap items-stretch gap-2 sm:flex-nowrap'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => (
                <InputNumber
                  type='text'
                  className='min-w-0 flex-1'
                  placeholder={t('aside filter.price from')}
                  classNameInput={inputNumberClass}
                  classNameError='hidden'
                  {...field}
                  onChange={(event) => {
                    field.onChange(event)
                    trigger('price_max')
                  }}
                />
              )}
            />
            <span
              className='flex w-full shrink-0 items-center justify-center text-neutral-400 sm:w-6'
              aria-hidden
            >
              —
            </span>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => (
                <InputNumber
                  type='text'
                  className='min-w-0 flex-1'
                  placeholder={t('aside filter.price to')}
                  classNameInput={inputNumberClass}
                  classNameError='hidden'
                  {...field}
                  onChange={(event) => {
                    field.onChange(event)
                    trigger('price_min')
                  }}
                />
              )}
            />
          </div>
          <div className='mt-2 min-h-[1.25rem] text-center text-xs text-red-600'>{errors.price_min?.message}</div>
          <Button
            type='submit'
            className='mt-2 flex w-full items-center justify-center rounded-xl bg-orange py-3 text-sm font-semibold text-white shadow-md shadow-orange/25 transition hover:bg-orange/90 hover:shadow-lg'
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
