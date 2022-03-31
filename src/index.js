import React, { Component } from 'react';
import ReactDOM from 'react-dom'; // deprecated
// import * as ReactDOMClient from 'react-dom/client';
import './index.css';

// all the little square in the board
 /* class Square extends Component {
    render() {
        return (
            <button onClick={() => this.props.onClick()} className="square" >
                {this.props.value /* taking in the props passed by parent */ /*}
            </button>
        )
    }
} */
// can also be written like this
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

// the whold board that contains all the little squares
class Board extends Component {
    // creating each state for each square
    /* lifted up
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    } */

    /* lifted up
    handleClick = (i) => {
        const squares = [...this.state.squares];
        if (calculateWinner(squares) || squares[i]) return;
        else {
            squares[i] = this.state.xIsNext ? 'X' : 'O';
            return this.setState({
                squares: squares,
                xIsNext: !this.state.xIsNext,
            });
        }
    } */

    // is this a method?
    renderSquare(i) {
        // return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />
    }

    render() {
        // const status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        /* lifted up
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        } */

        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
            stepNumber: 0,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        const moves = history.map((step, move) => {
            const desc = move ?
                `Go to move #${move}: box ${locateSpot(history[move - 1].squares, step.squares)}` : `Go to game start`;
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}


ReactDOM.render(<Game />, document.getElementById('root')) // deprecated

function calculateWinner(squares) {
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
            return squares[a];
        }
    }
    return null;
}

function locateSpot(prevArr, nowArr) {
    let idx = 0;
    for (let i = 0; i < nowArr.length; i++) {
        let now = nowArr[i];
        let prev = prevArr[i];
        if (now && !prev) {
            idx = i;
        }
    }
    console.log(idx)
    return idx;
}
