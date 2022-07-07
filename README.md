# matrix-assets
Builds assets used by qld.gov.au Squiz Matrix CMS and connects to matrix via Git bridge

All JS and CSS assets in this repository will be compressed, minified or bundled and serve to the binary repository.
Then the end user could use Git bridge to synchronise the assets to Squiz Matrix from the binary repository.

All files in the `src` folder will be copied to the binary repository in the same folder structure, as well as they will be compressed and minified.

To bundle the files you could follow the instructions below.

Each time you push or merge the branch, the building process will be triggered by the Github Action and automatically deployed to the binary repository [`matrix-assets-release`](https://github.com/qld-gov-au/matrix-assets-release).

## Folder structure
- src/css : Contains all scss partials related
- src/js: Contains all script files
- src/franchise: Contain franchise specific code
- binary-repo: files that will be copied to the binary repository, such as the README file of that repository.

## Git bridge branches
- you could git bridge a feature branch for testing changes
- `staging` branch is used for testing changes
- `master` branch is used for production

## Develop and Deploy
- To develop, checkout your branch from `staging` branch
- Create a new feature branch from `staging`
- Run `npm run lint` to lint your code
- Push your change
- You could Git bridge this feature branch to test your change
- Pull your changes into Matrix via Git bridge (/qld.gov.au/Configuration - qld.gov.au/Design Assets/Integration Points/matrix-assets-staging) (#228) and link to your feature branch
- Login as staging-tester and test your changes
- Raise a pull request to merge your feature branch to `staging`
- After peer review, merge changes into `staging`
- Pull your changes into Matrix via Git bridge (/qld.gov.au/Configuration - qld.gov.au/Design Assets/Integration Points/matrix-assets-staging) (#228)
- Login as staging-tester and test your changes
- Raise a change management request with release notes and testing steps
- Post approval, merge `staging` into `master` and pull `master` into Matrix via Git bridge (/qld.gov.au/Configuration - qld.gov.au/Design Assets/Integration Points/matrix-assets) (#139)
- Test changes as public user

## Bundling

This repository enable you to bundled a bunch of JS/CSS files and output a single minified bundled file.

There is no limitation of what you want to bundle in this repository:
- You could create as many bundle files as you like in this repository.
- You could choose whatever files you want to add to the bundle.

### Create a bundle

1. Defined a target item in the  `targets` object in `package.json`. Such as:
    ```json
      "targets": {
        "main":false,
        "new-bundle": {
          "source": "src/New Bundle/index.js", // input file location
        }
      },
      "new-bundle": "dist/build/new-bundle.js" // output file location
    ```
2. Create a index file in `src/New Bundle/index.js`.
3. In the index file, import all the asset files you want to bundle. Such as:
    ```js
      import "./js/script1.js";
      import "./js/script2.js";
      import "./js/script3.js";
      import "./css/style1.scss";
      import "./css/style2.scss";
    ```
4. You could test the building process by running `npm run build`, you could see the bundled files will be output to the `distDir`, in `dist/build` it will contain:
    ```
      my-bundle.js
      my-bundle.js.map
      my-bundle.css
      my-bundle.map
    ```
5. Each time you push or merge the branch, the building process will be triggered by the Github Action and automatically deployed to the binary repository.
6. Then you could use Git bridge to synchronise the update in the binary repository to Squiz Matrix from the branch you are working on.


