import { Card } from "../rooms/schema/CardSetsState"

/**
 * Check if the input cards array can be formed a pair
 * 
 * @param cards All the cards that we need to check from player hands and pot
 * @returns Cards that can be possible form a pair
 */
export function checkPairs(cards: Card[])
{
    let ans = []

    for(let i = 0; i < cards.length; i++)
    {
        for(let j = 0; j < cards.length; j++)
        {
            if(i != j)
            {
                if(cards[i].points === cards[j].points)
                {
                    ans.push(cards[i])
                    break
                }
            }
        }
    }

    return ans
}