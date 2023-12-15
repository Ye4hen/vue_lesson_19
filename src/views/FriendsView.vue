<template>
  <div class="friends">
    <div class="friends__container container">
      <h3 class="friends__title small-title">{{ $t('titles.friendsTitle') }}</h3>
      <ol class="friends__list list">
        <li v-for="(friend, index) in friendsStore.friendsArray" :key="friend.id">
          <div class="friends__item item">
            <h6 class="friends__name item__name">{{ nameLang(friend) }}</h6>
            <v-btn elevation="2" @click="friendsStore.deleteFriend(index, friend.id)">{{
              $t('buttonActions.buttonDelete')
            }}</v-btn>
          </div>
        </li>
      </ol>
      <div class="friend__add add">
        <div class="add-items">
          <div class="add-item">
            <label>
              <v-text-field
                v-model="newFriend.name.ua"
                :label="$t('labelsInput.newFriendUA')"
                :rules="rules"
                hide-details="auto"
                type="text"
              ></v-text-field>
            </label>
          </div>
          <div class="add-item">
            <label>
              <v-text-field
                v-model="newFriend.name.en"
                :label="$t('labelsInput.newFriendEN')"
                :rules="rules"
                hide-details="auto"
                type="text"
              ></v-text-field>
            </label>
          </div>
        </div>
        <v-btn
          elevation="8"
          :disabled="!newFriend.name.en || !newFriend.name.ua"
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
import { useFriendsStore } from '../stores/friends'
import i18n from '@/plugins/i18n'

const friendsStore = useFriendsStore()

let newFriend = reactive({
  name: {
    ua: '',
    en: ''
  }
})

const nameLang = computed(() => {
  return (item) => (i18n.global.locale === 'ua' ? item.name.ua : item.name.en)
})

function onAdd() {
  friendsStore.addFriend(newFriend)
  newFriend.name = {
    ua: '',
    en: ''
  }
}

onMounted(() => {
  friendsStore.setFriendsList()
})
</script>

<style>
@media (min-width: 1024px) {
  .friends {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.friends__container {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.friends__title {
  text-align: center;
}
</style>