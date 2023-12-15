import { defineStore } from 'pinia';
import { friendsList } from '@/data/SaintMycolaiData';
import { useAssignmentStore } from './assignment';
import { ref, computed } from 'vue'

export const useFriendsStore = defineStore('friends', () => {
	const friendsArray = ref([]);

	const getFriendById = computed(() => (itemId) => {
		return friendsArray.value.find((item) => item.id === itemId);
	});

	const setFriendsList = () => {
		friendsArray.value = friendsList;
		console.log(friendsList);
	};

	const addFriend = (item) => {
		friendsArray.value.push({
			id: new Date().getTime(),
			...item,
		});
	};

	const deleteFriend = (deleteFriendIndex, deleteItemId) => {
		friendsArray.value.splice(deleteFriendIndex, 1);
		const assignmentsStore = useAssignmentStore()
		assignmentsStore.assignmentArray = assignmentsStore.assignmentArray.filter((assignment) => assignment.friendId !== deleteItemId)
	};

	return {
		friendsArray,
		getFriendById,
		setFriendsList,
		addFriend,
		deleteFriend,
	};
})
