TrelloClone.Views.ShowCard = Backbone.View.extend({
  template: JST["cards/show"],
  
  events: {
    "click .card": "showModal",
    "click #card-save": "saveChanges"
  },
  
  render: function() {
    renderedContent = this.template({
      card: this.model
    });
    
    this.$el.html(renderedContent);
    return this;
  },
  
  showModal: function(event) {
    // console.log(this.model.id);
    var modalTitle = this.model.get("card_name");
    var modalComment = this.model.get("comment");
    this.$el.find(".modal-title").html(modalTitle);
    this.$el.find(".modal-comment").html(modalComment);
  },
  
  saveChanges: function(event) {
    var cardName = this.$el.find(".modal-title").html();
    var cardComment = this.$el.find(".modal-comment").val();
    
    this.model.set({card_name: cardName, comment: cardComment});
    this.model.save({card_name: cardName, comment: cardComment});
    
    console.log(this.model);
  }
});