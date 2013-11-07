object @user
attributes :id, :username, :email

child :boards do
  attributes :id, :board_name
  
  child :lists do
    attributes :id, :list_name
    
    child :cards do
      attributes :id, :card_name, :due_date, :completed, :comment
    end
  end
end