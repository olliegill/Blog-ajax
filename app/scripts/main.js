function blogTemplate(templateId, container, model) {
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
}).done(function(){
    //$(".blog-repo").html("");

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

// -click edit.
// -open textarea.
// -submit new text back into post.


//HEADER

// -onclick - empty h1, append with new header from input
