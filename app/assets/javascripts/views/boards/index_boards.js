TrelloClone.Views.IndexBoards = Backbone.View.extend({
  template: JST["boards/index"],
  
  initialize: function(options) {
    this.boardItems = [];
    this.currentUser = options.currentUser;
    this.listenTo(this.collection, "add", this.render);
  },
  
  events: {
    "submit #new-board-form": "makeNewBoard",
    "click .board": "boardView"
  },
  
  render: function() {
    var renderedContent = this.template({
      currentUserUsername: this.currentUser.username,
      boards: this.collection
    });
    
    this.$el.html(renderedContent);
    this.generateBoardItems();
    
    return this;
  },
  
  generateBoardItems: function() {
    var boardIndex = this;
    boardIndex.collection.each(function(board) {
      var boardItem = new TrelloClone.Views.ShowBoard({
        model: board,
        className: "board-item",
        id: "board-item" + board.id
      });
      
      var boards = boardIndex.$el.find('.boards'); 
      boards.append(boardItem.render().$el);
      boardIndex.boardItems.push(boardItem);
    });
  },
  
  makeNewBoard: function(event) {
    event.preventDefault();
    
    var newBoardData = $(event.currentTarget).serializeJSON();
    var newBoard = new TrelloClone.Models.Board(newBoardData);
    
    var boardsView = this;
    newBoard.save(null, {
      success: function(model, response, options) {
        boardsView.collection.add(newBoard);
        $("ul .dropdown-boards").append("<li><a href=#/boards/" + response.id + ">" + response.board_name + "</a></li>");
      },
      error: function() {
        notice = ["Something went wrong there, buddy"];
      }
    });
  }
});