import { Link } from 'react-router-dom'

function Home() {
    return (
        <div style={{ textAling: 'center', padding: '40px 20px' }}>
            <h1>バスケツール</h1>
            <p>使いたいツールを選んでください</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px', margin: '0 auto' }}>
                <Link to="/stats" style={{ padding: "16px", backgroundColor: '#2980b9', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold'}}>
                  スタッツ記録アプリ
                </Link>
                <Link to="/tactics" style={{ padding: '16px', backgroundColor: '#27ae60', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
                    作戦盤アプリ
                </Link>
            </div>
        </div>
    )
}

export default Home
