TrelloClone.AppRouter = Backbone.Router.extend({
  routes: {
    "": "showIndex",
    "users/:user_id": "showBoards"
  },
  
  showIndex: function() {
    console.log("You're in the index");
  },
  
  showBoards: function(user_id) {
    var boardView = new TrelloClone.Views.ShowBoards({
      currentUser: currentUser,
      collection: TrelloClone.boards
    });
    
    this._swapView(boardView);
  },
  
  _swapView: function(newView) {
    if (this._prevView) {
      this._prevView.stopListening();
      this._prevView.remove();
    }
    
    this._prevView = newView;
    newView.render();
    $("#content").html(newView.$el);
  }
});