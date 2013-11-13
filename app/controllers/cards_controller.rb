class CardsController < ApplicationController
  before_filter :require_current_user!
  
  def create
    @card = Card.new(params[:card])
    
    if @card.save
      render :json => @card
    else
      render :json => @card.errors.full_messages, :status => :unprocessable_entity
    end
  end
  
  def update
    @card = Card.find(params[:id])
    
    if @card.update_attributes(params[:card])
      render :json => @card
    else
      render :json => @card.errors.full_messages, :status => :unprocessable_entity
    end
  end
end