import { Idea } from '$lib/mongo'
import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'

async function find(id: string) {
    return await Idea.findById(id).exec()
}

export const GET: RequestHandler = async ({ params }) => {
    return json(await find(params.id))
}