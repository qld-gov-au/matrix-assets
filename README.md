# matrix-assets
Builds assets used by qld.gov.au Squiz Matrix CMS and connects to matrix via git bridge

## Folder structure
- css : Contains all scss partials related
- js: Contains all script files

## Git bridge
- Only css and js folders are pulled by Matrix
- staging branch is used for testing changes by logged in staging-testers
- master branch is used for production

# Develop and Deploy
- To develop, checkout your branch from staging branch
- Make your changes and raise a pull request against staging
- After peer review, merge changes into staging
- Pull your changes into Matrix via Git bridge (/qld.gov.au/Configuration - qld.gov.au/Design Assets/Integration Points/Matrix-assets) (#95448)
- Login as staging-tester and test your changes
- Raise a change management request with release notes and testing steps
- Post approval, merge staging into master and pull master into Matrix via Git bridge (/qld.gov.au/Configuration - qld.gov.au/Design Assets/Integration Points/Matrix-assets) (#95448)
- Test changes as public user
### SCSS Development
- If new scss file has been created, import the same in SCSS Design file
    - **Staging** - /qld.gov.au/Configuration - qld.gov.au/Design Assets/CSS/qg-main-staging.css (#226)
    - **Production** - /qld.gov.au/Configuration - qld.gov.au/Design Assets/CSS/qg-main.css (#224)
### JS Development
- If new js file has been created, link the same in JS File folder
    - **Staging** - /qld.gov.au/Configuration - qld.gov.au/Design Assets/JS/qg-main-staging.js (#341)
    - **Production** - /qld.gov.au/Configuration - qld.gov.au/Design Assets/JS/qg-main.js (#130)

