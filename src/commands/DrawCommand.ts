import { Command } from '@colyseus/command'
import { Client } from 'colyseus'
import { CardSets } from "../rooms/CardSets"
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
            playerToDraw.hand.push(e)
        })

		return
	}
}