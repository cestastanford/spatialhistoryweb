// JavaScript Document
var filterTerms = [];
var project_list = [];
$(document).ready(function(){
	$('feedbackItem').each(
		function(){
			$(this).toggle();
		}
	)
	
	//fill the initial project array and set the styles in there to the defaults
	//fillProjects();
	//when you leave the menu close any active pop menus
	$('.pop_menu').hover(function(){},function(){$('.pop').removeClass('active')});
	//bind the filterItem click  to the filter function 
	$('#gallery_nav_menu .filterItem a').bind('click', function(){
							
		var feedbackItem = '#' + $(this).attr('slug') + '_feedback';
		$(feedbackItem).toggle();

		if($(this).hasClass('selected_filter')){
			$(this).removeClass('selected_filter');
			$(this).css('color', '#888');
			
		}else{
			$(this).addClass('selected_filter');
			$(this).css('color', 'white');
		}

		filterTerms = buildFilter($(this).attr('slug'));
		if(filterTerms.length < 1 ){
			resetFilter();
		}else{
			filterIt(filterTerms);
		}
		
	});
	
	//set the actions for the feedback items
	$('a.feedbackItem').bind('click', function(){
		$(this).toggle()
		var triggerItem = '#' + $(this).attr('slug') + '_trigger';
		$(triggerItem).css('color', '#888');
		//if this is a project filter do this
		if($(this).hasClass('projectFeedback')){
			project_list = buildProjectFilter($(this).attr('slug'));

			if(project_list.length < 1 ){
				resetProjects();
			}else{
				filterProject(project_list);
			}
		//else is is a classification filter so do this. 
		}else{
			filterTerms = buildFilter($(this).attr('slug'));
			if(filterTerms.length < 1 ){
				resetFilter();
			}else{
				filterIt(filterTerms);
			}
		}
		
	});

	

	//
	$('#gallery_nav_menu .filterProject a').bind('click', function(){
			project_list = buildProjectFilter($(this).attr('slug'));
			var feedbackItem = '#' + $(this).attr('slug') + '_feedback';
			$(feedbackItem).toggle();
			if($(this).attr('slug') == 'all' ){
				resetProjects();
			}else{
				
				$('#all_trigger').css('color', '#888');
				if($(this).hasClass('selected_filter')){
					$(this).removeClass('selected_filter');
					$(this).css('color', '#888');
					
				}else{
					$(this).addClass('selected_filter');
					$(this).css('color', 'white');
				}				
				if(project_list.length < 1 ){
					resetProjects();
				}else{
					filterProject(project_list);
				}
			}
		 
	});
	
		$("#gallery_nav_menu .pop .pop_toggle").hover(
	  function () {
			$(this).addClass('active');
		},
	  function () {
			$(this).removeClass('active');
	  }
	);
	

});


function resetFilter(){
	filterTerms = [];
	$('#center .vizbox').removeClass('hidden');
	$('#gallery_nav_menu .filterItem a').css('color', '#888').removeClass('selected_filter');
	$('#gallery_nav_feedback a.feedbackItem').each(
		function(){
			if($(this).hasClass('projectFeedback')){
			}else{
				$(this).hide();
			}
		}
	)
}
	
function resetProjects(){
	$('#gallery_nav_menu .filterProject a').css('color', 'white').removeClass('selected_filter');
	//fillProjects();
	$('.p_vizualizations').each(function(){
		$(this).removeClass('hidden');								   
	});
	$('#gallery_nav_feedback a.projectFeedback').each(
		function(){
				$(this).hide();
		}
	)
	$('.filterProject a').css('color', '#888');
	$('#all_trigger').css('color', 'white');
}	
			
function filterIt(filterTerms) {
	
	
	$('#center .vizbox').each(
		  function(){
			$contains = false  
			for(var i in filterTerms){
				var filterVal =  filterTerms[i] ;
				var keyword = new RegExp(filterVal, 'i');
				var string = $(this).attr('tags');
				if(string.search(keyword) < 0){
					$contains = false;
					break;
				}else{
					$contains = true;
				}
				
			
			}
			if($contains == false){
				
					$(this).addClass('hidden');
			}else{
					$(this).removeClass('hidden');
			}

		  }
	)
	
}



function filterProject(project_list){
	$('.p_vizualizations').each(
		function(){
			var contains = false;
			for(var i in project_list){
				if($(this).hasClass(project_list[i])){
					contains = true;
					$(this).removeClass('hidden');
					break;
				}else{
					$(this).addClass('hidden');
					contains = false;
				}
			}
			if(contains == true){
				$(this).removeClass('hidden');
			}else{
				$(this).addClass('hidden');
			}
		}
	);
	
}



function buildFilter(slug){
	
	if(in_array(slug, filterTerms)){
		var index = getIndex(slug, filterTerms);
		
		filterTerms.splice(index, 1);
	}else{
		filterTerms.push(slug);	
		
	}
	checkTotal()
	return filterTerms;
	
}



function buildProjectFilter(slug){
	if(in_array(slug, project_list)){
		
		var index = getIndex(slug, project_list);
		project_list.splice(index, 1);
	}else{
		project_list.push(slug);	
		
	}
	checkTotal()
	return project_list;
	
}

function fillProjects(){
	project_list = [];
	$('#gallery_nav_menu .filterProject a').each(
		function(){
			project_list.push($(this).attr('slug'));
		}
	)

}


function checkTotal(){
	if(project_list.length < 1 && filterTerms.length < 1){
		$('.none').show();			
	}else{
		$('.none').hide();
	}
}
