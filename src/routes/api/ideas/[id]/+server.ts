import { Idea } from '$lib/mongo'
import type { RequestHandler } from './$types'
import { error, json } from '@sveltejs/kit'

async function find(id: string) {
    return await Idea.findById(id).exec()
}

export const GET: RequestHandler = async ({ params }) => {
    return json(await find(params.id))
}

export const DELETE: RequestHandler = async ({ params }) => {
    if(!find(params.id)) return error(404, "id not found")
    const idea = await Idea.findByIdAndDelete(params.id).exec()
    return json(idea)
}