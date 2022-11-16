import Head from "next/head";
import { CMS_NAME } from "../lib/constants";
import { indexQuery } from "../lib/queries";
import { usePreviewSubscription } from "../lib/sanity";
import { getClient, overlayDrafts } from "../lib/sanity.server";

export default function Index({
  allPosts: initialAllPosts,
  preview,
}: {
  allPosts: { title: string }[];
  preview: boolean;
}) {
  const { data: allPosts } = usePreviewSubscription(indexQuery, {
    initialData: initialAllPosts,
    enabled: preview,
  });
  const [heroPost, ...rest] = allPosts || [];
  return (
    <>
      <div>{heroPost.title}</div>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery));
  return {
    props: { allPosts, preview },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
}
