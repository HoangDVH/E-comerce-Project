import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import omit from 'lodash/omit'
import { createSearchParams, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import productApi from 'src/apis/product.api'
import path from 'src/constants/path'
import { ProductListConfig } from 'src/types/product.type'
import { useDebounce } from './useDebounce'
import useQueryConfig from './useQueryConfig'

/** Tách schema: `schema.name` trong rules.ts là bắt buộc (tên SP khi tạo), ô tìm kiếm phải cho phép để trống. */
const searchFormSchema = yup.object({
  name: yup.string().max(160, 'Tối đa 160 ký tự').default('')
})

type SearchFormData = yup.InferType<typeof searchFormSchema>

const SUGGESTION_LIMIT = 10
const DEBOUNCE_MS = 350

export default function useSearchProducts() {
  const queryConfig = useQueryConfig()
  const [panelOpen, setPanelOpen] = useState(false)

  const { register, handleSubmit, watch, reset } = useForm<SearchFormData>({
    defaultValues: {
      name: queryConfig.name || ''
    },
    resolver: yupResolver(searchFormSchema)
  })

  useEffect(() => {
    reset({ name: queryConfig.name || '' })
  }, [queryConfig.name, reset])

  const keyword = watch('name') ?? ''
  const debouncedKeyword = useDebounce(keyword.trim(), DEBOUNCE_MS)
  const canSuggest = debouncedKeyword.length >= 1

  const { data, isFetching, isFetched } = useQuery({
    queryKey: ['searchSuggestions', debouncedKeyword],
    queryFn: () =>
      productApi.getProducts({
        page: '1',
        limit: String(SUGGESTION_LIMIT),
        name: debouncedKeyword
      } as ProductListConfig),
    enabled: canSuggest,
    staleTime: 30 * 1000
  })

  const suggestions = data?.data.data.products ?? []

  const navigate = useNavigate()

  const navigateWithoutName = () => {
    let next: Record<string, string> = {
      ...queryConfig,
      page: '1'
    }
    next = omit(next, ['name'])
    const config = queryConfig.order ? omit(next, ['order', 'sort_by']) : next
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  }

  const onSubmitSearch = handleSubmit((form) => {
    setPanelOpen(false)
    const trimmed = (form.name ?? '').trim()

    if (!trimmed) {
      navigateWithoutName()
      return
    }

    const next: Record<string, string> = {
      ...queryConfig,
      page: '1',
      name: trimmed
    }

    const config = queryConfig.order ? omit(next, ['order', 'sort_by']) : next

    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })

  const reg = register('name')
  const registerSearchInput = {
    ...reg,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      void reg.onChange(e)
      const v = e.target.value
      if (v === '') {
        setPanelOpen(false)
        navigateWithoutName()
        return
      }
      setPanelOpen(true)
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
      void reg.onBlur(e)
      window.setTimeout(() => setPanelOpen(false), 200)
    },
    onFocus: () => setPanelOpen(true)
  }

  const showEmpty =
    canSuggest && !isFetching && isFetched && suggestions.length === 0

  return {
    onSubmitSearch,
    registerSearchInput,
    suggestions,
    isSuggestionsFetching: isFetching,
    debouncedKeyword,
    panelOpen,
    closeSuggestions: () => setPanelOpen(false),
    showSuggestionsEmpty: showEmpty
  }
}
