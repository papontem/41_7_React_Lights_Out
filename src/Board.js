import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
	const [board, setBoard] = useState(createBoard());

	/** create a board nrows high/ncols wide, each cell randomly lit or unlit */
	function createBoard() {
		let initialBoard = [];
		// TODO: create array-of-arrays of true/false values
		for (let i = 0; i < nrows; i++) {
			// create a row array
			let row = [];

			// create each of row arrays element value
			for (let j = 0; j < ncols; j++) {
				// Generate a random true/false value
				const isLit = Math.random() < chanceLightStartsOn;
				row.push(isLit);
			}
			initialBoard.push(row);
		}

		return initialBoard;
	}

	function hasWon() {
		// TODO: check the board in state to determine whether the player has won.
		// Iterate over each row and column of the board
		for (let i = 0; i < nrows; i++) {
			for (let j = 0; j < ncols; j++) {
				// If any cell is still lit, the player hasn't won
				if (board[i][j]) {
					return false;
				}
			}
		}

		// If no lit cell is found, the player has won
		return true;
	}

	function flipCellsAround(coord) {
		setBoard((oldBoard) => {
			const [y, x] = coord.split("-").map(Number);

			const flipCell = (y, x, boardCopy) => {
				// if this coord is actually on board, flip it

				if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
					boardCopy[y][x] = !boardCopy[y][x];
				}
			};

			// TODO: Make a (deep) copy of the oldBoard
			const boardCopy = oldBoard.map((row) => [...row]);

			// TODO: in the copy, flip this cell and the cells around it
			flipCell(y, x, boardCopy);

			// Flip cells around the clicked cell (up, down, left, right)
			flipCell(y - 1, x, boardCopy); // up
			flipCell(y + 1, x, boardCopy); // down
			flipCell(y, x - 1, boardCopy); // left
			flipCell(y, x + 1, boardCopy); // right

			// TODO: return the copy
			return boardCopy;
		});
	}

	// if the game is won, just show a winning msg & render nothing else

	// TODO
	if (hasWon()) {
		return <div>You Won!</div>;
	}

	// make table board

	// TODO
	return (
		<table className="Board">
			<tbody>
				{board.map((row, rowIndex) => (
					<tr key={rowIndex}>
						{row.map((cell, colIndex) => (
							<Cell
								key={`${rowIndex}-${colIndex}`}
								isLit={cell}
								flipCellsAroundMe={() =>
									flipCellsAround(`${rowIndex}-${colIndex}`)
								}
							/>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default Board;
