# San Francisco Film Locations

### Post Interview Challenge - Unitrends

San Fransisco Film Locations is a simple app that pulls JSON data from [DataSF](http://www.datasf.org/): [Film
Locations](https://data.sfgov.org/Arts-Culture-and-Recreation-/Film-Locations-in-San-Francisco/yitu-d5am). When a user selects a film (by clicking on the dropdown or typing in the search box) the filming locations(s) are plotted on a map. Clicking on a map marker displays more information about the location.

View [DEMO](https://tyleryoungblood.github.io/sf-movie-locations/)

![alt text](https://github.com/tyleryoungblood/sf-movie-locations/blob/master/img/sf-film-locations.png "SF Film Locations")

### Architecture

My [app](https://tyleryoungblood.github.io/sf-movie-locations/) was built using AngularJS and the following packages (managed through NPM):

- **angular-filter** gives access to unique filter to easily dedupe film titles.
- **gulp-autoprefixer** provides support for older browsers.
- **gulp-html-minifier** is used to minify html.
- **gulp-stylus** is used to preprocess .styl to .css and minify.
- **gulp-uglify** uglifies js files.
- **gulp-concat** concatenates css and js files into a single app.css and app.css file.
- **gulp-gh-pages** makes deploying to Github Pages quick and easy.

I realize webpack is all the rage these days, but I still like Gulp for it's ease of use and simplicity, especially with a small app like this.

If this was a larger app with more complex css I would have put the effort into getting Browsersync working, but as it was I didn't find myself refreshing the page hundreds of times during the dev process. So it wasn't a huge pain-point to just hit refresh.

About that css ...

I opted not to load a css/component framework like Bootstrap or AngularMaterial. I've worked with both quite a bit but it just seemed like overkill for this single-view zero-navigation app. Although, `md-autocomplete` would have made the search box a lot more user-friendly.

### Mulligans

If I were to start over from scratch I would do a few things differently. First, I would have put the time into getting webpack up and running. I was initially worried about working with the Google Maps API so I made the decision to work with Gulp (a technology that I have more experience with) to limit the number of unknown technologies. In hindsight I think this would have been a perfect practice app for working with webpack.

I also might have chosen a different stack altogether. If I had gone with a MEAN (or perhaps Meteor) stack from the start I would have felt more compelled to get a database working. But again, I was trying to keep things as simple as possible to limit my exposure to unknowns.

I chose AngularJS instead of Angular because of familiarity with Angular 1x.

### Todo

- Update autocomplete search with a polyfill for Safari.

  Currently Safari and IOS Safari don't support the `<datalist>` element. I chose to use a datalist because it seems to be the simplest way to get autocomplete searching working in supported browsers.

- ~~Remove references to titles which return no map markers.~~ Fixed by adding ng-if="film.locations"

- Refactor search so that a user doesn't have to click on the search icon to get results back.

- Store geocoded data in a separate database and then check to see if an address has already been geocoded. If it has, return the lat/long from db. If it hasn't route address through google map goecoding api. Currently there's a limit of 2,500 hits per day for the free tier of google maps so I haven't run into any over-limit issues, but it's inefficient to make repeated calls to geocode an address that's already been processed.

- Rework application so that a user can see all locations at once (if they choose to). This would overwhelm the geocoding api and be rather slow, so getting a separate db to store lat/long would be required first. Then as a user types in the search box the map pins could disappear as the possible film results get winnowed down.

- Pull movie poster data from a separate API (perhaps [themoviedb.org](https://www.themoviedb.org/) and display the poster for a selected film in the upper corner of the screen.

- Fix z-index issue on map popup

### Installation

- Clone the repo and run `npm install`.
- Load the `dist/index.html` file in any browser (the index references the concatenated css and js files in that exist dist, not root)
- Gulp Commands:
  - `gulp` (default) minifies and pushes changes to /dist
  - `gulp deploy` deploys to Github Pages - you'd have to set up your own gh-pages branch to get this to work.
