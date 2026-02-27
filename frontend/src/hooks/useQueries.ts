import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { TradeEvent, Token } from '../backend';

const PLACEHOLDER_USER_ID = 'degen_user_1';

export function useTradeEvents() {
  const { actor, isFetching } = useActor();

  return useQuery<TradeEvent[]>({
    queryKey: ['tradeEvents'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTradeEventsSorted();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useWatchlist() {
  const { actor, isFetching } = useActor();

  return useQuery<Token[]>({
    queryKey: ['watchlist', PLACEHOLDER_USER_ID],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWatchlist(PLACEHOLDER_USER_ID);
    },
    enabled: !!actor && !isFetching,
    staleTime: 10_000,
  });
}

export function useAddToWatchlist() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ symbol, name }: { symbol: string; name: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.addToWatchlist(PLACEHOLDER_USER_ID, symbol, name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlist', PLACEHOLDER_USER_ID] });
    },
  });
}

export function useRemoveFromWatchlist() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ symbol }: { symbol: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.removeFromWatchlist(PLACEHOLDER_USER_ID, symbol);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlist', PLACEHOLDER_USER_ID] });
    },
  });
}

export { PLACEHOLDER_USER_ID };
