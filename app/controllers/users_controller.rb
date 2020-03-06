require "faker"

class UsersController < ApplicationController
  def index
    @users = User.all
    # server sided rendering of our react component
    # server is passing back react/html/javascript code
    render component: "Users", props: { users: @users }
  end

  def show
    @user = User.find(params[:id])
    # server sided rendering of our react component
    # server is passing back react/html/javascript code
    render component: "User", props: { user: @user }
  end

  def create()
    @user = User.create(user_params)
    # not passing backing html or js, just json
    render json: @user
  end

  def destroy
    @user = User.destroy(params[:id])
    # not passing backing html or js, just json
    render json: @user
  end

  private

  def user_params
    params.require(:user).permit(:f_name, :l_name)
  end
end
