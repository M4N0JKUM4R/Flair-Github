const githubAPI = "https://api.github.com/users/"
const userCard = document.querySelector(".user-card")
const searchEl = document.querySelector(".search input") 
const form = document.querySelector("form.search")

const searchAPI = "https://api.github.com/search/users?q="

let searchOutputcontainer = document.querySelector(".search-output")

async function githubUsers(user) {
    userCard.innerHTML = `<div class="loading"><img src="https://github.githubassets.com/images/modules/logos_page/Octocat.png" /></div>`
    userCard.classList.add("loading");
    const api = await fetch(githubAPI + user)
    const response = await api.json()

    const repoAPI = await fetch(githubAPI + user + "/repos")
    const repoResponse = await repoAPI.json()

    console.log(response)
    console.log(repoResponse)

    const progressLoader = await loader()
    
    createCard(response,repoResponse)

    userCard.classList.remove("loading");
}

githubUsers("github")


function createCard(data,repoData) {

    const {name,avatar_url,location,followers,bio,following,public_repos,html_url} = data;

    if(data.message === "Not Found") {
        noUser()
        return
    }

    if(data) {
            userCard.innerHTML = `<div class="profile-pic"><a href="${html_url}" target="_blank"><img src="${avatar_url}" /></a></div>
                                    <div class="details">
                                        <h2 class="name">${checkName(name)}<div class="location">${checkLocation(location)}</div></h2>
                                        <div class="desc">${checkBio(bio)}</div>
                                        
                                        <div class="stats">
                                            <div class="following"><span class="title">Following:</span> ${following}</div>
                                            <div class="followers"><span class="title">Followers:</span> ${followers}</div>
                                            <div class="repo"><span class="title">Repos:</span> ${public_repos}</div>
                                        </div>
                                        <h3 class="title">Top Repositories</h3>
                                        <div class="repos"></div>`
    
            repoData.sort((firstItem,secondItem) => secondItem.stargazers_count - firstItem.stargazers_count)

            console.log(repoData)

            repoData.slice(0,9).forEach((repo,index) => {
        
            const {html_url,name,stargazers_count} = repo
            let divRepo = document.createElement("div")
            divRepo.classList.add("div-repo")
            divRepo.innerHTML = `<a target="_blank" href="${html_url}">${name}</a><div class="stars">${stargazers_count}</div>`
            userCard.querySelector(".repos").appendChild(divRepo)
        })

    }
    
                        
}


function loader() {
    let loaderElement = document.createElement("div")
    let loadingProgress = document.createElement("div")
    loaderElement.classList.add("loader")
    loadingProgress.classList.add("loader-progress")
    loaderElement.append(loadingProgress)
    userCard.append(loaderElement)
    let progress = 10
    return new Promise((resolve, reject) => {
        let intervalProgress = setInterval(() => {
            loadingProgress.style.width = `${progress}%`
            console.log(progress)
            if(progress > 100) {
                progress = 100;
                loadingProgress.style.width = `100%`
                clearInterval(intervalProgress)
                resolve(progress)   
            }
            progress+=5
        }, 100);
    })  
}

function compareNumbers(a,b) {
    return a - b;
}

function checkBio(bioData) {
    if(bioData) {
        return bioData
    } else {
        return "Air of mystery around this user."
    }
}

function checkLocation(locData) {
    if(locData) {
        return locData
    } else {
        return "Somewhere on Earth"
    }
}

function checkName(nameData) {
    if(nameData) {
        return nameData
    } else {
        return "I have set no name"
    }
}


function noUser() {
    userCard.innerHTML = `No such user. <img src="https://github.githubassets.com/images/modules/logos_page/Octocat.png" />`
    console.log("No user")
}

async function getInput() {

    const type = await writing();
    searchFunc(type)
}

let intervalTimer;

const writing = () => {
    return new Promise((resolve, reject) => {
        searchEl.addEventListener("input", () => {
               clearTimeout(intervalTimer);
                if(searchEl.value.length >= 3) {
                    intervalTimer = setTimeout(() => {
                        resolve(searchEl.value)
                    },500) 
                }
        })
    })
}

searchEl.addEventListener("input", () => {
    getInput()

    if(searchEl.value.length == 0) {
        searchOutputcontainer.innerHTML = ``;
    }
})


const searchFunc = async (user) => {
    let searchQuery = await fetch(searchAPI + user)
    let searchResponse = await searchQuery.json()
    console.log(searchResponse)
    searchOutputcontainer.innerHTML = ""
    showSearch(searchResponse)
}

const showSearch = (searchData) => {

    if(searchData.total_count) {
        searchData.items.slice(0,5).forEach(searchItem => {
            
            const {login,avatar_url,type} = searchItem;

            let searchOutputEl = document.createElement("div")
            searchOutputEl.classList.add("search-item")
            searchOutputcontainer.append(searchOutputEl)
            searchOutputEl.innerHTML = `<div class="search-avatar"><img src="${avatar_url}" /></div><div class="name">${login}</div><div class="type">${type}</div>`

            searchOutputEl.addEventListener("click", () => {
                githubUsers(login)
                searchOutputcontainer.innerHTML = ``;
            })
        })
    } else {
        searchOutputcontainer.innerHTML = `<div class="search-item no-search">No such users</div>`;
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
})

document.addEventListener("click",(e) => {
    const checkClick = e.composedPath().includes(form)
    
    if(checkClick) {
        console.log("Clicked inside")
    } else {
        searchOutputcontainer.innerHTML = ``;
    }

})
