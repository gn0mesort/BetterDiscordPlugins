//META{"name":"gMedia"}*//
/*
    Defines a plugin for BetterDiscord that allows for the playback of multimedia content using HTML5 audio and video.
    Builds on the premise of mediaSupport.plugin.js
*/

var gMedia = function() {};

gMedia.prototype.start = function() {
    this.convert(); //Convert on plugin start
};

gMedia.prototype.load = function() {};

gMedia.prototype.unload = function() {};

gMedia.prototype.stop = function() {};

gMedia.prototype.onMessage = function() {
    setTimeout(this.convert(), 2000); //Convert on message recieved
};

gMedia.prototype.onSwitch = function() {
    this.convert(); //Convert on channel switch
};

gMedia.prototype.observer = function(e) {};

gMedia.prototype.getSettingsPanel = function() {
    return "";
};

gMedia.prototype.getName = function() {
    return "gMedia";
};

gMedia.prototype.getDescription = function() {
    return "Adds HTML5 media support to Discord.<br /> Based on mediaSupport.plugin.js";
};

gMedia.prototype.getVersion = function() {
    return "1.0.1";
};

gMedia.prototype.getAuthor = function() {
    return "gn0mesort";
};

gMedia.prototype.convert = function() {
    var count = 0; //Count of the number of multimedia files recognized
    $(".message a").each(function(){ //For each <a> element with a parent of the class "message"
        var target = $(this); //This element
        var href = target.attr("href").replace("http:", "https:"); //Discord only likes HTTPS
        var scroller = $(".scroller.messages")[0]; //The message scroller window
        var scroll = scroller.scrollHeight - scroller.scrollTop === scroller.clientHeight; //Whether or not the user has scrolled away from the most recent message

        if(href !== undefined) { //If href exists
            var type = href.split(".")[href.split(".").length - 1].toLowerCase(); //Get the file type
            var fileName = href.split("/")[href.split("/").length - 1]; //Get the file name
            if(type === "mp4" || type == "webm") { //If video
                console.log("Media Found! type is " + type + " href is " + href); //Log video found
                target.replaceWith("<video id='video" + count + "' style='height: 320px; width: 30vw;' src='" + encodeURI(href) + "' type='video/" + type + "' controls=''></video>"); //Replace <a> element with <video> element
                $("#video" + count++).parent().find(".metadata")[0].innerText += " - " + fileName + " - " + type; //Fill video metadata
            }
            else if(type === "mp3" || type === "ogg" || type === "wav") { //If audio
                if(type === "mp3"){ type = "mpeg"; } //Convert mp3 to mpeg type
                console.log("Media Found! type is " + type + " & href is " + href); //Log audio found
                target.replaceWith("<audio id='audio" + count + "' src='" + encodeURI(href) + "' type='audio/" + type + "' controls=''></audio>"); //Replace <a> element with <audio> element
                $("#audio" + count++).parent().find(".metadata")[0].innerText += " - " + fileName + " - " + type; //Fill audio metadata
            }
            else{ scroll &= false; } //If not audio or video definitely don't scroll
        }
        else{ scroll &= false; } //If not defined don't scroll
        if(scroll) { //If the message window needs to be scrolled 
            scroller.scrollTop = scroller.scrollHeight; //Scroll to bottom
            console.log("Scrolling to most recent!"); //Log scrolling
         }
    });
}