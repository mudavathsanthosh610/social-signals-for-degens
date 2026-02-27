import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Float "mo:core/Float";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Order "mo:core/Order";

actor {
  type TradeEvent = {
    walletAddress : Text;
    tokenSymbol : Text;
    tokenName : Text;
    action : Text;
    amount : Float;
    priceUSD : Float;
    network : Text;
    timestamp : Time.Time;
    socialHandle : Text;
  };

  module TradeEvent {
    public func compareByTimestampDesc(a : TradeEvent, b : TradeEvent) : Order.Order {
      Int.compare(b.timestamp, a.timestamp);
    };
  };

  type Token = {
    tokenSymbol : Text;
    tokenName : Text;
  };

  module Token {
    public func compare(token1 : Token, token2 : Token) : Order.Order {
      switch (Text.compare(token1.tokenSymbol, token2.tokenSymbol)) {
        case (#equal) { Text.compare(token1.tokenName, token2.tokenName) };
        case (order) { order };
      };
    };
  };

  var mockTradeEvents : [TradeEvent] = [
    {
      walletAddress = "0x1234";
      tokenSymbol = "ETH";
      tokenName = "Ethereum";
      action = "BUY";
      amount = 1.5;
      priceUSD = 3000.0;
      network = "Monad Testnet";
      timestamp = 1718200800000;
      socialHandle = "@trader1";
    },
    {
      walletAddress = "0x5678";
      tokenSymbol = "BTC";
      tokenName = "Bitcoin";
      action = "SELL";
      amount = 0.25;
      priceUSD = 15000.0;
      network = "Monad Testnet";
      timestamp = 1718294400000;
      socialHandle = "@trader2";
    },
    {
      walletAddress = "0x9abc";
      tokenSymbol = "USDT";
      tokenName = "Tether";
      action = "BUY";
      amount = 1000.0;
      priceUSD = 999.0;
      network = "Monad Testnet";
      timestamp = 1718388000000;
      socialHandle = "@stablecoin";
    },
    {
      walletAddress = "0xdef0";
      tokenSymbol = "ADA";
      tokenName = "Cardano";
      action = "SELL";
      amount = 300.0;
      priceUSD = 450.0;
      network = "Monad Testnet";
      timestamp = 1718481600000;
      socialHandle = "@adaholder";
    },
    {
      walletAddress = "0x1234";
      tokenSymbol = "ETH";
      tokenName = "Ethereum";
      action = "SELL";
      amount = 0.75;
      priceUSD = 2250.0;
      network = "Monad Testnet";
      timestamp = 1718575200000;
      socialHandle = "@trader1";
    },
    {
      walletAddress = "0x5678";
      tokenSymbol = "BTC";
      tokenName = "Bitcoin";
      action = "BUY";
      amount = 0.1;
      priceUSD = 6000.0;
      network = "Monad Testnet";
      timestamp = 1718668800000;
      socialHandle = "@trader2";
    },
    {
      walletAddress = "0x9abc";
      tokenSymbol = "USDT";
      tokenName = "Tether";
      action = "BUY";
      amount = 500.0;
      priceUSD = 499.5;
      network = "Monad Testnet";
      timestamp = 1718762400000;
      socialHandle = "@stablecoin";
    },
    {
      walletAddress = "0xdef0";
      tokenSymbol = "ADA";
      tokenName = "Cardano";
      action = "BUY";
      amount = 150.0;
      priceUSD = 225.0;
      network = "Monad Testnet";
      timestamp = 1718856000000;
      socialHandle = "@adaholder";
    },
  ];

  let userWatchlists = Map.empty<Text, List.List<Token>>();

  public query ({ caller }) func getAllTradeEventsSorted() : async [TradeEvent] {
    mockTradeEvents.sort(TradeEvent.compareByTimestampDesc);
  };

  public shared ({ caller }) func addToWatchlist(userId : Text, symbol : Text, name : Text) : async () {
    let newToken : Token = {
      tokenSymbol = symbol;
      tokenName = name;
    };

    switch (userWatchlists.get(userId)) {
      case (null) {
        let newWatchlist = List.empty<Token>();
        newWatchlist.add(newToken);
        userWatchlists.add(userId, newWatchlist);
      };
      case (?watchlist) {
        let tokenExists = watchlist.any(func(t) { t.tokenSymbol == symbol });
        if (tokenExists) {
          Runtime.trap("Token already in watchlist");
        } else {
          watchlist.add(newToken);
        };
      };
    };
  };

  public shared ({ caller }) func removeFromWatchlist(userId : Text, symbol : Text) : async () {
    switch (userWatchlists.get(userId)) {
      case (null) {
        Runtime.trap("Watchlist not found for user: " # userId);
      };
      case (?watchlist) {
        let filtered = watchlist.filter(func(t) { t.tokenSymbol != symbol });
        userWatchlists.add(userId, filtered);
      };
    };
  };

  public query ({ caller }) func getWatchlist(userId : Text) : async [Token] {
    switch (userWatchlists.get(userId)) {
      case (null) {
        [];
      };
      case (?watchlist) {
        watchlist.toArray().sort();
      };
    };
  };
};
