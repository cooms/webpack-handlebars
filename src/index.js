var wombleList = require('./templates/womble-list.hbs')
var detailsTemplate = require('./templates/details.hbs')
var headerTemplate = require('./templates/header.hbs')
var testTemplate = require('./templates/test.hbs')

// Once the DOM has loaded, refresh content with the new var 'wombles'
document.addEventListener('DOMContentLoaded', function () {

  var wombles = [
    { name: 'Orinocco', email: 'orinocco@wimbledoncommon.net', details: 'Tin cans' },
    { name: 'Tomsk', email: 'tomsk@wimbledoncommon.net', details: 'Plastic bags' },
    { name: 'Bungo', email: 'bungo@wimbledoncommon.net', details: 'Discarded wombat poop' }
  ]

  var header = {
    title: 'Wombles',
    subtitle: 'They Clean up'
  }

  refreshContent(header, wombles)

})

// Appends the div wombleList with the womble contents to the womble-list.hbs
function refreshContent (header, wombles) {
  var div = document.createElement('div')
  div.innerHTML = wombleList({
    header: header,
    wombles: wombles
  })
  document.body.appendChild(div)
  bindEventListeners(wombles)
}




// Event listeners below
// -------------------------




function bindEventListeners (wombles) {
  var lis = document.getElementsByTagName('li')
  for (var i = 0; i < lis.length; i++) {
    lis[i].addEventListener('click', function (e) {
      wombleToggle(e.target, wombles)
    })
  }
}

function wombleToggle (target, wombles) {
  console.log(target.lastChild.tagName)
  if (target.lastChild.tagName === 'UL') {
    target.removeChild(target.lastChild)
    return
  }
  appendDetails(target, wombles)
}

function appendDetails (target, wombles) {
  var match = null
  for (var i = 0; i < wombles.length; i++) {
    if (wombleMatch(target.innerHTML, wombles[i])) {
      match = wombles[i]
    }
  }
  expandWomble(match, target)
}

function wombleMatch (innerHTML, wombat) {
  return innerHTML.includes(wombat.email)
}

function expandWomble (match, target) {
  if (match) {
    var ul = document.createElement('ul')
    ul.innerHTML = detailsTemplate(match)
    target.appendChild(ul)
  }
}
