# kaiNaturalist
## A full-stack nature-exploration app based on iNaturalist.org

This is a full-stack app experience inspired by iNaturalist. Users can upload observations of their encounters with other organisms and identify them or have them identified by the community (currently the app supports taxonomy down to the Family level). Viewing an observation allows one to see where it was found (and nearby observations of the same taxon), any details, as well as the identification activity on the observation. When multiple people have identified the observation a consensus is calculated and the status of each identification is reflected in the activity feed as the observation is upgraded to "verified" status (or not). This consensus is re-calculated whenever the state of the identifications associated with the observation changes.

### Live
https://kainaturalist.herokuapp.com/

## Features
- Create an account, sign in, or log in as a demo user
- Create, view, edit, and delete Observations with custom-built form components including an image uploader, a taxonomy typeahead input, and a clickable-draggable map location selector.
- Find other observation of the same taxon on the observation map view to see where things live!
- Create, view, edit, and delete Identifications with comments and a taxonomy typeahead with automated consensus calculation on Observations.
- Homempage grid view with My Observations, Observations waiting to be identified by the community, and recently verified observations.

## Future features: 
- Explore map view allowing users to explore the map and see what lives near them!
- My observations map
- Taxon pages with map and grid views
- Continue to expand available taxonomic ranks

## Main Stack Technologies
- React
- Redux 
- Python
- PostgreSQL
- Flask
- Flask SQLAlchemy

## Other Major Technologies / Packages used
- WTForms (for backend validations)
- Leaflet / React Leaflet (for map components)
- AWS S3 (for image uploads)
- dayjs (for manipulating dates)

## Honorable Mentions
- FontAwesome
- Leaflet Geosearch
- geopy
- react-date-picker

# kaiNaturalist in Action

## Splash Page
I worked really hard to make this look pretty, I hope you enjoy it as much as I do.  It's hard to resist space cat isn't it?
![image](https://user-images.githubusercontent.com/8377372/174169070-9d752dfe-a348-4a2b-9f33-e063ae8a37a0.png)
I had some fun with the page while keeping iNaturalist's form / style.
![image](https://user-images.githubusercontent.com/8377372/174169152-d4fa61d0-5c87-4f4b-838c-26a0feffdc56.png)

## Home / Grid View
The main grid is separated into three sections for the user's uploads, uploads from the community that need attention, and verified observation.
![image](https://user-images.githubusercontent.com/8377372/174169415-ac685bd1-ea74-4775-8305-0f776291ebc1.png)

## Upload
The taxonomy picker, draggable/searchable map component (based on Leaflet), and image uploader are all custom-built for this project!
![image](https://user-images.githubusercontent.com/8377372/174169649-c5f6a7ed-057d-4186-a737-f316094b0fd1.png)

## Loading Spinner
I'm really proud of this CSS loading spinner that I built so it has to go here. It uses a random nature-themed FontAwesome icon each time.
![image](https://user-images.githubusercontent.com/8377372/174169867-88c4bded-248f-46eb-b4c3-3aeb578c9432.png)

## Observation View
The orange circles on the map are other places banana slugs have been observed.  You can click them to bring up a link to those other observations.
![image](https://user-images.githubusercontent.com/8377372/174170185-e911a717-0c73-4335-b6ae-b76b80e342de.png)

## Identification Activity
The icons represent the level to which the particular ID agrees with the community.
![image](https://user-images.githubusercontent.com/8377372/174170434-6c15b2fc-a99b-4134-831a-18fdfdbfc1cc.png)

## Eplore Your World
The map markers adjust based on what was observed.
![image](https://user-images.githubusercontent.com/8377372/174500352-b1f30d72-aca7-44f5-b9c0-7a3f3f24d2b9.png)
The right sidebar adjusts to show what's currently on the map!
![image](https://user-images.githubusercontent.com/8377372/174500452-a905e858-1954-4ab0-a9a9-0eae0722bd25.png)


