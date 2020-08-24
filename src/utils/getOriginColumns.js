const getOriginColumns = origin=>{
	return origin.map(v=>({
		...v,
		dataIndex:v.key,
	}));
};

export default getOriginColumns;
