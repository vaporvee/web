import { defineQuery, PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client, sanityFetch } from "../../sanity/client";
import Link from "next/link";
import Image from "next/image";
import { Post, SanityImageAsset } from "@/sanity/sanity.types";
import urlBuilder from "@sanity/image-url";
import {getImageDimensions} from '@sanity/asset-utils'
import { Refractor } from 'react-refractor'

const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]`);
const POSTS_QUERY = defineQuery(`*[_type == "post"]{slug}`)

type PageParams = Promise<{
  slug: string;
}>

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export async function generateStaticParams() {
  const posts: Post[] = (await sanityFetch({ query: POSTS_QUERY, stega: false, perspective: "published" })).data;
  return posts.map((post) => ({ slug: post.slug?.current ?? null })).filter((post) => post.slug);
}

export default async function PostPage(props: { params: PageParams }) {
  const { slug } = await props.params;
  
  const post: Post = (await sanityFetch({ query: POST_QUERY, params: { slug } })).data;

  if (!post) {
    return (
      <main>
        <p>Post not found</p>
      </main>
    );
  }

  const postImageUrl = post.mainImage ? urlFor(post.mainImage)?.width(550).height(310).url() : null;

  function Code(props: {language: string | undefined, code: string, highlightedLines: number[]}) {
    return (
      <Refractor
        language={props.language || "text" }
        value={props.code}
        markers={props.highlightedLines}
      />
    )
  }
  
  function PortableImage({ value, isInline }: { value: SanityImageAsset; isInline: boolean }) {
    const {width, height} = getImageDimensions(value)
    return <Image
      src={urlBuilder()
        .image(value)
        .width(isInline ? 100 : 600)
        .fit('max')
        .auto('format')
        .withOptions({dataset, projectId})
        .url()}
      width={isInline ? 100 : 600}
      height={height}
      alt={value.altText || ' '}
      loading="lazy"
      style={{
        display: isInline ? 'inline-block' : 'block',
        aspectRatio: width / height,
        borderRadius: ".6rem",
        border: "1px solid rgba(255, 255, 255, .15)",
      }}
    />;
  }

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/" className="hover:underline">
        ← Back to posts
      </Link>
      {postImageUrl && (
        <Image
          src={postImageUrl}
          alt={`Banner for ${post.title}` }
          className="aspect-video rounded-xl"
          width="550"
          height="310"
        />
      )}

      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <div className="prose">
        <p>Published: {new Date(post.publishedAt ?? "").toISOString().substring(0, 10)}</p>
        {Code({language: post.myCodeField?.language, code: post.myCodeField?.code ?? "", highlightedLines: post.myCodeField?.highlightedLines ?? []})}
        {Array.isArray(post.body) && <PortableText value={post.body} components={ { types: { image: PortableImage } } } />}
      </div>
    </main>
  );
}
