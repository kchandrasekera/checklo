window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    currentUser = JSON.parse($('#rabl-user').attr('data-rabl-user'));
    TrelloClone.boards = new TrelloClone.Collections.Boards(currentUser.boards, {parse: true});
    new TrelloClone.AppRouter();
    Backbone.history.start();
  }
};