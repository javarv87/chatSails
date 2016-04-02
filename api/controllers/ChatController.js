/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	addConversation: function(req, res) {
    var dataClient = req.params.all();
    if(req.isSocket && req.method === 'POST') {
      Chat.create(dataClient).exec(function(err, dataClient) {
        Chat.publishCreate({
          id: dataClient.id,
          user: dataClient.user,
          message: dataClient.message
        })
      })
    } else if(req.isSocket) {
      Chat.watch(req.socket);
    }
  }
};
