var get_game_tags = (appid) => {
    return new Promise((reslove, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', `http://store.kra.moe/app/${appid}`);
        xhr.setRequestHeader('Accept-Language','en-US');
        xhr.send();
        xhr.onload = function () {
            if (this.status == 200) {
                var doc = new DOMParser().parseFromString(xhr.response, "text/html");
                var tags = [...doc.getElementsByClassName('glance_tags popular_tags')[0].children].map(e => e.innerText.trim());
                tags.pop();
                reslove(tags);
            } else reject('DEAD');
        }
    });
};