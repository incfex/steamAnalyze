function fetch_popular_bytag(tag,channel="TopSellersRows"){
    //This defined the name of the function, it will take in 2 variables.  The first variable will be the tag of the games we want to fetch. The second variable decide which channel will the API call fetch the game from. There are total of four channels in the trending tag: “New and Trending”, “Top Selling”, “What’s Popular”, and “Upcoming”. The default had been set to “Top Selling”. So all the result got by this call will be return from that row.
    return new Promise((r,j) => {
        // This define a new Promise and return it. The reason for this is for HTML to load faster for user. When the webpage load to this part, without the promise, the browser will wait for the API call to return, which usually takes a rather long time. The promise allows other element on the webpage to load first, then when the API call got the answer, it can update the webpage to let the user see the result.
        var xhr = new XMLHttpRequest();
        // This defines a new raw XML Http Request which will then be modified to fit our use case, and then send to steam server.
        xhr.open('GET', `http://store.kra.moe/tags/en/${tag}`);
        xhr.open('GET', `http://store.kra.moe/tags/en/${tag}`);
        // This defined that this http request’s type is ‘GET’, which is usually used to get data from server. In the variable, we can see that the destination address is not steam server address. This is because cross site protection, more details can be read in the server proxy part. In short, that address will redirect the request to the steam store server. At the end of the address, the variable ‘tag’ was appended to get the information about that specific tag.        
        xhr.setRequestHeader('Accept-Language','en-US');
        // This line is optional in most systems. It defines the language the requester want to be US English. Without this header, the language will be the same with the system language. This line was added in case the user is using a system in languages other than English.
        xhr.send();
        // This sends out the http request we just constructed. The reason channel information was not defined in the request is that steam will return the json file that contains information about all four channels. Then the data processing will be complete on the user machine.
        xhr.onload = function(){
            // This line will be called when the client got a reply from the steam server. It will be feed a function to process the information we just got from steam server.
            if(this.status == 200){
                // First, the program will check whether the request has succeed. The status number of 200 means it successfully got the information it requested. Status number other than that means a failure, different number means different reason.
                var doc = new DOMParser().parseFromString(xhr.response, "text/html");
                var doc = new DOMParser().parseFromString(xhr.response, "text/html");
                // In the above lines, we have to create a XML document. When the steam server response, xhr will record the response data in its response field. The DOMParser object provides methods to build XMLDocument objects form XML formatted strings or streams. This time we will use one of its function called parseFromString. It is useful if we have an XML formatted text and we need to handle it as an XML document. The first variable is the xmlString, and the second variable is the media type. In this condition, the xml string will be the response we got from steam, and the format will be html. Now the parsed XML document will be stored into the newly created doc variable.                
                console.log(`http://store.kra.moe/tags/en/${tag}`, doc);
                // This command will output the request address we just made, and the response from the steam server. In the code it is mainly used to debug, and understand which API call has succeed.
                var game_list = [...doc.getElementById(channel).children]
                // Since the reply from the steam server had been parsed into XML format. We can now use some of XML functions to get the information we want. The above line will give us the children of the element named “channel”. So in this step, a list of games and their information that in the specified channel had been obtained.
                    .map(el => {
                        // The map will applied the function it received to every element in the list. This was required because there is a lot of excess information in the list that we do not really need, so we have to pick out the useful information from it.
                        return {appid: el.getAttribute('data-ds-appid'), 
                        // At here, we constructed a small data structure to store and return the data we got. The first piece of data we need is the appid. With appid, we can make other API calls to get the details about the game that are not in the API request we just made.
                                name: el.children[2].children[0].innerText, 
                                // The above line gave us the name of the steam game. The detail syntax of the above line might subject to change, because steam might update their system. The principle is to find the name, and write a getter that can get it all the time.
                                img: el.children[0].children[0].src}
                                // When we were exploring the data, we found that steam also include the address of the game’s thumbnail. If this line was wrote in the html, the website will fetch the thumbnail from steam server and display it on the screen. So this data is also included.
                    });
                r(game_list);
                // The above line means that if the promise has successfully fulfill its duty, it will then return the generated game_list variable that contains all the information we needed to display in the web page.
            }
            else j('Blyat');
            // In contrast, if the promise failed its purpose. It will return the above error message to the main caller of this API call. So the caller can handle this exception.
        }
    });
}