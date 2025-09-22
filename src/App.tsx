import { useEffect } from 'react'
import { useDataStore } from './store/useDataStore'

export default function App() {
  const { init, loading, error, filtered, selectByUid, selected } = useDataStore()

  useEffect(() => { init() }, [init])

  if (loading) return <div style={{padding:16, color:'#8b9bb4'}}>Загрузка…</div>
  if (error)   return <div style={{padding:16, color:'#f87171'}}>Ошибка: {error}</div>

  return (
    <div style={{display:'grid', gridTemplateColumns:'280px 1fr', height:'100vh', color:'white', background:'#0b0f14'}}>
      <aside style={{overflow:'auto', borderRight:'1px solid #243041', padding:12}}>
        <div style={{fontSize:12, opacity:.7, margin:'4px 0 8px'}}>Разделы</div>
        <div style={{display:'grid', gap:6}}>
          {filtered.map(n => (
            <button
              key={n.uid}
              onClick={()=>selectByUid(n.uid)}
              style={{
                textAlign:'left', padding:'8px 10px', borderRadius:8,
                background: selected?.uid===n.uid ? '#1a2230' : '#0f1520',
                color:'white', border:'1px solid #243041'
              }}
              title={n.title}
            >
              <div style={{fontSize:14, lineHeight:1.2}}>{n.title}</div>
              <div style={{fontSize:11, opacity:.6}}>{n.sheet}</div>
            </button>
          ))}
        </div>
      </aside>

      <main style={{overflow:'auto', padding:16}}>
        {selected ? (
          <>
            <div style={{opacity:.7, fontSize:12}}>{selected.sheet}</div>
            <h1 style={{margin:'6px 0 12px'}}>{selected.title}</h1>
            <div style={{display:'grid', gap:8}}>
              {selected.values.map((line, i) => (
                <div key={i} style={{display:'flex', gap:8, alignItems:'flex-start', background:'#0f1520', border:'1px solid #243041', borderRadius:10, padding:10}}>
                  <div style={{opacity:.5, width:24, textAlign:'right'}}>{i+1}</div>
                  <div style={{whiteSpace:'pre-wrap', lineHeight:1.5}}>{line}</div>
                  <button
                    onClick={()=>navigator.clipboard.writeText(line)}
                    style={{marginLeft:'auto', background:'#1a2230', border:'1px solid #3b4c68', borderRadius:8, padding:'6px 10px', color:'white'}}
                    title="Копировать"
                  >
                    Копировать
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div style={{opacity:.7}}>Выберите раздел слева</div>
        )}
      </main>
    </div>
  )
}
