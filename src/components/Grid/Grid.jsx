import { useState } from "react";
import Card from "../Card/Card";
import './Grid.css';

function isWinner(board, symbol) {
    // Check rows
    if (board[0] === symbol && board[1] === symbol && board[2] === symbol) return symbol;
    if (board[3] === symbol && board[4] === symbol && board[5] === symbol) return symbol;
    if (board[6] === symbol && board[7] === symbol && board[8] === symbol) return symbol;

    // Check columns
    if (board[0] === symbol && board[3] === symbol && board[6] === symbol) return symbol;
    if (board[1] === symbol && board[4] === symbol && board[7] === symbol) return symbol;
    if (board[2] === symbol && board[5] === symbol && board[8] === symbol) return symbol;

    // Check diagonals
    if (board[0] === symbol && board[4] === symbol && board[8] === symbol) return symbol;
    if (board[2] === symbol && board[4] === symbol && board[6] === symbol) return symbol;

    // No winner
    return null;
}

function Grid({ numberOfCards }) {
    const [turn, setTurn] = useState(true);
    const [board, setBoard] = useState(Array(numberOfCards).fill("")); // Initialize array with empty strings
    const [winner, setWinner] = useState(null);

    function play(index) {
        if (board[index] || winner) return; // Prevent playing on an occupied spot or after a winner is declared

        const newBoard = [...board];
        newBoard[index] = turn ? "O" : "X";

        const win = isWinner(newBoard, turn ? "O" : "X");
        if (win) {
            setWinner(win);
        }

        setBoard(newBoard);
        setTurn(!turn); // Toggle turn
    }

    function reset(){
        setBoard(Array(numberOfCards).fill(""));
        setWinner(null);
        setTurn(true);
    }

    return (
        <>
            {winner ? (
                <>
                <h1 className="turn-highlight">Winner is {winner}</h1>
                <button onClick={reset}>Reset</button>
                </>
            ) : (
                <h1 className="turn-highlight">Current Turn: {turn ? "O" : "X"}</h1>
            )}
           
            <div className="grid">
                {board.map((value, index) => (
                    <Card
                        key={index}
                        onPlay={() => play(index)}
                        player={value}
                        index={index}
                    />
                ))}
            </div>
        </>
    );
}

export default Grid;
