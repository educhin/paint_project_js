class CreateColors < ActiveRecord::Migration[6.0]
  def change
    create_table :colors do |t|
      t.string :name
      t.string :hex_value
      t.belongs_to :palette
      t.timestamps
    end
  end
end
