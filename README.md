# Meetle

## Team Members:
- Matt Owens
- Parker Klein
- Tristan Kindig

## Overview:
Meetle is a platform-independent application for people to easily collaborate in groups and arrange meeting times for projects and events.

## Meetings:
- Informal communication via email, text message, and GroupMe
- Met once on 11-3-15
- Met once on 11-5-15
- Met once on 11-10-15 (11, Olin)
- Met once on 11-11-15 (5:30, Featheringhill)
- Met once on 11-12-15 (11, Olin)
- Met once on 11-16-15 (3, Featheringhill)
- Met once on 11-17-15 (11, Olin)
- Met once on 11-19-15 (11, Olin)
- Met once on 12-1-15 (8:30, Featheringhill) (just Parker and Matt)
- Met once on 12-3-15 (11, Olin)
- Met once on 12-7-15 (2:30, Featheringhill)

## User Stories:
1. As a user I can add new groups.
2. As a user I can create new subgroups within one of my groups.
3. As a user I can add people to my group.
4. As a user I can remove groups I am in.
5. As a user I can view all the groups I am in.
6. As a user I can send messages to the subgroups I am in.
7. As a user I can make new meetups for a specific subgroup I am in.
8. As a user I can choose the location, date and time of a new meetup.
9. As a user I can edit the location, date and time of a meetup.
10. As a user I can leave subgroups that I am in.
11. As a user I can see which subgroups have new messages.
12. As a user I can send messages to the group to figure out when things are due.
13. As a user I can see new messages in a subgroup's chat appear without refreshing the page.
14. As a user I can easily see the meetups for a specific subgroup.
15. As a user I can see and edit a group's settings.
16. As a user I can see and edit a subgroup's settings.
17. As a user I can add people to an existing subgroup.
18. As a user I can like other groupmates messages.
19. As a user I can log in and out.
20. As a user I can edit my profile.

## Development Guidelines:
- Keep track of progress and tasks using a Trello board (https://trello.com/b/In1Ag46e/meetle)
- Development is in Javascript using NodeJS, AngularJS, Ionic, HTML, and CSS.
- Mocha testing framework is used for test suite.
- There is one master branch for the project, which is the latest, stable version of the application.
- The developer creates a separate development branch for each major feature.
- All JavaScript code is located in www/js/
- All CSS code is located in www/css/
- All HTML code is located in www/templates/
- All test code is located in test/test.js

## API:
API can be referenced via the following link:
https://docs.google.com/a/vanderbilt.edu/spreadsheets/d/1a4phvxthSwOJqiHVn-jktcjGDspssCTenwMDK576FNQ/edit?usp=sharing

## Installation and Deployment
1. Install and configure MongoDB
2. Run MongoDB locally
3. Navigate to project root directory in a terminal
4. Run **npm install**
5. Edit **www/js/services.js** file by changing 'localhost' in Line 1 to your computer's IP address
7. In the terminal, run **node server.js**
8. To run tests, run **mocha test/test.js**
