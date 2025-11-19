/** @format */

import useAppStore from '@hooks/useAppStore'

export default function useCards() {
  const data = useAppStore((state) => state.data)
  const setData = useAppStore((state) => state.setData)
  const cards = data.cards
  function setCards(cards) {
    setData({ ...data, cards })
  }
  return [cards, setCards]
}
