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
  onMessage: function () { setTimeout(this.convert(), 2000) },
  onSwitch: function () { this.convert() },
  observer: function (e) { },
  getSettingsPanel: function () { return '' },
  getName: function () { return 'GMedia' },
  getDescription: function () { return 'Adds HTML5 media support to Discord.<br /> Based on mediaSupport.plugin.js' },
  getVersion: function () { return '1.1.1' },
  getAuthor: function () { return 'gn0mesort' },
  convert: function () {
    let targets = $('.attachment-inner a, .markup>a') // Select targets
    let scroller = $('.scroller.messages')[0] // Select scroller
    for (let i = 0; i < targets.length; ++i) { // For each targer
      let target = $(targets[i]) // Select the target
      let scroll = scroller.scrollHeight - scroller.scrollTop === scroller.clientHeight // Calculate scroll value
      if (!target.attr('handled.gnomesort.media') && target.attr('href')) { // If there's an href and not handled
        let href = target.attr('href').replace(/^(https?)/g, 'https') // Get the href
        let type = href.split('.')[href.split('.').length - 1] // Get the file type
        let fileName = href.split('/')[href.split('/').length - 1] // Get the file name
        if (type === 'mp4' || type === 'webm') { // If video
          let video = $(`<video style="height: 320px; width: 30vw;" src="${encodeURI(href)}" type="video/${type}" controls=""></video>`) // Create video element
          let metaData = null // Declare metadata
          console.log(`Media Found! type is ${type} & href is ${href}`) // Log
          target.replaceWith(video) // Replace the link with the video
          metaData = video.parent().find('.metadata') // Find the metadata element
          if (metaData.length > 0) { // If the metadata exists
            metaData[0].innerText += ` - ${fileName} - ${type}` // Fill video metadata
          } else { // Otherwise
            video.parent().append(`<div class="metadata"><a href="${href}">${href}</a></div>`) // Create metadata
          }
          video.parent().attr('handled.gnomesort.media', true) // Set handled
        } else if (type === 'mp3' || type === 'ogg' || type === 'wav') { // If audio
          if (type === 'mp3') { type = 'mpeg' } // Convert mp3 to mpeg type
          let audio = $(`<audio src="${encodeURI(href)}" type="audio/${type}" controls=""></audio>`) // Create audio element
          let metaData = null // Declare metadata
          console.log(`Media Found! type is ${type} & href is ${href}`) // Log
          target.replaceWith(audio) // Replace link with audio
          metaData = audio.parent().find('.metadata') // Find the metadata element
          if (metaData.length > 0) { // If metadata exists
            metaData[0].innerText += ` - ${fileName} - ${type}` // Fill video metadata
          } else { // Otherwise
            audio.parent().append(`<div class="metadata"><a href="${href}">${href}</a></div>`) // Create metadata
          }
          audio.parent().attr('handled.gnomesort.media', true) // Set handled
        } else { scroll = false } // If no file is found don't scroll
      } else { scroll = false } // If skipping target don't scroll
      if (scroll) { // If the message window needs to be scrolled
        scroller.scrollTop = scroller.scrollHeight // Scroll to bottom
        console.log('Scrolling to most recent!') // Log scrolling
      }
    }
  }
}
