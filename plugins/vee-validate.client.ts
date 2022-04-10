import { configure, extend } from 'vee-validate'
// eslint-disable-next-line camelcase
import { required, email, min, max, alpha, min_value, max_value } from 'vee-validate/dist/rules'
import PhoneNumber from 'awesome-phonenumber'
import { Plugin } from '@nuxt/types'

const validate: Plugin = ({ app: { i18n } }) => {
  configure({
    defaultMessage (field, values) {
      if (values) {
        const { _field_, _rule_, _value_, ...params } = values
        values._field_ = field.toLowerCase()
        return i18n.tc(`validations.${values._rule_}`, values.length, params)
      }
      return ''
    }
  })
  extend('email', email)
  extend('min_value', min_value)
  extend('max_value', max_value)
  extend('alpha', alpha)
  extend('required', required)
  extend('min', min)
  extend('max', max)
  extend('minUppercase', {
    validate (value, { length = 1 }) {
      const nbUppercase = value.match(/[A-Z]/g)?.length || 0
      return nbUppercase >= length
    },
    params: ['length']
  })
  extend('minLowercase', {
    validate (value, { length = 1 }) {
      const nbLowercase = value.match(/[a-z]/g)?.length || 0
      return nbLowercase >= length
    },
    params: ['length']
  })
  extend('minDigit', {
    validate (value, { length }) {
      const nbDigit = value.match(/\d/g)?.length || 0
      return nbDigit >= length
    },
    params: ['length']
  })
  extend('confirm', {
    // @ts-ignore
    validate (value, { target }) {
      return value === target
    },
    params: ['target']
  })
  extend('tel', {
    validate (value) {
      return new Promise((resolve) => {
        const phone = new PhoneNumber(value)
        resolve({ valid: phone.isValid() })
      })
    }
  })
  extend('dateMinTomorrow', {
    validate (value: Date) {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)
      return value.getTime() >= tomorrow.getTime()
    }
  })
  extend('contains', {
    // @ts-ignore
    validate (value: string, { words = '' }) {
      return (words as string).split(',').every(w => value.includes(w))
    },
    params: ['words']
  })
  extend('minSpecial', {
    validate (value, { length = 1 }) {
      const nbSpecial = value.match(/(?=.*[!?@#$%^&*{}])/g)?.length || 0
      return nbSpecial >= length
    },
    params: ['length']
  })
}

export const PasswordRules = 'required|min:8|minUppercase:1|minLowercase:1|minDigit:1|minSpecial:1'

export default validate
