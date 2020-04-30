class ArtistSerializer
    def initialize(artist_obj)
        @artist = artist_obj
    end

    def to_serialized_json
        @artist.to_json(
            :only => [:name],
            :include => {
                :masterpieces => {
                    :only => [:name, :url]
                }
            }
        )
    end
end