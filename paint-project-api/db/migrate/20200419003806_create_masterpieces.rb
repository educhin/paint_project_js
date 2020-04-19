class CreateMasterpieces < ActiveRecord::Migration[6.0]
  def change
    create_table :masterpieces do |t|
      t.string :name
      t.string :url
      t.belongs_to :artist
      t.timestamps
    end
  end
end
