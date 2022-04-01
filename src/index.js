import React, { Component } from 'react';
import ReactDOM from 'react-dom'; // deprecated
import './index.css';

// all the little square in the board
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

    renderSquare(i) {
        return <Square className={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />
    }

    renderRow(start, colCount) {
        const row = [];
        start = start * colCount;
        const max = start + colCount;
        for (let i = start; i < max; i++) {
            row.push(this.renderSquare(i));
        }
        return (
            <div className="board-row">
                {row.map(square => square)}
            </div>
        )
    }

    renderBoard(rowCount) {
        const rows = [];
        for (let i = 0; i < rowCount; i++) {
            rows.push(this.renderRow(i, rowCount));
        }
        return <div>{rows.map((row) => row)}</div>
    }

    render() {
        return (
            <div>
                {this.renderBoard(3)}
            </div>
        )
    }

}

function MoveButton(props) {
    if (props.bold) {
        return (
            <li key={props.id}>
                <button style={{fontWeight:'bolder'}} id={props.id} onClick={props.onClick}>{props.desc}</button>
            </li>
        )
    }
    return (
            <li key={props.id}>
                <button id={props.id} onClick={props.onClick}>{props.desc}</button>
            </li>
    )
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
            bolds: Array(9).fill(false),
            asc: true
        };
        this.reverseOrder = this.reverseOrder.bind(this);
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

    reverseOrder() {
        this.setState((prevState) => {
            return {asc: !prevState.asc}
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner[0];
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        const moves = history.map((step, move) => {

            let desc;
            if (!move) {
                desc = `Go to game start`;
                return desc;
            } else {
                const spot = locateSpot(history[move - 1].squares, step.squares);
                const player = spot[1];
                const row = spot[0][0];
                const col = spot[0][1];
                desc = `Go to move #${move}: ${player} at row ${row} column ${col}`;
            }

            return (
                <MoveButton id={move} bold={this.state.bolds[move]} onClick={() => this.jumpTo(move)} desc={desc} />
            )
        })

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ul style={{flexDirection:`${this.state.asc?'column':'column-reverse'}`}}>{moves}</ul>
                    <button onClick={this.reverseOrder}>Reverse the Order</button>
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
            return [squares[a], a, b, c];
        }
    }
    return null;
}

function locateSpot(prevArr, nowArr) {
    let idx = 0, now, coordinate;
    for (let i = 0; i < nowArr.length; i++) {
        now = nowArr[i];
        let prev = prevArr[i];
        if (now && !prev) {
            idx = i;
            // return [idx, now]
            coordinate = rowCol(idx);
            return [coordinate, now];
        }
    }
}

function rowCol(i) {
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
