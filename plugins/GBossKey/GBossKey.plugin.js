//META{"name":"GBossKey"}*//
/**
 * Define a BetterDiscord plugin for minimizing the window.
 */
var GBossKey = function () { }
GBossKey.prototype = {
  start: function () {
    let configKey = bdPluginStorage.get('GBossKey', 'key')
    if (configKey) { this.key = configKey }
    $(document).on('keyup.gnomesort', { key: this.key }, this.hideWindow)
  },
  stop: function () { $(document).off('keyup.gnomesort') },
  load: function () { 
    let plugin = this
    $.ajax({
      url: 'https://raw.githubusercontent.com/gn0mesort/BetterDiscordPlugins/master/plugins/GBossKey/keys.json',
      async: false,
      dataType: 'json'
    }).done(function (data) {
      plugin.keyCodes = data
    })
  },
  getName: function () { return 'GBossKey' },
  getDescription: function () { return 'Press a key to minimize Discord. Any key may be bound using this plugin\'s settings panel.' },
  getVersion: function () { return '1.0.3' },
  getAuthor: function () { return 'gn0mesort' },
  getSettingsPanel: function () {
    return `<div>Boss Key: <button style="width: 30vw;" onclick="GBossKey.prototype.readKey(this);">${this.keyCodes[this.key]}</button></div>`
  },
  key: 19,
  keyCodes: null,
  hideWindow: function (event) {
    if (event.which === event.data.key) {
      const { remote } = require('electron') // Load remote from Electron
      remote.BrowserWindow.getFocusedWindow().minimize()
      console.log('Minimized Window')
    }
  },
  readKey: function (element) {
    $(document).off('keyup.gnomesort')
    $(document).on('keyup.reading.gnomesort', function (event) {
      let plugin = BdApi.getPlugin('GBossKey')
      plugin.key = event.which
      element.innerText = plugin.keyCodes[event.which]
      $(document).off('keyup.reading.gnomesort')
      bdPluginStorage.set('GBossKey', 'key', event.which)
      plugin.start()
    })
    element.innerText = 'Waiting for input...'
  }
}
