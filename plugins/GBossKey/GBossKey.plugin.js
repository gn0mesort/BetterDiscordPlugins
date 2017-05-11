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
  load: function () { },
  getName: function () { return 'GBossKey' },
  getDescription: function () { return 'Press a key to minimize Discord. Any key may be bound using this plugin\'s settings panel.' },
  getVersion: function () { return '1.0.2' },
  getAuthor: function () { return 'gn0mesort' },
  getSettingsPanel: function () {
    return `<div>Boss Key: <button style="width: 30vw;" onclick="GBossKey.prototype.readKey(this);">${this.key}</button></div>`
  },
  key: 19,
  hideWindow: function (event) {
    if (event.which === event.data.key) {
      remote.BrowserWindow.getFocusedWindow().minimize()
      console.log('Minimized Window')
    }
  },
  readKey: function (element) {
    $(document).off('keyup.gnomesort')
    $(document).on('keyup.reading.gnomesort', function (event) {
      let plugin = BdApi.getPlugin('GBossKey')
      plugin.key = event.which
      element.innerText = event.which
      $(document).off('keyup.reading.gnomesort')
      bdPluginStorage.set('GBossKey', 'key', event.which)
      plugin.start()
    })
    element.innerText = 'Waiting for input...'
  }
}

const { remote } = require('electron')
