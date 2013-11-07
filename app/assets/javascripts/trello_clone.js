window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    currentUser = JSON.parse($('#rabl-user').attr('data-rabl-user'));
    // console.log(currentUser);
    
    TrelloClone.boards = new TrelloClone.Collections.Boards(currentUser.boards, {parse: true});
    console.log(TrelloClone.boards);
    console.log(TrelloClone.boards.last().lists());
    console.log(TrelloClone.boards.last().lists().last().cards());
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