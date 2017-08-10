/*
  CONGRATULATIONS on creating your first Botpress bot!

  This is the programmatic entry point of your bot.
  Your bot's logic resides here.
  
  Here's the next steps for you:
  1. Read this file to understand how this simple bot works
  2. Read the `content.yml` file to understand how messages are sent
  3. Install a connector module (Facebook Messenger and/or Slack)
  4. Customize your bot!

  Happy bot building!

  The Botpress Team
  ----
  Getting Started (Youtube Video): https://www.youtube.com/watch?v=HTpUmDz9kRY
  Documentation: https://botpress.io/docs
  Our Slack Community: https://slack.botpress.io
*/
var actions = require('./app/nlp/actions')

module.exports = function(bp) {
  // Listens for a first message (this is a Regex)
  // GET_STARTED is the first message you get on Facebook Messenger
  bp.hear(/GET_STARTED/i, (event, next) => {
    event.reply('#greeting') // See the file `content.yml` to see the block
  })

  bp.hear({ 'nlp.action': 'yahooWeatherForecast' }, (event, next) => {
    var act = actions[event.nlp.action](event.nlp.parameters)
    act.then(function(result) {
      var data = JSON.parse(result.data)
      event.reply('#condition', {
        condition: data.current.condition.text,
        city: result.city
      })
    }, function(err) {})
  })

  bp.hear({ 'nlp.action': 'greet' }, (event, next) => {
    event.reply('#greeting')
  })

  bp.hear('GREETING.B1', (event, next) => {
    event.reply('#promptLocation')
  })

  bp.hear('GETSTARTED.B1', (event, next) => {
    event.reply('#promptLocation')
  })

  bp.hear('CONDITION.B1', (event, next) => {
    event.reply('#promptLocation')
  })

}

