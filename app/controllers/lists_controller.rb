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
  
  def update
    @list = List.find(params[:id])
    
    if @list.update_attributes(params[:list])
      render :json => @list
    else
      render :json => @list.errors.full_messages, :status => :unprocessable_entity
    end
  end
  
  def destroy
    @list = List.find(params[:id])
    @list.destroy
    render :json => @list
  end
end