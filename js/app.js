let allKeyword = [];
//Display Images
function Pictures(picture) {
  this.image_url = picture.image_url;
  this.title = picture.title;
  this.description = picture.description;
  this.keyword = picture.keyword;
  this.horns = picture.horns;

  allKeyword.push(picture.keyword)
 

}

Pictures.allPictures = [];

Pictures.prototype.toHtml = function() {
  // get the template from the html doc
  const $template = $('#handlebar-template').html();
  // compile the template to regular HTML
  const $source = Handlebars.compile($template);
  // return the compiled HTML
  return $source(this);
}





let newKeywordsList = [];
let fixArr = () => {
  allKeyword.forEach ( element => {
    if (newKeywordsList.includes(element) === false){
      newKeywordsList.push(element);
    }
  })
}

Pictures.prototype.render = function() {
  //render the pictures
  $('main').append('<div class="clone"></div>');
  let pictureClone = $('div[class="clone"]');
  let pictureHtml = $('#photo-template').html();
  pictureClone.html(pictureHtml);

  pictureClone.find('h2').text(this.title);
  pictureClone.find('img').attr('src', this.image_url);
  pictureClone.find('p').text(this.description);

  pictureClone.removeClass('clone');
  pictureClone.attr('class', this.keyword);
};

Pictures.readJson = (pageNumber) => {
  $.get(pageNumber, 'json')
    .then(data => {
      data.forEach(obj => {
        Pictures.allPictures.push(new Pictures(obj));
      });
    })
    .then(Pictures.loadPictures);
};

Pictures.loadPictures = () => {
  Pictures.allPictures.forEach(picture => {
    $('#horns').append(picture.toHtml());
  });
  renderOption();
};


//Create DropDown
let renderOption = () => {
  fixArr();
  newKeywordsList.forEach( element => {
    $('select').append('<option class="optClone"></option>');
    // console.log(element);
    let optionClone = $('option[class="optClone"]')
    let optionHtml = $('#option-template');
    optionClone.html(optionHtml);
    optionClone.text(element);
    optionClone.removeClass('optClone');
    optionClone;
  })
};


$('select').on('change', function() {
  $('div').hide();
  let keywordSelector = $('select').val();
  Pictures.allPictures.forEach( element => {
    if (element.keyword === keywordSelector ){
      $('div' + '#'+element.keyword).show();
    }
    if (keywordSelector === 'default'){
      $('div').show();
    }
  })
})

Pictures.readJson('data/page-1.json');
$('#page-2').on('click', function(){
  $('div').hide();
  Pictures.allPictures = [];
  newKeywordsList = [];
  $(() => Pictures.readJson('data/page-2.json'));
})
$('#page-1').on('click', function(){
  $('div').hide();
  Pictures.allPictures = [];
  newKeywordsList = [];
  $(() => Pictures.readJson('data/page-1.json'));
})



