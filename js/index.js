document.addEventListener("DOMContentLoaded", function() {
    const BOOK_URL = "http://localhost:3000/books"
    const bookList = document.querySelector("#list")
    const bookShow = document.querySelector("#show-panel")
    const user = {"id": 1, "username":"pouros"}

    function makeBookCard(book){
        const listItem = document.createElement("li")

        const div = document.createElement("div")
        div.className = "card"
        div.hidden = true

        const title = document.createElement("h2")
        title.innerText = book.title
        addListenerToTitle(title, div)

        const description = document.createElement("p")
        description.innerText = book.description

        const img_url = document.createElement("img")
        img_url.src = book["img_url"]
        img_url.className = "bookImage"

        const userLikes = document.createElement("p")
        userLikes.hidden = true
        userLikes.value = book.users 

        const likeButton = document.createElement("button")
        likeButton.innerText = "Like"
        likeButton.className = "like-button"
        likeButton.id = book.id
        addListenerToLike(likeButton, userLikes)

        const likes = document.createElement("p")
        likes.innerText = `${book.users.length} likes`

        div.appendChild(title)
        div.appendChild(img_url)
        div.appendChild(description)
        div.appendChild(userLikes)
        div.appendChild(likeButton)
        div.appendChild(likes)
        bookShow.appendChild(div)
        listItem.appendChild(title)
        bookList.appendChild(listItem)
    }

    function addListenerToLike(likeButton, userLikes) {
        likeButton.addEventListener('click', (e) => {
            addLike(userLikes)
        })
    }

    function addListenerToTitle(title, div) {
        title.addEventListener('click', (e) => {
            const cards = document.querySelectorAll(".card")
            cards.forEach(card => card.hidden = true)
            div.hidden = false
        })
    }

    function getBooks() {
        fetch(BOOK_URL)
        .then(resp => resp.json())
        .then(json => json.forEach(book => makeBookCard(book)))
    }

    
    // function addLike(userLikes) {
    //     let list = userLikes.value.json()
    //     if (!list.includes(user)) {
    //         list.push(user)
    //     } else {
    //         list.pop(user)
    //     }
    //     const configObj = {
    //         method = "PATCH",
    //         headers = {
    //             "Content-Type": 'application/json',
    //             Accept: 'application/json'
    //         },
    //         body = JSON.stringify({
    //             "id": 
    //             "users": list
    //         })
    //     }
    //     fetch(BOOK_URL, configObj) 
    //     .then(resp => resp.json())
    //     .then(json => console.log(json))
    // }

    getBooks()
});
