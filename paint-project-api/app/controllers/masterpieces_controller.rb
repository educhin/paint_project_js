class MasterpiecesController < ApplicationController
    def index
        masterpieces = Masterpiece.all
        render json: MasterpieceSerializer.new(masterpieces).to_serialized_json
    end

    def show
        masterpiece = Masterpiece.find_by(id: params[:id])
        render json: masterpiece
    end

    def create
        artist = Artist.find_or_create_by(name: params[:artist_name])
        name = params[:masterpiece_name]
        masterpiece_url = params[:masterpiece]

        masterpiece = Masterpiece.create(name: name, url: masterpiece_url, artist_id: artist.id)
        render json: masterpiece
    end
end