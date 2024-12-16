function redirect(params) {
            
    window.location.href = `/deck?id=${params}`
}

function Del(params) {

fetch("/DelDeck?id=<%= data['id'] %>", {

    method: "POST",
    body: JSON.stringify({
        id_deck: params,
        title: "deck a deletar",
        completed: false
    }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
})
.then((response) => response.json())
.then((json) => console.log(json));
location.reload()
}
