//META{"name":"GGreentext"}*//
/*
    Defines a plugin for BetterDiscord that simulates *Chan greentext quotes.
    Quotes that match the regular expression will be wrapped in span tags with the
    class "greentext" set. Any actual color changes should be done to this class in
    CSS.
*/

var GGreentext = function () { }
GGreentext.prototype = {
  start: function () { this.convert() },
  load: function () { },
  unload: function () { },
  stop: function () { },
  onMessage: function () { setTimeout(this.convert(), 3000) },
  onSwitch: function () { this.convert() },
  oberserver: function (e) { },
  getSettingsPanel: function () { return '' },
  getName: function () { return 'GGreentext' },
  getDescription: function () { return 'Convert >quotes to greentext.<br /> Styling for greentext must be done in external CSS.' },
  getVersion: function () { return '1.1.1' },
  getAuthor: function () { return 'gn0mesort' },
  convert: function () {
    let targets = $('.message-text .markup') // Select targets
    for (let i = targets.length - 1; i >= 0; --i) { // For each target
      let target = $(targets[i]) // Select the current target
      if (!target.attr('handled.gnomesort.greentext')) { // If not handled and not a code block
        target.html(target.html().replace(/(^|>)(\s*&gt;[^<\n]+)/gm, '$1<span class="greentext">$2</span>')) // Markup text according to regex
        target.attr('handled.gnomesort.greentext', true) // Set handled
      }
    }
  }
}
