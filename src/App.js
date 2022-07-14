import { useState, useEffect, useRef } from 'react';
import classes from './App.module.css';

function App() {

  const canvasRef = useRef()
  const gridRef = useRef()

  const [turn, setTurn] = useState(true);
  const [selectSymbol, turnSelectSymbol] = useState(true)

  const [firstPlayer, setFirstPlayer] = useState({ name: "", score: 0 })
  const [secondPlayer, setSecondPlayer] = useState({ name: "", score: 0 })

  useEffect(() => {

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    context.fillStyle = 'gray'
    //context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    canvasRef.current.getContext('2d').clearRect(0, 0, 350, 350);

    canvasRef.current.getContext('2d').strokeStyle = '#ff0000';

  }, [])

  const draw = (x1, y1, x2, y2) => {
    if (turn) {
      canvasRef.current.getContext('2d').strokeStyle = '#ff0000';
    }
    else {
      canvasRef.current.getContext('2d').strokeStyle = '#0000ff';
    }
    canvasRef.current.getContext('2d').lineWidth = 5;
    canvasRef.current.getContext('2d').beginPath();
    canvasRef.current.getContext('2d').moveTo(x1, y1);
    canvasRef.current.getContext('2d').lineTo(x2, y2);
    canvasRef.current.getContext('2d').stroke();

    setTurn(turn)
  }



  let classS = selectSymbol && classes.symbolActive;
  let classO = !selectSymbol && classes.symbolActive;


  const selectS = () => {
    turnSelectSymbol(true)
  }

  const selectO = () => {
    turnSelectSymbol(false)

  }

  const [cells, setCells] = useState([
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""]
  ]
  )


  useEffect(() => {
    (checkOver() && alert(firstPlayer.score > secondPlayer.score
      ? "first" : "second"))

  }, [cells]);

  const checkOver = () => {
    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells.length; j++) {
        if (cells[i][j] === "") {
          return false
        }
      }
    }
    return true
  }

  const score = (i, j) => {
    turn ? (setFirstPlayer(
      prevState => ({ ...prevState, score: prevState.score + 1 }))) : (setSecondPlayer(
        prevState => ({ ...prevState, score: prevState.score + 1 })));
  }

  const getIndex = (i, j) => {
    if (cells[i][j] === "") {
      let copy = [...cells]
      copy[i][j] = (selectSymbol ? "S" : "O");
      setCells(copy)
      setTurn(!turn)
      checkPosition(i, j)
    }
  }

  const checkPosition = (i, j) => {
    if (selectSymbol) {
      if (i > 1 && cells[i - 1][j - 1] === "O" && cells[i - 2][j - 2] === "S") {
        score()
        draw(j * 50 + 25, i * 50 + 25, (j - 2) * 50 + 25, (i - 2) * 50 + 25)
      }

      if (i > 1 && cells[i - 1][j] === "O" && cells[i - 2][j] === "S") {
        score()
        draw(j * 50 + 25, i * 50 + 25, j * 50 + 25, (i - 2) * 50 + 25)
      }

      if (i > 1 && cells[i - 1][j + 1] === "O" && cells[i - 2][j + 2] === "S") {
        score()
        draw(j * 50 + 25, i * 50 + 25, (j + 2) * 50 + 25, (i - 2) * 50 + 25)
      }

      if (cells[i][j + 1] === "O" && cells[i][j + 2] === "S") {
        score()
        draw(j * 50 + 25, i * 50 + 25, (j + 2) * 50 + 25, i * 50 + 25)
      }

      if (i < cells.length - 2 && j + 1 < cells.length && cells[i + 1][j + 1] === "O" && cells[i + 2][j + 2] === "S") {
        score()
        draw(j * 50 + 25, i * 50 + 25, (j + 2) * 50 + 25, (i + 2) * 50 + 25)
      }

      if (i < cells.length - 2 && cells[i + 1][j] === "O" && cells[i + 2][j] === "S") {
        score()
        draw(j * 50 + 25, i * 50 + 25, j * 50 + 25, (i + 2) * 50 + 25)
      }

      if (i < cells.length - 2 && cells[i + 1][j - 1] === "O" && cells[i + 2][j - 2] === "S") {
        score()
        draw(j * 50 + 25, i * 50 + 25, (j - 2) * 50 + 25, (i + 2) * 50 + 25)
      }

      if (cells[i][j - 1] === "O" && cells[i][j - 2] === "S") {
        score()
        draw(j * 50 + 25, i * 50 + 25, (j - 2) * 50 + 25, i * 50 + 25)
      }
    }

    else {
      if (i < cells.length - 1 && i > 0 && cells[i - 1][j - 1] === "S" && cells[i + 1][j + 1] === "S") {
        score()
        draw((j - 1) * 50 + 25, (i - 1) * 50 + 25, (j + 1) * 50 + 25, (i + 1) * 50 + 25)
      }

      if (i < cells.length - 1 && i > 0 && cells[i - 1][j] === "S" && cells[i + 1][j] === "S") {
        score()
        draw(j * 50 + 25, (i - 1) * 50 + 25, j * 50 + 25, (i + 1) * 50 + 25)
      }

      if (i < cells.length - 1 && i > 0 && cells[i - 1][j + 1] === "S" && cells[i + 1][j - 1] === "S") {
        score()
        draw((j + 1) * 50 + 25, (i - 1) * 50 + 25, (j - 1) * 50 + 25, (i + 1) * 50 + 25)
      }

      if (cells[i][j - 1] === "S" && cells[i][j + 1] === "S") {
        score()
        draw((j - 1) * 50 + 25, i * 50 + 25, (j + 1) * 50 + 25, i * 50 + 25)
      }
    }
  }

  const reset = (e) => {
    e.preventDefault()
    setCells([
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""]
    ])

    setFirstPlayer(
      prevState => ({ ...prevState, score: 0 }))

    setSecondPlayer(
      prevState => ({ ...prevState, score: 0 }))

    canvasRef.current.getContext('2d').clearRect(0, 0, 350, 350);

    setTurn(true)
  }

  useEffect(() => {
    window.addEventListener('keypress', e => {
      if (e.key === "s") {
        turnSelectSymbol(true)
      }
      else if (e.key === "o") {
        turnSelectSymbol(false)
      }
    });
  }, [])

  return (

    <div className={classes.App} >
      <div className={classes.header}>
        {turn ? (
          firstPlayer.name !== "" ? <div>{firstPlayer.name}'s Turn </div> : <div>First Player's Turn</div>
        )
          :
          (
            secondPlayer.name !== "" ? <div>{secondPlayer.name}'s Turn </div> : <div>Second Player's Turn</div>
          )}
      </div>

      <div className={classes.container}>
        <div className={classes.player}>
          <form>
            <label >
              First Player's Name
              <input type="text" value={firstPlayer.name} onChange={e => setFirstPlayer(
                prevState => ({ ...prevState, name: e.target.value }))}
                className={classes.inputStyle} />
            </label>
            <label>
              Second Player's Name
              <input type="text" value={secondPlayer.name} onChange={e => {
                setSecondPlayer(prevState => ({ ...prevState, name: e.target.value }))
              }} className={classes.inputStyle} />
            </label>
            <button className={classes.buttons} onClick={reset}>RESET</button>
          </form>
        </div>

        <div className={classes.board}>

          <table className={classes.table}>

            <canvas ref={canvasRef} className={classes.canvasStyle} height="350" width="350">
            </canvas>

            <tbody>
              {cells.map((cellRow, indexI) => {

                return <tr key={indexI}>{cellRow.map((cell, indexJ) => {
                  return <td ref={gridRef}
                    key={indexJ} onClick={() => { getIndex(indexI, indexJ) }} className={classes.cell}>
                    {cells[indexI][indexJ]}
                  </td>
                })}</tr>
              })}
              <tr>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={classes.scoreBoard}>
          <div>{firstPlayer.name !== "" ? <div>{firstPlayer.name} </div> : <div>First Player</div>} Score: {firstPlayer.score}</div>
          <br />
          <div>{secondPlayer.name !== "" ? <div>{secondPlayer.name} </div> : <div>Second Player</div>} Score: {secondPlayer.score}</div>
        </div>

      </div>

      <div className={classes.outer}>
        <div onClick={selectS} className={` ${classes.selectSymbol} ${classS}`}>S</div>
        <div onClick={selectO} className={` ${classes.selectSymbol} ${classO}`}>O</div>
        <p>
          <br />
          Select symbol by clicking<br />
          or<br />
          Press 'S' or 'O'
        </p>
      </div>

    </div >
  );
}

export default App;
