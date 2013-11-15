TrelloClone.Views.ShowList = Backbone.View.extend({
  template: JST["lists/show"],
  
  initialize: function() {
    this.cardViews = [],  
    this.listenTo(this.collection, "add", this.render)
  },
  
  events: {
    "submit #new-card-form": "makeNewCard",
    "click .trash-list": "deleteList",
    "update-list": "updateList",
    "card-removal": "cardRemoval",
    "card-addition": "cardAddition",
    "list-drop": "listDrop"
  },
  
  render: function() {
    var renderedContent = this.template({
      list: this.model
    });
    
    this.$el.html(renderedContent);
    this.generateCardViews();
    
    if (this.$(".cards").hasClass("ui-sortable")) {
      this.$(".cards").sortable("disable");
    }
    
    var oldList, newList, movingCard, movingCardIndex;
    this.$(".cards").sortable({
      start: function(event, ui) {
        movingCard = ui.item;
        movingCardIndex = ui.item.index();
        newList = oldList = ui.item.parent();
        console.log("in start");
        console.log(ui.item.parent());
      },
      // change: function(event, ui) {
      //   if (ui.sender) {
      //     newList = ui.item.parent();
      //     console.log("in change");
      //     console.log(ui.item.parent());
      //   }
      // },
      stop: function(event, ui) {
        // newList = ui.item.parent();
        // console.log(oldList);
        // console.log(newList);
        // console.log(ui.sender);
        // console.log(!!(oldList == newList));
        // console.log(!!(ui.sender));
        // if (oldList == newList) {
        //   console.log("the proper place");
        //   movingCard.trigger("card-reorder", ui.item.index());
        // }
        // else {
        //   var movingModel = movingCard.trigger("get-card");
        //   oldList.trigger("card-removal", movingModel, movingCardIndex);
        //   newList.trigger("card-addition", movingModel, ui.placeholder.index());
        // }
        console.log("in stop");
        console.log(ui.item.parent());
        console.log(ui.sender);
        if (!!(ui.sender)) {
          var movingModel = movingCard.trigger("get-card");
          console.log(movingModel);
          oldList.trigger("card-removal", movingModel, movingCardIndex);
          newList.trigger("card-addition", movingModel, ui.placeholder.index());   
        }
        else {
          movingCard.trigger("card-reorder", ui.item.index());
        }
      },
      connectWith: ".cards"
    });
    
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
  },
  
  updateList: function(event, movedModel, movedToPosition) {
    console.log(movedModel);
    console.log(movedToPosition);
    this.collection.remove(movedModel);
    
    this.collection.each(function(model, index) {
      var ordinal = index;
      if (index >= movedToPosition) {
        ordinal += 1;
        model.set("position", ordinal + 1);
      }
    });
    
    movedModel.set("position", movedToPosition + 1);
    this.collection.add(movedModel, {at: movedToPosition});
    
    this.collection.each(function(card) {
      card.save();
    });
  },
  
  cardRemoval: function(event, movedModel, movedFromPosition) {
    this.collection.remove(movedModel);
    
    this.collection.each(function(card, index) {
      if (index > movedFromPosition) {
        card.set("position", index);
      }
    });
    
    this.collection.each(function(card){
      card.save();
    });
  },
  
  cardAddition: function(event, movedModel, movedToPosition) {
    this.collection.each(function(card, index) {
      var ordinal = index;
      if (index >= movedToPosition) {
        ordinal += 1;
        card.set("position", ordinal + 1);
      }
    });
    
    movedModel.set("position", movedToPosition + 1);
    this.collection.add(movedModel, {at: movedToPosition});
    
    this.collection.each(function(card) {
      card.save();
    });
  },
  
  listDrop: function(event, index) {
    this.$el.trigger("update-board", [this.model, index]);
  }
});