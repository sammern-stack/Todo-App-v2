import { QueryClient } from "@tanstack/react-query";
import { queryClientConfig } from "@/config/queryClient.config";

const client = new QueryClient(queryClientConfig);

export default client;
