export type PlayersStatus = {
  playerHp: number
  rivalHp: number
}

export type DiceCount = {
  threeDice: number[]
  totalDice: number
}

export type Party = {
  id: number
  imgUrl: string | undefined
  power: number
  order: number
  checked: boolean
  disabled: boolean
}

export type PartyStatus = {
  player: Party[]
  rival: Party[]
}

export type MyStaticParty = {
  id: number
  pokeIndex: number
  checked: boolean
}[]
