TrelloClone.Views.ShowCard = Backbone.View.extend({
  template: JST["cards/show"],
  
  initialize: function() {
    var that = this;
    this.listenTo(this.model, 'change', function () {
      setTimeout(this.render.bind(that), 350);
    });
  },
  
  events: {
    "click .card": "showModal",
    "click .card-save": "saveChanges"
    // "hide.bs.modal .modal": "render"
  },
  
  render: function() {
    renderedContent = this.template({
      card: this.model
    });
    
    this.$el.html(renderedContent);
    if (this.model.get("completed")) {
      this.$el.find(".card").addClass("completed");
    }
    return this;
  },
  
  showModal: function(event) {
    var modalTitle = this.model.get("card_name");
    var modalComment = this.model.get("comment");
    var modalCompleted = this.model.get("completed");
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
    this.model.save(changes, {
      success: function() {
        $("#cardModal-" + cardView.model.id).modal("hide");    
      }
    });
  }
});