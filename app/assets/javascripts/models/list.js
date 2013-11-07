TrelloClone.Models.List = Backbone.Model.extend({
  urlRoot: "/lists",
  
  cards: function() {
    if (!this._cards) {
      this._cards = new TrelloClone.Collections.Cards();
    }
    
    return this._cards;
  },
  
  parse: function(serverAttributes, options) {
    // console.log(serverAttributes.list.cards);
    this.cards().reset(serverAttributes.cards);
    // console.log(this.cards());
    delete serverAttributes.cards;
    
    return serverAttributes;
  }
});