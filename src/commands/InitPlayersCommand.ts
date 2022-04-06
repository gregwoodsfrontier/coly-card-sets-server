import { Command } from '@colyseus/command'
import { Client } from 'colyseus'
import { CardSets } from "../rooms/CardSets"
import Player from '../rooms/schema/Player'
import DistributeHandCommand from './DistributeHandCommand'

type Payload = {
	client: Client
	index: number
}

export default class InitPlayersCommand extends Command<CardSets>
{
	execute()
	{
        // TODO: create a new player for each client
    
        this.room.clients.forEach((c: Client) => {
            this.room.state.players.set(c.sessionId, new Player(c.sessionId))
        })

		return [
            new DistributeHandCommand()
        ]
	}
}