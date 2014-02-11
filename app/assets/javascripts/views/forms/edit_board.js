TrelloClone.Views.EditBoard = Backbone.View.extend({
  template: JST["forms/editBoard"],

  events: {
    "submit .edit-board": "changeBoardName"
  },

  render: function() {
    var renderedContent  = this.template({
      board: this.model
    });

    this.$el.html(renderedContent);
    return this;
  },

  changeBoardName: function(event) {
    event.preventDefault();
    var newBoardName = $(event.currentTarget).serializeJSON().board.board_name;
    this.model.save({board_name: newBoardName}, {wait: true});
    $(this.el).trigger("updatedBoardName");
  }
});
