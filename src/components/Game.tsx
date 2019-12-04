import React, { useState } from "react";
import logo from "../img/logo.png";

interface SquareProps {
  onClick: () => void;
  value: string;
}

const Square: React.FC<SquareProps> = ({ onClick, value }) => {
  return (
    <button className="square" onClick={() => onClick()}>
      {value}
    </button>
  );
};

interface HeaderProps {
  status: string;
}

const Header: React.FC<HeaderProps> = ({ status }) => {
  return <div className="header">{status}</div>;
};

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <a href="https://it-incubator.by" target="_blank">
        <img className="logo" src={logo} />
      </a>
    </div>
  );
};

interface InitState {
  squares: Array<string>;
}

const Board: React.FC = () => {
  let initState: InitState = {
    squares: Array(9).fill("")
  };

  const [state, setState] = useState<InitState>(initState);
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [step, setStep] = useState<number>(0);

  const handleClick = (i: number) => {
    const squares = { ...state.squares };
    if (squares[i]) {
      return false;
    }
    squares[i] = xIsNext ? "X" : "O";
    setState({ squares });
    setXIsNext(!xIsNext);
    setStep(step + 1);
    if (step === 8) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  const gameCage = (i: number) => {
    return <Square value={state.squares[i]} onClick={() => handleClick(i)} />;
  };

  const winner = checkWinner(state.squares);
  let status: string;
  if (winner) {
    status = winner + " has won!!!";
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } else {
    status = "Next move: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="wrapper">
      <Header status={status} />
      <div className="gameField">
        <div className="gameCage gameCage1">{gameCage(0)}</div>
        <div className="gameCage gameCage2">{gameCage(1)}</div>
        <div className="gameCage gameCage3">{gameCage(2)}</div>
        <div className="gameCage gameCage4">{gameCage(3)}</div>
        <div className="gameCage gameCage5">{gameCage(4)}</div>
        <div className="gameCage gameCage6">{gameCage(5)}</div>
        <div className="gameCage gameCage7">{gameCage(6)}</div>
        <div className="gameCage gameCage8">{gameCage(7)}</div>
        <div className="gameCage gameCage9">{gameCage(8)}</div>
      </div>
      <Footer />
    </div>
  );
};

const Game: React.FC = () => <Board />;

const checkWinner = (squares: Array<string>) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Game;
