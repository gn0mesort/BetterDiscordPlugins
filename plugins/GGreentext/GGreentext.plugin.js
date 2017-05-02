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
  onMessage: function () { setTimeout(this.convert(), 2000) },
  onSwitch: function () { this.convert() },
  oberserver: function (e) { },
  getSettingsPanel: function () { return '' },
  getName: function () { return 'GGreentext' },
  getDescription: function () { return 'Convert >quotes to greentext.<br /> Styling for greentext must be done in external CSS.'; },
  getVersion: function () { return '1.1.0' },
  getAuthor: function () { return 'gn0mesort' },
  convert: function () {
    let targets = $('.message-text .markup') // Select targets
    for (let i = 0; i < targets.length; ++i) { // For each target
      let target = $(targets[i]) // Select the current target
      if (!target.attr('handled.gnomesort.greentext') && target.find('code').length === 0) { // If not handled and not a code block
        let data = target.html().split('\n') // Split html on new line
        for (let j = 0; j < data.length; ++j) { // For each line
          if (j === 0) { // On the first line
            data[j] = data[j].replace(/>(\s*&gt;[^<]+)/g, '><span class="greentext">$1</span>') // Handle html intro and replace
          } else { // Otherwise
            data[j] = data[j].replace(/^(\s*&gt;[^<]+)/g, '<span class="greentext">$1</span>') // Replace text with span
          }
        }
        target.html(data.join('\n')) // Rejoin html
        target.attr('handled.gnomesort.greentext', true) // Set handled
      }
    }
  }
}
