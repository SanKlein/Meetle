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

## User Stories:
1. As a user I can add new groups I am in.
2. As a user I can create new subgroups within one of my groups.
3. As a user I can add people to my group.
4. As a user I can remove groups I am in.
5. As a user I can view all the groups I am in.
6. As a user I can send messages to the subgroups I am in.
7. As a user I can make new meetups for a specific subgroup I am in.
8. As a user I can choose which groupmates I want to attend a meetup.
9. As a user I can choose the location date and time of a new meetup.
10. As a user I can leave subgroups that I am in.
11. As a user I can see which subgroups have new messages.
12. As a user I can send messages to the group to figure out when things are due.
13. As a user I can mute subgroup chats.
14. As a user I can easily see when I have meetups.
15. As a user I can see details about existing meetups and subgroups.
16. As a user I can add people to an existing meetup.
17. As a user I can add people to an existing subgroup.
18. As a user I can like other groupmates messages.
19. As a user I can log in and out.
20. As a user I can edit my profile.

## Development Guidelines:
- Development is in Javascript using NodeJS, AngularJS, Ionic, HTML, and CSS.
- Mocha testing framework is used for test suite. Tests are written throughout the entire development process.
- There is one master branch for the project, which is the latest, stable version of the application.
- Each developer has his or her own separate development branch.
- All JavaScript code is located in www/js/
- All CSS code is located in www/css/
- All HTML code is located in www/templates/
- All test code is located in test/test.js


## Early version run-through (Windows)
1. Install MongoDB (https://www.mongodb.org/downloads?_ga=1.162870581.845702189.1447711911#production)
2. open a terminal: **mkdir c:/data/db**
3. **c:/mongodb/bin/mongod.exe**
4. in a second terminal: **c:/mongodb/bin/mongo.exe**
5. in a third terminal: navigate to the *Meetle* root directory
6. **npm install**
7. **node server.js**
