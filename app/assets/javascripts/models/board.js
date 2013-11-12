TrelloClone.Models.Board = Backbone.Model.extend({
  urlRoot: "/boards",
  
  lists: function() {
    if (!this._lists) {
      this._lists = new TrelloClone.Collections.Lists();
    }
    
    return this._lists;
  },
  
  parse: function(serverAttributes, options) {
    this.lists().reset(serverAttributes.lists, {parse: true});
    delete serverAttributes.lists;
    
    return serverAttributes;
  }
});