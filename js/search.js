(function() {
    function displaySearchResults(results, store) {
      
      function decodeHtmlEntities(str) {
        var txt = document.createElement("textarea");
        txt.innerHTML = str;
        return txt.value;
      }
      
      var searchResults = document.getElementById('search-results');

      if (results.length) { 
        var appendString = '';
        for (var i = 0; i < results.length; i++) {
          var item = store[results[i].ref];
          if (!item.url) {
            console.error('URL is undefined for:', item.url);
          }
          appendString += 
            `<article class="blog-post hentry index-post post-{{ forloop.index0 }}">
<a class="entry-image-wrap is-image" href="${item.url}" title="${decodeHtmlEntities(item.title)}">
<span class="entry-thumb lazy-ify" data-image="${item.image}" style="background-image:url(${item.image})"></span>
</a>
            <div class="entry-header">
                <h2 class="entry-title"><a class="entry-title-link" href="${item.url}" rel="bookmark" title="${decodeHtmlEntities(item.title)}">${decodeHtmlEntities(item.title)}</a></h2>
                <p class="entry-excerpt excerpt">${decodeHtmlEntities(item.excerpt)}</p>
                    <div class="entry-meta">
                        <span class="entry-author"><span class="by">by</span><span class="author-name"><a href="${item.authorUrl}">${item.author}</a></span></span>
                        <span class="entry-time"><span class="on">-</span><time class="published" datetime="${item.date}">${item.date}</time></span>
                    </div>
            </div>
        </article>
            `;
        }
         
        searchResults.innerHTML = appendString;
      } else {
        searchResults.innerHTML = `
        <div class="flex items-center justify-center col-span-3"">
          <div class="text-center">
            <img class="mx-auto mb-6" src="/images/visuals/not-found.png" style="width: 200px; height: 150px;" alt="No results found">
            <p class="text-2xl font-bold text-navysciam">Pas de résultat trouvé</p>
          </div>
        </div>`;
      }
    }
  
    function getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split('&');
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
  
        if (pair[0] === variable) {
          return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
        }
      }
    }
  
    var searchTerm = getQueryVariable('query');
  
    if (searchTerm) {
      document.getElementById('search-term-display').textContent = searchTerm;
      var searchBox = document.getElementById('search-box');
        if (searchBox) searchBox.value = searchTerm;

      var idx = lunr(function () {
        this.ref('id');
        this.field('title', { boost: 10 });
        this.field('author');
        this.field('excerpt');
        this.field('url');

      for (var key in window.store) {
        this.add({
          'id': key,
          'title': window.store[key].title,
          'author': window.store[key].author,
          'excerpt': window.store[key].excerpt,
          'url': window.store[key].url,
        });
        }   
        });
        var results = idx.search(searchTerm);
        displaySearchResults(results, window.store);
    }
  })();
