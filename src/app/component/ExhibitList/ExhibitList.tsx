"use client";

import { getExhibit } from "@/api/exhibit";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import classNames from "classnames/bind";
import styles from "./ExhibitList.module.scss";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

const cx = classNames.bind(styles);

const ExhibitList = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
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

  console.log("list :", list);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className={cx("container")}>
      <ul className={cx("list")}>
        {list &&
          list.map((item: any) => (
            <li className={cx("list-item")} key={item.url}>
              <div>
                <p>{item.title}</p>
                <p>{item.period}</p>
              </div>
            </li>
          ))}
        <div ref={ref} className={cx("check")} />
      </ul>
    </div>
  );
};

export default ExhibitList;
