🚀 AlphaCast

Turn your Farcaster feed into alpha. Know what your network is trading — and when.

🔗 Live App: https://alphacast-cfo.caffeine.xyz/

🧠 Overview

AlphaCast is a Farcaster Mini App that converts your social graph into a real-time crypto trading signal engine on the Monad Testnet.

Instead of relying on anonymous groups or market noise, AlphaCast tracks the on-chain activity of wallets linked to the people you follow on Farcaster and sends you instant notifications when they:

🟢 Buy tokens

🔴 Sell tokens

🟡 Mint NFTs or interact with contracts

This allows you to discover early signals, research tokens faster, and act before the market reacts.

AlphaCast brings transparency and actionable insights directly from your trusted network.

✨ Key Features

🔔 Real-time Farcaster Mini App notifications

👥 Social graph-based wallet tracking

⚡ Monad Testnet blockchain monitoring

📊 Live activity feed of network trades

⭐ Token watchlist

🔎 Direct links to DEX and blockchain explorer

📱 Native Farcaster Mini App integration

🧠 AI-assisted design and development

⚙️ Tech Stack
Layer	Technology
Frontend	Next.js, TailwindCSS
Wallet/Auth	Farcaster Connector, Reown
Backend	Node.js, Vercel Functions
Database	Supabase, Redis, Neon
Blockchain	Monad Testnet
Indexing	Envio
Notifications	Farcaster Mini App Notifications
APIs	Neynar API, 0x API, Kuru
Deployment	Vercel
🏗 Architecture
User opens AlphaCast Mini App
           ↓
Farcaster authentication
           ↓
Fetch social graph via Neynar API
           ↓
Map Farcaster users → verified wallet addresses
           ↓
Envio indexer monitors wallets on Monad Testnet
           ↓
Trade detected
           ↓
Notification sent to user
           ↓
User views trade and interacts
📲 How It Works

User opens AlphaCast inside Farcaster

User enables notifications

AlphaCast retrieves wallets from followed Farcaster profiles

Blockchain indexer monitors those wallets

When a trade occurs, a notification is sent instantly

User can view details, track, or copy the trade

🖥 Example Notification
🔔 AlphaCast Alert

@alice bought MONDOG on Monad Testnet

Tap to view details
🌐 Live Demo

Access the live application:

https://alphacast-cfo.caffeine.xyz/

🧪 Local Development

Clone the repository:

git clone https://github.com/YOUR_USERNAME/alphacast.git
cd alphacast

Install dependencies:

npm install

Run development server:

npm run dev
🚀 Deployment

Recommended deployment stack:

Vercel (frontend + backend)

Supabase (database)

Farcaster Mini App platform

Envio indexer

🎯 Use Cases

Crypto traders discovering early opportunities

Web3 researchers tracking ecosystem activity

Monad ecosystem participants

Social trading platforms

Blockchain analytics tools

🔮 Future Roadmap

Copy-trade execution

Profit and performance analytics

Whale tracking alerts

Multi-chain support

AI-based signal ranking

Advanced filtering and dashboards

👨‍💻 Author

Mudavath Santhosh
AI & Web3 Developer

GitHub:
https://github.com/mudavathsanthosh610

LinkedIn:
https://www.linkedin.com/in/mudavathsanthosh/

⭐ Tagline

AlphaCast — Alpha from your social graph.

🏷 GitHub Topics
alphacast
farcaster
miniapp
web3
crypto
blockchain
monad
trading-signals
social-trading
nextjs
supabase
vercel
defi
wallet-tracker

📸 Screenshots
<img width="1919" height="963" alt="Screenshot 2026-02-27 222632" src="https://github.com/user-attachments/assets/1f8fe233-cd60-48ca-9df1-41ea096260ca" />
<img width="1919" height="959" alt="Screenshot 2026-02-27 222653" src="https://github.com/user-attachments/assets/2dceb8bc-a28f-4cd8-985e-30c50548cd12" />
<img width="1919" height="950" alt="Screenshot 2026-02-27 222714" src="https://github.com/user-attachments/assets/898175c5-6ff5-49db-a280-b92384df83cb" />



