import { getExhibit } from "@/api/exhibit";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const useExhibitList = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["exhibitList"],
    queryFn: ({ pageParam }) => getExhibit(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const totalPages = Math.ceil(
        lastPage.response.body.totalCount / lastPage.response.body.numOfRows
      );
      const nextPage = pages.length + 1;

      return nextPage <= totalPages ? nextPage : undefined;
    },
  });

  const list = useMemo(() => {
    return data?.pages.reduce((acc, item) => {
      return acc.concat(item.response.body.items.item);
    }, []);
  }, [data]);

  return {
    list,
    fetchNextPage,
    hasNextPage,
    isFetching,
  };
};

export default useExhibitList;
