//META{"name":"GGreentext"}*//
/*
    Defines a plugin for BetterDiscord that simulates *Chan greentext quotes.
    Quotes that match the regular expression will be wrapped in span tags with the
    class "greentext" set. Any actual color changes should be done to this class in
    CSS.
*/

var GGreentext = function() {};
GGreentext.prototype = {
    start: function() { this.convert; },
    load: function() {},
    unload: function() {},
    stop: function() {},
    onMessage: function() { setTimeout(this.convert(), 2000); },
    onSwitch: function() { this.convert(); },
    oberserver: function(e) {},
    getSettingsPanel: function() { return ''; },
    getName: function() { return 'GGreentext'; },
    getDescription: function() { return 'Convert >quotes to greentext.<br /> Styling for greentext must be done in external CSS.'; },
    getVersion: function(){ return '1.0.1'; },
    getAuthor: function() { return 'gn0mesort'; },
    convert: function() {
        $(".message-text .markup").each(function() { //Select elements of the class "markup" belonging to elements of the class "message-text"
            let target = $(this);
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