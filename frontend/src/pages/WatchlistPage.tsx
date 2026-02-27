import { BookMarked, AlertCircle, Plus } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { WatchlistCard } from '../components/WatchlistCard';
import { useWatchlist, useRemoveFromWatchlist } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';

function WatchlistSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="card-degen rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full bg-muted/40" />
            <div className="space-y-1.5">
              <Skeleton className="w-16 h-4 bg-muted/40" />
              <Skeleton className="w-28 h-3 bg-muted/30" />
            </div>
          </div>
          <Skeleton className="w-20 h-8 rounded bg-muted/40" />
        </div>
      ))}
    </div>
  );
}

export function WatchlistPage() {
  const { data: tokens, isLoading, isError, refetch } = useWatchlist();
  const removeFromWatchlist = useRemoveFromWatchlist();
  const [removingSymbol, setRemovingSymbol] = useState<string | null>(null);

  const handleRemove = async (symbol: string) => {
    setRemovingSymbol(symbol);
    try {
      await removeFromWatchlist.mutateAsync({ symbol });
    } finally {
      setRemovingSymbol(null);
    }
  };

  return (
    <main className="container mx-auto px-4 py-6 max-w-2xl">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-mono font-bold text-xl text-foreground flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-neon-magenta" />
            Watchlist
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5 font-mono">
            Tokens you're tracking
          </p>
        </div>

        {tokens && tokens.length > 0 && (
          <span className="font-mono text-xs text-muted-foreground">
            {tokens.length} token{tokens.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <WatchlistSkeleton />
      ) : isError ? (
        <div className="card-degen rounded-lg p-8 text-center">
          <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-3" />
          <p className="font-mono font-bold text-foreground mb-1">Failed to load watchlist</p>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            Could not connect to the backend
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 rounded border border-neon-green/40 text-neon-green text-sm font-mono hover:bg-neon-green/10 transition-all"
          >
            Try Again
          </button>
        </div>
      ) : tokens && tokens.length > 0 ? (
        <div className="space-y-3">
          {tokens.map((token) => (
            <WatchlistCard
              key={token.tokenSymbol}
              token={token}
              onRemove={() => handleRemove(token.tokenSymbol)}
              isRemoving={removingSymbol === token.tokenSymbol}
            />
          ))}
        </div>
      ) : (
        <div className="card-degen rounded-lg p-12 text-center">
          <BookMarked className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-40" />
          <p className="font-mono font-bold text-foreground mb-2">Your watchlist is empty</p>
          <p className="font-mono text-sm text-muted-foreground mb-6">
            Add tokens from the feed to start tracking them
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded border border-neon-green/40 text-neon-green text-sm font-mono hover:bg-neon-green/10 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            Browse Feed
          </Link>
        </div>
      )}
    </main>
  );
}
