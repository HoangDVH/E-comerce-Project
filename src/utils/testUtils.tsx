import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from 'src/App'
import { AppProvider } from 'src/contexts/app.context'

export function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function renderWithRouter({ route }: { route: string }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  })
  return render(
    <MemoryRouter initialEntries={[route]}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <App />
          </AppProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </MemoryRouter>
  )
}
