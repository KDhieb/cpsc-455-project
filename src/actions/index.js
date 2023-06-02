export const searchSong = name => {
	return {
		type: 'SEARCH_SONG',
		payload: name
	};
};