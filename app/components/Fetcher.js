const apiBaseUrl = "https://m48sf7jth7.execute-api.us-east-2.amazonaws.com/prod";
const apiMap = {
  createUser: {
    path: "/users",
    verb: "POST"
  },
  authenticate: {
    path: "/users/authentication",
    verb: "POST"
  },
  getUserInfo: {
    path: "/users/{userId}",
    verb: "GET"
  },
  changePassword: {
    path: "/users/{userId}",
    verb: "PATCH"
  },
  getUserLeagues: {
    path: "/users/leagues/{userId}",
    verb: "GET"
  },
  createLeague: {
    path: "/leagues/",
    verb: "POST"
  },
  joinLeague: {
    path: "/leagues/{leagueCode}",
    verb: "PATCH"
  },
  getLeagueInfo: {
    path: "/leagues/{leagueId}",
    verb: "GET"
  },
  getPortfolio: {
    path: "/leagues/{leagueId}/{userId}",
    verb: "GET"
  },
  getTickers: {
    path: "/stocks/",
    verb: "GET"
  },
  buyStock: {
    path: "/leagues/portfolios/{leagueId}",
    verb: "POST"
  },
  sellStock: {
    path: "/leagues/portfolios/{leagueId}",
    verb: "DELETE"
  },
  lookupStock: {
    path: "/stocks/{ticker}/{userId}",
    verb: "GET"
  }
};

async function getData(method, body, userId = "", leagueId = "", leagueCode = "", ticker = "") {
  const methodInfo = apiMap[method];
  var url = apiBaseUrl + methodInfo.path;

  url = url.replace("{userId}", userId)
           .replace("{leagueId}", leagueId)
           .replace("{leagueCode}", leagueCode)
           .replace("{ticker}", ticker);

  var params =  {
    method: methodInfo.verb,
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (body) {
    params.body = JSON.stringify(body);
  }

  console.log(url);
  console.log(params);
  const response = await fetch(url, params);
  const responseJson = await response.json();

  return responseJson;
}

export function createUser(email, username, passwordHash) {
  const body = {
    email: email,
    username: username,
    passwordHash: passwordHash
  };

  return getData("createUser", body);
}

export function authenticate(username, passwordHash) {
  const body = {
    username: username,
    passwordHash: passwordHash
  };

  return getData("authenticate", body);
}

export function getUserInfo(userId) {
  return getData("getUserInfo", null, userId);
}

export function changePassword(userId, oldPassword, newPassword) {
  const body = {
    oldPassword: oldPassword,
    newPassword: newPassword
  };

  return getData("changePassword", body, userId);
}

export function getUserLeagues(userId) {
  return getData("getUserLeagues", null, userId);
}

export function createLeague(leagueName, duration, startingCapital, startDate, userId) {
  const body = {
    leagueName: leagueName,
    duration: duration,
    startingCapital: startingCapital,
    startDate: startDate,
    userId: userId
  };

  return getData("createLeague", body);
}

export function joinLeague(leagueCode, userId) {
  const body = {
    userId: userId
  };

  return getData("joinLeague", body, "", "", leagueCode);
}

export function getLeagueInfo(leagueId) {
  return getData("getLeagueInfo", null, "", leagueId);
}

export function getPortfolio(userId, leagueId) {
  return getData("getPortfolio", null, userId, leagueId);
}

export function getTickers() {
  return getData("getTickers");
}

export function buyStock(userId, leagueId, stockTicker, quantity) {
  const body = {
    userId: userId,
    stockTicker: stockTicker,
    quantity: quantity
  };

  return getData("buyStock", body, "", leagueId);
}

export function sellStock(userId, leagueId, stockTicker, quantity) {
  const body = {
    userId: userId,
    stockTicker: stockTicker,
    quantity: parseInt(quantity)
  };

  return getData("sellStock", body, "", leagueId);
}

export function lookupStock(userId, stockTicker) {
  return getData("lookupStock", null, userId, "", "", stockTicker);
}
