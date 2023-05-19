import prisma from "@/app/libs/prismadb";
import algoliasearch from "algoliasearch";

if (
  !process.env.NEXT_PUBLIC_APP_ID ||
  !process.env.NEXT_PUBLIC_ADMIN_KEY ||
  !process.env.NEXT_PUBLIC_INDEX
) {
  throw new Error("Environment variables are not set");
}

const appId = process.env.NEXT_PUBLIC_APP_ID;
const apiKey = process.env.NEXT_PUBLIC_ADMIN_KEY;
const indexName = process.env.NEXT_PUBLIC_INDEX;

const client = algoliasearch(appId, apiKey);
const index = client.initIndex(indexName);

export default async function indexAlgoliaData() {
  // Fetch all listings from MongoDB database using Prisma
  const listings = await prisma.listing.findMany();

  // Format the data in a way Algolia can understand
  const algoliaData = listings.map((listing) => {
    return {
      objectID: listing.id,
      name: listing.name,
      description: listing.description,
      category: listing.category,
      locationValue: listing.locationValue,
    };
  });

  try {
    const { objectIDs } = await index.saveObjects(algoliaData);
    console.log("Indexed objects:", objectIDs);
  } catch (error) {
    console.error("Error when indexing data:", error);
    throw error;
  }
}
