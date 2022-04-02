import React, { Component } from 'react';
import './index.css';
import MoveButton from './MoveButton';
import Board from './Board';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
            stepNumber: 0,
            bolds: Array(9).fill(false),
            asc: true,
            winner: [],
        };

        /* no longer needed when method use arrow syntax
        this.reverseOrder = this.reverseOrder.bind(this);
        this.undo = this.undo.bind(this)
        */
    }

    calculateWinner = (squares) => {
        const lines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i]
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return [squares[a], a, b, c];
            }
        }
        return null;
    }

    rowCol = (i) => {
        switch (i) {
            case 0: return [1, 1];
            case 1: return [1, 2];
            case 2: return [1, 3];
            case 3: return [2, 1];
            case 4: return [2, 2];
            case 5: return [2, 3];
            case 6: return [3, 1];
            case 7: return [3, 2];
            case 8: return [3, 3];
            default: return [0, 0];
        }
    }

    locateSpot = (prevArr, nowArr) => {
        let idx = 0, now, coordinate;
        for (let i = 0; i < nowArr.length; i++) {
            now = nowArr[i];
            let prev = prevArr[i];
            if (now && !prev) {
                idx = i;
                // return [idx, now]
                coordinate = this.rowCol(idx);
                return [coordinate, now];
            }
        }
    }

    handleClick(i) {
        const history = this.state.history.slice();//0, this.state.stepNumber);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState((prevState) => {
            return {
                history: history.concat([{
                    squares: squares,
                }]),
                stepNumber: prevState.stepNumber + 1,
                xIsNext: !this.state.xIsNext,
                bolds: Array(9).fill(false),
            }
        });
    }

    jumpTo(step) {
        let newBolds = Array(9).fill(false);
        newBolds[step] = true;
        return (
            this.setState({
                stepNumber: step,
                xIsNext: (step % 2) === 0,
                bolds: newBolds
            })
        )
    }

    reverseOrder = () => {
        this.setState((prevState) => {
            return {asc: !prevState.asc}
        })
    }

    reset = () => {
        return this.setState({
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
            stepNumber: 0,
            bolds: Array(9).fill(false),
            asc: true,
            winner: [],
        });
    }

    undo = (step) => {
        this.setState((prevState) => {
            let newHistory = JSON.parse(JSON.stringify(prevState.history.slice(0, step + 1)));
            return ({
                history: newHistory,
                winner: []
            })
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner[0];
        } else {
            status = history.length === 9 + 1 ? "It's a draw!" : `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        const moves = history.map((step, move) => {

            let desc;
            if (!move) {
                desc = ``;
                return desc;
            } else {
                const spot = this.locateSpot(history[move - 1].squares, step.squares);
                const player = spot[1];
                const row = spot[0][0];
                const col = spot[0][1];
                desc = `Move #${move}: ${player} at row ${row} column ${col}`;
            }

            return (
                <React.Fragment>
                    <MoveButton key={move} id={move} bold={this.state.bolds[move]} undo={() => this.undo(move)} jumpTo={() => this.jumpTo(move)} desc={desc} />
                </React.Fragment>
            )
        })

        return (
            <React.Fragment>
            <div className="game">
                <div className="game-board">
                    <div id="status">{status}</div>
                    <Board squares={current.squares} winner={this.calculateWinner(current.squares) ? this.calculateWinner(current.squares) : []} onClick={(i) => this.handleClick(i)} />
                    <span id='foot'>Shugyoza, 2022, on React. <a href="https://reactjs.org/tutorial/tutorial.html">Reference</a>. <a href="https://github.com/shugyoza/react-tictactoe">Github</a></span>

                </div>
                <div className="game-info">
                    <button onClick={this.reset}>New Game</button>
                    <button onClick={this.reverseOrder}>Reverse Chronology</button>
                    <ul style={{flexDirection:`${this.state.asc?'column':'column-reverse'}`}}>{moves}</ul>
                </div>
            </div>
            </React.Fragment>
        )
    }
}
