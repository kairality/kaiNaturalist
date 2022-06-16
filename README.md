# kaiNaturalist
## A full stack nature-exploration app based on iNaturalist.org

This is a full-stack app experience inspired by iNaturalist. Users can upload observations of their encounters with other organisms and identify them or have them identified by the community (currently the app supports taxonomy down to the Family level). Viewing an observation allows one to see where it was found (and nearby observations of the same taxon), any details, as well as the identification activity on the observation. When multiple people have identified the observation a consensus is calculated and the status of each identification is reflected in the activity feed as the observation is upgraded to "verified" status (or not). This consensus is re-calculated whenever the state of the identifications associated with the observation changes.

### Live
https://kainaturalist.herokuapp.com/

## Features
- Create an account, sign in, or log in as a demo user
- Create, view, edit, and delete Observations with custom-built form components including an image uploader, a taxonomy typeahead input, and a clickable-draggable map location selector.
- Find other observation of the same taxon on the observation map view to see where things live!
- Create, view, edit, and delete Identifications with comments and a taxonomy typeahead with automated consensus calculation on Observations.
- Homempage grid view with My Observations, Observations waiting to be identified by the community, and recently verified observations.

Upcoming features: 
- Explore map view allowing users to explore the map and see what lives near them!
- My observations map
- Taxon pages with map and grid views
- Continue to expand available taxonomic ranks
