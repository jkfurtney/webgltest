console.log("ci");

var url = "http://localhost:8000/p.json";
d3.json(url, function (json) {
  console.log("hi");
  console.log(json);
  json["plotdata"].forEach(function (d,i) {console.log(d[0]);});
});

console.log("ci2");

// var getJSON = function(url, callback) {
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.responseType = 'json';
//     xhr.onload = function() {
//       var status = xhr.status;
//       if (status == 200) {
//         callback(null, xhr.response);
//       } else {
//         callback(status);
//       }
//     };
//     xhr.send();
// };

// getJSON("http://localhost:8000/p.json",
// function(err, data) {
//   if (err != null) {
//     alert('Something went wrong: ' + err);
//   } else {
//     console.log(data);
//     alert('Your query count: ' + data.query.count);
//   }
// });


// fetch("http://localhost:8000/p.json").then(function(response) {
//   console.log("g");
//   console.log(response.json());
//   return 0;// response.blob();
//      });
// console.log("ci2");
