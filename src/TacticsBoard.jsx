import { useState, useEffect } from "react"
import './TacticsBoard.css'

function TacticsBoard() {
  const [players, setPlayers] = useState([
    { id: 1, name: "H", fullName: "選手1", x: 20, y: 25, team: "home"  },
    { id: 2, name: "H", fullName: "選手2", x: 30, y: 15, team: "home"  },
    { id: 3, name: "W", fullNme: "選手3",  x: 30, y: 35, team: "home"  },
    { id: 4, name: "W", fullName: "選手4",  x: 40, y: 15, team: "home"  },
    { id: 5, name: "B", fullName: "選手5",  x: 40, y: 35, team: "home"  },
    { id: 6, name: "H", fullName: "選手6",  x: 54, y: 25, team: "away"  },
    { id: 7, name: "H", fullName: "選手7",  x: 64, y: 15, team: "away"  },
    { id: 8, name: "W", fullName: "選手8",  x: 64, y: 35, team: "away"  },
    { id: 9, name: "W", fullName: "選手9",  x: 74, y: 15, team: "away"  },
    { id: 10, name: "B", fullName: "選手10",  x: 74, y: 35, team: "away"  },

  ])
  const [draggingId, setDraggingId] = useState(null)
  const [editingId, setEditingId] = useState(null)

  const[formations, setFormations] = useState(() => {
    const saved = localStorage.getItem("formations")
    if (saved) return JSON.parse(saved)
    return []
  })
  const [formationName, setFormationName] = useState("")

  useEffect(() => {
    localStorage.setItem("formations", JSON.stringify(formations))
  },[formations])


  function handleMouseDown(id) {
  setDraggingId(id)
  }
  

  function handleMouseMove(event) {
    if (draggingId === null ) return

    const svg = event.currentTarget
    const rect = svg.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width ) * 94
    const y = ((event.clientY - rect.top) / rect.height ) * 50

    setPlayers(players.map((player) => {
      if (player.id === draggingId) {
        return { ...player, x: x, y: y }
      }
      return player
    }))
  }

  function handleSaveFormation() {
    if(formationName !== "") {
      const newFormation = {
        id: Date.now(),
        name: formationName,
        players: players,
      }
      setFormations([...formations, newFormation])
      setFormationName("")
    }
  }

  function handleLoadFormation(formation) {
    setPlayers(formation.players)
  }

  function handleDeleteFormation(idToDelete) {
    setFormations(formations.filter((f) => f.id !== idToDelete))
  }

  function handleMouseUp() {
    setDraggingId(null)
  }

  function handleNameChange(id, newName) {
    setPlayers(players.map((player) => {
      if(player.id === id) {
        return { ...player, fullName: newName }
      }
      return player
    }))
  }

  function handleStartEditing(id) {
    setEditingId(id)
  }

  function handleFinishEditing() {
    setEditingId(null)
  }

  return (
    <div className="board-container">
      <h1>作戦盤アプリ</h1>

      <div className="formation-controls">
        <input
          type="text"
          value={formationName}
          onChange={(e) => setFormationName(e.target.value)}
          placeholder="フォーメーション名を入力"
        />
        <button onClick={handleSaveFormation}>今の配置を保存</button>  
      </div>

      <div className="formation-list">
        {formations.map((formation) => (
          <div key={formation.id} className="formation-item">
            <button onClick={() => handleLoadFormation(formation)}>{formation.name}</button>
            <button onClick={() => handleDeleteFormation(formation.id)} className="formation-delete">x</button>
          </div>
        ))}
      </div>

      <svg className="tactics-court" 
        viewBox="0 0 94 50" 
        preserveAspectRatio="xMidYMid meet"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >

        {/* コート全体の外枠　*/}
        <rect x="0" y="0" width="94" height="50" stroke="white" strokeWidth="0.3" fill="#c87f3a" />

        {/* センターライン */}
        <line x1="47" y1="0" x2="47" y2="50" stroke="white" strokeWidth="0.3" />

        {/* センターサークル */}
        <circle cx="47" cy="25" r="6" stroke="white" strokeWidth="0.3" fill="none" />

        {/* 左側のペイントエリア */}
        <rect x="0" y="17" width="19" height="16" stroke="white" strokeWidth="0.3" fill="none" />

        {/* 左側のフリースローサークル */}
        <path d="M 19 19 A 6 6 0 0 1 19 31" stroke="white" strokeWidth="0.3" fill="none" />

        {/* 左側の3ポイントライン */}
        <path
         d="M 0 3 L 14 3 A 23.75 23.75 0 0 1 14 47 L 0 47"
         stroke="white"
         strokeWidth="0.3"
         fill="none"
        />

        {/* 右側のペイントエリア */}
        <rect x="75" y="17" width="19" height="16" stroke="white" strokeWidth="0.3" fill="none" />

        {/* 右側のフリースローサークル */}
        <path d="M 75 19 A 6 6 0 0 0 75 31" stroke="white" strokeWidth="0.3" fill="none" />

        {/* 右側の3ポイントライン */}
        <path 
         d="M 94 3 L 80 3 A 23.75 23.75 0 0 0 80 47 L 94 47"
         stroke="white"
         strokeWidth="0.3"
         fill="none"
        />

        {players.map((player) => (
          <g key={player.id} style={{ cursor: 'grab' }}>
            <circle 
              cx={player.x} 
              cy={player.y}  
              r="2.2" 
              fill={player.team === "home" ? "#2980b9" : "#c0392b"} 
              stroke="white" 
              strokeWidth="0.3" 
              onMouseDown={() => handleMouseDown(player.id)}
              onDoubleClick={() => handleStartEditing(player.id)}
            />
            <text x={player.x} 
            y={player.y + 0.7} 
            fontSize="2" 
            fill="white" 
            textAnchor="middle"
            onMouseDown={() => handleMouseDown(player.id)}
            onDoubleClick={() => handleStartEditing(player.id)}
            style={{ pointerEvents: 'none' }}
            >
              {player.name[0]}
            </text>

            {editingId === player.id ? (
              <foreignObject x={player.x - 8} y={player.y + 2.5} width="16" height="4">
                <input
                 type="text"
                 defaultValue={player.fullName}
                 autoFocus
                 onBlur={(e) => { handleNameChange(player.id, e.target.value); handleFinishEditing() }}
                 onKeyDown={(e) => { if (e.key === 'Enter') e.target.blur() }}
                 style={{ width: '100%', fontSize: '10px', textAlign: 'center', border: '1px solid #2c3e50', borderRadius: '3px'}}
                />
              </foreignObject>
              ) : (
              <text x={player.x} y={player.y + 4.5} fontSize="1.8" fill="#2c3e50" textAnchor="middle">
                {player.fullName}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  )
}


export default TacticsBoard