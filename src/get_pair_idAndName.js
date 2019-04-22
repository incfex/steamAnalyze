const Http = new XMLHttpRequest();
const url='http://api.steampowered.com/ISteamApps/GetAppList/v2';
Http.open("GET", url);
Http.send();

Http.onreadystatechange=function(){
  if(this.readyState==4 && this.status==200){
    console.log(Http.responseText)
  }
}