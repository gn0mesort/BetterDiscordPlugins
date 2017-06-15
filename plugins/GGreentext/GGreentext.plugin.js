//META{"name":"GGreentext"}*//
/*
    Defines a plugin for BetterDiscord that simulates *Chan greentext quotes.
    Quotes that match the regular expression will be wrapped in span tags with the
    class "greentext" set.
*/

var GGreentext = function () { }
GGreentext.prototype = {
  start: function () { this.convert() },
  load: function () { },
  unload: function () { },
  stop: function () { },
  onMessage: function () { setTimeout(this.convert(), 3000) },
  onSwitch: function () { this.convert() },
  oberserver: function (e) { setTimeout(this.convert(), 3000) },
  getSettingsPanel: function () { return '' },
  getName: function () { return 'GGreentext' },
  getDescription: function () { return 'Convert >quotes to greentext. Wraps quotes in <span class="greentext"></span>. Style .greentext in custom CSS to get any color you like. The default color is #789922' },
  getVersion: function () { return '1.1.2' },
  getAuthor: function () { return 'gn0mesort' },
  convert: function () {
    let targets = $('.message-text .markup') // Select targets
    for (let i = targets.length - 1; i >= 0; --i) { // For each target
      let target = $(targets[i]) // Select the current target
      if (!target.attr('handled.gnomesort.greentext')) { // If not handled
        target.html(target.html().replace(/(^|>)(\s*&gt;[^<\n]+)/gm, '$1<span class="greentext" style="color: #789922">$2</span>')) // Markup text according to regex
        target.attr('handled.gnomesort.greentext', true) // Set handled
      }
    }
  }
}
