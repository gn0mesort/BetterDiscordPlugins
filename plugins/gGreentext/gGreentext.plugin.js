//META{"name":"gGreentext"}*//
/*
    Defines a plugin for BetterDiscord that simulates *Chan greentext quotes.
    Quotes that match the regular expression will be wrapped in span tags with the
    class "greentext" set. Any actual color changes should be done to this class in
    CSS.
*/

var gGreentext = function() {};

gGreentext.prototype.start = function() {
    this.convert(); //Convert on plugin start
};

gGreentext.prototype.load = function() {};

gGreentext.prototype.unload = function() {};

gGreentext.prototype.stop = function() {};

gGreentext.prototype.onMessage = function() {
    setTimeout(this.convert(), 2000); //Convert on recieving a message
};

gGreentext.prototype.onSwitch = function() {
    this.convert(); //Convert on switching channels
};

gGreentext.prototype.observer = function(e) {};

gGreentext.prototype.getSettingsPanel = function() {
    return "";
};

gGreentext.prototype.getName = function() {
    return "gGreentext";
};

gGreentext.prototype.getDescription = function() {
    return "Convert >quotes to greentext.<br /> Styling for greentext must be done in external CSS.";
};

gGreentext.prototype.getVersion = function() {
    return "1.0.0";
};

gGreentext.prototype.getAuthor = function() {
    return "gn0mesort";
};

gGreentext.prototype.convert = function() {
    $(".message-text .markup").each(function() { //Select elements of the class "markup" belonging to elements of the class "message-text"
        var target = $(this);
        if(target.find("code").length === 0){ //Don't bug code tags
            if(target.attr("handled.gnomesort.greentext") !== true){ //If not handled
                target.html(function(_, html){
                    return html.replace(/(&gt;\S[^\n<]*)/g, "<span class='greentext'>$1</span>"); //Convert to greentext
                });
                target.attr("handled.gnomesort.greentext", true); //Set handled
            }
        }
    });
}