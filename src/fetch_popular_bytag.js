function fetch_popular_bytag(tag,channel="TopSellersRows"){
    return new Promise((r,j) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', `http://store.kra.moe/tags/en/${tag}`);
        xhr.setRequestHeader('Accept-Language','en-US');
        xhr.send();
        xhr.onload = function(){
            if(this.status == 200){
                var doc = new DOMParser().parseFromString(xhr.response, "text/html");
                console.log(`http://store.kra.moe/tags/en/${tag}`, doc);
                var game_list = [...doc.getElementById(channel).children]
                    .map(el => {
                        return {appid: el.getAttribute('data-ds-appid'), 
                                name: el.children[2].children[0].innerText, 
                                img: el.children[0].children[0].src}
                    });
                r(game_list);
            }
            else j('Blyat');
        }
    });
}