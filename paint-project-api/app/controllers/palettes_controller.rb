class PalettesController < ApplicationController
    def index
        palettes = Palette.all 
        render json: palettes.to_json(
            :only => [:name],
            :include => {
                :colors => {
                    :only => [:name, :hex_value]
                }
            }
        )
    end
end