<template>
  <div class="presents">
    <div class="presents__container container">
      <h3 class="presents__title small-title">{{ $t('titles.presentsTitle') }}</h3>
      <ol class="presents__list list">
        <li v-for="(present, index) in presentsStore.presentsArray" :key="present.id">
          <div class="presents__item item">
            <h6 class="presents__name item__name">{{ nameLang(present) }}</h6>
            <v-btn elevation="2" @click="presentsStore.deletePresent(index, present.id)">{{
              $t('buttonActions.buttonDelete')
            }}</v-btn>
          </div>
        </li>
      </ol>
      <div class="present__add add">
        <div class="add-items">
          <div class="add-item">
            <label>
              <v-text-field
                v-model="newPresent.name.ua"
                :label="$t('labelsInput.newPresentUA')"
                :rules="rules"
                hide-details="auto"
                type="text"
              ></v-text-field>
            </label>
          </div>
          <div class="add-item">
            <label>
              <v-text-field
                v-model="newPresent.name.en"
                :label="$t('labelsInput.newPresentEN')"
                :rules="rules"
                hide-details="auto"
                type="text"
              ></v-text-field>
            </label>
          </div>
        </div>
        <v-btn
          elevation="8"
          :disabled="!newPresent.name.en || !newPresent.name.ua"
          class="main-button block"
          @click="onAdd"
          >{{ $t('buttonActions.buttonAdd') }}</v-btn
        >
        <div v-if="errorMessage" class="err-msg">{{ errorMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, reactive } from 'vue'
import { usePresentsStore } from '../stores/presents'
import i18n from '@/plugins/i18n'

const presentsStore = usePresentsStore()

let newPresent = reactive({
  name: {
    ua: '',
    en: ''
  }
})

const nameLang = computed(() => {
  return (item) => (i18n.global.locale === 'ua' ? item.name.ua : item.name.en)
})

function onAdd() {
  presentsStore.addPresent(newPresent)
  newPresent.name = {
    ua: '',
    en: ''
  }
}

onMounted(() => {
  presentsStore.setPresentsList()
})
</script>

<style>
@media (min-width: 1024px) {
  .presents {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.presents__container {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.presents__title {
  text-align: center;
}
</style>