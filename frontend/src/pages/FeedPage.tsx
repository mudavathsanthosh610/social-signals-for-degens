import { Zap, RefreshCw, AlertCircle } from 'lucide-react';
import { TradeEventCard } from '../components/TradeEventCard';
import { useTradeEvents } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

function FeedSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="card-degen rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Skeleton className="w-9 h-9 rounded-full bg-muted/40" />
              <div className="space-y-1.5">
                <Skeleton className="w-24 h-3.5 bg-muted/40" />
                <Skeleton className="w-32 h-3 bg-muted/30" />
              </div>
            </div>
            <Skeleton className="w-14 h-6 rounded bg-muted/40" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="w-28 h-8 rounded bg-muted/40" />
            <Skeleton className="w-24 h-8 rounded bg-muted/40" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="flex-1 h-8 rounded bg-muted/40" />
            <Skeleton className="flex-1 h-8 rounded bg-muted/40" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function FeedPage() {
  const { data: events, isLoading, isError, refetch, isFetching } = useTradeEvents();

  return (
    <main className="container mx-auto px-4 py-6 max-w-2xl">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-mono font-bold text-xl text-foreground flex items-center gap-2">
            <Zap className="w-5 h-5 text-neon-green" />
            Alpha Feed
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5 font-mono">
            Live trades from your social graph
          </p>
        </div>

        <div className="flex items-center gap-3">
          {events && (
            <span className="font-mono text-xs text-muted-foreground">
              {events.length} signals
            </span>
          )}
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-border text-xs font-mono text-muted-foreground hover:border-neon-green/40 hover:text-neon-green transition-all duration-200 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats bar */}
      {events && events.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="card-degen rounded-lg p-3 text-center">
            <div className="font-mono font-bold text-lg text-neon-green">
              {events.filter(e => e.action === 'BUY').length}
            </div>
            <div className="font-mono text-xs text-muted-foreground">BUYS</div>
          </div>
          <div className="card-degen rounded-lg p-3 text-center">
            <div className="font-mono font-bold text-lg" style={{ color: 'oklch(0.65 0.25 25)' }}>
              {events.filter(e => e.action === 'SELL').length}
            </div>
            <div className="font-mono text-xs text-muted-foreground">SELLS</div>
          </div>
          <div className="card-degen rounded-lg p-3 text-center">
            <div className="font-mono font-bold text-lg text-neon-magenta">
              {new Set(events.map(e => e.tokenSymbol)).size}
            </div>
            <div className="font-mono text-xs text-muted-foreground">TOKENS</div>
          </div>
        </div>
      )}

      {/* Feed content */}
      {isLoading ? (
        <FeedSkeleton />
      ) : isError ? (
        <div className="card-degen rounded-lg p-8 text-center">
          <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-3" />
          <p className="font-mono font-bold text-foreground mb-1">Failed to load feed</p>
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
      ) : events && events.length > 0 ? (
        <div className="space-y-3">
          {events.map((event, index) => (
            <TradeEventCard key={`${event.walletAddress}-${event.tokenSymbol}-${String(event.timestamp)}-${index}`} event={event} />
          ))}
        </div>
      ) : (
        <div className="card-degen rounded-lg p-12 text-center">
          <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-40" />
          <p className="font-mono font-bold text-foreground mb-2">No signals yet</p>
          <p className="font-mono text-sm text-muted-foreground">
            Trading activity will appear here
          </p>
        </div>
      )}
    </main>
  );
}
