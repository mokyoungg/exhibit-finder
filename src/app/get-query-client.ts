import {
  isServer,
  QueryClient,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        //  SSR 을 사용하면 일반적으로 클라이언트에서 즉시 리프래시되지 않도록
        // statleTime dmf 0 이상으로 설정합니다.
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    // Server: 항상 새로운 쿼리 클라이언트를 만듭니다.
    return makeQueryClient();
  } else {
    // Browser
    // 아직 클라이언트가 없는 경우, 새 query client 만들기
    // 이것은 매우 중요하므로 초기 렌더링 중에 react 가 일시 중단되는 경우 새 클라이언트를 다시 만들지 않습니다.
    // query client 아래에 suspense boundary 가 있는 경우 이 작업이 필요하지 않을 수 있습니다.
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
