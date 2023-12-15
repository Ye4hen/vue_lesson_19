import { defineStore } from 'pinia';
import { useFriendsStore } from './friends';
import { usePresentsStore } from './presents';
import { ref, computed } from 'vue'

export const useAssignmentStore = defineStore('assignment', () => {
	const assignmentArray = ref([
		{
			id: 1,
			friendId: 1,
			presentId: 1,
		},
		{
			id: 2,
			friendId: 2,
			presentId: 2,
		},
	]);

	const getFilledAssignmentsList = computed(() => {
		const friendsStore = useFriendsStore()
		const presentsStore = usePresentsStore()
		return assignmentArray.value.map((assignment) => {
			const friend = friendsStore.friendsArray.find((item) => item.id == assignment.friendId)
			const present = presentsStore.presentsArray.find((item) => item.id == assignment.presentId)

			return {
				id: assignment.id,
				friendName: friend ? friend.name : 'Friend not found',
				presentName: present ? present.name : 'Friend not found',
			};
		});
	})

	const addAssignment = (item) => {
		assignmentArray.value.push({
			id: new Date().getTime(),
			...item,
		});
	};

	const deleteAssignment = (deleteFriendIndex) => {
		assignmentArray.value.splice(deleteFriendIndex, 1);
	};

	return {
		assignmentArray,
		getFilledAssignmentsList,
		addAssignment,
		deleteAssignment,
	};
})
