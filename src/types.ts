export type CellMatrix = string[][]

export interface Column {
  index: number
  key: string
  header: string
  id: string
  values: string[]
}

export interface Sheet {
  name: string
  source_file: string
  source_type: 'html' | 'csv' | string
  dimensions: { rows: number; cols: number }
  matrix: CellMatrix
  columns: Column[]
}

export interface CombinedJSON {
  version: string
  generated_at: string
  meta: { note: string; files_included: string[] }
  sheets: Sheet[]
}

export interface Node {
  uid: string
  sheet: string
  title: string
  header: string
  values: string[]
}
