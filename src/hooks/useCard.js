/** @format */

import useCards from '@hooks/useCards'

export default function useCard(id) {
  const [cards, setCards] = useCards()
  const card = cards.find((card) => card.id === id)
  function setCard(card) {
    setCards(cards.map((value) => (value.id === id ? card : value)))
  }
  return [card, setCard]
}
