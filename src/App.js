import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      turn: 'X',
      winner: undefined
    }
    this.gameState = {
      gameEnded: false,
      board: Array(9).fill(''),
      totalMoves: 0
    }
  }

  clicked = (e) => {
    if(this.gameState.gameEnded) return;
    console.dir(e.target);
    if(this.gameState.board[e.target.dataset.square] === '') {
      this.gameState.board[e.target.dataset.square] = this.state.turn;
      e.target.innerText = this.state.turn;
      this.setState({
        turn: this.state.turn === 'X' ? 'O' : 'X',
      })
        this.gameState.totalMoves++;
    
      let result = this.checkWinner();
      if(result === 'X') {
        this.gameState.gameEnded = true;
        this.setState({
          winner:'X',
          winnerLine: 'Match won by X'
        });
        console.log('yeap');
      }else if(result === 'O') {
        this.gameState.gameEnded = true;
        this.setState({
          winner: 'O',
          winnerLine: 'Match won by O'
        })
      }else if(result === 'draw') {
        this.gameState.gameEnded = true;
          this.setState({
            winner: 'draw',
            winnerLine: 'Match is drawn'
          })
      }
    }

  }

  checkWinner = () => {
    let moves = [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6]];
    let board = this.gameState.board;
    for(let i = 0; i < moves.length; i++) {
      if(board[moves[i][0]] === board[moves[i][1]] && board[moves[i][1]] === board[moves[i][2]]) {
        return board[moves[i][0]];
      }
    }
    if(this.gameState.totalMoves === 9) {
      return 'draw';
    }
  }

  render() {
    return (
      <div className="game">
      <div className="status">{this.state.winnerLine}</div>
        <div className="head">
          World's best tic tac toe 
        </div>
        <div className="board" onClick={this.clicked}>
          <div className="square" data-square="0"></div>
          <div className="square" data-square="1"></div>
          <div className="square" data-square="2"></div>
          <div className="square" data-square="3"></div>
          <div className="square" data-square="4"></div>
          <div className="square" data-square="5"></div>
          <div className="square" data-square="6"></div>
          <div className="square" data-square="7"></div>
          <div className="square" data-square="8"></div>
        </div>
      </div>
    );
  }
}

export default App;
