TrelloClone.Views.EditList = Backbone.View.extend({
  template: JST["forms/editList"],
  
  events: {
    "submit .edit-list": "changeListName"
  },
  
  render: function() {
    var renderedContent = this.template({
      list: this.model
    });
    
    this.$el.html(renderedContent);
    return this;
  },
  
  changeListName: function(event) {
    event.preventDefault();
    
    var newListName = $(event.currentTarget).serializeJSON().list.list_name;
    this.model.save({list_name: newListName}, {wait: true});
  }
});