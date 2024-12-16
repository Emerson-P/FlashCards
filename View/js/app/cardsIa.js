var cards = document.getElementsByName("card")
var checkbox = document.getElementsByName("ling")

cards.forEach(element => {
    element.addEventListener("click",function(e){
        let id = e.target.id

        checkbox.forEach(e => {
            e.removeAttribute('checked')
            if(e.id == id){
                e.setAttribute('checked','')
            }
        })     
    })
});

