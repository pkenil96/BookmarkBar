/************************************************************************************/

/*
  function addToLocalStorage() is responsible for fetching the data from the
  html form and storing it into the localstorage
*/
function addToLocalStorage(e){

  /*
  Getting the site name and url entered by user
  */
  var siteName = document.getElementById('siteName').value;
  var siteURL = document.getElementById('siteURL').value;

  /*
    Preventing empty input
  */

  if(!siteName || !siteURL){
    alert('Required fields  empty');
    return false;
  }

  /*
    Creating  JS object to store data to local storage
  */
  var bookMark = {
    name:siteName,
    url:siteURL
  }

  /*
    Clearing the fields once submit button has been pressed
    and data is stored to the localStorage
  */

  document.getElementById('siteName').value='';
  document.getElementById('siteURL').value='';

  /*
    When the page is used for the first time , there might be no
    data in the local storage; in that case we create an array
    and populate the values
  */

  if(localStorage.getItem('bookmark_array')===null){
    /*
      Defining the array to store bookmark objects
    */
    var bookmark_array = [];
    /*
      adding the bookmark object to the array
    */
    bookmark_array.push(bookMark);
    /*
      Updating the localStorage by adding the array
    */
    localStorage.setItem('bookmark_array',JSON.stringify(bookmark_array));
  }
  else{
    /*
      In case the array already  exist then we fetch the array and update it
      Note - The array stored in the localStorage will be in text(or JSON) format
      so we need to convert into JS object using parse method
    */
    var bookmark_array = JSON.parse(localStorage.getItem('bookmark_array'));
    //adding bookmark to array
    bookmark_array.push(bookMark);
    //reset back to local storage
    localStorage.setItem('bookmark_array',JSON.stringify(bookmark_array));

  }
  /*
    Fetching the content after updating the localStorage
  */

  fetchBookmarks();
}

/************************************************************************************/

function fetchBookmarks(){

  var bookmark_array = JSON.parse(localStorage.getItem('bookmark_array'));
  var bookmarkResults = document.getElementById('bookmarkResults');

  bookmarkResults.innerHTML = "";

  for(var i=0;i<bookmark_array.length;i++){
    var name=bookmark_array[i].name;
    var url=bookmark_array[i].url;

    bookmarkResults.innerHTML += '<div class="well">'+
                                 '<h4>'+name+
                                 ' <a class="btn btn-primary" target="_blank" href="'+url+'">Visit</a> '+
                                 ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" target="_blank">Delete</a >' +
                                 '</h4>'+
                                 '</div>';

  }
}//end of fetchBookmarks

/************************************************************************************/

function deleteBookmark(url){/*Its exactly as it sounds :)*/

  var bookmark_array = JSON.parse(localStorage.getItem('bookmark_array'));

  for(var i=0;i<bookmark_array.length;i++){
    if(bookmark_array[i].url == url){
      /*
        bookmarks.splice(i,1) would remove the ith record from it
      */
      bookmark_array.splice(i,1);
    }
  }
  localStorage.setItem('bookmark_array',JSON.stringify(bookmark_array));
  fetchBookmarks();
}
/************************************************************************************/
