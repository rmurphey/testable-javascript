# Day 2

## Refactoring an App

- review the existing app
- integration tests first!

### util.js (group)

- load the template
- fake xhr

### searchForm.js (group)

- announce an event when there's a search
- ignore empty searches
- deal with pending searches
- rsvp for events

### likes.js (group exercise)

- use a template for individual people
- .add( name )
- how to load templates without a server?
    - grunt task for generating templates fixture
    - squire for mocking util API

### data.js (exercise)

- .fetch( term )
- return a promise

### searchResults.js (exercise)

- use a template for the entire area
- .setResults( results )
- announce an event when there's a like
- BUG: like button isn't removed!

## Discussion

- other ways for managing communication between modules?
    - use app-wide data model for messaging
    - pub/sub, meh
- all of this is easier with backbone & friends

## Tools

- grunt-mocha w/phantomjs
