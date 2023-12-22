let playlistList = []
let params = new URL(document.location).searchParams;
let categoryName = params.get("category");

const playlistDom = document.getElementById("playlist")

async function fetchPlaylist(categoryName) {
    console.log("fething results for:", categoryName)
    let resp = await fetch("https://web2-courseproject-musicmood.onrender.com/search-playlist", {
        method: "post",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({
            playlist_category: categoryName,
        }),
    })
    resp = await resp.json() 
    return resp
}

async function categories() {
    playlistList = await fetchPlaylist(categoryName)
    console.log(playlistList)
    playlistList = playlistList.results

    renderPlaylists(playlistList)
}

function renderPlaylists(List) {
    playlistDom.innerHTML = ""
    List.forEach(el => {
        playlistDom.innerHTML += `
        <a href="./playlist.html?id=${el._id}">
            <div class="card-playlist" style="background-image: url('./img/cover.jpg') ;">
                <div class="card-content">
                    <div>
                        <h3>${el.title}</h3>
                        <p>${"todo: fill in username"}</p>
                    </div>
                    <div class="flex-grow"></div>
                    <div>
                        <p>${el.songsList.length} songs.</p>
                    </div>
                </div>
            </div>
        </a>`
    });
}

console.log("categories")
categories()