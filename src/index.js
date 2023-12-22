console.log("JS loaded")

let moodsBox = document.getElementById("moods")
let searchbar = document.getElementById("search-bar")

let moodsList = []

async function fetchMoods() {
    moodsList = await fetch("http://127.0.0.1:3000/get-categories", {
        method: "post",
        body: {
            "empty": "empty"
        }
    })
    moodsList = await moodsList.json()
    console.log("mess:"+ JSON.stringify(moodsList))

    renderCategories(moodsList)
}

fetchMoods()

searchbar.addEventListener("input", (event) => {
    event.preventDefault()
    
    let results = []

    let query = document.getElementById("search-input").value

    console.log("search query: "+ query)


    moodsList.forEach(element => {
        if (element.name.toLowerCase().includes(query)) {
            results.push(element)
        }
    });

    console.log("resuls: "+ JSON.stringify(results))
    moodsBox.innerHTML = ""

    if (results.length == 0) moodsBox.innerHTML = "<p style='margin: 50px;'>There's nothing left...</p>"
    else renderCategories(results)
})

function renderCategories(renderList) {
    moodsBox.innerHTML = ""
    renderList.forEach(element => {
        console.log(element)
        moodsBox.innerHTML +=`
            <a class="card" href="./category.html?category=${element.name}">
                <div class="card-content">
                    <p>${element.name}</p>
                </div>
            </a>
        `;  
    })
}