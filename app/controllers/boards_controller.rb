class BoardsController < ApplicationController
  def create
    @board = Board.new(params[:board])
    @board.user_id = current_user.id
    
    if @board.save
      render :json => @board
    else
      render :json => @board.errors.full_messages, :status => :unprocessable_entity
    end
  end
end