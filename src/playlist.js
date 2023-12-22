let params = new URL(document.location).searchParams.get("id");
let playlist = {}
console.log(params)

const playlistDom = document.getElementById("playlist")
const pName = document.getElementById("pName")
const pCreator = document.getElementById("pCreator")
const pSongCount = document.getElementById("pSongCount")
const pDescription = document.getElementById("pDescription")
const pCoverImage = document.getElementById("pCoverImage")

async function fetchPlaylist(playlist_id) {
    let resp = await fetch("http://127.0.0.1:3000/search-playlist", {
        method: "post",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({
            playlist_id: playlist_id,
        }),
    })
    resp = await resp.json() 
    return resp
}
async function fetchSong(id) {
    let resp = await fetch("http://127.0.0.1:3000/song", {
        method: "post",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({
            song_id: id,
        }),
    })
    resp = await resp.json() 
    console.log("song:", resp)
    console.log("songid:", id)
    return resp
}

async function library() {
    let tofilter = await fetchPlaylist(params)
    playlist = tofilter.results[0]
    console.log("playlist:", tofilter.results[0])



    renderPlaylist(playlist)
}

async function renderPlaylist(p) {
    pName.innerHTML =  p.title
    pCreator.innerHTML = "By TODO: fetch name of user and fill in" // p.Creator
    pSongCount.innerHTML = p.songsList.length +" total songs"
    pDescription.innerHTML = p.description
    //pCoverImage. // TODO: set source of cover image

    for (i in playlist.songsList) {
        const song_id = playlist.songsList[i]
        let song = await fetchSong(song_id)
        
        

        const element = song.results[0]

        playlistDom.innerHTML += `
        <div class="song-card">
            <div class="flex-center-hv" style="width: 80px;">
                <p>1.</p>
                </div>
                    <img class="cover" src="${element.artworkUrl100}" alt="cover image">
                    <div style="margin-left: 20px;">
                        <h1>${element.trackName}</h1>
                        <p>by ${element.artistName}</p>
                    </div>
                    <div class="flex-grow"></div>
                    <p>3:55</p>
                <div class="flex-center-hv" style="width: 80px;">
                   
                </div>
            </div>
        </div>
        `
    };
}


library()