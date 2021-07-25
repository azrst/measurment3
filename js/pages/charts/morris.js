$(function () {
  // getMorris("bar", "bar_chart");
});

function searchData() {
  var txtSearch = document.getElementById("txtSearch").value;
  var txtPin = document.getElementById("txtPinValidation").value;
  var starCountRef = firebase.database().ref("poltekkes jkt 2/" + txtSearch);
  starCountRef.on("value", (snapshot) => {
    const data = snapshot.val();
    var pengukuran = dataToArray(data.pengukuran);

    if (data.pin === txtPin) {
      document.getElementById("txtID").value = txtSearch;
      document.getElementById("txtName").value = data.name;
      document.getElementById("txtDob").value = data.DoB;
      document.getElementById("txtEmail").value = data.email;
      document.getElementById("txtPin").value = data.pin;

      getMorris("bar", "bar_chart", pengukuran);

      document.getElementById("btnEdit").style.display = "block";
    } else {
      alert("PIN is not matched");
    }
  });
}

function editProfile() {
  document.getElementById("txtSearch").value = "";
  document.getElementById("txtPinValidation").value = "";

  document.getElementById("txtSearch").readOnly = true;
  document.getElementById("txtPinValidation").readOnly = true;
  document.getElementById("txtName").readOnly = false;
  document.getElementById("txtDob").readOnly = false;
  document.getElementById("txtEmail").readOnly = false;
  document.getElementById("txtPin").readOnly = false;

  document.getElementById("divPin").style.display = "block";
  document.getElementById("btnCancel").style.display = "inline-block";
  document.getElementById("btnSave").style.display = "inline-block";
}

function addProfile() {
  document.getElementById("txtSearch").value = "";
  document.getElementById("txtPinValidation").value = "";
  document.getElementById("txtID").value = "";
  document.getElementById("txtName").value = "";
  document.getElementById("txtDob").value = "";
  document.getElementById("txtEmail").value = "";
  document.getElementById("txtPin").value = "";

  document.getElementById("txtSearch").readOnly = true;
  document.getElementById("txtPinValidation").readOnly = true;
  document.getElementById("txtID").readOnly = false;
  document.getElementById("txtName").readOnly = false;
  document.getElementById("txtDob").readOnly = false;
  document.getElementById("txtEmail").readOnly = false;
  document.getElementById("txtPin").readOnly = false;

  document.getElementById("btnEdit").style.display = "none";
  document.getElementById("divPin").style.display = "block";
  document.getElementById("btnCancel").style.display = "inline-block";
  document.getElementById("btnSave").style.display = "inline-block";

  getMorris("bar", "bar_chart", [{}]);
}

function cancel() {
  document.getElementById("txtSearch").value = "";
  document.getElementById("txtPinValidation").value = "";
  document.getElementById("txtID").value = "";
  document.getElementById("txtName").value = "";
  document.getElementById("txtDob").value = "";
  document.getElementById("txtEmail").value = "";
  document.getElementById("txtPin").value = "";

  document.getElementById("txtSearch").readOnly = false;
  document.getElementById("txtPinValidation").readOnly = false;
  document.getElementById("txtID").readOnly = true;
  document.getElementById("txtName").readOnly = true;
  document.getElementById("txtDob").readOnly = true;
  document.getElementById("txtEmail").readOnly = true;
  document.getElementById("txtPin").readOnly = true;

  document.getElementById("btnEdit").style.display = "none";
  document.getElementById("divPin").style.display = "none";
  document.getElementById("btnCancel").style.display = "none";
  document.getElementById("btnSave").style.display = "none";

  getMorris("bar", "bar_chart", [{}]);
}

function save() {
  var txtID = document.getElementById("txtID").value;
  var txtName = document.getElementById("txtName").value;
  var txtDob = document.getElementById("txtDob").value;
  var txtEmail = document.getElementById("txtEmail").value;
  var txtPin = document.getElementById("txtPin").value;

  if (document.getElementById("btnEdit").style.display === "none") {
    firebase
      .database()
      .ref("poltekkes jkt 2/" + txtID)
      .set(
        {
          name: txtName,
          DoB: txtDob,
          email: txtEmail,
          pin: txtPin,
        },
        (error) => {
          if (error) {
            alert("Add data failed, try again later");
          } else {
            alert("Add data success");
            cancel();
          }
        }
      );
  } else {
    firebase
      .database()
      .ref("poltekkes jkt 2/" + txtID)
      .update(
        {
          name: txtName,
          DoB: txtDob,
          email: txtEmail,
          pin: txtPin,
        },
        (error) => {
          if (error) {
            alert("Edit data failed, try again later");
          } else {
            alert("Edit data success");
            cancel();
          }
        }
      );
  }
}

function dataToArray(obj) {
  var returnArr = [];

  for (var key in obj) {
    var arr = {};
    var value = obj[key];
    arr.x = key;
    arr.y = value;

    returnArr.push(arr);
  }

  return returnArr;
}

function getMorris(type, element, pengukuran = null) {
  $("#" + element).empty();
  Morris.Bar({
    element: element,
    data: pengukuran,
    xkey: "x",
    ykeys: ["y"],
    labels: ["Y"],
    barColors: ["rgb(0, 188, 212)"],
  });
}
