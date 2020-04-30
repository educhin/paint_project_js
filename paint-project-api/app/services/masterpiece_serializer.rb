class MasterpieceSerializer
    def initialize(masterpiece_obj)
        @masterpiece = masterpiece_obj
    end

    def to_serialized_json
        @masterpiece.to_json(
            :only => [:name, :url, :id],
            :include => {
                :artist => {
                    :only => [:name]
                }
            }
        )
    end
end