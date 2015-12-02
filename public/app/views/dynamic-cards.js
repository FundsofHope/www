

var paper_count=0;

function create_cards(){
	//console.log("yes");
	//$("#cards ").after('<paper-card id="paper-card'+(paper_count)+'" ><div id="image"><span id="project-name">Project Name</span> </div><div class="card-content"><paper-fab mini icon="home" id="home-icon"></paper-fab>Lorem ipsum dolor sit amet, nec ad conceptam interpretaris, mea ne solet repudiandae. Laudem nostrud ei vim. Sapientem consequuntur usu ad, vel etiam philosophia ex, ad quidam option quo. Sed sale integre pericula ei, rebum adipiscing ius ea.</div><div class="card-actions"></div></paper-card>');
		
	for(var i=0;i<6;i++)
	{
		$("#cards paper-card:last-child").before('<paper-card id="paper-card" ><div id="image"></div><div class="card-content"><paper-fab mini icon="home" id="home-icon"></paper-fab><p style="font-size: 12px;"><strong style="font-size: 15px;">project name</strong><br/> Lorem ipsum dolor sit amet, nec ad conceptam interpretaris, mea ne solet repudiandae. Laudem nostrud ei vim. Sapientem consequuntur usu ad, vel etiam philosophia ex, ad quidam option quo. Sed sale integre pericula ei, rebum adipiscing ius ea.</p></div>');
		paper_count++;
		//console.log("yes"+paper_count);
	}
}

$(window).load(function(){

	create_cards();
});

$(document).ready(function(){
  //Jquery code 
  $('#btn').click(function(){
	console.log("enter");
		create_cards();
}); 
    var $alpha = $('#cards');
    var $container = $('#beta');

    $('#btn').click(function(){
        console.log("enter2");
    //$container.isotope('shuffle');
  });
});


