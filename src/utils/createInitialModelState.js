/**
 * 存放于model中table数据的key
 * @param name
 * @returns {{}}
 */
const createInitialModelState = name => {
	return {
		[ `${name}TableData` ]: {
			list: [],
			pagination: {
				current: 1,
				pageSize: 10,
				total: 0,
			},
			params:{},
		}
	};
};

export default createInitialModelState;
