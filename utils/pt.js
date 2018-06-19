export const generateMobileURL = request => {
  let queries = "";
  const hubHost = "http://hub.mp176588.com/igaming";
  const { id, token, username: userName } = request;
  const gameRequest = {
    gameId: id,
    real: 1,
    username: userName.toUpperCase(),
    language: "zh-cn",
    temptoken: token,
    lobby: "https://mobile.galaxyinnovation.com/mightypanda88/lobby.php",
    support: "https://mobile.galaxyinnovation.com/mightypanda88/support.php",
    logout: "https://mobile.galaxyinnovation.com/mightypanda88"
  };
  if (gametype === "mps") {
    const { username, temptoken, gameId, real } = gameRequest;
    queries = generateQueries({ username, temptoken, gameId, real });
  } else if ((gametype = "ngm")) {
    queries = generateQueries(gameRequest);
  }
  const url = `${hubHost}/?${queries}`;

  return url;
};

export const generateQueries = request => {
  return Object.keys(request)
    .map(field => `${field}=${request[field]}`)
    .join("&");
};

export const requestPTTemporaryToken = realMode =>
  new Promise((resolve, reject) => {
    iapiSetCallout("GetTemporaryAuthenticationToken", function(response) {
      if (response.errorCode) {
        reject();
      }
      resolve(response);
    });
    iapiRequestTemporaryToken(realMode, "570", "GamePlay");
  });

export const requestPTLogin = async (
  username,
  password,
  realMode = 1,
  lang = "zh-cn"
) =>
  new Promise((resolve, reject) => {
    iapiSetCallout("Login", function(response) {
      if (response.errorCode) reject();
      resolve(response);
    });
    iapiSetClientPlatform("mobile&deliveryPlatform=HTML5");
    iapiLogin(username.toUpperCase(), password, realMode, lang);
  });

export const setCallout = type =>
  new Promise((resolve, reject) => {
    iapiSetCallout(type, response => {
      if (response.errorCode) reject();

      resolve(response);
    });
  });
