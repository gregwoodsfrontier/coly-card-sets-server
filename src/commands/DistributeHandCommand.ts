import { Command, Dispatcher } from '@colyseus/command'
import { Client } from 'colyseus'
import { CardSets } from "../rooms/CardSets"
import {DrawCommand, PayloadDraw} from './DrawCommand'

export default class DistributeHandCommand extends Command<CardSets>
{
	execute()
	{
        // TODO: hand each player a card from the deck
        console.log('distribute hand')
        let commandArr = []

        for(let i = 0; i < this.room.clients.length; i++)
        {
            commandArr.push(new DrawCommand().setPayload({
                client: this.room.clients[i],
                numToDraw: 1
            }))
        }

		return commandArr
	}
}