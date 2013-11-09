TrelloClone.Views.ShowCard = Backbone.View.extend({
  template: JST["cards/show"],
  
  render: function() {
    renderedContent = this.template({
      card: this.model
    });
    
    this.$el.html(renderedContent);
    return this;
  }
});