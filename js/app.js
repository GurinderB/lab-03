//Display Images
let allKeyword = [];
function Pictures(picture) {
  this.image_url = picture.image_url;
  this.title = picture.title;
  this.description = picture.description;
  this.keyword = picture.keyword;
  this.horns = picture.horns;
  allKeyword.push(picture.keyword);
}

Pictures.allPictures = [];

Pictures.prototype.render = function () {
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
  //   console.log(this.keyword);
  //   pictureClone.attr('class', this.horns)

};

Pictures.readJson = () => {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(obj => {
        Pictures.allPictures.push(new Pictures(obj));
      });
    })
    .then(Pictures.loadPictures);
};

Pictures.loadPictures = () => {
  Pictures.allPictures.forEach(picture => {
    picture.render();
    renderOption();
  });
};


//Create DropDown
let renderOption = () => {
  allKeyword.forEach(element => {
    $('select').append('<option class="optClone"></option>');
    console.log(element);
    let optionClone = $('option[class="optClone"]')
    let optionHtml = $('#option-template');
    optionClone.html(optionHtml);
    optionClone.text(element);
    optionClone.removeClass('optClone');
    optionClone;
  })
};

$(() => Pictures.readJson());

$('select').on('change', function () {
  $('div').hide();
  let keywordSelector = $('select').val();
  console.log(keywordSelector);
  Pictures.allPictures.forEach(element => {
    if (element.keyword === keywordSelector) {
      console.log('works');
      element.render();
    }
    if (keywordSelector === 'default') {
      element.render();
    }
  })
})