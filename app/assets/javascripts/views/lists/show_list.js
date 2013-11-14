TrelloClone.Views.ShowList = Backbone.View.extend({
  template: JST["lists/show"],
  
  initialize: function() {
    this.cardViews = [],  
    this.listenTo(this.collection, "add", this.render)
  },
  
  events: {
    "submit #new-card-form": "makeNewCard",
    "click .trash-list": "deleteList"
  },
  
  render: function() {
    var renderedContent = this.template({
      list: this.model
    });
    
    this.$el.html(renderedContent);
    this.generateCardViews();
    
    return this;
  },
  
  generateCardViews: function() {
    var listView = this;
    listView.collection.each(function(card) {
      var cardView = new TrelloClone.Views.ShowCard({
        model: card,
        className: "card-el",
        id: "card-" + card.id
      });
      
      var cards = listView.$el.find('.cards'); 
      cards.append(cardView.render().$el);
      listView.cardViews.push(cardView);
    });
  },
  
  makeNewCard: function(event) {
    event.preventDefault();
    
    var newCardData = $(event.currentTarget).serializeJSON();
    var newCard = new TrelloClone.Models.Card(newCardData);
    
    var listView = this;
    newCard.save({list_id: listView.model.id}, {
      success: function() {
        listView.collection.add(newCard);
      },
      error: function() {
        notice = ["Something went wrong there, buddy"];
      }
    });
  },
  
  deleteList: function(event) {
    event.preventDefault();
    
    listView = this;
    this.model.destroy({
      success: function(model, response, options) {
        listView.$el.toggle("explode", {pieces: 49});
      }
    });
  }
});