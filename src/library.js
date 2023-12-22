let playlistList = []

const playlistDom = document.getElementById("playlist")
let searchbar = document.getElementById("search-bar")

async function fetchLibrary(account_id) {
    let resp = await fetch("https://web2-courseproject-musicmood.onrender.com/search-playlist", {
        method: "post",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({
            account_id: account_id,
        }),
    })
    resp = await resp.json() 
    return resp
}

async function library() {
    let tofilter = await fetchLibrary()
    tofilter.results.forEach(element => {
        playlistList.push(element)
    });
    console.log(playlistList)
    renderPlaylists(playlistList)
}

function renderPlaylists(List) {
    playlistDom.innerHTML = ""
    List.forEach(el => {
        playlistDom.innerHTML += `
        <div>
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
        </a>
        <button onclick="delPlaylist('${el._id}')">delete playlist</button>
        </div>`
    });
}

async function delPlaylist(id) {
    let resp = await fetch("https://web2-courseproject-musicmood.onrender.com/delete-playlist", {
        method: "delete",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({
            _id: id,
        }),
    })
    resp = await resp.json() 
    location.reload() 
}

searchbar.addEventListener("input", (event) => {
    event.preventDefault()

    results = []
    let query = document.getElementById("search-input").value
    console.log("query:", query)

    playlistList.forEach(element => {
        if (element.title.toLowerCase().includes(query)) {
            results.push(element)
        }
    });
    console.log(results)

    if (results.length == 0) {
        playlistDom.innerHTML = "<p style='margin: 50px;'>There's nothing left...</p>"
    } else {
        renderPlaylists(results)
    }
})

library()