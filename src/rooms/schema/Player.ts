import { Schema, ArraySchema, type, filterChildren } from '@colyseus/schema'
import { Client } from 'colyseus'
import { IPlayer } from '../../types/ICardSetsState'
import Card from './Card'

export default class Player extends Schema implements IPlayer
{
    
    @type([Card])
	sets: ArraySchema<Card>

    @type('number')
	points = 0

    @type('string')
    id: string

    @filterChildren(function(this: Player, client: Client, key: number, value: Player["hand"], root: Schema){
        return this.id === client.sessionId
    })

    @type([Card])
    hand: ArraySchema<Card>

    constructor(_id: string)
    {
        super()

        this.hand = new ArraySchema<Card>()
        this.sets = new ArraySchema<Card>()
        this.id = _id

    }
}