TrelloClone.Views.BoardView = Backbone.View.extend({
  template: JST["boards/view"],

  initialize: function() {
    this.listViews = [];
    this.listenTo(this.collection, "add", this.render);
    this.listenTo(this.model, "sync", this.render);
    this.editingBoardTitle = false;
  },

  events: {
    "submit #new-list-form": "makeNewList",
    "update-board": "updateBoard",
    "click .board-title": "editBoard",
    "updatedBoardName": function() {this.editingBoardTitle = false;}
  },

  render: function() {
    var renderedContent = this.template({
      board: this.model
    });

    this.$el.html(renderedContent);
    this.generateListViews();

    if (this.$(".lists").hasClass("ui-sortable")) {
      this.$(".lists").sortable("disable");
    }
    this.$(".lists").sortable({
      update: function(event, ui) {
        ui.item.trigger("list-drop", ui.item.index());
      }
    });

    return this;
  },

  generateListViews: function() {
    var boardView = this;
    boardView.collection.each(function(list) {
      var listView = new TrelloClone.Views.ShowList({
        model: list,
        collection: list.cards(),
        className: "list-el",
        id: "list-" + list.id
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
  },

  updateBoard: function(event, movedList, movedToIndex, associatedCards) {
    this.collection.remove(movedList);

    this.collection.each(function(list, index) {
      var ordinal = index;
      if (index >= movedToIndex) {
        ordinal += 1;
        list.set("position", ordinal + 1);
      }
    });

    movedList.set("position", movedToIndex + 1);

    this.collection.add(movedList, {at: movedToIndex});

    this.collection.each(function(list) {
      list.save();
    });
  },

  editBoard: function(event) {
    if (!this.editingBoardTitle) {
      this.editingBoardTitle = true;
      var editBoard = new TrelloClone.Views.EditBoard({model: this.model});
      $(event.target).html(editBoard.render().$el);
    }
  }
});
