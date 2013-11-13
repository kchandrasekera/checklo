TrelloClone.Views.ShowCard = Backbone.View.extend({
  template: JST["cards/show"],
  
  initialize: function() {
    this.listenTo($("#cardModal-" + this.model.id), "hide.bs.modal", this.render);
  },
  
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
    var modalCompleted = this.model.get("completed");
    console.log(modalCompleted);
    this.$el.find(".modal-title").html(modalTitle);
    this.$el.find(".modal-comment").html(modalComment);
    this.$el.find(".modal-completed").prop('checked', modalCompleted);
  },
  
  saveChanges: function(event) {
    var cardName = this.$el.find(".modal-title").val();
    var cardComment = this.$el.find(".modal-comment").val();
    var cardCompleted = this.$el.find(".modal-completed:checked").val();
    cardCompleted = ((cardCompleted === "on") ? true : false)
    
    var changes = {card_name: cardName, comment: cardComment, completed: cardCompleted};
    
    this.model.set(changes);
    
    cardView = this;
    console.log("#cardModal-" + cardView.model.id);
    this.model.save(changes, {
      success: function() {
        $("#cardModal-" + cardView.model.id).modal("hide");    
      }
    });
  }
});