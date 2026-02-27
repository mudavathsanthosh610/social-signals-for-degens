import { useState } from 'react';
import { ExternalLink, Plus, Check, TrendingUp, TrendingDown, Loader2 } from 'lucide-react';
import type { TradeEvent } from '../backend';
import { truncateAddress, formatRelativeTime, formatUSD, formatAmount } from '../utils/formatters';
import { useAddToWatchlist, useWatchlist } from '../hooks/useQueries';

interface TradeEventCardProps {
  event: TradeEvent;
}

const DEX_BASE_URL = 'https://app.uniswap.org/#/swap';

export function TradeEventCard({ event }: TradeEventCardProps) {
  const isBuy = event.action === 'BUY';
  const addToWatchlist = useAddToWatchlist();
  const { data: watchlist } = useWatchlist();
  const [justAdded, setJustAdded] = useState(false);

  const isInWatchlist = watchlist?.some((t) => t.tokenSymbol === event.tokenSymbol) ?? false;

  const handleAddToWatchlist = async () => {
    if (isInWatchlist || justAdded) return;
    try {
      await addToWatchlist.mutateAsync({ symbol: event.tokenSymbol, name: event.tokenName });
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 3000);
    } catch (err) {
      // Token might already be in watchlist — silently handle
    }
  };

  const handleViewOnDex = () => {
    const url = `${DEX_BASE_URL}?outputCurrency=${event.tokenSymbol}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const totalValue = event.amount * event.priceUSD / event.amount; // priceUSD is total value
  const displayValue = formatUSD(event.priceUSD);

  return (
    <article className="card-degen rounded-lg p-4 animate-slide-in group">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Avatar placeholder */}
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 border ${
            isBuy
              ? 'bg-neon-green/10 border-neon-green/30 text-neon-green'
              : 'bg-neon-red/10 border-neon-red/30 text-neon-red'
          }`}
          style={isBuy ? {} : { borderColor: 'oklch(0.65 0.25 25 / 0.3)', color: 'oklch(0.65 0.25 25)', backgroundColor: 'oklch(0.65 0.25 25 / 0.1)' }}
          >
            {event.socialHandle.replace('@', '').slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="font-mono font-bold text-sm text-foreground truncate">
              {event.socialHandle}
            </div>
            <div className="font-mono text-xs text-muted-foreground truncate">
              {truncateAddress(event.walletAddress)}
            </div>
          </div>
        </div>

        {/* Action badge */}
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono font-bold flex-shrink-0 ${
          isBuy
            ? 'bg-neon-green/15 text-neon-green border border-neon-green/40'
            : 'border'
        }`}
        style={!isBuy ? {
          backgroundColor: 'oklch(0.65 0.25 25 / 0.15)',
          color: 'oklch(0.65 0.25 25)',
          borderColor: 'oklch(0.65 0.25 25 / 0.4)'
        } : {}}
        >
          {isBuy ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {event.action}
        </div>
      </div>

      {/* Token info */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-muted/50 border border-border flex items-center justify-center">
            <span className="font-mono text-xs font-bold text-foreground">
              {event.tokenSymbol.slice(0, 2)}
            </span>
          </div>
          <div>
            <div className="font-bold text-base text-foreground leading-tight">
              {event.tokenSymbol}
            </div>
            <div className="text-xs text-muted-foreground">{event.tokenName}</div>
          </div>
        </div>

        <div className="text-right">
          <div className="font-mono font-bold text-base text-foreground">
            {formatAmount(event.amount)} <span className="text-muted-foreground text-sm">{event.tokenSymbol}</span>
          </div>
          <div className="font-mono text-sm text-muted-foreground">
            {displayValue}
          </div>
        </div>
      </div>

      {/* Meta row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-xs font-mono border border-border text-muted-foreground bg-muted/30">
            {event.network}
          </span>
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          {formatRelativeTime(event.timestamp)}
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleAddToWatchlist}
          disabled={isInWatchlist || justAdded || addToWatchlist.isPending}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded text-xs font-mono font-medium transition-all duration-200 border ${
            isInWatchlist || justAdded
              ? 'border-neon-green/30 text-neon-green bg-neon-green/10 cursor-default'
              : 'border-border text-muted-foreground hover:border-neon-green/50 hover:text-neon-green hover:bg-neon-green/5 disabled:opacity-50'
          }`}
        >
          {addToWatchlist.isPending ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : isInWatchlist || justAdded ? (
            <Check className="w-3 h-3" />
          ) : (
            <Plus className="w-3 h-3" />
          )}
          {isInWatchlist ? 'Watching' : justAdded ? 'Added!' : 'Watchlist'}
        </button>

        <button
          onClick={handleViewOnDex}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded text-xs font-mono font-medium border border-border text-muted-foreground hover:border-neon-magenta/50 hover:text-neon-magenta hover:bg-neon-magenta/5 transition-all duration-200"
          style={{}}
        >
          <ExternalLink className="w-3 h-3" />
          View on DEX
        </button>
      </div>
    </article>
  );
}
