# ASSETS

CSS_FILES = assets/bootstrap-4.0.0/css/bootstrap.min.css \
	_site/assets/main.css

JS_FILES = assets/fuse.min.js \
    assets/scripts.js

# CSS

## concat-css - Concat css files.
concat-css:
	cat $(CSS_FILES) > assets/application.css

## minify-css - Minifies CSS.
minify-css:
	curl -X POST -s --data-urlencode 'input@assets/application.css' https://cssminifier.com/raw > assets/application.min.css
	rm -rf assets/application.css
	cp assets/application.min.css _includes/application.min.css

# JS

## concat-js - Concat js files.
concat-js:
	cat $(JS_FILES) > assets/application.min.js

# ASSETS (CSS + JS) OPTIMISATION

## optimize-css - Concat and minify css files.
optimize-css: concat-css minify-css

## optimize-css - Concat js files.
optimize-js: concat-js

## optimize - Optimize assets files.
optimize: optimize-css optimize-js

# HELP

## help - Displays help.
help:
	@fgrep -h "## " $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/## //'
