import { Link, useLocation } from '@tanstack/react-router';
import { Activity, BookMarked, Zap } from 'lucide-react';

export function NavBar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-degen-border bg-degen-bg/90 backdrop-blur-md">
      <div className="scanline absolute inset-0 pointer-events-none" />
      <div className="container mx-auto px-4 h-16 flex items-center justify-between relative">
        {/* Logo + Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-md overflow-hidden border border-neon-green/30 group-hover:border-neon-green/60 transition-all duration-200 group-hover:shadow-glow-green">
            <img
              src="/assets/generated/social-signals-logo.dim_256x256.png"
              alt="Social Signals Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-mono font-bold text-sm text-neon-green tracking-wider uppercase">
              Social Signals
            </span>
            <span className="font-mono text-xs text-muted-foreground tracking-widest">
              for degens
            </span>
          </div>
        </Link>

        {/* Live indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border border-neon-green/20 bg-neon-green/5">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse-glow" />
          <span className="font-mono text-xs text-neon-green/80 tracking-wider">LIVE</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          <Link
            to="/"
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-mono text-sm font-medium transition-all duration-200 ${
              currentPath === '/'
                ? 'bg-neon-green/10 text-neon-green border border-neon-green/30 shadow-glow-green'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span className="hidden sm:inline">Feed</span>
          </Link>
          <Link
            to="/watchlist"
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-mono text-sm font-medium transition-all duration-200 ${
              currentPath === '/watchlist'
                ? 'bg-neon-magenta/10 text-neon-magenta border border-neon-magenta/30 shadow-glow-magenta'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent'
            }`}
          >
            <BookMarked className="w-4 h-4" />
            <span className="hidden sm:inline">Watchlist</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
