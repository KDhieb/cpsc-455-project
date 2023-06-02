const songs = (songName = "", action) => {
    switch (action.type) {
        case 'SEARCH_SONG':
            console.log("searching song: " + action.payload);
            return songName;
       default:
         return songName;
  }
}

export default songs;