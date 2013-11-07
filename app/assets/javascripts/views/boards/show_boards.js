TrelloClone.Views.ShowBoards = Backbone.View.extend({
  template: JST["boards/show"],
  
  initialize: function(options) {
    this.currentUser = options.currentUser;
  },
  
  render: function() {
    var renderedContent = this.template({
      currentUser: this.currentUser,
      boards: this.collection
    });
    
    this.$el.html(renderedContent);
    return this;
  }
})