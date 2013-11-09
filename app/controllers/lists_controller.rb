class ListsController < ApplicationController
  before_filter :require_current_user!
  
  def create
    @list = List.new(params[:list])
    
    if @list.save
      render :json => @list
    else
      render :json => @list.errors.full_messages, :status => :unprocessable_entity
    end
  end
end