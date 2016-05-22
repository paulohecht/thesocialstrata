# The Social Strata

It's a social network that connects everyone in a rental apartment building.

### Tech Stack

* MeteorJS + ReactJS + ReactRouter ( + Cordova for mobile build)
* MaterializeCSS
* Underlying technologies: NodeJS, MongoDB

The main reason this stack was chosen is the development speed. We can build prototypes very fast with and iterate on much more possibilities. It also allows an easy real-time reactive approach to the social network.

The stack also allows deploying to mobile apps (.apk for android and .ipa for ios) very easily through support to cordova integration. It's a good choice for a multi-platform MVP.

### Instructions

Installing Meteor:
```sh
$ curl https://install.meteor.com/ | sh
```

Running the app (from project folder):
```sh
$ meteor
```

Building the mobile apps:
```sh
$ meteor run android -p [host_ip_address:port]
$ meteor run ios -p [host_ip_address:port]
```

### Features Status
  - [x] Sign Up
  - [x] Sign In
  - [x] Mobile Look'n'feel  
  - [x] Basic Onboarding
    - [x] Create a building as Landlord
      - [ ] Support for fine tune map location selection
    - [x] Join a building as Tenant
      - [x] From zip code
      - [ ] From GPS
  - [x] Real Time Chat
  - [x] Lost And Found
    - [x] Report
    - [x] Solve
  - [x] Maintenance Requests
    - [x] Report (Only Tenant)
    - [x] Solve (Only Landlord)
  - [x] Common Area Scheduling
    - [x] Create Common Areas (Only Landlord)
    - [x] Schedule Common Areas
  - [ ] General Notices
  - [ ] Proposals
  - [ ] News Feed
  - [ ] Image Uploads
    - [ ] From Camera
    - [ ] From Gallery
  - [ ] Empty States
  - [ ] Design Polishing
  - [ ] Push Notifications
