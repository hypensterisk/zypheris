/** @format */

import useDatabaseStore from '@hooks/useDatabaseStore'

export default function useCards() {
  const data = useDatabaseStore((state) => state.data)
  const setData = useDatabaseStore((state) => state.setData)
  const cards = data.cards
  function setCards(cards) {
    setData({ ...data, cards })
  }
  return [cards, setCards]
}
