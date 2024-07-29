// import { PeriodValue } from "@/app/(main)/overview/page"


export type Usage = {
  owner: string
  status: string
  costs: number
  region: string
  stability: number
  lastEdited: string
}

export type StockDatum = {
  date: string
  stock: number
}
