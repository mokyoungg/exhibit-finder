"use client";

import { getExhibit } from "@/api/exhibit";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import classNames from "classnames/bind";
import styles from "./ExhibitList.module.scss";
import { useInView } from "react-intersection-observer";
import useExhibitList from "@/app/hooks/useExhibitList";

const cx = classNames.bind(styles);

const ExhibitList = () => {
  const { list, fetchNextPage, hasNextPage, isFetching } = useExhibitList();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching]);

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
