import { Command } from '@colyseus/command'
import { Client } from 'colyseus'
import { CardSets } from '../rooms/CardSets'

type Payload = {
    client: Client
}

export default class CheckPossibleSetCommand extends Command<CardSets>
{
	execute(data: Payload)
	{
        const {client} = data
        
        const hand = this.getPlayerHand(client.sessionId)
	}

    getPlayerHand(sessionId: string)
    {
        return this.room.state.players.get(sessionId)
    }

    /**
     * Checks whether the cards on hand and common place can form a pair (2 cards of same number)
     * Returns the cards that can form possible pairs.
     * 
     * @param selectable The hand of numbers that the player has.
     */
    checkPairs(selectable: number[])
    {

    }
}