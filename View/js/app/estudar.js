
document.addEventListener('DOMContentLoaded', () => {
    

    function ocult(event) {

        let btn_ocult = event.target
        let id_ocult = btn_ocult.id
        let desc_ocult = document.getElementById(`desc${id_ocult}`)

        desc_ocult.setAttribute('class','desc')
        btn_ocult.innerHTML = 'Ver resposta'
        btn_ocult.removeEventListener("click",ocult)
        btn_ocult.addEventListener("click",show)
    }

    function show(e) {

        let btn = e.target
        let id = btn.id
        let desc = document.getElementById(`desc${id}`)
        desc.setAttribute('class','show')

        btn.innerHTML= 'ocultar resposta'
        btn.removeEventListener("click",show)

        btn.addEventListener("click",ocult)

    }


    const btns = document.getElementsByName('show')
    btns.forEach((element)=>{
        element.addEventListener("click", show)

    })


    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    function showItem(index) {
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }

    document.getElementById('prevBtn').addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
        showItem(currentIndex);
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
        showItem(currentIndex);
    });

    showItem(currentIndex); 
});