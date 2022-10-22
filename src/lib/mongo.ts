import mg, { type HydratedDocument } from 'mongoose';

interface Iidea  {
    username: string,
    uuid: string,
    text: string[],
    title: string
}

type HydratedIdea = HydratedDocument<Iidea>

const ideaSchema = new mg.Schema<Iidea>({
    username: { type: String, required: true },
    uuid: { type: String, required: true },
    text: { type: [String], required: true },
    title: { type: String, required: true }
})

const Idea = mg.models.Idea || mg.model<Iidea>('Idea', ideaSchema)

await mg.connect(import.meta.env.VITE_CONNECT,  { dbName: 'df' })
export default Idea;
export { Idea, type Iidea, type HydratedIdea }