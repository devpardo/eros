import Cookies from "js-cookie";

export const getCache = key => {
  const data = sessionStorage.getItem(key);
  return JSON.parse(data);
};

export const setCache = (key, data) =>
  sessionStorage.setItem(key, JSON.stringify(data));

export const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

export const chunkES6 = (array, size) =>
  array.reduce(
    (chunks, item, index, arrayCopy) =>
      !(index % size)
        ? [...chunks, [arrayCopy.slice(index, index + size)]]
        : chunks,
    []
  );

export const parseCookie = (cookie = "") =>
  // Split Cookie values per comma
  cookie.split(/\s*;\s*/).reduce((result, pair) => {
    // Create pairs by equal sign
    pair = pair.split(/\s*=\s*/);
    const [key] = pair;
    result[key] = pair.splice(1).join("=");
    return result;
  }, {});

export const cookieStorage = {
  getItem: (...args) => Cookies.get(...args),
  getJSON: (...args) => Cookies.getJSON(...args),
  setItem: (...args) => Cookies.set(...args),
  removeItem: (...args) => Cookies.remove(...args)
};

export const sleep = time =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      resolve();
    }, time);
  });

export const random = (min, max) => Math.floor(Math.random() * max) + min;

export const listenersToEvent = (event, listeners, type = "add") =>
  listeners.map(listener => window[`${type}EventListener`](event, listener));

export const addListenersToEvent = (event, ...listeners) =>
  listeners.map(listener => listenersToEvent(event, listeners));

export const removeListenersToEvent = (event, ...listeners) =>
  listeners.map(listener => listenersToEvent(event, listeners, "remove"));

export const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() +
  (lowerRest ? rest.join("").toLowerCase() : rest.join(""));

// key = method
export const generateState = key => ({
  [`${key}s`]: [], //method
  [`${key}Id`]: -1 //methodId
});

// key = method
export const generateGetters = (key, keyId = "id") => ({
  [`${key}Id`]: state => state[`${key}Id`],
  [`${key}s`]: state => state[`${key}s`], // methods
  [key]: (state, getters) => id => {
    // method
    if (!getters[`${key}s`]) return;
    return getters[`${key}s`].find(
      data => data[keyId] === (id || getters[`${key}Id`])
    );
  },
  [`current${capitalize(key)}`]: (state, getters) => getters[key]()
});

// key = method
export const generateMutations = key => ({
  [`SET_${key.toUpperCase()}`]: (
    state,
    payload // SET_METHOD
  ) => {
    state[`${key}Id`] = payload;
  },
  [`SET_${key.toUpperCase()}S`]: (
    state,
    payload // SET_METHODS
  ) => {
    state[`${key}s`] = payload;
  }
});

export const popup = (key, callback) =>
  new Promise((resolve, reject) => {
    const popupWindow = (window.popups[key] = window.open());
    callback()
      .then(data => {
        popupWindow.document.title = key;
        resolve(data, popupWindow);
      })
      .catch(reject);
  });

export const getYears = ({
  startYear,
  endYear = new Date().getFullYear(),
  limit = 0
}) => {
  const currentYear = +endYear - +limit;
  const years = [];
  while (startYear <= currentYear) {
    years.push(startYear++);
  }
  return years;
};
export const newArray = length => Array.from(Array(length).keys());
export const getPaddedNumbers = (length, start = 1) =>
  newArray(length).map(i => String(i + start).padStart(2, "0"));

export const reverseString = string =>
  string
    .split("")
    .reverse()
    .join("");
export const encodeToken = payload => {
  const { data, salt = 10 } = payload;
  let hash = reverseString(btoa(JSON.stringify(data)));

  newArray(salt).forEach(index => {
    hash = btoa(hash);
  });
  const secret = {
    hash,
    salt
  };
  const token = btoa(JSON.stringify(secret));

  return token;
};
export const decodeToken = token => {
  if (!token) return;

  let { hash, salt } = JSON.parse(atob(token));

  newArray(salt).forEach(index => {
    hash = atob(hash);
  });

  const data = JSON.parse(atob(reverseString(hash)));

  return data;
};

export const generateJavaSignature = ({
  baseURL: host,
  url: requestUrl,
  method
}) => {
  const timestamp = +new Date();
  const token = process.env.API_MR_JAVA_APP_TOKEN;
  const url = `${host}${requestUrl}`;
  const apiKey = `${method}#${token}${url}#${timestamp}`;
  return apiKey;
};

export const scrollable = scroll => {
  const layout = document.querySelector("#__layout");
  layout.style.overflow = scroll ? "" : "hidden";
};
