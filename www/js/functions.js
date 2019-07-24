function init()
{
  if(window.localStorage.getItem('isMember') == '1')
  {
      displayPanel('user');
  }
  else
  {
      displayPanel('anon');
  }
}

function displayPanel(type)
{
  if(type == 'user')
  {
    $$('.app-panel-logged-user').show();
    $$('.app-panel-anon-user').hide();
    $$('.app-panel-debug-user').hide();
  }
  else if(type == 'anon')
  {
    $$('.app-panel-logged-user').hide();
    $$('.app-panel-anon-user').show();
    $$('.app-panel-debug-user').hide();
  }
  else if(type == 'debug')
  {
    $$('.app-panel-logged-user').show();
    $$('.app-panel-anon-user').show();
    $$('.app-panel-debug-user').show();
  }
}

function checkPhotoExist()
{
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
    fileSystem.root.getFile("FolderApp/member-pic.jpg", { create: false }, function(fileEntry){
        window.localStorage.setItem('pictureURL',fileEntry.toURL());
    }, function(){alert('A photo will be taken and stored on your phone. It will be used for your member card');capturePhoto();});
  }, function(evt){console.log(evt.target.error.code);});
}

function capturePhoto() {
// Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(function(imageData){movePic(imageData);}, function(message) {alert('Failed to load picture because: ' + message);}, { quality: 50, correctOrientation: true });
}

function movePic(file){ 
    window.resolveLocalFileSystemURI(file, resolveOnSuccess, resOnError); 
} 

//Callback function when the file system uri has been resolved
function resolveOnSuccess(entry){ 
  var d = new Date();
  var n = d.getTime();
  //new file name
  var newFileName = "member-pic.jpg";
  var myFolderApp = "FolderApp";

  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {      
  //The folder is created if doesn't exist
  fileSys.root.getDirectory( myFolderApp,
                  {create:true, exclusive: false},
                  function(directory) {
                      entry.moveTo(directory, newFileName,  successMove, resOnError);
                  },
                  resOnError);
                  },
  resOnError);
}

//Callback function when the file has been moved successfully - inserting the complete path
function successMove(entry) {
  //I do my insert with "entry.fullPath" as for the path
  window.localStorage.setItem('pictureURL',entry.toURL());
}

function resOnError(error) {
  alert(error.code);
}

function toogleNextDiv(element)
{
  $$($$(element).parent().find('div')[1]).toggleClass('d-none');
}


//you can use a JS function in this kind to retrieve data, by calling your API
function loadDatafromDB(page)
{
  app.preloader.show();
  app.request.post(API, {
      function: '',
      'page': page
  }, function (data) {
      app.preloader.hide();
      data = JSON.parse(data);
      if(data['error'])
      {
          app.dialog.alert('Error while retrieving the data', 'Error');
          return;
      }
      content = "";
      //here you retrieve the data, and generate a card for each lines of data you get
      for(let i = 0; i < data['data'].length; i++)
      {
        content += '<div class="row"><div class="col-100"><a href="/club/' + data['data'][i]['id'] + '/"><div class="card"><div class="card-header">' + data['data'][i]['title'] + '</div></div></div>'; 
      }
  
      $$(".page[data-name='clubs'] .content").html(content);  //example here, you put the content on the 'OurFriends' page
      
      return false;
  }, function () {
      app.preloader.hide();
      app.dialog.alert('Cant connect to server', 'Error');
  });
}
// checkdata in order to generate notifications
function checkData()
{
  if(window.localStorage.getItem('isMember') == '1')
  {
  app.preloader.show();
  app.request.post(API, {
      function: '',
      'token': window.localStorage.getItem('userToken')
  },  function (data) {
      app.preloader.hide();
      data = JSON.parse(data);
      if(data['error'])
      {
          app.dialog.alert('Error while retrieving data', 'Error');
          return;
      }
      j = [];
      for(let i = 0; i < data['data'].length; i++)
      {
      
        j.push(parseInt(data['data'][i]['id'],10));      
      }

      if (StoreOld_HN_Number(j[0]) == true)
      {
        generateNotification(data['data'][0]['title']);
      }
      return false;
  }, function () {
      app.preloader.hide();
      app.dialog.alert('Cant connect to server', 'Error');
  });
}
}



function loadMemberInfos(page)
{
  app.preloader.show();
  app.request.post(API, {
      function: '',
      'page' : page,
      'login': window.localStorage.getItem('userLogin'),
      'token': window.localStorage.getItem('userToken')
  }, function (data) {
      app.preloader.hide();
      data = JSON.parse(data);

      first_last_name = "<p class='underline bold d-inline-flex'>Name :</p>" + data['first_name']+" "+data['last_name'];
      num_amica = "<p class='underline bold d-inline-flex'>Member ID :</p>" + window.localStorage.getItem('userLogin');
      expiration = "<p class='underline bold d-inline-flex'>Expiration Date:</p>" + data['expiration'];

      $$(".page[data-name='carte-amicaliste'] .first_last_name").html(first_last_name);
      $$(".page[data-name='carte-amicaliste'] .num_amica").html(num_amica);
      $$(".page[data-name='carte-amicaliste'] .expiration").html(expiration);
      return false;
  });
}

function ChangePassWord()
{
  app.loginScreen.open('#password-screen');
}
function generateNotification(content)
{
  if(window.localStorage.getItem('isMember') == '1')
  {
      var notif = {
        id:1,
        title:'your notification',
        text: content,
        foreground: true
      }
      cordova.plugins.notification.local.schedule(notif);
  
  }
}
