import { defineQuery, PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client, sanityFetch } from "../../../sanity/client";
import Link from "next/link";
import Image from "next/image";
import { Post, SanityImageAsset } from "@/sanity/sanity.types";
import {getImageDimensions} from '@sanity/asset-utils'

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

  function dynamicHeight(originalHeight: number, originalWidth: number, isInline: boolean) {
    const targetWidth = isInline ? 100 : 768;
    return (targetWidth * originalHeight) / originalWidth;
}

  function PortableImage({ value, isInline }: { value: SanityImageAsset, isInline: boolean } ) {
    const {width, height} = getImageDimensions(value)
    console.log(isInline, width, height);
    return (
      <Image
        src={imageUrlBuilder()
          .projectId(projectId ?? "")
          .dataset(dataset ?? "")
          .image(value)
          .width(isInline ? 100 : 768)
          .fit('max')
          .auto('format')
          .url()}
        width={isInline ? (width >= 100 ? 100 : width) : (width >= 768 ? 768 : width)}
        height={dynamicHeight(height, width, isInline)}
        alt={value.altText || ' '}
        loading="lazy"
        className="border rounded-lg shadow-md"
        style={{
          display: isInline ? 'inline-block' : 'block',
          aspectRatio: width / height,
        }}
      />
    )
  }

  const components = {
    types: {
        image: PortableImage
    }
  }

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/blog" className="hover:underline">
        ← Blog
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
        {Array.isArray(post.body) && <PortableText value={post.body} components={ components } />}
      </div>
    </main>
  );
}
