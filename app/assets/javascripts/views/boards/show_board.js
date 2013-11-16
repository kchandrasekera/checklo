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
  
  // deleteBoard: function(event) {
  //   event.preventDefault();
  //   event.stopImmediatePropagation();
  //   
  //   boardItem = this;
  //   boardItem.model.destroy({
  //     success: function(model, response, options) {
  //       boardItem.$el.toggle("explode", {pieces: 81});
  //       $("ul.dropdown-boards").remove("li#board-item" + boardItem.model.id);
  //       
  //     }
  //   });
  // }
  
  deleteBoard: function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    
    this.$el.toggle("explode", {pieces: 81});
    $("li#board-item" + this.model.id).remove();
    
    this.model.destroy();
  }
  
  // deleteBoard: function(event) {
  //   this.$el.trigger("remove-board", this);
  // }
});