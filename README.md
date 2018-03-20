# matrix-assets
Builds assets used by qld.gov.au and connects to matrix via git bridge

## Folder structure
- css : Contains all scss partials related
- js: Contains all script files

## Git bridge
- Only css and js folders are pulled by Matrix
- staging branch is used for testing changes
- master branch is used for production

# Developer's guide
- Developer can develop things on Matrix, test and add the same to repository
## SCSS Development
- Add your code in the file /qld.gov.au/Configuration - qld.gov.au/Design Assets/CSS/qg-main-staging.css (#226)
- Log in as stating testers to test your changes
- Once UAT is approved,
### Staging release
- shift the changes into a file in this repo under staging branch
- Resync the gitbridge on Matrix (/qld.gov.au/Configuration - qld.gov.au/Design Assets/Integration Points/matrix-assets-staging) (#228)
- Delete your code in the file /qld.gov.au/Configuration - qld.gov.au/Design Assets/CSS/qg-main-staging.css (#226)
- Import the new file in the same file
- Log in as stating testers to test your changes
### Production release
- Merges staging branch into master
- Resync the gitbridge on Matrix (/qld.gov.au/Configuration - qld.gov.au/Design Assets/Integration Points/matrix-assets) (#139)
- Import the new file in the file /qld.gov.au/Configuration - qld.gov.au/Design Assets/CSS/qg-main.css (#224)
- Test your changes as a public user

