"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "@/app/get-query-client";
import type * as React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  // NOTE
  // 초기화할 때 쿼리 클라이언트에 useState를 사용하지 마세요.
  // 초기 렌더링 시 클라이언트가 일시 중지될 수 있는 코드와 이 코드 사이에
  // 서스펜스 경계(Suspense boundary)가 없다면 React는 초기 렌더링 시
  // 클라이언트를 버리게 됩니다.
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
