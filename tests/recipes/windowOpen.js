function myFunction2() {
    var myWindow = window.open("", "", "width=200,height=100");

    //The following API should not be counted
    window.opener.document.write("something");
}