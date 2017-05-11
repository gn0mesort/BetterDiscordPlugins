//META{"name":"GSpellCheck"}*//
/*
  Defines a plugin that enables basic spellchecking features in Discord
  It uses Typo.js for spell checking and Electron's built in spellcheck functionality
  for rendering
*/

var GSpellCheck = function () { }
GSpellCheck.prototype = {
  getName: function () { return 'GSpellCheck' },
  getDescription: function () { return 'Add spellchecking with Typo.js' },
  getVersion: function () { return '1.0.3' },
  getAuthor: function () { return 'gn0mesort' },
  load: function () { },
  unload: function () { },
  start: function () {
    const { webFrame } = require('electron') // Load webFrame from Electron
    // Load Typo object using LibreOffice dictionary
    this.spellChecker.typo = new Typo('en_US', false, false, {
      dictionaryPath: 'https://raw.githubusercontent.com/LibreOffice/dictionaries/master/en'
    })
    // Perform logging to ensure correct operation
    console.log(`Typo Loaded with dictionary ${this.spellChecker.typo.dictionary} from ${this.spellChecker.typo.settings.dictionaryPath}`)
    console.log(`mispeling is ${this.spellChecker.spellCheck('mispeling') ? 'correct' : 'misspelled'}`)
    webFrame.setSpellCheckProvider('en-US', true, this.spellChecker) // start provider
    $('textarea').on('contextmenu.gnomesort', { spellChecker: this.spellChecker }, this.contextMenu) // Enable context menu
  },
  stop: function () {
    const { webFrame } = require('electron') // Load webFrame from Electron
    $('textarea').off('contextmenu.gnomesort') // Disable context menu
    webFrame.setSpellCheckProvider('', false, this.spellCheckerDisable) // Disable provider
  },
  onMessage: function () { },
  onSwitch: function () {
    $('textarea').off('contextmenu.gnomesort') // Disable context menu
    $('textarea').on('contextmenu.gnomesort', { spellChecker: this.spellChecker }, this.contextMenu) // Reenable
  },
  observer: function (e) { },
  spellChecker: { // SpellChecker object
    typo: null, // The Typo object that underlies this SpellChecker
    spellCheck: function (text) { // Wrapper spellCheck function
      return this.typo.check(text)
    }
  },
  spellCheckerDisable: { // Disable checking by always returning true
    spellCheck: function (text) { return true }
  },
  contextMenu: function (event) { // set context menu event
    const { remote } = require('electron') // Load remote from Electron
    const Menu = remote.Menu // Menus from remote
    const MenuItem = remote.MenuItem // MenuItems from remote
    let selection = window.getSelection().toString() // get selected text
    let suggestions = event.data.spellChecker.typo.suggest(selection, 10) // get suggestions
    if (suggestions.length > 0) { // If suggestions are found
      event.stopPropagation() // If suggestion menu is open don't do any more menus
      let spellerMenu = new Menu() // Create the context menu
      spellerMenu.clickEvent = function (menuItem) { // Click function for menu options. Simply replaces the word inline
        let area = $(window.getSelection().anchorNode.childNodes[window.getSelection().anchorOffset])
        area.val(area.val().slice(0, area[0].selectionStart) + menuItem.label + area.val().slice(area[0].selectionEnd, area.val().length))
      }
      for (let suggestion of suggestions) { // Add each option to the context menu
        spellerMenu.append(new MenuItem({ label: suggestion, click: spellerMenu.clickEvent }))
      }
      spellerMenu.popup(remote.getCurrentWindow(), { async: true }) // Display context menu
    }
  }
}

// Load Typo.js
let typoScript = document.createElement('script')
typoScript.setAttribute('src', 'https://cdn.rawgit.com/gn0mesort/Typo.js/251400d6e4fd1ecbdf3dac759a2d628839afe453/typo/typo.js')
document.head.appendChild(typoScript)
