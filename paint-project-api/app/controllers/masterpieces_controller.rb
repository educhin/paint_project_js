class MasterpiecesController < ApplicationController
    def index
        masterpieces = Masterpiece.all
        render json: masterpieces.to_json(
            :only => [:name, :url, :id],
            :include => {
                :artist => {
                    :only => [:name]
                }
            }
        )
    end

    def show
        # if (params[:id]){
            masterpiece = Masterpiece.find_by(id: params[:id])
            render json: masterpiece
        # } else {
        #     artist = Artist.find_by(name: params[:artist_name])
        #     masterpiece = Masterpiece.find_by(name: params[masterpiece_name], artist_id: artist.id)
        #     render json: masterpiece
        # }
        
    end

    def create
        # raise params.inspect
        artist = Artist.find_or_create_by(name: params[:artist_name])
        name = params[:masterpiece_name]
        masterpiece_url = params[:masterpiece]

        masterpiece = Masterpiece.create(name: name, url: masterpiece_url, artist_id: artist.id)
        render json: masterpiece
    end
    # def index
    #     pokemons = Pokemon.all 
    #     render json: pokemons
    # end

    # def show
    #     pokemon = Pokemon.find_by(id: params[:id])
    #     render json: pokemon
    # end

    # def create
    #     trainer = Trainer.find_by(id: params["trainer_id"])
    #     name = Faker::Name.first_name
    #     species = Faker::Games::Pokemon.name
    #     pokemon = Pokemon.create(nickname: name, species: species, trainer: trainer)
    #     render json: pokemon
    # end
end