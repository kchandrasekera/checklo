# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

1.upto(2) do |user_id|
  user = User.create(username: "user0#{user_id}", email: "user0#{user_id}@example.com", password: "password#{user_id}", password_confirmation: "password#{user_id}")
  user.boards.create(board_name: "Work")
  user.boards.create(board_name: "Play")

  user.boards.each do |board|
    board.lists.create(list_name: "Now")
    board.lists.create(list_name: "Today")
    board.lists.create(list_name: "This Week")

    board.lists.each do |list|
      list.cards.create(card_name: "Action Item 1")
      list.cards.create(card_name: "Action Item 2")
      list.cards.create(card_name: "Action Item 3")
    end
  end
end


guest = User.create(username: "Guest of Honor", email: "guest@example.com", password: "honorableguest", password_confirmation: "honorableguest")
guest.boards.create(board_name: "Work")
guest.boards.create(board_name: "Play")

guest.boards.each do |board|
  board.lists.create(list_name: "Now")
  board.lists.create(list_name: "Today")
  board.lists.create(list_name: "This Week")

  board.lists.each do |list|
    list.cards.create(card_name: "Action Item 1")
    list.cards.create(card_name: "Action Item 2")
    list.cards.create(card_name: "Action Item 3")
  end
end
