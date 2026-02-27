import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { NavBar } from './components/NavBar';
import { FeedPage } from './pages/FeedPage';
import { WatchlistPage } from './pages/WatchlistPage';
import { Toaster } from '@/components/ui/sonner';

// Layout component with NavBar
function RootLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />
      <div className="flex-1">
        <Outlet />
      </div>
      <footer className="border-t border-degen-border py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} Social Signals for Degens &nbsp;·&nbsp; Built with{' '}
            <span className="text-neon-magenta">♥</span> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'social-signals-degens')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-green hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
      <Toaster theme="dark" />
    </div>
  );
}

// Route definitions
const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: FeedPage,
});

const watchlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/watchlist',
  component: WatchlistPage,
});

const routeTree = rootRoute.addChildren([indexRoute, watchlistRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
