'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  var brands = new Bloodhound({
  datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.num); },
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  local: [
    { num: 'one' },
    { num: 'two' },
    { num: 'three' },
    { num: 'four' },
    { num: 'five' },
    { num: 'six' },
    { num: 'seven' },
    { num: 'eight' },
    { num: 'nine' },
    { num: 'ten' }
  ]
});
 
 
brands.initialize();
  $('.shoeBrands').typeahead(null, {
    displayKey: 'num',
    source: brands.ttAdapter()
  });
})
