console.log("script running");

const searchbar = document.getElementById("search-bar");
const searchresult = document.getElementById("searchRes");
const playList = document.getElementById("playlist-songs")
const categoryForm = document.getElementById("category")

let categoryList = []
let songslist = [] // list to store songs for playlist in

async function renderCategories() {
    categoryList = await fetchCategories()
    
    categoryForm.innerHTML =""
    for (i in categoryList) {
        const mood = categoryList[i]
        console.log(mood)
        categoryForm.innerHTML += `
        <input type="checkbox" id="${mood.name}" name="${mood.name}" value="Bike">
        <label for="vehicle1">${mood.name}</label>
        `
    }
}
renderCategories()

async function makePlaylist() {
    console.log("creating playlist...")

    const title = document.getElementById("titleInput").value.trim()
    const description = document.getElementById("description").value.trim()
    const categories = []

    if (title == "") {
        alert("please fill in the title")
        return;
    }
    
    for (i in categoryList) {
        let  category = categoryList[i]
        const checkbox = document.getElementById(category.name).checked
        if (checkbox) {
            categories.push(category.name)
        }
    }
    if (categories.length == 0) {
        alert("please pick a category")
        return
    }
    
    if (songslist.length == 0) {
        alert("please pick a song for the playlist")
        return
    }
    
    const playlistInfo = {
        account_id: "none",
        title: title,
        description: description,
        categories: categories,
        songsList: songslist
    }

    console.log(playlistInfo)

    let resp = await fetch("http://127.0.0.1:3000/create-playlist", {
        method: "put",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify(
            playlistInfo
        ),
    });
    resp = await resp.json();
    
    console.log("esp")
    window.location.replace("./playlist.html?id="+ resp._id)
}

async function addSong(id) {
    let song = await fetch("http://127.0.0.1:3000/song", {
        method: "post",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({
            song_id: id,
        }),
    });
    song = await song.json();
    song = song.results[0]

    songslist = songslist.filter(a => a._id != id)
    songslist.push(song)
        
    renderSongs()
    
    console.log("songs in list:")
    for (i in songslist) console.log(songslist[i])
}

function delSong(id) {
    console.log("removing song")
    songslist = songslist.filter(a => a._id != id)

    for (i in songslist) console.log(songslist[i])
    renderSongs()
}

function renderSongs() {
    playList.innerHTML = ""
    songslist.forEach((element) => {
        playList.innerHTML += `
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
                <button onclick="delSong('${element._id}')">X</button>
            </div>
        </div>
        `
    })
}

searchbar.addEventListener("input", async (event) => {
    event.preventDefault();

    let results = [];
    let query = document.getElementById("search-input").value;
    console.log("search query: " + query);

    if (!query == "") {
        results = await fetchSongs(query);

        console.log("resuls: " + JSON.stringify(results));
        searchresult.innerHTML = "";

        if (results.length == 0) {
            searchresult.innerHTML =
                "<p style='margin: 50px;'>There's nothing left...</p>";
        } else {
            results.results.forEach((element) => {
                searchresult.innerHTML += `
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
                        <button onClick="addSong('${element._id}')">+</button>
                    </div>
                </div>
            </div>
            `;
            });
        }
    } else {
        searchresult.innerHTML =""
    }
});

async function fetchCategories() {
    let moodsList = await fetch("http://127.0.0.1:3000/get-categories", {
        method: "post"
    })
    moodsList = await moodsList.json() 
    return moodsList
}
async function fetchSongs(query) {
    songList = await fetch("http://127.0.0.1:3000/search-song", {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "query": query,
        }),
    });
    songList = await songList.json();
    return await songList;
}
