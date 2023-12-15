import { defineStore } from 'pinia';
import { presentsList } from '@/data/SaintMycolaiData';
import { useAssignmentStore } from './assignment';
import { ref, computed } from 'vue'

export const usePresentsStore = defineStore('presents', () => {
	const presentsArray = ref([]);

	const getPresentById = computed(() => (itemId) => {
		return presentsArray.value.find((item) => item.id === itemId);
	});

	const setPresentsList = () => {
		presentsArray.value = presentsList;
		console.log(presentsList);
	};

	const addPresent = (item) => {
		presentsArray.value.push({
			id: new Date().getTime(),
			...item,
		});
	};

	const deletePresent = (deletePresentIndex, deleteItemId) => {
		const assignmentsStore = useAssignmentStore()
		presentsArray.value.splice(deletePresentIndex, 1);
		assignmentsStore.assignmentArray = assignmentsStore.assignmentArray.filter((assignment) => assignment.presentId !== deleteItemId)
	};

	return {
		presentsArray,
		getPresentById,
		setPresentsList,
		addPresent,
		deletePresent,
	};
})
