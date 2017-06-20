class UsersController < ApplicationController

  def index
    @users = User.all
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: {
        user_data: render_to_string(@user)
      }, status: :ok
    else
      render error, status: :unauthorized
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
  end

  private

  def user_params
    params.require(:user).permit(:name)
  end
end
