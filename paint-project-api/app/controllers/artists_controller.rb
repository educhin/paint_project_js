class ArtistsController < ApplicationController
    def index
        artists = Artist.all 
        render json: ArtistSerializer.new(artists).to_serialized_json
    end
end