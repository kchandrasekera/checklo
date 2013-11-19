TrelloClone.Models.List = Backbone.Model.extend({
  urlRoot: "/lists",
  
  cards: function() {
    if (!this._cards) {
      this._cards = new TrelloClone.Collections.Cards();
    }
    
    return this._cards;
  },
  
  parse: function(serverAttributes, options) {
    if (serverAttributes.cards) {
      this.cards().reset(serverAttributes.cards);
      this.cards().list_id = serverAttributes.id;
      delete serverAttributes.cards;
    }
    
    return serverAttributes;
  }
});