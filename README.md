
# Cordova-StudentApp-Template
Here's a template you can used for your Cordova App. This template has been realized from a real app that we deployed as a Web, Android and IOS app.
# Contributors of the original project and links

 - [Johan Bertrand](https://github.com/Blabla51?fbclid=IwAR29BG_sjAy_JkqPVyoOJbgGSVqlO3uxpo8rbqej4_Y-V0UuGAV2KiFnV-g) FullStack Dev + Main Structure
 - [Thomas Martin](https://github.com/AppliNH) FullStack Dev + Database + Scrum Master
 - [Nicolas Khou](https://www.linkedin.com/in/nicolas-khou-107579184/) FrontEnd Dev + TechWatch
 - [Théo Koehnemann](https://github.com/Theo6898) Back-End + RGPD

[Web App](https://app.app-insas.fr) (deployed with <3 thanks to Netlify )
[Android](https://play.google.com/store/apps/details?id=com.bdeinsastrasbourg.app&gl=FR)
Coming on IOS AppStore 
# What you gotta know
This template has been made from an Hybrid Web App we deployed as a **Web, Android and IOS App** using Cordova/Phonegap. Not everything is here, but hey, it's a good start !
The original project has been led using a [Scrum](https://tree.taiga.io/project/applinh-application-bde-insa-strasbourg) method. 
The original app aims to offer some services to the members/subscribers of a student association, in a French Engineering school called "INSA de Strasbourg".
Everything has been made from our hands, the project has started from our very own initiative, and is "RGPD-Friendly". 

The functionalities are :

 - Login/Logout
 - Events' calendar
 - Notifications
 - Sponsors list on a HERE Map
 - Member card with a photo the user takes of himself when he logs in
 - News sections
 - and even more...

# Things you gotta do to make it work
Well, first you gotta know a little bit JavaScript, HTML & CSS, because the code is based on this.
Secondly, you have to :

 - Create a Google MyMaps where you indicate the position of your sponsors, then generate a KML file of it, and use it in the app (distant or local)
 - Get some API keys for the HERE Map to work
 - Get a Google Calendar API Key
 - Get the link of the Google Calendar you want to sync in the app
 - Create your own API so you app can communicate with your own database
 
 Then you might have to add the Android and IOS platforms, by running :
 

    cordova platform add android
    cordova platform add ios
  Then build :
  

    cordova build android
    cordova build ios
  
# Technologies and plugins we're using
On top of using Cordova PhoneGap, we're also using :

 - Netlify (deploy as web app)
 - Framework7
 - HERE Map API
 - FullCalendar 3.9.0
 - cordova-plugin-whitelist
 - cordova-plugin-camera
 - cordova-plugin-file
 - cordova-plugin-background-mode
 - cordova-plugin-local-notification
 - cordova-plugin-background-service
 - cordova-plugin-background-fetch

We would like to thank the people behind all these things, listed above.
That's thanks to people like them that developers can improve and deploy their work. It's with the same spirit that we decided to publish this template version of our app.
