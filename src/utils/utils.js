export const createSpotifyFormattedSongObject = (songID, songName, songArtist, songAlbumName, songAlbumImage, songPreviewUrl, songSpotifyURL) => {
    console.log(songID)
    return { 
            id: songID,
            name: songName,
            artists: [{name: songArtist}],
            album: {
              name: songAlbumName,
              images: [{url: songAlbumImage}]
            },
            preview_url: songPreviewUrl,
            external_urls: {
              spotify: songSpotifyURL
            },
          };
    

}