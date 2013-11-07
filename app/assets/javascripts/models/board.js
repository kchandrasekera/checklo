TrelloClone.Models.Board = Backbone.Model.extend({
  urlRoot: "/boards",
  
  lists: function() {
    if (!this._lists) {
      this._lists = new TrelloClone.Collections.Lists();
    }
    
    return this._lists;
  },
  
  parse: function(serverAttributes, options) {
    // console.log(serverAttributes.lists);
    this.lists().reset(serverAttributes.lists, {parse: true});
    // console.log(this.lists());
    delete serverAttributes.lists;
    
    return serverAttributes;
  }
});