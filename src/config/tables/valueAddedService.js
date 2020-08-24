import { doGetValueAddedList, } from '@/services/valueAdded';

const tableName = 'valueAddedList';

export default {
	tableName,
	[ tableName ]: doGetValueAddedList,
}
