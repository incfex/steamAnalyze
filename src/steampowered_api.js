var steampowered_api = function(api_key) {
  if (!Array.isArray(api_key)) api_key = [api_key];
  var api_do = function (a_key,appid) {
    console.log('try with key: ', a_key);
    return new Promise((res, rej) => {
      var xhr = new XMLHttpRequest();
      //xhr.open('GET', `https://store.steampowered.com/appreviews/${appid}?json=1&start_offset=${offset}&`);
      xhr.open('GET', `https://store.steampowered.com/appreviews/${appid}?key=${a_key}&json=1`);
      //https://store.steampowered.com/appreviews/730?key=12270FC6A72424DAF652F14E9B06FB8&json=1
      xhr.setRequestHeader('Accept-Language','en-US');
      xhr.send();
      xhr.onload = function () {
          if (this.status == 200) {
              r(JSON.parse(xhr.response));
          } else j('DEAD');
      };
  });
};

return async function (...args) {
  console.log('avaliable keys: ', api_key);

  for (var i = 0; i < api_key.length; i++) {
      try {
          var rslt = await api_do(api_key[i], ...args);
          return rslt;
      } catch (e) {
          console.log(`[WARN] API key ${api_key[i]} error, try next: `, e);
          continue;
      }
  }

  return {};
};
};
