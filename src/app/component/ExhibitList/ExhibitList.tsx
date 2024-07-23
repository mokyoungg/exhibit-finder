"use client";

import { getExhibit } from "@/api/exhibit";
import { useQuery } from "@tanstack/react-query";

const ExhibitList = () => {
  const { data } = useQuery({
    queryKey: ["exhibit-list"],
    queryFn: () => getExhibit(),
  });

  console.log("data :", data);

  return <div>hi</div>;
};

export default ExhibitList;
