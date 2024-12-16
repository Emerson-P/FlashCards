function Enviar(event){
    let id_b = event.target.id
    let btn_en = document.getElementById(`${id_b}`)
    btn_en.setAttribute('type','submit')
}

function Del(event) {
    console.log(event)
    let id = event.target.id

            fetch("/Del?id=<%= data['id'] %>", {
            
            method: "POST",
            body: JSON.stringify({
                id_card: id.replace('del',''),
                title: "Card a deletar",
                completed: false
            }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            location.reload()
}

var del = document.getElementsByName('del')
    del.forEach((element) => {
        element.addEventListener("click",Del)
    })



var list = document.getElementsByName('btn')
    
    list.forEach((element) => {
        
        element.addEventListener("click",function(event){
            

            let params = event.target.id
            let titulo = document.getElementById(`tit${params}`)
            let dec = document.getElementById(`desc${params}`)
            let btn = document.getElementById(`${params}`)
            let btn_del = document.getElementById(`del${params}`)

            titulo.removeAttribute('disabled')
            dec.removeAttribute('disabled')
            
            btn.innerHTML = 'Alterar'
            btn_del.innerHTML = 'Cancelar'
            
            btn_del.removeEventListener("click",Del)

            btn.addEventListener("click",Enviar)

            btn_del.addEventListener("click",function(event) {

                titulo.setAttribute('disabled','true')
                dec.setAttribute('disabled','true')
            
                btn.innerHTML = 'Editar'
                btn_del.innerHTML = 'Deletar'

                btn_del.addEventListener("click",Del)
                btn.removeEventListener("click",Enviar)
            })
            
            
            
            
        })

    })  