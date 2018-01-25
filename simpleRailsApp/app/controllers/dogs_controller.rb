class DogsController < ApplicationController
  def index
    @dogs = Dog.all
    render :index
  end
  
  def show
    
  end
  
  def create
    @dog = Dog.new(dog_params)
    if @dog.save
      @dogs = Dog.all
      render :index
    else
      render json: @dog.errors.full_messages
    end
  end
  
  private
  def dog_params
    params.require(:dog).permit(:name, :age)
  end
end
