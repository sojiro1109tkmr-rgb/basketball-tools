import { useState } from 'react'

function PlayerCard(props) {
    const [ points, setPoints] = useState(props.points)
    const [ fouls, setFouls] = useState(0)
    const [ rebounds, setRebounds] = useState(0)
   
    const attempts = props.attempts
    const made = props.made
    const shootingPercentage = attempts === 0 ? 0 : (made / attempts) * 100

    function decreasePoints(amount) {
        setPoints(Math.max(0, points - amount))
    }

    function decreaseFouls() {
        setFouls(Math.max(0, fouls - 1))
    }

    function decreaseRebounds() {
        setRebounds(Math.max(0, rebounds - 1))
    }

    return (
        <div className={fouls >= 5 ?"player-card player-card-out" : "player-card"}>
            <h2>{props.name}</h2>

            <div className="stat-row points-row">
                <p>得点: {points}</p>
                <div className='button-group'>
                    <button onClick={() => setPoints(points + 1)}>+1点</button>
                    <button onClick={() => setPoints(points + 2)}>+2点</button>
                    <button onClick={() => setPoints(points + 3)}>+3点</button>
                </div>
               <div className='button-group minus-group'>
                    <button onClick={() => decreasePoints(1)}>-1点</button>
                    <button onClick={() => decreasePoints(2)}>-2点</button>
                    <button onClick={() => decreasePoints(3)}>-3点</button>
               </div>
            </div>

            <div className="stat-row shooting-row">
                <p>シュート成功率: {shootingPercentage.toFixed(1)}% ({made}/{attempts})</p>
                <p style={{ fontSize: '12px', color:'#999' }}>(下のシュートチャートで記録)</p>
            </div>

            <div className="stat-row fouls-row">
                <p>ファウル: {fouls}</p>
                <div className='button-group'>
                    <button onClick={() => setFouls( fouls + 1 )}>ファウル+1</button>
                </div>
                <div className='button-group minus-group'>
                    <button onClick={decreaseFouls}>-1</button>
                </div>
                {fouls >= 5 && <p style ={{ color: 'red'}}>退場です</p>}
            </div>

            <div className="stat-row rebounds-row">
                <p>リバウンド: {rebounds}</p>
                <div className='button-group'>
                    <button onClick={() => setRebounds( rebounds + 1)}>リバウンド+1</button>
                </div>
                <div className='button-group minus-group'>
                    <button onClick={decreaseRebounds}>-1</button>
                </div>
            </div>
        </div>
    )
}

export default PlayerCard