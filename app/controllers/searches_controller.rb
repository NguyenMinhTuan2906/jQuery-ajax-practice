class SearchesController < ApplicationController
  def index
    if request.xhr?
      @users = User.search(params[:name])

      render json: {
        search_result: render_to_string(@users)
      }, status: :ok
    else
      @users = User.all
    end
  end
end
