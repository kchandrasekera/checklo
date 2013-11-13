TrelloClone.Views.IndexBoards = Backbone.View.extend({
  template: JST["boards/index"],
  
  initialize: function(options) {
    this.currentUser = options.currentUser;
    this.listenTo(this.collection, "add", this.render);
  },
  
  events: {
    "submit #new-board-form": "makeNewBoard"
  },
  
  render: function() {
    var renderedContent = this.template({
      currentUserUsername: this.currentUser.username,
      boards: this.collection
    });
    
    this.$el.html(renderedContent);
    return this;
  },
  
  makeNewBoard: function(event) {
    event.preventDefault();
    
    var newBoardData = $(event.currentTarget).serializeJSON();
    var newBoard = new TrelloClone.Models.Board(newBoardData);
    
    var boardsView = this;
    newBoard.save(null, {
      success: function(model, response, options) {
        boardsView.collection.add(newBoard, {at: 0});
        $("ul .dropdown-boards").prepend("<li><a href=#/boards/" + response.id + ">" + response.board_name + "</a></li>");
      },
      error: function() {
        notice = ["Something went wrong there, buddy"];
      }
    });
  }
})