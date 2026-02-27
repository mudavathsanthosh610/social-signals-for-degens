# Specification

## Summary
**Goal:** Build a crypto trading activity feed and watchlist MVP with a degen-crypto visual theme, using mock data on a Motoko backend.

**Planned changes:**
- Create a single Motoko backend actor with 8+ pre-populated mock trading events (walletAddress, tokenSymbol, tokenName, action, amount, priceUSD, network, timestamp, socialHandle), exposing a query to return all events sorted by timestamp descending.
- Add watchlist management to the backend actor: add, remove, and query tokens by tokenSymbol, with duplicate prevention.
- Build a Trading Activity Feed page displaying each event as a card with social handle, truncated wallet address, token symbol/name, color-coded BUY/SELL badge, amount, USD price, network label, relative timestamp, "Add to Watchlist" button, and "View on DEX" button.
- Build a Watchlist page showing saved tokens with token symbol, name, and a Remove button; display an empty state when no tokens are saved.
- Apply a degen-crypto dark theme: near-black background, neon green and magenta accents, monospace/bold sans-serif fonts, glowing card borders, top nav bar with app name, logo, and Feed/Watchlist tabs.

**User-visible outcome:** Users can browse a mock crypto trading activity feed, add tokens to a personal watchlist, and manage that watchlist — all within a styled degen-crypto dark UI with neon accents.
