TrelloClone.AppRouter = Backbone.Router.extend({
  routes: {
    "users/:user_id": "showBoards"
  },
  
  showBoards: function(user_id) {
    var boardView = new TrelloClone.Views.ShowBoards({
      collection: TrelloClone.boards.get(user_id)
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
    $("content").html(newView.$el);
  }
});