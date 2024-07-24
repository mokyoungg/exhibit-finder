import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getExhibit } from "@/api/exhibit";
import ExhibitList from "./component/ExhibitList/ExhibitList";
import { getQueryClient } from "@/app/get-query-client";

export default async function Home() {
  const queryClient = getQueryClient();

  queryClient.prefetchInfiniteQuery({
    queryKey: ["exhibitList"],
    queryFn: () => getExhibit(),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ExhibitList />
    </HydrationBoundary>
  );
}
