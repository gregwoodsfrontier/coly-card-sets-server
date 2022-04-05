import { Command } from '@colyseus/command'
import { Client } from 'colyseus'
import { CardSets } from "../rooms/CardSets"
import { Card } from '../rooms/schema/CardSetsState'
import { GameState } from '../types/ICardSetsState'

type PayloadDraw = {
	client: Client,
    numToDraw: number
}

export default class DrawCommand extends Command<CardSets>
{
	execute(data: PayloadDraw)
	{
        console.log('draw command');
        
        const {client, numToDraw} = data
        
        if (this.room.state.gameState !== GameState.Playing)
		{
			return
		}

        const playerToDraw = this.room.state.players.get(client.sessionId)

        const cardsToDraw = this.room.state.deck.splice(0, numToDraw)

        cardsToDraw.forEach(e => {
            this.assignOwner(e, client.sessionId)
            e['$changes'].touch('pattern')
            e['$changes'].touch('points')
            e['$changes'].touch('owner')
            e['$changes'].touch('isDiscarded')
            
            playerToDraw.hand.push(e)
        })

		return
	}

    assignOwner(card: Card, sessionId: string)
    {
        card.owner = sessionId
    }
}