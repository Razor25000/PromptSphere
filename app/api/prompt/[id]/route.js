import { connectToDB } from '../../../../utils/database'
import Prompt from '../../../../models/prompt'

export const GET = async (req, { params }) => {
    try {
        await connectToDB()
        const prompt = await Prompt.findById(params.id).populate('creator')
        if (!prompt) return new Response('Prompt non trouvé', {
            status: 404,
        });
        return new Response(JSON.stringify(prompt), {
            status: 200,
        });
    } catch (error) {
        return new Response(error, {
            status: 500,
        });
    }
}
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt non trouvé", { status: 404 });
        }

        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response("Mise à jour réussie des Prompts", { status: 200 });
    } catch (error) {
        return new Response("Erreur de mise à jour du Prompt", { status: 500 });
    }
};

export const DELETE = async (req, { params }) => {
    try {
        await connectToDB()
        await Prompt.findByIdAndDelete(params.id)
        return new Response('Prompt supprimé', {
            status: 200,
        })
    }
    catch (error) {
        return new Response(error, {
            status: 500,
        });
    }



}



