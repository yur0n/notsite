const nameForm = document.querySelector('form')
const input = document.querySelector('#inputId')
const message = document.querySelector('#message0')
const message1 = document.querySelector('#message1')

function isCheck() {
    let goodId = document.querySelector('input[name="buy"]:checked').id
    // if (goodId == 'buy1') return 360
    // if (goodId == 'buy2') return 191
    // if (goodId == 'buy3') return 254
    // if (goodId == 'buy4') return 362
    switch (goodId) {
        case 'buy1': return 360
        case 'buy2': return 191
        case 'buy3': return 254
        case 'buy4': return 362
}


nameForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let bonus = isCheck()
    fetch(`/goldSilent?bonus=${bonus}&name=${input.value}`).then((response) => {
    response.json().then((data = {}) => {
        if (data.error) message.textContent = data.error
        else { 
            message.textContent = data.message
            message1.textContent = "Для просмотра баланса бонусов, отправьте GOLDENBOT'у своё имя."
            setTimeout( ()=>{
                message.textContent = ` `
                message1.textContent = ` `
            }, 8000)
        }
    })
})
})