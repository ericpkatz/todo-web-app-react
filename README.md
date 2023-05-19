# to run

- create database
- npm install
- npm run start:dev
- npm run build:dev

# todos

- add the ability to create a new category
  - there should be a link in the app which takes the user to /categories/create
  - after a category is created, the user should be taken back to the home page
  - think about how you can do this incrementally

- add the ability to edit a category 
  - this list of categories in the app should link to /categories/:id
  - the user should be able to edit a category  - after editing the user should be taken back to the home page

- add the ability to delete a category
  - on the /categories/:id page add a delete link.
  - prevent categories which have todos associated with them from being deleted
