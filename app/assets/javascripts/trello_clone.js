window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    success: function() {
      new TrelloClone.AppRouter();
      Backbone.history.start();
    }
  }
};

$(document).ready(function(){
  TrelloClone.initialize();
});