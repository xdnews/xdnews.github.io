document.addEventListener("DOMContentLoaded", function() {
    const darkModeToggle = document.querySelector('.darkmode-toggle');
    const htmlElement = document.documentElement;

    if (localStorage.getItem('theme') === 'dark') {
      htmlElement.classList.add('is-dark');
    }

    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', function() {
        htmlElement.classList.toggle('is-dark');
        
        if (htmlElement.classList.contains('is-dark')) {
          localStorage.setItem('theme', 'dark');
        } else {
          localStorage.setItem('theme', 'light');
        }
      });
    }
  });


$(document).ready(function() {
  $(".supermag-pro-mobile-menu .has-sub").append('<div class="submenu-toggle"/>');

  $(".supermag-pro-mobile-menu .mega-menu").find(".submenu-toggle").remove();

  $(".supermag-pro-mobile-menu .has-sub").on("click", function(e) {
    
    if ($(this).hasClass("has-sub")) {
      e.preventDefault(); 

      var submenu = $(this).children(".m-sub");

      submenu.stop(true, true).slideToggle(170);

      $(this).toggleClass("show");
    }
  });


  $(".mobile-menu-toggle, .hide-supermag-pro-mobile-menu, .overlay").on("click", function() {
    $("body").toggleClass("nav-active");
  });
});


$(document).ready(function() {
  $(".show-search").on("click", function() {
    $("body").addClass("search-active"); 
    $("#main-search-wrap").fadeIn(170).find("input").focus(); 
  });

  // Hide the search bar when the 'hide-search' button is clicked
  $(".hide-search").on("click", function() {
    $("body").removeClass("search-active"); 
    $("#main-search-wrap").fadeOut(170).find("input").val("").blur(); 
  });
});



document.addEventListener("DOMContentLoaded", function() {
  const fixedMenu = 1; 
  const headerInner = document.querySelector(".header-inner");

  if (fixedMenu === 1 && headerInner) {
    let initialScroll = window.pageYOffset; 
    const headerOffset = headerInner.offsetTop; 
    const headerHeight = headerInner.offsetHeight; 
    const scrollTrigger = headerOffset + headerHeight; 

    // Event listener untuk scroll
    window.addEventListener("scroll", function() {
      const currentScroll = window.pageYOffset; 

      if (currentScroll > scrollTrigger) {
        headerInner.classList.add("is-fixed");
      } else {
        headerInner.classList.remove("is-fixed");
      }
      if (currentScroll < initialScroll) {
        headerInner.classList.add("show");
      } else {
        headerInner.classList.remove("show");
      }

      initialScroll = currentScroll;
    });
  }
});




$(document).ready(function() {
  $("#supermag-pro-load-more-link").on("click", function(e) {
    e.preventDefault();
    var loadMoreUrl = $(this).attr("href");
    
    $(this).hide();
    $.ajax({
      url: loadMoreUrl,
      success: function(data) {
        var newPosts = $(data).find(".blog-posts");
        newPosts.find(".index-post").addClass("post-animated post-fadeInUp");
        $(".blog-posts").append(newPosts.html());
        
        var nextPageLink = $(data).find("#supermag-pro-load-more-link");
        if (nextPageLink.length) {
          $("#supermag-pro-load-more-link").attr("href", nextPageLink.attr("href")).show();
        } else {
          $("#supermag-pro-load-more-link").hide();
          $("#blog-pager .no-more").addClass("show");
        }
      },
      beforeSend: function() {
        $("#blog-pager .loading").show();
      },
      complete: function() {
        $("#blog-pager .loading").hide();
      }
    });
  });
});




  $(document).ready(function() {
    $(".supermag-pro-share-links .window-ify").on("click", function() {
      var e = $(this), 
          t = e.data("url"), 
          a = e.data("width"), 
          s = e.data("height"), 
          r = window.screen.width, 
          o = window.screen.height, 
          i = Math.round(r / 2 - a / 2), 
          n = Math.round(o / 2 - s / 2); 

      window.open(t, "_blank", "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=" + a + ",height=" + s + ",left=" + i + ",top=" + n).focus();
    });

    $(".supermag-pro-share-links").each(function() {
      var e = $(this);
      e.find(".show-hid a").on("click", function() {
        e.toggleClass("show-hidden"); 
      });
    });
  });


!function(o){o.fn.lazyify=function(){return this.each(function(){var t=o(this),a=o(window),n=t.attr("data-image"),e="w"+Math.round(t.width()+t.width()/10)+"-h"+Math.round(t.height()+t.height()/10)+"-p-k-no-nu",r="";n.match("resources.blogblog.com")&&(n=noThumbnail),r=n.match("/s72-c")?n.replace("/s72-c","/"+e):n.match("/w72-h")?n.replace("/w72-h72-p-k-no-nu","/"+e):n.match("=w72-h")?n.replace("=w72-h72-p-k-no-nu","="+e):n,t.is(":hidden")||a.on("load resize scroll",function o(){if(a.scrollTop()+a.height()>=t.offset().top){a.off("load resize scroll",o);var n=new Image;n.onload=function(){t.attr("style","background-image:url("+this.src+")").addClass("lazy-ify")},n.src=r}}).trigger("scroll")})}}(jQuery);
