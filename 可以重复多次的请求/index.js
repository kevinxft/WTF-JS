function request(url, maxCount = 5) {
  return fetch(url).catch((err) => {
    maxCount <= 0 ? Promise.reject(err) : request(url, maxCount - 1);
  });
}

request("https://api.tachikoma.online")
  .then((resp) => {
    console.log(resp);
  })
  .catch((err) => {
    console.log(err);
  });
