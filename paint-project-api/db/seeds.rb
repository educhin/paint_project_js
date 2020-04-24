# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Palette.create(name: 'Roy G. Biv')

Color.create(name: 'white', hex_value: '#FFFFFF', palette_id: 1)
Color.create(name: 'black', hex_value: '#000000', palette_id: 1)
Color.create(name: 'red', hex_value: '#FF0000', palette_id: 1)
Color.create(name: 'orange', hex_value: '#FFA500', palette_id: 1)
Color.create(name: 'yellow', hex_value: '#FFFF00', palette_id: 1)
Color.create(name: 'green', hex_value: '#008000', palette_id: 1)
Color.create(name: 'blue', hex_value: '#0000FF', palette_id: 1)
Color.create(name: 'indigo', hex_value: '#4B0082', palette_id: 1)
Color.create(name: 'violet', hex_value: '#EE82EE', palette_id: 1)