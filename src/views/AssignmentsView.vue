<template>
  <div class="assignments">
    <div class="assignments__container">
      <h3 class="assignments__title small-title">{{ $t('titles.distributionTitle') }}</h3>
      <ol class="assignments__list list">
        <li
          v-for="(assignment, index) in assignmentStore.getFilledAssignmentsList"
          :key="assignment.id"
        >
          <div class="assignments__item item item-asgn">
            <h6 class="assignments__name item__name">
              {{ nameAssignmentLang(assignment.friendName) }}
            </h6>
            <h6 class="assignments__name item__name">
              {{ nameAssignmentLang(assignment.presentName) }}
            </h6>
            <v-btn elevation="8" @click="assignmentStore.deleteAssignment(index)">{{
              $t('buttonActions.buttonDelete')
            }}</v-btn>
          </div>
        </li>
      </ol>
      <div class="assignments__selects">
        <div class="assignments__select">
          <h5 class="item__name">{{ $t('labelsInput.friend') }}</h5>
          <select v-model="assignment.friendId">
            <option v-for="friend in friendsStore.friendsArray" :key="friend.id" :value="friend.id">
              {{ nameLang(friend) }}
            </option>
          </select>
        </div>
        <div class="assignments__select">
          <h5 class="item__name">{{ $t('labelsInput.present') }}</h5>
          <select v-model="assignment.presentId">
            <option
              v-for="present in presentsStore.presentsArray"
              :key="present.id"
              :value="present.id"
            >
              {{ nameLang(present) }}
            </option>
          </select>
        </div>
      </div>
      <v-btn elevation="8" class="main-button block" @click="onAdd">{{
        $t('buttonActions.buttonAdd')
      }}</v-btn>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, reactive } from 'vue'
import { useAssignmentStore } from '@/stores/assignment'
import { useFriendsStore } from '@/stores/friends'
import { usePresentsStore } from '@/stores/presents'
import i18n from '@/plugins/i18n'

const assignmentStore = useAssignmentStore()
const presentsStore = usePresentsStore()
const friendsStore = useFriendsStore()

let assignment = reactive({})

const nameLang = computed(() => {
  return (item) => (i18n.global.locale === 'ua' ? item.name.ua : item.name.en)
})
const nameAssignmentLang = computed(() => {
  return (item) => (i18n.global.locale === 'ua' ? item.ua : item.en)
})

onMounted(() => {
  presentsStore.setPresentsList()
  friendsStore.setFriendsList()
})

function onAdd() {
  if (assignment.friendId && assignment.presentId) {
    assignmentStore.addAssignment(assignment)
    assignment = {}
  }
}
</script>

<style scoped>
select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 1px solid #ccc;
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 4px;
  background-color: #fff;
  outline: none;
  cursor: pointer;
}

select:hover {
  border-color: #aaa;
}

select:focus {
  border-color: #5897fb;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

select:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.assignments__container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.assignments__selects {
  display: flex;
  justify-content: center;
  gap: 50px;
}

.assignments__select {
  display: grid;
  justify-content: start;
  gap: 15px;
}

button {
  margin: 0 auto;
}
</style>