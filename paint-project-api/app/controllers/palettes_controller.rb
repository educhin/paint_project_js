class PalettesController < ApplicationController
    def index
        palettes = Palette.all 
        render json: PaletteSerializer.new(palettes).to_serialized_json
    end
end