TrelloClone.Views.ShowBoard = Backbone.View.extend({
  template: JST["boards/show"],

  events: {
    "click .board": "viewBoard",
    "click .trash-card": "deleteBoard"
  },

  render: function() {
    renderedContent = this.template({
      board: this.model
    });

    this.$el.html(renderedContent);
    return this;
  },

  viewBoard: function(event) {
    Backbone.history.navigate("boards/" + this.model.id, {trigger: true});
  },

  deleteBoard: function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    this.$el.toggle("explode", {pieces: 81});
    $("li#board-item" + this.model.id).remove();

    this.model.destroy();
  }
});
