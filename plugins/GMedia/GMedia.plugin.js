//META{"name":"GMedia"}*//
/*
    Defines a plugin for BetterDiscord that allows for the playback of multimedia content using HTML5 audio and video.
    Builds on the premise of mediaSupport.plugin.js
*/

var GMedia = function () { }
GMedia.prototype = {
  start: function () { this.convert() },
  load: function () { },
  unload: function () { },
  stop: function () { },
  onMessage: function () { setTimeout(this.convert(), 3000) },
  onSwitch: function () { this.convert() },
  observer: function (e) { },
  getSettingsPanel: function () { return '' },
  getName: function () { return 'GMedia' },
  getDescription: function () { return 'Adds support for HTML5 media files. Now includes looping audio/video. Based on mediaSupport.plugin.js' },
  getVersion: function () { return '1.2.3' },
  getAuthor: function () { return 'gn0mesort' },
  convert: function () {
    let targets = $('.attachment-inner a, .markup>a') // Select targets
    let scroller = $('.scroller.messages')[0] // Select scroller
    let scroll = scroller ? scroller.scrollHeight - scroller.scrollTop === scroller.clientHeight : false // Whether or not the scroller is at the bottom of the page
    let dataFound = false // Whether or not data was found
    for (let i = targets.length - 1; i >= 0; --i) { // For each target
      let target = $(targets[i]) // Select the target
      if (!target.attr('handled.gnomesort.media') && target.attr('href')) { // If there's an href and not handled
        let href = target.attr('href').replace(/^(https?)/g, 'https') // Get the href
        let type = href.split('.')[href.split('.').length - 1].replace(/mp3/g, 'mpeg') // Get the file type
        let fileName = href.split('/')[href.split('/').length - 1] // Get the file name
        let loopControl = 'Loop: <input type="checkbox" name="loop" style="vertical-align: middle" onchange="$(this).parent().parent().find(\'video, audio\').attr(\'loop\', this.checked)" />' // A looping control
        let metaDataElement = $(`<div class="metadata gnomesort-metadata" style="font-size: 11px; color: gray"><a href="${href}" style="font-size: 11px; display: inline" handled.gnomesort.media="true">${fileName}</a> - ${type} - ${loopControl}</div>`) // The metadata for a file
        let metaData = null // The actual metadata element
        let data = null // The audio/video element
        if (type === 'mp4' || type === 'webm') { // If video
          data = $(`<video style="height: 320px; width: 30vw;" src="${encodeURI(href)}" type="video/${type}" controls=""></video>`) // Create video element
        } else if (type === 'mpeg' || type === 'ogg' || type === 'wav') { // If audio
          data = $(`<audio src="${encodeURI(href)}" type="audio/${type}" controls=""></audio>`) // Create audio element
        }
        if (data) { // If data was created
          dataFound = true // data found!
          console.log(`Media Found! type is ${type} & href is ${href}`) // Log
          target.replaceWith(data) // Replace the link with the video
          metaData = data.parent().find('.metadata:not(.gnomesort-metadata)') // Find the metadata element
          if (metaData.length > 0) { // If the metadata exists
            metaData.replaceWith(metaDataElement) // Swap for custom metadata
          } else { // Otherwise
            data.parent().append(metaDataElement) // Create metadata
          }
          data.parent().attr('handled.gnomesort.media', true) // Set handled
        }
      }
    }
    if (scroll && dataFound) { // If the message window needs to be scrolled
      scroller.scrollTop = scroller.scrollHeight // Scroll to bottom
      console.log('Scrolling to most recent!') // Log scrolling
    }
  }
}
