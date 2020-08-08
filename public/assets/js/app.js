$(document).ready(function ($) {
    firebase.auth().onAuthStateChanged(function (user) {
        console.log("user:", user)
        var cu = window.location.href;
        // current url : 현재 주소 출력 
        var n1 = cu.indexOf("auth/login");
        // http://127.0.0.1:5500/public/auth/login/  => n1 = 29
        // http://127.0.0.1:5500/public  => n1 = -1
        if (user) {
            // 로그인 상태 
            if (n1 > 1) {
                // 로그인 상태에서 로그인 페이지로 갈 경우 
                window.open("../../", "_self", false);
            } else {
                // 로그인 상태에서 홈화면에 들어갈 경우
                console.log("home", user);
                $("#lblemail").text(user.email);
            }
        } else {
            $(".auth").css("display", "none")



            // 로그아웃 상태에서 홈화면에 들어올 경우 
            if (n1 < 1) {
                $("#state_login").text("로그인");
                $("#state_logout").css("display", "none");
            }
        }
    })
})

// function onLoadMain() {
//     if (user) {
//         var ref = firebase.database().ref("post/");
//         // limitToLast : 보여지는 갯수
//         ref.orderByChild('uid').equalTo(user.uid).limitToLast(1).once("value", function (data) {
//             data.forEach(element => {
//                 $("#myimg").attr('src', element.val().img);

//             });
//         })
//     }
// }

// // 데이터 베이스 쓰기 
// function newpost() {
//     var user = firebase.auth().currentUser;
//     if (user) {
//         var d = new Date();

//         // 사용자마다 랜덤id키 생성 
//         var newPostKey = firebase.database().ref().child("post/").push().key;

//         firebase.database().ref("post/" + newPostKey)
//             .set({
//                 uid: user.uid,
//                 createdAt: d.getTime(),
//                 reverseCreatedAt: -d.getTime(),
//                 contents: $("#message").val()
//             })
//             .then(function (result) {
//                 alert("전송완료")
//                 window.open("/public/post/index.html", "_self", false);
//             })
//     }
// }
// // 데이터 베이스 읽기 
// function loadpost() {
//     var user = firebase.auth().currentUser;
//     if (user) {
//         var ref = firebase.database().ref("post/");
//         // limitToLast : 보여지는 갯수
//         ref.orderByChild('uid').equalTo(user.uid).limitToLast(1).once("value", function (data) {
//             data.forEach(element => {
//                 $("#message").val(element.val().contents);
//                 $("#message").attr("key", element.key);
//             });
//         })
//     }

// }

// // 데이터 베이스 수정 
// function update() {
//     var user = firebase.auth().currentUser;
//     if (user) {
//         var _key = $("#message").attr("key")
//         var ref = firebase.database().ref("post/" + _key + "/");
//         var udate = {
//             contents: $("#message").val(),
//             newvalue: ""
//         }
//         ref.update(udate).then(function (element) {
//             alert("수정완료")
//             window.open("/public/post/index.html", "_self", false);
//         })
//     }

// }
// // 데이터 베이스 삭제 
// function deletepost() {
//     var user = firebase.auth().currentUser;
//     if (user) {
//         var _key = $("#message").attr("key")
//         var ref = firebase.database().ref("post/" + _key + "/")

//         ref.remove().then(function () {
//                 alert("삭제완료")
//                 window.open("/public/post/index.html", "_self", false);
//             })
//             .catch(function (error) {
//                 console.log("Remove faliled" + error.message);
//             });
//     }

// }


// function uploadimage() {
//     $("#fileinput").click();
// }
// $('#fileinput').on('change', function () {
//     onLoadImage(this);
// });

// function onLoadImage(input) {

//     if (input.files && input.files[0]) {
//         var items = input.files[0];
//         var _size = items.size;
//         var _itemsize = Math.round(items.size / 1024 / 1024);
//         console.log(_size);
//         if (_size > 5000000) {
//             alert("Allowed file size exceeded. (Max. 5 MB), Current file size is [" + _itemsize + " MB]", 'error');
//         } else {
//             var reader = new FileReader();
//             reader.onload = function (e) {
//                 $("#myimg").attr("src", e.target.result)
//                 savetostorage(items);
//             }
//             reader.readAsDataURL(input.files[0]);
//         }
//     } else {
//         alert("Sorry - you're browser doesn't support the FileReader API");
//     }
// }

// function savetostorage(items) {
//     var user = firebase.auth().currentUser;
//     if (user) {
//         
//         var storageRef = firebase.storage().ref();
//         var _name = items.name.replace(/[~`!#$%\^&*+=\-\[\]\\';,/{}()|\\":<>\?]/g, "");
//         var uploadTask = storageRef.child('data/' + user.uid + "/" + _name).put(items);
//         uploadTask.on('state_changed', function (snapshot) {}, function (error) {
//             console.log(error);
//         }, function () {
//             uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {

//                 var newPostKey = firebase.database().ref().child("user/").push().key;
//                 firebase.database().ref("user/" + newPostKey)
//                     .set({
//                         uid: user.uid,
//                         img: downloadURL,
//                     })
//                     .then(function (result) {
//                         alert("전송완료")
//                         window.open("/public/", "_self", false);
//                     })
//             });
//         });
//     }


// }