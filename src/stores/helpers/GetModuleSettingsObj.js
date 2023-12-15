import { ref } from 'vue';

function getModuleSettingsObj(collectionTitle, itemsList) {
	const collection = ref([]);
	const items = ref([]);

	const getItemById = (itemId) => {
		return collection.value.find((item) => item.id === itemId);
	};

	const setItemsList = () => {
		collection.value = itemsList;
		console.log(itemsList);
	};

	const addItem = (item) => {
		collection.value.push({
			id: new Date().getTime(),
			...item,
		});
	};

	const deleteItem = (deleteItemIndex) => {
		collection.value.splice(deleteItemIndex, 1);
	};

	return {
		[collectionTitle]: collection,
		[itemsList]: items,
		getItemById,
		setItemsList,
		addItem,
		deleteItem,
	};
}

export { getModuleSettingsObj };