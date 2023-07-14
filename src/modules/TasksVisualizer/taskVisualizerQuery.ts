import {
  UseQueryResult,
  useMutation,
  useQueries,
  useQuery,
} from "@tanstack/react-query";

import {
  CreateOptimizDTO,
  GeocodedAddressesResponseDto,
  OptimizService,
} from "../../generated/openapi";

export enum QueryKeys {
  GET_GEOCODED_ADDRESS = "get-geocoded-address",
}

export function useVerifyCalculatePrice() {
  return useMutation(async (verifyCalculatePriceDto: CreateOptimizDTO) => {
    return OptimizService.optimizControllerCreatePricing(
      verifyCalculatePriceDto,
    );
  });
}

export type GetGeocodedAddressesArgs = {
  addresses: { taskId: string; formattedAddress: string }[];
};
export function useGetGeocodedAddresses(args: GetGeocodedAddressesArgs) {
  return useQueries({
    queries: args.addresses?.map((address) => {
      return {
        queryKey: [QueryKeys.GET_GEOCODED_ADDRESS, address],
        queryFn: async () => {
          if (!address) return [];
          const data = await OptimizService.optimizControllerValidatedAddress(
            address.formattedAddress,
          );
          return {
            taskId: address.taskId,
            ...data,
          };
        },
      };
    }),
  });
}

export type GetGeocodedAddressArgs = {
  address: string;
};
export function useGetGeocodedAddress(
  args: GetGeocodedAddressArgs,
  queryOptions = {},
): UseQueryResult<GeocodedAddressesResponseDto[] | null> {
  return useQuery(
    [QueryKeys.GET_GEOCODED_ADDRESS, args.address],
    () => {
      return OptimizService.optimizControllerValidatedAddress(args.address);
    },
    queryOptions,
  );
}

export function useCreateOrder() {
  return useMutation(async (verifyCalculatePriceDto: CreateOptimizDTO) => {
    return OptimizService.optimizControllerCreateOptimizOrder(
      verifyCalculatePriceDto,
    );
  });
}
