const data = {
	grid: [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']],
	players: {
		red: {
			mark: 'X'
		},
		blue: {
			mark: 'O'
		}
	}
};

let playerToken = data.players.red.mark;
const box = document.querySelectorAll('.box');

// Player Change

const pChange = p => {
	p === data.players.red.mark
		? (playerToken = data.players.blue.mark)
		: (playerToken = data.players.red.mark);
};

// Add mark to grid

const addMark = (row, col, mark) => {
	if (/\s/.test(data.grid[row][col])) {
		data.grid[row][col] = mark;
    }
};

// Reset grid

const resetGrid = () => {
    data.grid = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
}

// click events

box.forEach(el => {

	el.addEventListener('click', event => {
        const row = event.target.dataset.row;
        const column = event.target.dataset.column;    

		if (!event.target.value) {
			event.target.value = playerToken;
            addMark(row, column, playerToken);
            event.target.innerHTML = data.grid[row][column];
			pChange(playerToken);
		}
	});
});

