const data = {
	grid: [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']],
	players: {
		X: {
			mark: 'X',
			name: '',
			color: 'Red',
			css: 'rgb(241, 97, 97)',
			win:
				'url(https://media0.giphy.com/media/26BkNrGhy4DKnbD9u/200w.webp?cid=3640f6095bada6ad6a79357132b66856)'
		},
		O: {
			mark: 'O',
			name: '',
			color: 'Blue',
			css: 'rgb(52, 218, 240)',
			win:
				'url(https://media3.giphy.com/media/10N782ExqDjCLK/200w.webp?cid=3640f6095bada5d4692e45392e5ae8f5)'
		}
	},
	playerToken: Math.round(Math.random()) === 0 ? 'X' : 'O'
};

const box = document.querySelectorAll('.box');

const gameStart = token => {
	let player = data.players;
	document.getElementById('turn').textContent = `Player ${
		player[token].color
	} Turn`;
	document.querySelector('body').style.background = player[token].css;
	box.forEach(el => (el.style.borderColor = player[token].css));

	document.querySelector('.start-modal').style.visibility = 'hidden';

	document.getElementById('p1').innerText = player.O.name.toUpperCase();

	document.getElementById('p2').innerText = player.X.name.toUpperCase();

	box.forEach(el => (el.innerHTML = ' '));
};

// Player Change

const turnChange = token => {
	let player = data.players;
	if (token === 'X') {
		data.playerToken = player.O.mark;
		document.querySelector('body').style.background = player.O.css;
		box.forEach(el => (el.style.borderColor = player.O.css));
		document.getElementById('turn').textContent = `Player ${
			player.O.color
		} Turn`;
	} else if (token === 'O') {
		data.playerToken = player.X.mark;
		document.querySelector('body').style.background = player.X.css;
		box.forEach(el => (el.style.borderColor = player.X.css));
		document.getElementById('turn').textContent = `Player ${
			player.X.color
		} Turn`;
	}
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
    
    box.forEach(el => el.value = '')
};

// Gameover

const gameOver = board => {
	// check horizontal and veritcal

	for (let i = 0; i < board.length; i++) {
		if (
			board[i][0] !== ' ' &&
			board[i][0] === board[i][1] &&
			board[i][0] === board[i][2]
		) {
			return board[i][0];
		} else if (
			board[0][i] !== ' ' &&
			board[0][i] === board[1][i] &&
			board[0][i] === board[2][i]
		) {
			return board[0][i];
		}
	}

	// check diagnal

	if (
		board[0][0] !== ' ' &&
		board[0][0] === board[1][1] &&
		board[0][0] === board[2][2]
	) {
		return board[0][0];
	} else if (
		board[0][2] !== ' ' &&
		board[0][2] === board[1][1] &&
		board[0][2] === board[2][0]
	) {
		return board[0][2];
	}

	return null;
};

// tie check

const tie = board => {
	const check = /[XO]/;

	return board.every(el => el.every(mark => check.test(mark)));
};

// Events

//grid clicks

box.forEach(el => {
	el.addEventListener('click', event => {
		const row = event.target.dataset.row;
		const column = event.target.dataset.column;

		if (!gameOver(data.grid)) {
			if (!event.target.value) {
				event.target.value = data.playerToken;
				addMark(row, column, data.playerToken);
				event.target.innerHTML = data.grid[row][column];
				turnChange(data.playerToken);
			}
		}

		if (gameOver(data.grid)) {
			let outcome = gameOver(data.grid);
			document.getElementById('turn').textContent = `Player ${
				data.players[outcome].color
			} Wins!`;
			document.querySelector('body').style.background =
				data.players[outcome].win;
			box.forEach(el => (el.style.borderColor = data.players[outcome].css));
		} else if (!gameOver(data.grid) && tie(data.grid)) {
			document.getElementById('turn').textContent = 'TIE';
			document.querySelector('body').style.background = 'white';
			box.forEach(el => (el.style.borderColor = 'white'));
			document.getElementById('turn').textContent = "IT'S A TIE";
		}
	});
});
// name change
document.getElementById('blue').addEventListener('change', event => {
	data.players.O.name = event.target.value;
});

document.getElementById('red').addEventListener('change', event => {
	data.players.X.name = event.target.value;
});
// game start
document.getElementById('start-button').addEventListener('click', () => {
	if (
		document.getElementById('blue').value.length > 0 &&
		document.getElementById('red').value.length > 0
	) {
		gameStart(data.playerToken);
	}
});
// game reset
document.getElementById('reset').addEventListener('click', () => {
    resetGrid()
    document.querySelector('.start-modal').style.visibility = 'visible'
});

