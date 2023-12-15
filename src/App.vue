
<script setup>
import { ref, onMounted, computed } from 'vue'
import i18n from '@/plugins/i18n'

const currentLanguage = ref('')
const lastLocale = localStorage.getItem('lastLocale')

function changeLocale(lang) {
  i18n.global.locale = lang
  localStorage.setItem('lastLocale', lang)
}

const updateLocale = computed(() => {
  const storedLocale = localStorage.getItem('lastLocale')
  if (i18n.global.locale !== storedLocale) {
    i18n.global.locale = storedLocale
  }
})

onMounted(() => {
  const storedLocale = lastLocale || i18n.global.locale
  i18n.global.locale = storedLocale
  currentLanguage.value = storedLocale === 'ua' ? 'Українська' : 'English'
  window.addEventListener('storage', updateLocale)
})

const t = i18n.global.t
</script>
<template>
  <header class="header">
    <nav>
      <RouterLink :to="{ name: 'home' }">{{ $t('menu.home') }}</RouterLink>
      <RouterLink :to="{ name: 'friends' }">{{ $t('menu.friends') }}</RouterLink>
      <RouterLink :to="{ name: 'presents' }">{{ $t('menu.presents') }}</RouterLink>
      <RouterLink :to="{ name: 'assignments' }">{{ $t('menu.presentsDistribution') }}</RouterLink>
    </nav>
    <div class="header__lang">
      <span>{{ $t('languages.currentLanguage') }} : {{ $t('languages.language') }}</span>
      <div class="header__buttons actions">
        <v-btn class="main-button" elevation="2" @click="changeLocale('ua')">Укр.</v-btn>
        <v-btn class="main-button" elevation="2" @click="changeLocale('en')">Eng.</v-btn>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style lang="css">
.header {
  padding: 30px 0;
  display: flex;
  justify-content: space-between;
  gap: 30px;
}

.header__lang {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header__buttons {
}

.actions {
  display: flex;
  gap: 15px;
}
.main-button {
  color: white !important;
  background-color: hsla(160, 100%, 37%, 1) !important;
  transition: all 0.3s;
}
.main-button:hover {
  background-color: hsla(160, 100%, 37%, 0.2) !important;
}

.block {
  margin: 0 25% !important;
  text-align: center;
}

.title {
  font-size: 40px;
  font-weight: 700;
  text-align: center;
}

.title:not(:last-child) {
  margin-bottom: 30px;
}

.small-title {
  font-size: 30px;
  font-weight: 600;
  text-align: center;
}

.small-title:not(:last-child) {
  margin-bottom: 20px;
}

.list {
  display: grid;
  gap: 20px;
  justify-content: center;
}

.list li {
  justify-self: start;
}

.item {
  display: grid;
  grid-template-columns: 200px 200px;
  align-items: center;
  gap: 15px;
}

.item-asgn {
  grid-template-columns: 200px 200px 200px;
}

.item__name {
  justify-self: start;
  font-size: 20px;
}

.add {
  display: grid;
  width: 800px;
  margin: 0 auto;
  align-items: center;
  gap: 30px;
}

.add-items {
  display: grid;
  gap: 30px;
}

.add-item input {
  width: 100%;
}

.err-msg {
  font-size: 18px;
  font-weight: 700;
  color: red;
}
</style>
