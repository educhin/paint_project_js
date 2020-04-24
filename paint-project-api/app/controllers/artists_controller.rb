class ArtistsController < ApplicationController
    def index
        artists = Artist.all 
        render json: artists.to_json(
            :only => [:name],
            :include => {
                :masterpieces => {
                    :only => [:name, :url]
                }
            }
        )
    end
end