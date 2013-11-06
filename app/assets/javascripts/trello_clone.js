window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.Store = {};
    this.Store.currentUser = JSON.parse($('#bootstrapped-user').html());
    console.log(this.Store.currentUser);
    
    // TrelloClone.boards = new TrelloClone.Collections.Boards();
    // this.Store.currentUser.fetch({
    //   success: function() {
    //      
    //   }
    // });
  }
};

$(document).ready(function(){
  TrelloClone.initialize();
});