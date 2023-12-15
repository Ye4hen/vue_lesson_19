import { createI18n } from 'vue-i18n'
import localesEN from '@/locale/en.json'
import localesUA from '@/locale/ua.json'

const i18n = createI18n({
	locale: 'ua',
	fallbackLocale: 'ua',
	messages: {
		en: localesEN,
		ua: localesUA,
	},
})

export default i18n
