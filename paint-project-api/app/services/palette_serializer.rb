class PaletteSerializer 
    def initialize(palette_obj) 
        @palette = palette_obj;
    end

    def to_serialized_json
        @palette.to_json(
            :only => [:name],
            :include => {
                :colors => {
                    :only => [:name, :hex_value]
                }
            }
        )
    end
end