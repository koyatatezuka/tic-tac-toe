
const data = {
    grid: [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ],
    players: {
        red: {
            mark: "X"
        },
        blue: {
            mark: "O"
        },
    },
};

let playerToken = data.players.red.mark

const box = document.querySelectorAll('.box');

const pChange = (p) => {
    p === data.players.red.mark ? playerToken = data.players.blue.mark : playerToken = data.players.red.mark;
}

box.forEach(el => {
    el.addEventListener('click', (event) => {

        if(!event.target.value) {
            event.target.value = playerToken
            event.target.innerHTML = playerToken          
        }
        
        
        pChange(playerToken)



    })
})