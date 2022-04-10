export interface FormTemplate {
  type: 'text' | 'password' | 'email' | 'number' | 'checkbox' | 'tel' | 'date' | 'select' | 'textarea' | 'title'
  rules?: string
  placeholder?: string
  message?: string
  name: string
  label?: string
  hide?: boolean
  extra?: { options?: Array<{ label: string, value: any }> } & any
  hasTitle?: boolean
  eventHandler?: () => void
}

export const serialize = async (
  data: { type: FormTemplate['type'], name: string, value: any }[],
  options?: { localeDate?: Parameters<Date['toLocaleDateString']> }) => {
  const promises: Promise<any>[] = []
  const serializedData = data.reduce<any>((acc, current) => {
    if (current.value != null && current.value !== '') {
      switch (current.type) {
        case 'date':
          if (options?.localeDate) {
            acc[current.name] = (current.value as Date).toLocaleDateString(...options.localeDate)
          } else { acc[current.name] = (current.value as Date).toISOString() }
          break
        default:
          acc[current.name] = current.value.toString()
      }
    }
    return acc
  }, {})
  await Promise.all(promises)
  return serializedData
}
