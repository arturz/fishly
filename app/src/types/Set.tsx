export interface Word {
  word_id: string
  original: string
  translated: string
}

export default interface Set {
  words: Word[]
  saved: boolean
  reported: boolean
  name: string
  login: string
  user_id: number
  set_id: number
} 