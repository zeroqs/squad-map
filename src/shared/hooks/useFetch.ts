import { useState } from 'react'

interface UseFetch<T> {
  input: string | URL | globalThis.Request
  initialValue: T
  config?: RequestInit
}

export const useFetch = <T>({ input, initialValue, config }: UseFetch<T>) => {
  const [data, setData] = useState<T>(initialValue)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFetch = async (): Promise<T | undefined> => {
    try {
      setLoading(true)
      const res = await fetch(input, config)
      const data = await res.json()
      setData(data)
      setError(null)

      return data
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return { data, isLoading, error, handleFetch }
}
