var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId:'6c26dd45-89bf-4bd6-a5f9-994615b39bcc',
    appPassword:'e3F9da1jVKQfr6BnAq9bB4n'
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

//bot.dialog('/', function (session) {
//    session.send("Hello World");
//});



var userResponse = {
    "Yes": {
        nextStep: "OK, Please check the secondary board."

    },
    "No": {
        nextStep: "OK, Please bring up primary board and try to login onto it."
    }
};

bot.dialog('/', [
    function (session) {
        //builder.Prompts.choice(session, "Is Primary Board up?", userResponse);

        session.send("hello ji");
    },
    function (session, results) {
            var response = userResponse[results.response.entity];
            session.send("%(nextStep)s",response);
    }

]);
