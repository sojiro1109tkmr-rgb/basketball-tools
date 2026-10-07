function ShotChart(props) {
    const selectedPlayer = props.players.find((p) => p.id === props.selectedPlayerId)

    function handleCourtClick(event, success) {
        const rect = event.currentTarget.getBoundingClientRect()
        const x = ((event.clientX - rect.left) / rect.width) * 100
        const y = ((event.clientY - rect.top) / rect.height) * 100
        props.onAddShot(props.selectedPlayerId, x, y, success )
    }

    return  (
        <div className="shot-chart-container">
            <h3>シュートチャート</h3>

            <select
              value={props.selectedPlayerId}
              onChange={(e)=> props.onSelectPlayer(Number(e.target.value))}
            >
              {props.players.map((player) => (
                <option key={player.id} value={player.id}>{player.name}</option>
              ))}
            </select>

            <p>コートをクリック（成功なら緑丸、失敗なら赤丸の位置）</p>

            <div className="court-buttons">
                <ShotCourt
                  shots={selectedPlayer ? selectedPlayer.shots :[]}
                  onCourtClick={handleCourtClick}
                />
            </div>

        </div>
    )
}

import { useState } from 'react'

function ShotCourt({ shots,  onCourtClick }) {
    const[shotMode, setShotMode] = useState('make')

    function handleClick(event)  {
        onCourtClick(event, shotMode === 'make')
    }

    return (
        <div className="court-area">
            <div className="court" onClick={handleClick}>
                <svg className="court-lines" viewBox="0 0 50 47" preserveAspectRatio="none">
                    {/* ハーフコートライン（一番奥の線）　*/}
                    <line x1="0" y1="47" x2="50" y2="47" stroke="white" strokeWidth="0.4" />
                    { /* フリースローレーン　*/}
                    <rect x="17" y="0" width="16" height="19" stroke="white" strokeWidth="0.4" fill="none" />
                    { /* フリースローサークル　*/ }
                    <path d="M 19 19 A 6 6 0 0 0 31 19" stroke="white" strokeWidth="0.4" fill="none" />
                    { /* リング付近の半円 */}
                    <path d="M 21 5.25 A 4 4 0 0 0 29 5.25" stroke="white" strokeWidth="0.4" fill="none" />
                    { /* バックボード */ }
                    <line x1="22" y1="4" x2="28" y2="4" stroke="white" strokeWidth="0.5" />
                    { /* 3ポイントライン */ }
                    <path
                     d="M 3 0 L 3 14 A 23.75 23.75 0 0 0 47 14 L 47 0"
                     stroke="white"
                     strokeWidth="0.4"
                     fill="none"
                    />
                </svg>
                
                
                {shots.map((shot, index) => (
                    <div
                      key={index}
                      className={shot.success ? "shot-marker made" : "shot-marker missed"}
                      style={{ left: `${shot.x}%` , top: `${shot.y}%` }}
                    />
                ))}
            </div>
            <div className="shot-mode-buttons">
                <button
                    className={shotMode === 'make' ? "mode-button mode-make active" : "mode-button mode-make"}
                    onClick={() => setShotMode('make')}
                >
                    成功モード
                </button>
                <button
                    className={shotMode === 'miss' ? "mode-button mode-miss active" : "mode-button mode-miss"}
                    onClick={() => setShotMode('miss')}
                >
                    失敗モード
                </button>
            </div>
        </div>
    )
}

export default ShotChart