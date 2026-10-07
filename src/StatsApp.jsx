import PlayerCard from './PlayerCard'
import { useState, useEffect } from 'react'
import './StatsApp.css'
import ShotChart from './ShotChart'

function StatsApp () {
  const [players, setPlayers] = useState(() => {
    const saved = localStorage.getItem("players")
    if (saved) {
      return JSON.parse(saved)
    }
    return [
    { id: 1, name: "田中", points: 15, attempts: 0, made: 0, shots: []},
    { id: 2, name: "鈴木", points: 22, attempts: 0, made: 0, shots: []},
   ]
  })
  const [ newName, setNewName] = useState("")
  const [selectedPlayerId, setSelectedPlayerId] = useState(1)

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players))
  }, [players])

  function handleAddPlayer() {
    if (newName !=="") {
      const newPlayer = { id: Date.now(), name: newName, points:0 }
      setPlayers([...players, newPlayer])
      setNewName("")
    }
  }
  
  function handleDeletePlayer(idTodelete) {
    setPlayers(players.filter((player) => player.id !==idTodelete))
  }

  function handleAddShot(playerId, x, y, success) {
    setPlayers(players.map((player) => {
      if(player.id === playerId) {
        return {
          ...player,
          attempts: player.attempts + 1,
          made: success ? player.made + 1 : player.made,
          shots: [...player.shots, { x, y, success}],
        }
      }
      return player
     }))
  }


  const selectedPlayer = players.find((p) => p.id === selectedPlayerId)  
  
  return (
    <div>
      <h1>スタッツ記録アプリ</h1>

      <div className="add-player">
        <input
         type="text"
        value={newName}
         onChange={(e) => setNewName(e.target.value)}
         placeholder="選手名を入力"
        />
        <button onClick={handleAddPlayer}>選手名を追加</button>
      </div>

      <ShotChart
        players={players}
        selectedPlayerId={selectedPlayerId}
        onSelectPlayer={setSelectedPlayerId}
        onAddShot={handleAddShot}
      />

      {players.map((player) => (
        <div key={player.id}>
          <PlayerCard  
            name={player.name} 
            points={player.points} 
            attempts={player.attempts}
            made={player.made}
          />
          <div style={{ textAlign: 'center'}}>
            <button onClick={() => handleDeletePlayer(player.id)}>この選手を削除する</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsApp