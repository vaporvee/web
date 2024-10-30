import type { Home } from "@/sanity/sanity.types";
import { sanityFetch } from "@/sanity/client";
import Link from "next/link";

const HOME_QUERY = `*[_type == "home"]`;

export default async function IndexPage() {
  const result = await sanityFetch({ query: HOME_QUERY });
  const home: Home | null = result.data.length > 0 ? result.data[0] : null;

  return (
      <main className="container mx-auto min-h-screen max-w-3xl p-8">
        <Link href="/blog">Blog</Link><br/><br/>
        {home ? (
          <>
            <h1 className="text-4xl font-bold mb-8">{home.pagetitle}</h1>
            <h2 className="text-2xl font-semibold mb-4">{home.subtitle}</h2>
          </>
        ) : (
          <p></p>
        )}
      </main>
  );
}