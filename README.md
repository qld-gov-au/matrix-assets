# matrix-assets
Builds assets used by qld.gov.au and connects to matrix via git bridge

## Folder structure
- css : Contains all scss partials related
- js: Contains all script files
- index.html: Test page to test css and js. 
	- This can be copied from view source of any page on Squiz Matrix
	- Replace css/js files you are editing, with local versions
	- you wouldn't need server. directly open index.html to view your changes

## Git bridge
- Only css and js folders are pulled by Matrix
- staging branch is used for testing changes
- master branch is used for production
