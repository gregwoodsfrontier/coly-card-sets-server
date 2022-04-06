import { Schema, type, filter } from '@colyseus/schema'
import { Client } from 'colyseus'
import { ICard } from '../../types/ICardSetsState'

export default class Card extends Schema implements ICard
{

    @type('string')
	owner: string

    @type('boolean')
	isDiscarded = false

    @type('number')
    pattern: number

    @type('number')
	points: number
    

    constructor(_pattern: number = 0, _pts: number = 1)
    {
        super()

        this.pattern = _pattern
        this.points = _pts
        this.owner = ""
    }

    private filterCardPattern(client: Client, value: Card["pattern"], root: Schema)
    {
        // return this.isDiscarded || this.owner === client.sessionId
        return false
    }

    private filterCardPoints(client: Client, value: Card["points"], root: Schema)
    {
        return this.isDiscarded || this.owner === client.sessionId
    }
}