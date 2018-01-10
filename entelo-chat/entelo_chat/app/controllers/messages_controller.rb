class MessagesController < ApplicationController
  def index
    @messages = Message.all
    render json: @messages
  end
  
  def app
    render :app
  end
  
  def create
    @message = Message.new(message_params)
    if @message.save
      @messages = Message.all
      render :index
    else
      render @message.errors.full_messages
    end
  end
  
  private
  def message_params
    params.require(:message).permit(:user, :body)
  end
end
