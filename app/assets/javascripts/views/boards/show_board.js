TrelloClone.Views.ShowBoard = Backbone.View.extend({
  template: JST["boards/show"],
  
  initialize: function() {
    this.listViews = [],
    this.listenTo(this.collection, "add", this.render)
  },
  
  events: {
    "submit #new-list-form": "makeNewList"
  },
  
  render: function() {
    var renderedContent = this.template({
      board: this.model
    });
    
    this.$el.html(renderedContent);
    this.generateListViews();
    
    return this;
  },
  
  generateListViews: function() {
    var boardView = this;
    boardView.collection.each(function(list) {
      var listView = new TrelloClone.Views.ShowList({
        model: list,
        collection: list.cards()
      });
      
      var lists = boardView.$el.find('.lists');
      lists.append(listView.render().$el);
      boardView.listViews.push(listView);
    });
  },
  
  makeNewList: function(event) {
    event.preventDefault();
    
    var newListData = $(event.currentTarget).serializeJSON();
    var newList = new TrelloClone.Models.List(newListData);

    
    var boardView = this;
    newList.save({board_id: boardView.model.id}, {
      success: function() {
        boardView.collection.add(newList);
      },
      error: function() {
        notice = ["Something went wrong there, buddy"];
      }
    });
  }
});