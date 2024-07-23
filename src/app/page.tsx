import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getExhibit } from "@/api/exhibit";
import ExhibitList from "./component/ExhibitList/ExhibitList";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["exhibit-list"],
    queryFn: getExhibit,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ExhibitList />
    </HydrationBoundary>
  );
}
