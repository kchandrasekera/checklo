window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    currentUser = JSON.parse($('#rabl-user').attr('data-rabl-user'));
    TrelloClone.boards = new TrelloClone.Collections.Boards(currentUser.boards, {parse: true}); 
    // console.log(currentUser);
    // console.log(TrelloClone.boards);
    // console.log(TrelloClone.boards.last().lists());
    // console.log(TrelloClone.boards.last().lists().last().cards());
    new TrelloClone.AppRouter();
    Backbone.history.start();
  }
};