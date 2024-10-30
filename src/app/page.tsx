import type { Home, Author } from "@/sanity/sanity.types";
import { sanityFetch } from "@/sanity/client";
import Link from "next/link";

const HOME_QUERY = `*[_type == "home"]`;
const OWNER_QUERY = (ownerRef: string) => `*[_type == "author" && _id == "${ownerRef}"]`;

export default async function IndexPage() {
  const result = await sanityFetch({ query: HOME_QUERY });
  const home: Home | null = result.data.length > 0 ? result.data[0] : null;

  let owner: Author | null = null;
  if (home?.owner?._ref) {
    const ownerQuery = OWNER_QUERY(home.owner._ref);
    const ownerResult = await sanityFetch({ query: ownerQuery });
    owner = ownerResult.data.length > 0 ? ownerResult.data[0] : null;
  }


  return (
      <main className="container mx-auto min-h-screen max-w-3xl p-8">
        <Link href="/blog">Blog</Link><br/><br/>
        {home ? (
          <>
            <h1 className="text-4xl font-bold mb-8">{home.pagetitle}</h1>
            <h2 className="text-2xl font-semibold mb-4">{home.subtitle}</h2>
            {owner && (
              <div>
                <h3 className="text-xl font-medium">Owner:</h3>
                <p>{owner.name}</p>
                <p>{owner.slug?.current}</p>
              </div>
            )}
          </>
        ) : (
          <p></p>
        )}
      </main>
  );
}