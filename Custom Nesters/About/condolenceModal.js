$(function(){
     var $condolenceModal = $("#condolenceModal");
    //Check if cookie exists
    if(Cookies.get('condonlencePopup') == undefined){  
        $condolenceModal.modal('show');
        Cookies.set('condonlencePopup', 'hidden', { expires:1})
    }    
});