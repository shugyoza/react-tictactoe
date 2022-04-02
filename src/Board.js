import React, {Component} from 'react';
import Square from './Square';

// the whole board that contains all the little squares
export default class Board extends Component {

    renderSquare(i) {
        return <Square key={i} id={i} winner={this.props.winner} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />
    }

    renderRow(start, colCount) {
        const row = [];
        start = start * colCount;
        const max = start + colCount;
        for (let i = start; i < max; i++) {
            row.push(this.renderSquare(i));
        }
        return (
            <div key={start} id={`row-${start / colCount}`} className="board-row">
                {row.map(square => square)}
            </div>
        )
    }

    renderBoard(rowCount) {
        const rows = [];
        for (let i = 0; i < rowCount; i++) {
            rows.push(this.renderRow(i, rowCount));
        }
        return <React.Fragment>{rows.map((row) => row)}</React.Fragment>
    }

    render() {
        return (
            <React.Fragment>
                {this.renderBoard(3)}
            </React.Fragment>
        )
    }

}
