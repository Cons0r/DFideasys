import { Idea } from '$lib/mongo'
import type { RequestHandler } from './$types'
import { json, error } from '@sveltejs/kit'

export const GET: RequestHandler = async () => {
    return json(await Idea.find({}))
}

export const POST: RequestHandler = async ({ request }) => {
    const body = await request.json()
    console.log(body)
    if(!body.uuid) throw error(400, 'uuid is required')
    const profile = await (await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${body.uuid}`)).json()
    if(!profile) throw error(400, "Invalid uuid")
    const data = new Idea({
        username: profile.name,
        uuid: body.uuid,
        text: body.text,
        title: body.title
    })
    data.save()
    return json(data)
}