import { PortableText, defineQuery } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import {getImageDimensions} from '@sanity/asset-utils'
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import { sanityFetch } from '@/sanity/client';
import Link from "next/link";
import { Post, SanityImageAsset } from "@/sanity/sanity.types";
import type { Metadata } from "next";
import Image from 'next/image'

const POSTS_QUERY = defineQuery(`*[_type == "post"]{ slug }`);
const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]`);

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
    return posts.map((post) => ({
        slug: post.slug?.current ?? ""
    }))
}

export async function generateMetadata(props: { params: Promise<PageParams> }): Promise<Metadata> {
  const params = await props.params;
  const post: Post = (await sanityFetch({ query: POST_QUERY, params, stega: false })).data;
  const ogImage = post.mainImage
    ? urlFor(post.mainImage)?.width(550).height(310).url()
    : null;
  const firstBlock = post.body ? post.body[0] : undefined;
  let description: string | undefined = undefined;
  if (firstBlock && firstBlock._type === 'block' && firstBlock.children) {
    description = firstBlock.children.map(child => child.text).join(" ");
  }

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      url: `/blog/${post.slug}`,
      images: [
        {
          url: ogImage ?? "",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

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
      width={isInline ? (width >= 100 ? 768 : width) : (width >= 768 ? 768 : width)}
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

export default async function PostPage(props: { params: Promise<PageParams> }) {
  const params = await props.params;
  const post: Post = (await sanityFetch({ query: POST_QUERY, params })).data;
  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(912).height(576).url()
    : null;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
        <Link href="/blog" className="hover:underline">
            ← Back to posts
        </Link>
        {postImageUrl && (
            <Image
                src={postImageUrl}
                alt={post.title ?? `Blog Post Banner Image for ${post.title}`}
                className="aspect-video rounded-xl w-full"
                width="912"
                height="576"
            />
        )}
        <h1 className="text-4xl font-bold mb-8">{post.title}</h1> 
        <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-full w-fit">
            {post.publishedAt}
        </p>
        <div className="items-start mt-2 mb-8 text-sm prose dark:prose-invert max-w-full w-full text-left">
            {Array.isArray(post.body) && <PortableText value={post.body} components={ components } />}
        </div>
    </main>
  );
}