import { create } from 'zustand'
import Fuse from 'fuse.js'
import type { CombinedJSON, Node, Sheet } from '@/types'

interface State {
  data?: CombinedJSON
  nodes: Node[]
  query: string
  filtered: Node[]
  fuse?: Fuse<Node>
  selected?: Node
  loading: boolean
  error?: string
  init: () => Promise<void>
  setQuery: (q: string) => void
  selectByUid: (uid: string) => void
}

export const useDataStore = create<State>((set, get) => ({
  data: undefined,
  nodes: [],
  query: '',
  filtered: [],
  fuse: undefined,
  selected: undefined,
  loading: true,
  error: undefined,

  init: async () => {
    try {
      set({ loading: true })
      const res = await fetch(import.meta.env.BASE_URL + 'sales_script_full.json')
      const data: CombinedJSON = await res.json()

      const nodes: Node[] = data.sheets.flatMap((s: Sheet) =>
        s.columns.map((c) => ({
          uid: `${s.name}__${c.id}`,
          sheet: s.name,
          title: c.header?.trim() || c.id,
          header: c.header || '',
          values: c.values
        }))
      )

      const fuse = new Fuse(nodes, {
        shouldSort: true,
        includeScore: true,
        threshold: 0.35,
        keys: [
          { name: 'title', weight: 0.6 },
          { name: 'values', weight: 0.4 }
        ]
      })

      set({ data, nodes, filtered: nodes, fuse, loading: false, error: undefined })
    } catch (e: any) {
      set({ error: String(e), loading: false })
    }
  },

  setQuery: (q: string) => {
    const { fuse, nodes } = get()
    if (!fuse || !q.trim()) {
      set({ query: q, filtered: nodes })
      return
    }
    const result = fuse.search(q).map(r => r.item)
    set({ query: q, filtered: result })
  },

  selectByUid: (uid: string) => {
    const { nodes } = get()
    const n = nodes.find(n => n.uid === uid)
    set({ selected: n })
  }
}))
