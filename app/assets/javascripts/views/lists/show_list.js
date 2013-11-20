TrelloClone.Views.ShowList = Backbone.View.extend({
  template: JST["lists/show"],
  
  initialize: function() {
    this.cardViews = [];
    this.listenTo(this.collection, "add", this.render);
    this.listenTo(this.model, "sync", this.render);
  },
  
  events: {
    "submit #new-card-form": "makeNewCard",
    "click .trash-list": "deleteList",
    "update-list": "updateList",
    "card-removal": "cardRemoval",
    "card-addition": "cardAddition",
    "list-drop": "listDrop",
    "click legend": "editList"
  },
  
  render: function() {
    var renderedContent = this.template({
      list: this.model
    });
    
    this.$el.html(renderedContent);
    this.generateCardViews();
    
    this.makeSortable();
    
    return this;
  },
  
  makeSortable: function () {
    if (this.$(".cards").hasClass("ui-sortable")) {
      this.$(".cards").sortable("disable");
    }
    
    var that = this;
    var oldList, newList, movingCard, movingCardIndex, movingCardModel;
    this.$(".cards").sortable({
      connectWith: ".cards",
      start: function(event, ui) {
        movingCard = ui.item;
        movingCardIndex = ui.item.index();
        movingCardModel = that.collection.at(movingCardIndex);
        newList = oldList = ui.item.parent();
      },
      stop: function(event, ui) {
        newList = ui.item.parent();
        if (newList.is(oldList)) {
           movingCard.trigger("card-reorder", ui.item.index());
        }
        else { 
          oldList.trigger("card-removal", [movingCardModel, movingCardIndex]);
          newList.trigger("card-addition", [movingCardModel, ui.item.index()]);  
        }
      }
    });
  },
  
  generateCardViews: function() {
    var listView = this;
    listView.collection.each(function(card) {
      console.log(card);
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
  },
  
  updateList: function(event, movedModel, movedToIndex) {
    this.collection.remove(movedModel);
    
    this.collection.each(function(model, index) {
      var ordinal = index;
      if (index >= movedToIndex) {
        ordinal += 1;
        model.set("position", ordinal + 1);
      }
    });
    
    movedModel.set("position", movedToIndex + 1);
    this.collection.add(movedModel, {at: movedToIndex});
    
    this.collection.each(function(card) {
      card.save();
    });
  },
  
  cardRemoval: function(event, movedModel, movedFromIndex) {
    console.log(event, movedModel, movedFromIndex);
    
    this.collection.remove(movedModel);
    
    this.collection.each(function(card, index) {
      if (index > movedFromIndex) {
        card.set("position", index);
      }
    });
    
    this.collection.each(function(card){
      card.save();
    });
  },
  
  cardAddition: function(event, movedModel, movedToIndex) {
    this.collection.each(function(card, index) {
      var ordinal = index;
      if (index >= movedToIndex) {
        ordinal += 1;
        card.set("position", ordinal + 1);
      }
    });
    
    movedModel.set("position", movedToIndex + 1);
    movedModel.set("list_id", this.collection.list_id);
    this.collection.add(movedModel, {at: movedToIndex});
    
    this.collection.each(function(card) {
      card.save();
    });
  },
  
  listDrop: function(event, index) {
    this.$el.trigger("update-board", [this.model, index, this.collection]);
  },
  
  editList: function(event) {
    var editList = new TrelloClone.Views.EditList({model: this.model});
    
    $(event.target).html(editList.render().$el);
  }
});