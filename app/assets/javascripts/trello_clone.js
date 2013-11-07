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



// use the bootstrapped data to run this process on initialization, if there is a current user

// boards = new ASDF.Collections.Boards(boardsJSONthatwasbootstrapped, {parse: true})
//   Board.parse -> created Lists collection {parse: true}
//     List.parse -> created Cards collection 
// first list of first board = boards.first().get('lists')
// firstList.get('cards')