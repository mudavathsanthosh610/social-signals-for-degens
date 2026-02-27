import { Trash2, Loader2, TrendingUp } from 'lucide-react';
import type { Token } from '../backend';

interface WatchlistCardProps {
  token: Token;
  onRemove: () => void;
  isRemoving: boolean;
}

export function WatchlistCard({ token, onRemove, isRemoving }: WatchlistCardProps) {
  return (
    <article className="card-degen rounded-lg p-4 flex items-center justify-between gap-4 group animate-slide-in">
      <div className="flex items-center gap-3 min-w-0">
        {/* Token icon */}
        <div className="w-10 h-10 rounded-full bg-neon-magenta/10 border border-neon-magenta/30 flex items-center justify-center flex-shrink-0">
          <span className="font-mono text-sm font-bold text-neon-magenta">
            {token.tokenSymbol.slice(0, 2)}
          </span>
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-base text-foreground">
              {token.tokenSymbol}
            </span>
            <TrendingUp className="w-3.5 h-3.5 text-neon-green opacity-60" />
          </div>
          <div className="text-sm text-muted-foreground truncate">{token.tokenName}</div>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="hidden sm:inline px-2 py-0.5 rounded text-xs font-mono border border-neon-magenta/20 text-neon-magenta/70 bg-neon-magenta/5">
          WATCHING
        </span>
        <button
          onClick={onRemove}
          disabled={isRemoving}
          className="flex items-center gap-1.5 px-3 py-2 rounded text-xs font-mono font-medium border border-border text-muted-foreground hover:border-destructive/50 hover:text-destructive hover:bg-destructive/5 transition-all duration-200 disabled:opacity-50"
        >
          {isRemoving ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Trash2 className="w-3.5 h-3.5" />
          )}
          <span className="hidden sm:inline">Remove</span>
        </button>
      </div>
    </article>
  );
}
