function blogTemplate(templateId, container, model) {
  var templateString = $('#' + templateId).text();
  var templateFunction = _.template(templateString);
  var renderTemplate = templateFunction(model);
  console.log("ID: "+templateId, renderTemplate);
  $(container).append(renderTemplate);
}

function editTemplate(templateId, container, model) {
  var templateString = $('#' + templateId).text();
  var templateFunction = _.template(templateString);
  var renderTemplate = templateFunction(model);
  console.log("ID: "+templateId, renderTemplate);
  $(container).append(renderTemplate);
}


//POST

$("form").submit(function(event){
  var blog = $(this).serializeArray();
  event.preventDefault();

$.ajax("http://tiny-pizza-server.herokuapp.com/collections/olliesblog", {
  type: "POST",
  dataType: 'json',
  data: blog


});
});

//GET
$.ajax("http://tiny-pizza-server.herokuapp.com/collections/olliesblog", {
  type: "GET",
  dataType: "json",
}).done(function(data){

   _.each(data, function(getblog){
  var blogStuff = {
    title: getblog.title,
    text: getblog.text,
    id: getblog._id,
  };

  blogTemplate('blogId', '.each-post', blogStuff);
});
});


//DELETE

$('.each-post').delegate('.delete', 'click', function(){

  //var postID = $(this).attr("data-id");
  var del = $(this).closest('div');
//console.log($(this.attr('data-id')));
  $.ajax("http://tiny-pizza-server.herokuapp.com/collections/olliesblog/" + $(this).attr('data-id'), {
    type: "DELETE",
    dataType: 'json'
  });

});


//PUT

$('.edit').on('click', function(editWindow){
  $()
    //toggleClass somewhere
    // editTemplate('edit-window', '.each-post', );
});







// $('.each-post').delegate('.edit', 'click', function(){
//
//   $.ajax("http://tiny-pizza-server.herokuapp.com/collections/olliesblog/" + $(this).attr('data-id'), {
//    type: "PUT",
//    dataType: 'json',})
//    .done(function(editData){
//
//      //if('title' == $(this).title){
//
//      //clear html
//
//      _.each(data, function(editblog){
//     var blogEdit = {
//       title: editblog.title,
//       text: editblog.text,
//       id: editblog._id,
//     };
//
//     blogTemplate('blogId', '.each-post', blogEdit);
//
//    });
//  });
//
// });


//HEADER

// -onclick - empty h1, append with new header from input
