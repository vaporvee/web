import { createClient, defineLive } from "next-sanity";

export const client = createClient({
    projectId: "zk5oebdb",
    dataset: "production",
    apiVersion: "2024-10-27",
    useCdn: false,
    stega: { studioUrl: 'https://vaporvee.sanity.studio' },
});

const token = process.env.SANITY_API_READ_TOKEN
if (!token) {
    throw new Error('Missing SANITY_API_READ_TOKEN')
}

export const { sanityFetch, SanityLive } = defineLive({
    client,
    serverToken: token,
    browserToken: token,
});
