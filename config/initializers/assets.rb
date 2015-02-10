# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )

# Make sure all images are precompiled
Rails.application.config.assets.precompile += %w[*.png *.jpg *.jpeg *.gif *.svg]

# Make sure all fonts are precompiled, SVG fonts are already compiled as images
Rails.application.config.assets.precompile += %w[*.eot *.ttf *.woff]

# Add bower components folder to asset pipeline
Rails.application.config.assets.paths << Rails.root.join('lib','assets','bower_components')
