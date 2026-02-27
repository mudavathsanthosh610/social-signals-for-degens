/**
 * Truncates a wallet address to the format 0x1234...abcd
 */
export function truncateAddress(address: string): string {
  if (!address || address.length <= 10) return address;
  // Handle short mock addresses like "0x1234"
  if (address.length <= 8) {
    return address;
  }
  const start = address.slice(0, 6);
  const end = address.slice(-4);
  return `${start}...${end}`;
}

/**
 * Formats a timestamp (in milliseconds or nanoseconds) to a relative time string.
 * Handles both millisecond timestamps and bigint nanosecond timestamps.
 */
export function formatRelativeTime(timestamp: bigint | number): string {
  let ms: number;

  if (typeof timestamp === 'bigint') {
    // ICP timestamps are in nanoseconds
    ms = Number(timestamp / BigInt(1_000_000));
  } else {
    ms = timestamp;
  }

  const now = Date.now();
  const diff = now - ms;

  if (diff < 0) {
    // Future timestamp — show as "just now" for mock data
    return 'just now';
  }

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (weeks < 4) return `${weeks}w ago`;
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

/**
 * Formats a USD price with appropriate decimal places
 */
export function formatUSD(amount: number): string {
  if (amount >= 1000) {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `$${amount.toFixed(2)}`;
}

/**
 * Formats a token amount with appropriate decimal places
 */
export function formatAmount(amount: number): string {
  if (amount >= 1000) {
    return amount.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }
  if (amount >= 1) {
    return amount.toFixed(4);
  }
  return amount.toFixed(6);
}
