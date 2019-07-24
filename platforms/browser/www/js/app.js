// Dom7
var $$ = Dom7;

var API = 'https://link-to-your-api.com';

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'com.yourappname.app', // App bundle ID
  name: 'Student Association app', // App name
  theme: 'md', // Automatic theme detection
  // App root data
  /*data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },*/
  // App root methods
  /*methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },*/
  routes: routes,
  panel: {
    swipe: 'left',
  }
});

/*document.addEventListener("deviceready", function() {
  console.log('Received Device Ready Event');
  console.log('calling setup push');
  console.log('calling push init');
  var push = PushNotification.init({
      "android": {
          "senderID": "XXXXXXXX"
      },
      "browser": {},
      "ios": {
          "sound": true,
          "vibration": true,
          "badge": true
      },
      "windows": {}
  });
  console.log('after init');

  push.on('registration', function(data) {
      console.log('registration event: ' + data.registrationId);

      var oldRegId = localStorage.getItem('registrationId');
      if (oldRegId !== data.registrationId) {
          // Save new registration ID
          localStorage.setItem('registrationId', data.registrationId);
          // Post registrationId to your app server as the value has changed
      }
  });

  push.on('error', function(e) {
      console.log("push error = " + e.message);
  });

  push.on('notification', function(data) {
      console.log('notification event');
      navigator.notification.alert(
          data.message,         // message
          null,                 // callback
          data.title,           // title
          'Ok'                  // buttonName
      );
 });
}, false);*/

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/',
  on: {
    'pageBeforeIn': function(page) {
      
     // console.log(page);
      $$('#app > div.navbar > div > div.title').html(page.route.route.title);
      if($$('#cadrephoto').length > 0)
      {
        $$('#cadrephoto img').attr('src', window.localStorage.getItem('pictureURL'));
      }
      if (page.name == 'carte-amicaliste')
      {
        //call your js functions from functions.js
        console.log('nothing');
     
      }
      if(page.name == 'clubs')
      {
        if(page.route.params.page != null)
        //call your js functions from functions.js
        console.log('nothing');
        else
        console.log('nothing');

       
      }
      if(page.name == 'club')
      {
        //call your js functions from functions.js
        console.log('nothing');

     
      }
      else if(page.name == 'actualites')
      {
        if(page.route.params.page != null)
          //call your js functions from functions.js
          console.log('nothing');
        else
          console.log('nothing');

        
      }
      else if(page.name =="hotnews")
      {
        if(page.route.params.page != null)
          //call your js functions from functions.js
          console.log('nothing');
        else
          console.log('nothing');

          
        
      }
      else if(page.name == 'actualite')
      {
        //call your js functions from functions.js
        console.log('nothing');
       
      }
    }
  }
  
});



$$(document).on('page:init', function (e, page) {

});

document.addEventListener('deviceready', function () {
  document.dispatchEvent(event);
}, false);

var event = new Event('AppStartup');


document.addEventListener('AppStartup', function () {
  //cordova.plugin.backgroundMode.setEnabled(true); if u want !
  window.plugin.backgroundMode.enable();  
  if(window.localStorage.getItem('isMember') == '1')
  {
    checkData(); //checking data to generate notifications if user is connected
    
    var BackgroundFetch = window.BackgroundFetch;
    BackgroundFetch.configure(
      function()
      {
        setInterval(function(){checkData();},360000); //checking every hour !
       
        BackgroundFetch.finish();
      },
    function()
    {
      console.log('error');
    },
    {minimumFetchInterval: 15,
    stopOnTerminate : false,
    enableHeadless: true});  
  } 
  
  }, false);



document.addEventListener("backbutton", function() {
  appView.goBack();
}, false);

$$('.panel .list a').on('click', function (e) {
  app.panel.close('left');
});

$$('#main-login-screen .login-button').on('click', function () { //login screen handler

  let login = $$('#main-login-screen [name="login"]').val();
  let password = $$('#main-login-screen [name="password"]').val();
  $$('#main-login-screen [name="password"]').val('');
  if (login == 'test' && password == 'test')
  {
      window.localStorage.setItem('isMember','1');
      window.localStorage.setItem('userLogin',login);
      //document.dispatchEvent(event);
      displayPanel('user');
      app.router.navigate('/'); 
      app.loginScreen.close('#main-login-screen');
      checkPhotoExist();

  }
  else
  {
    app.dialog.alert('Nope ! ID and password are : test','Error');
  }
  // You can use this code down below to send your API Requests. But please adapt it
  // it's juste an example

  // app.preloader.show();        
  // app.request.post(API, { 
  //   'function': 'login-member', 
  //   'ID': login, 
  //   'pswd': password 
  // }, function (data) {
  //   app.preloader.hide();
  //   data = JSON.parse(data);
  //   if(data['Logged'] == true && data['tkn'] != null)
  //   {
  //     window.localStorage.setItem('isMember','1');
  //     window.localStorage.setItem('userLogin',login);
  //     document.dispatchEvent(event);
  //     app.router.navigate('/');
      
  //     displayPanel('user');

  //     if(data['firstConnexion'] == true)
  //     {
  //       app.loginScreen.close('#main-login-screen');
  //       app.loginScreen.open('#password-screen');
  //     }
  //     else
  //     {
  //       app.loginScreen.close('#main-login-screen');
  //       checkPhotoExist();
  //     }
  //   }
  //   else
  //   {
  //     app.dialog.alert('Wrong IDs','Erreur');
  //   }
  // }, function() {
  //   app.preloader.hide();
  //   app.dialog.alert('Cant connect to the server','Error');
  // });
});

$$('#password-screen .change-password-button').on('click', function () {    //changed password handler

  let oldPassword = $$('#password-screen [name="old-password"]').val();
  let newPassword1 = $$('#password-screen [name="new-password-1"]').val();
  let newPassword2 = $$('#password-screen [name="new-password-2"]').val();

  $$('#password-screen [name="old-password"]').val('');
  $$('#password-screen [name="new-password-1"]').val('');
  $$('#password-screen [name="new-password-2"]').val('');

  if(oldPassword == newPassword1)
  {
    app.dialog.alert('New password has to be different', 'Error')
    return;
  }

  if(newPassword1 != newPassword2)
  {
    app.dialog.alert('New passwords dont match', 'Error')
    return;
  }

  app.preloader.show();
  app.request.post(API, { 
    function: 'chg-password', 
    'old-password': oldPassword, 
    'new-password-1': newPassword1, 
    'new-password-2': newPassword2, 
    'login': window.localStorage.getItem('userLogin'), 
  }, function (data) {
    app.preloader.hide();
    data = JSON.parse(data);
    if(data['error'] == false && data['passwordChged'] == true)
    {
      app.loginScreen.close('#password-screen');
      app.dialog.alert('Password updated successfully','Info');
      checkPhotoExist();
    }
    else
    {
      app.dialog.alert('Previous pass is not the good one','Error');
    }
  }, function() {
    app.preloader.hide();
    app.dialog.alert('Cant connect to server','Error');
  });
});

$$('.logout-button').on('click', function () {
  if(window.localStorage.getItem('isMember') == '0')
  {
    app.dialog.alert('Wow wtf something wrong is going on !','Error');
  }
  app.panel.close('left');
  displayPanel('anon');
  app.router.navigate('/');
  window.localStorage.setItem('isMember','0');
  window.localStorage.setItem('userToken','');
  window.localStorage.setItem('username','');

});

$$(window).on('orientationchange',function(e){ console.log(e.orientation) });

init();