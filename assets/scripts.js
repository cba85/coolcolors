/*
 * Get url
 */
async function getUrl(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

/*
 * Display all colors
 */
function displayAllColors(divAllColors, divSelectedColors) {
  divSelectedColors.style.display = "none";
  divSelectedColors.innerHTML = "";
  divAllColors.style.display = "";
}

/*
 * Display selected colors
 */
function displaySelectedColors(divAllColors, divSelectedColors, colors) {
  divAllColors.style.display = "none";
  divSelectedColors.innerHTML = "";
  for (var k in colors) {
    var color = colors[k];
    var card =
      '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3"><div class="card mb-4"><div class="color" style="background-color: ' +
      color.hexadecimal +
      ';">&nbsp;</div><div class="card-body"><p class="card-text text-center"><strong>' +
      color.name +
      '</strong></p><table class="table table-sm"><tbody><tr><td>Hex</td><td class="text-right"><pre class="pt-1 mb-0"><code>' +
      color.hexadecimal +
      '</code></pre></td></tr><tr><td>RGB</td><td class="text-right"><pre class="pt-1 mb-0"><code>' +
      color.red +
      "," +
      color.blue +
      "," +
      color.green +
      "<code></pre></td></tr></tbody></table></div></div></div>";
    divSelectedColors.innerHTML += card;
  }
  divSelectedColors.style.display = "";
}

(async () => {
  // Get colors div
  var divAllColors = document.getElementById("all-colors");
  var divSelectedColors = document.getElementById("selected-colors");

  // Get colors list
  var colorsList;
  var url = "assets/colors.json";
  var colorsList = await getUrl(url);

  // Search for a color
  var search = document.getElementById("search");
  search.addEventListener("keyup", function () {
    var input = search.value;
    var size = input.length;
    if (size == 0) {
      displayAllColors(divAllColors, divSelectedColors);
    }
    if (size >= 3) {
      var options = {
        shouldSort: true,
        threshold: 0,
        location: 0,
        distance: 0,
        maxPatternLength: 32,
        minMatchCharLength: 3,
        keys: ["name"],
      };
      var fuse = new Fuse(colorsList, options);
      var colors = fuse.search(input);
      displaySelectedColors(divAllColors, divSelectedColors, colors);
    }
  });

  // Reset colors
  var reset = document.getElementById("reset");
  reset.addEventListener("click", function () {
    search.value = "";
    displayAllColors(divAllColors, divSelectedColors);
    return false;
  });
})();
