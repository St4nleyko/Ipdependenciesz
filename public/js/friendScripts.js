
function showFriends(){
let requestsSent=[];

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/getmyfriendlist/"+userId,
        headers: {'x-access-token': accessToken},
        success: function (result, status, xhr) {
            $.each(result, function (i, friend) {
                requestsSent[friend.id] = {"accepted": friend.UsersFriends.accepted };
                if(friend.UsersFriends.accepted == 0){
                    $('#requestList').append
                    (
                        '<tr>'+
                            '<td>'+friend.id+' </td>'+
                            '<td>'+friend.username+'</td>'+
                            '<td><button class="btn btn-warning" onclick="cancelFriendRequest('+friend.id+')">Cancel Request</button></td>'+
                        '</tr>'
                    )
                }
                if(friend.UsersFriends.accepted == 1){
                    $('#friendList').append
                    (
                        '<tr>'+
                            '<td>'+friend.id+' </td>'+
                            '<td>'+friend.username+'</td>'+
                            '<td><button class="btn btn-danger" onclick="removeFriend('+friend.id+')">Remove Friend</button></td>'+
                        '</tr>'
                    )
                }
            });

        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}

function showUserFriends(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/getfriendlist/"+userId,
        headers: {'x-access-token': accessToken},
        success: function (result, status, xhr) {
            console.log(result);
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
        });
}


function showUserFriendsValidation(urlId){
    let notMyFriend = false;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/getfriendlist/"+userId,
        headers: {'x-access-token': accessToken},
        success: function (result, status, xhr) {
            if(result.length < 1){
                notMyFriend = true;
            }
            else{
                $.each(result, function (i, friend) {

                    console.log('moji friends: '+friend.id)
                    if(friend.id != urlId)  
                    {
                        notMyFriend = true;
                    }

                });
            }
            if(urlId == userId){
                notMyFriend = false;
            }
            if(notMyFriend == true){
                window.location.href="./login.html"
            }

        },
        error: function (xhr, status, error) {
            console.log(error);
        }
        });
}
function getFriendRequests(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/getfriendrequests/"+userId,
        headers: {'x-access-token': accessToken},
        success: function (result, status, xhr) {           
            $.each(result, function (i, friendRequest) {
                console.log(friendRequest)
                $('#requestList').append
                (
                    '<tr>'+
                        '<td>'+friendRequest.id+' </td>'+
                        '<td>'+friendRequest.username+'</td>'+
                        '<td><button class="btn btn-success" onclick="acceptFriendRequest('+friendRequest.id+')">Accept</button></td>'+
                        '<td><button class="btn btn-danger" onclick="declineFriendRequest('+friendRequest.id+')">Decline</button></td>'+
                    '</tr>'
                )
            });
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
     });
}


function sendFriendRequest(friendId){
     $.ajax({    
        type: "POST",
        url: "http://localhost:8080/api/sendfriendrequest/",
        contentType: "application/json",
        headers: {'x-access-token': accessToken},
        dataType: "json",
        data: JSON.stringify({
            "user_id":userId,
            "friend_id":friendId
        }),
        success:  function (data, status) {
            console.log(data);
            },
            error: function(errMsg) {
            console.log(errMsg);
        },
    });
    window.location.reload();
}

function acceptFriendRequest(friendId){
     $.ajax({    
        type: "POST",
        url: "http://localhost:8080/api/acceptfriendrequest/",
        contentType: "application/json",
        headers: {'x-access-token': accessToken},
        dataType: "json",
        data: JSON.stringify({
            "user_id":userId,
            "friend_id":friendId
        }),
        success:  function (data, status) {
            console.log(data);
            },
            error: function(errMsg) {
            console.log(errMsg);
        },
    });
    window.location.reload();
}
function declineFriendRequest(friendId){
     $.ajax({    
        type: "POST",
        url: "http://localhost:8080/api/declinefriendrequest/",
        contentType: "application/json",
        headers: {'x-access-token': accessToken},
        dataType: "json",
        data: JSON.stringify({
            "user_id":friendId,
            "friend_id":userId
        }),
        success:  function (data, status) {
            console.log(data);
        },
            error: function(errMsg) {
            console.log(errMsg);
        },
    });
    window.location.reload();
}
function cancelFriendRequest(friendId){    
     $.ajax({    
        type: "POST",
        url: "http://localhost:8080/api/cancelfriendrequest/",
        contentType: "application/json",
        headers: {'x-access-token': accessToken},
        dataType: "json",
        data: JSON.stringify({
            "user_id":userId,
            "friend_id":friendId
        }),
        success:  function (data, status) {
            console.log(data);
        },
            error: function(errMsg) {
            console.log(errMsg);
        },
    });
    window.location.reload();
}
function removeFriend(friendId){    
     $.ajax({    
        type: "POST",
        url: "http://localhost:8080/api/removefriend/",
        contentType: "application/json",
        headers: {'x-access-token': accessToken},
        dataType: "json",
        data: JSON.stringify({
            "user_id":userId,
            "friend_id":friendId
        }),
        success:  function (data, status) {
            console.log(data);
        },
            error: function(errMsg) {
            console.log(errMsg);
        },
    });
    window.location.reload();
}

 function searchUsers(query){
    let searchWord = query;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/searchusers/"+query,
        headers: {'x-access-token':accessToken},
        success: function (result, status, xhr) {
            let html = '<ul class="list-group">';
            $.each(result, function (i, user) {
            if(user.id != userId && query.length > 1){
                if(result.length > 0 )
                {
                    document.getElementById('search_result').style.display="block";
                    html += '<li class="list-group-item text-muted"><i class="fas fa-history mr-3"></i><a style="color:#000;" class="searchText" href="profile.html?id='+user.id+'">'+user.username+'</li>';
                    document.getElementById('search_result').innerHTML = html;
                }
            }
            else{
                document.getElementById('search_result').style.display="none";
            }
            $('.searchText').wrapInTag({
                tag: 'b',
                words: [searchWord]
              });
         });
         html += '</ul>';

        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
    $.fn.wrapInTag = function(opts) {

        var tag = opts.tag || 'strong'
          , words = opts.words || []
          , regex = RegExp(words.join('|'), 'gi') // case insensitive
          , replacement = '<'+ tag +'>$&</'+ tag +'>';
      
        return this.html(function() {
          return $(this).text().replace(regex, replacement);
        });
      };
}