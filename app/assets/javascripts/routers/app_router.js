TrelloClone.AppRouter = Backbone.Router.extend({
  routes: {
    "": "indexBoards",
    "boards/:board_id": "boardView"
  },

  indexBoards: function(user_id) {
    var boardsView = new TrelloClone.Views.IndexBoards({
      currentUser: currentUser,
      collection: TrelloClone.boards
    });

    this._swapView(boardsView);
  },

  boardView: function(board_id) {
    var boardView = new TrelloClone.Views.BoardView({
      model: TrelloClone.boards.get(board_id),
      collection: TrelloClone.boards.get(board_id).lists(),
      className: "board-el",
      id: "board-" + board_id
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
