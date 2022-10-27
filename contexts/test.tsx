import { createContext } from "react"

export const TestContext = createContext({ test: true })

type TestProviderProps = {
  children: React.ReactNode
}

export const TestProvider = ({ children }: TestProviderProps) => {
  return (
    <TestContext.Provider value={{ test: true }}>
      {children}
    </TestContext.Provider>
  )
}