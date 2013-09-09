(function() {
    var target = $('.target').val();
    var $search = $('#search');
    var $input = $('input:text');
    var obj;
    var url_obj = {};
    var url_flag = true;
    var enter_pressed=false;
    var home=true;



    $(document).on('click', 'button.close', function() {
        var name = '#' + $(this).attr('name');
        $(name).modal('hide');
    });

    $input.focus(function(event) {
      
        $('.alert-div').hide();
    });

    $('li.navlink').click(function(e) {
        e.preventDefault();
        var href = $(this).children().attr('href');
        

        if (href == '/hotel.html') {
            $('#search-type').text('Hotels');
            getsearch();
        } else if (href == '/agent.html') {
            $('#search-type').text('Travel Agents');
            getsearch();
        } else {
            $('li.navlink').removeClass('active');
            $('a[href="/about.html"]').parent().addClass('active');
            $('.hotel-list').empty();
            $('.hotel-list').hide();
            $('.alert-div').hide();
            $('.hotel-list').load(href + ' .about');
            $('.hotel-list').show();
            $.stellar({
                horizontalScrolling: false,
                verticalOffset: 40
            });
            url_obj.target = "about";
            url_obj.text = "Hotels";
            window.history.pushState(url_obj, '', "/search/"+url_obj.target);
            }
    });
    window.onpopstate = function(e) {
        console.log("onpopstate called");
        if (e.state) {
          
            $('#search-type').text(e.state.text);
            target = e.state.target;
         
            if (target == "home") {
               
                window.location.href = 'http://hotelsquare.azurewebsites.net/';
            } else if (target == "about") {
               
                $('li.navlink').removeClass('active');
                $('a[href="/about.html"]').parent().addClass('active');
                $('.hotel-list').empty();
                $('.hotel-list').hide();
                $('.alert-div').hide();
                $('.hotel-list').load('/about.html .about');
                $('.hotel-list').show();
            } else {
                url_flag = false;
                getsearch();
            }
        } else {
            if (target=="") {
                console.log('value empty');                
            }
            else if (target != "about") {
                
                url_obj.target = "home";
                url_obj.text = "Hotels";
               
                window.history.pushState(url_obj, '', '');
                getsearch();
            } 
            else if(target == "about") {
                $('li.navlink').removeClass('active');
                $('a[href="/about.html"]').parent().addClass('active');
                $('.hotel-list').empty();
                $('.hotel-list').hide();
                $('.alert-div').hide();
                $('.hotel-list').load('/about.html .about');
                $('.hotel-list').show();
                $.stellar({
                    horizontalScrolling: false,
                    verticalOffset: 40
                });
                url_obj.target = "about";
                url_obj.text = "Hotels";
                window.history.pushState(url_obj, '', "/search/"+url_obj.target);
            }
        }
    };
    $('.search-select').click(function(e) {
        e.preventDefault();
        if ($(this).text() === "Search Hotel") {
            $('#search-type').html('Hotels <span class="caret"></span>');
        } else {
            $('#search-type').html('Travel Agents <span class="caret"></span>');
        }
    });
    $input.change(function() {
        $('.target').val($(this).val());
        target = ($(this).val());
        if(enter_pressed==true){
            getsearch();
            }
    });

    $input.keydown(function(event) {
        var key = event.keyCode;
        if (key == 13) {
            enter_pressed=true;
        }
    });

    $('.search-button').click(function() {
        getsearch();

    });

    function getsearch() {
        NProgress.start();
        NProgress.set(0.8);

        var result = "";

        var text = $('#search-type').text();

        if (target != "") {
            if (text.length <= 8) {
                url = '/hotel?id=' + target;
                $('li.navlink').removeClass('active');
                $('a[href="/hotel.html"]').parent().addClass('active');
            } else {
                url = '/agent?id=' + target;
                $('li.navlink').removeClass('active');
                $('a[href="/agent.html"]').parent().addClass('active');
            }
            $search.hide();
            $('.alert-div').hide();
            $.getJSON(url, function(data) {
                obj = data;
                result += '<div class="row">';
                result += '<div class="col-md-6 col-sm-8 col-xs-11 col-lg-6 col-md-offset-3 col-sm-offset-2 col-lg-offset-3">';
                result += '<ul class="map-ul" style="list-style-type:none">'
                $.each(data, function(i, item) {
                    if (text.length <= 8) {
                        result += '<li id="list-head" >';
                        result +='<div class="thumbnail card">';
                        result += '<div data-toggle="modal" href="#a' + i + '" class="media" style="cursor:pointer" name=' + i + '>';
                        result += '<a  class="pull-left">';
                        result += '<img data-src="holder.js/5x100/text: " alt="">';
                        result += '</a>';
                        result += '<div class="media-body">';
                        result += '<h2 class="media-heading" id="list-heading">' + item.name + '</h2>';
                        result += '<address>';
                        result += '<p><i class="glyphicon glyphicon-map-marker text-success"></i> ' + item.city + ', ' + item.state + '</p>';
                        result += '<p><i class="glyphicon glyphicon-phone  text-info"></i>' + item.phone + ' ';
                        result += '<span class="pull-right"><i class="glyphicon glyphicon-tag text-warning"></i> ' + item.type + '</span></p> ';

                        result += '</address>';
                        result += '</div>';
                        result += '</div>';
                        result += '</div>';



                        result += '<div class="modal fade" id=a' + i + ' tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
                        result += '<div class="modal-dialog">';
                        result += '<div class="modal-content">';
                        result += '<div class="modal-header">'; //header
                        result += '<button type="button" class="close" name=a' + i + ' data-dismiss="modal" aria-hidden="true">&times;</button>';

                        result += '<div class="media" >';
                        // old photo slider
                        result += '<div class="media-body">';
                        result += '<h2 class="media-heading" id="list-heading">' + item.name + '</h2>';
                        result += '<address>';
                        result += '<p><i class="glyphicon glyphicon-map-marker  text-success"></i><small> ' + item.address + '</small></p>';
                        result += '</address>';
                        //result += "<div class='pull-right'>";
                        //result += '</div>';

                        result += '</div>'; // media body

                        result += '</div>'; // media 
                        result += '</div>'; // modal header

                        //result += '<h4 class="modal-title">' + item.name + '</h4>';

                        result += '<div class="progress progress-striped active status' + i + '">';
                        result += '<div id=status' + i + ' class="progress-bar progress-bar-warning " role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%">loading map...'
                        result += '</div>'
                        result += '</div>'

                        result += '<div class="modal-body">'; // modal body

                        result += "<div class='thumbnail'>";
                        result += "<div id='map" + i + "' class='thumbnail' style='height:250px'>";
                        result += '</div>'; //map
                        result += '</div>'; //thumnail

                        result += '<hr/>'
                        result += '<div class="row ">';
                        result += '<div class="col-sm-6">';

                        result += '<div class="panel panel-info"><div class="panel-heading">Hotel Details</div>';
                        result += '<ul class="list-group">';
                        //result += ' <li class="list-group-item active">Hotel Details</li>';

                        result += '<a class="list-group-item"><abbr title="Phone"><i class="glyphicon glyphicon-phone  text-danger"></i></abbr><small> ' + item.phone + '</small></a>';
                        result += '<a class="list-group-item"><abbr title="Fax"><i class="glyphicon glyphicon-folder-open  text-danger"></i></abbr><small> ' + item.fax + '</small></a>';
                        result += '<a href="mailto:' + item.email + '" class="list-group-item"><abbr title="Email"><i class="glyphicon glyphicon-envelope  text-danger"></i></abbr><small> ' + item.email + '</small></a>';
                        result += '<a href="https://' + item.website + '" target="_blank" class="list-group-item"><abbr title="website"><i class="glyphicon glyphicon-globe  text-danger"></i></abbr><small> ' + item.website + '</small></a>';
                        result += '<a class="list-group-item"><abbr title="Type"><i class="glyphicon glyphicon-tag  text-danger"></i></abbr><small> ' + item.type + '</small></a>';
                        result += '<a class="list-group-item"><abbr title="rooms"><i class="glyphicon glyphicon-glass  text-danger"></i></abbr><small> ' + item.room + 'rooms</small></a>';
                        result += '</ul>';
                        result += '</div>'; //panel
                        result += '</div>'; //col-sm-6
                        result += '<div class="col-sm-6">';
                        result += '<div class="panel panel-info "><div class="panel-heading">Photos</div>';

                        result += '<ul class="rslides" id=photos' + i + '></ul>'
                        result += '</div>'; //panel
                        result += '</div>';

                        result += '</div>'; //row
                        result += '</div>'; //modal-body
                        result += '</div>';
                        result += '</div>';
                        result += '</li>';
                    }// if closed
                    else{
                        result += '<li  id="list-head" >';
                        result +='<div class="thumbnail card">';

                        result += '<div data-toggle="modal" href="#a' + i + '" class="media" style="cursor:pointer" name=' + i + '>';
                        result += '<a  class="pull-left">';
                        result += '<img data-src="holder.js/5x100/industrial/text: " alt="">';
                        result += '</a>';
                        result += '<div class="media-body">';
                        result += '<h3 class="media-heading" id="agent-list-heading" >' + item.name + '</h3>';
                        result += '<address>';
                        result += '<small><p><i class="glyphicon glyphicon-map-marker text-success"></i> ' + item.address + ', ' + item.state + '</p>';
                        result += '<p><i class="glyphicon glyphicon-phone text-info"></i> ' + item.phone + ' ';
                        result += '<span class="pull-right"><i class="glyphicon glyphicon-tag text-warning"></i> ' + item.type + '</span></p> </small>';

                        result += '</address>';
                        result += '</div>';
                        result += '</div>';
                        result += '</div>';


                        result += '<div class="modal fade" id=a' + i + ' tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
                        result += '<div class="modal-dialog">';
                        result += '<div class="modal-content">';
                        result += '<div class="modal-header">'; //header
                        result += '<button type="button" class="close" name=a' + i + ' data-dismiss="modal" aria-hidden="true">&times;</button>';

                        result += '<div class="media" >';
                        // old photo slider
                        result += '<div class="media-body">';
                        result += '<h2 class="media-heading" id="list-heading">' + item.name + '</h2>';
                        result += '<address>';
                        result += '<p><i class="glyphicon glyphicon-map-marker text-success"></i><small> ' + item.address + '</small></p>';
                        result += '</address>';
                        //result += "<div class='pull-right'>";
                        //result += '</div>';

                        result += '</div>'; // media body

                        result += '</div>'; // media 
                        result += '</div>'; // modal header

                        //result += '<h4 class="modal-title">' + item.name + '</h4>';

                        //result += '<div class="progress progress-striped active status' + i + '">';
                        //result += '<div id=status' + i + ' class="progress-bar progress-bar-warning " role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%">loading map...'
                        //result += '</div>'
                        //result += '</div>'

                        result += '<div class="modal-body">'; // modal body

                        //result += "<div class='thumbnail'>";
                       // result += "<div id='map" + i + "' class='thumbnail' style='height:250px'>";
                       // result += '</div>'; //map
                       // result += '</div>'; //thumnail

                        //result += '<hr/>'
                        //result += '<div class="row ">';
                        //result += '<div class="col-sm-6">';

                        result += '<div class="panel panel-info"><div class="panel-heading">Details</div>';
                        result += '<ul class="list-group">';
                        //result += ' <li class="list-group-item active">Hotel Details</li>';

                        result += '<a class="list-group-item"><abbr title="city"><i class="glyphicon glyphicon-map-marker text-danger"></i></abbr><small> ' + item.city + '</small></a>';
                        result += '<a class="list-group-item"><abbr title="state"><i class="glyphicon glyphicon-map-marker text-danger"></i></abbr><small> ' + item.state + '</small></a>';
                        result += '<a class="list-group-item"><abbr title="Type"><i class="glyphicon glyphicon-tag text-danger"></i></abbr><small> ' + item.type + '</small></a>';
                        result += '<a class="list-group-item"><abbr title="region"><i class="glyphicon glyphicon-glass text-danger"></i></abbr><small> ' + item.region + ' region</small></a>';
                        result += '</ul>';
                        result += '</div>'; //panel
                        //result += '</div>'; //col-sm-6
                        //result += '<div class="col-sm-6">';
                        result += '<div class="panel panel-info "><div class="panel-heading">Contact Person</div>';

                        result += '<ul class="list-group">';
                        result += '<a class="list-group-item"><abbr title="Phone"><i class="glyphicon glyphicon-phone text-danger"></i></abbr><small> ' + item.phone + '</small></a>';
                        result += '<a class="list-group-item"><abbr title="Fax"><i class="glyphicon glyphicon-folder-open text-danger"></i></abbr><small> ' + item.fax + '</small></a>';
                        result += '<a href="mailto:' + item.email + '" class="list-group-item"><abbr title="Email"><i class="glyphicon glyphicon-envelope text-danger"></i></abbr><small> ' + item.email + '</small></a>';
                        result += '</ul>';

                        
                        result += '</div>'; //panel
                        //result += '</div>';

                        //result += '</div>'; //row
                        result += '</div>'; //modal-body
                        result += '</div>';
                        result += '</div>';
                        result += '</li>';
                    }
                });
                result += '</ul>';
                result += '</div>';
                result += '</div>';
                NProgress.done();
                $("#maintext").hide();
                // $("#mainnavbar").hide();
                $("#maininfo").hide();
                $(".hotel-list").html(result);

                $('#navbar').show();
                if(home==true){
                home=false;
                }
                $('.target').val(target);
                $search.show();
                $('dd').hide();
                Holder.run();
                $(document).on('appear', '.card', function(event) {
                $(this).addClass("appeared");
                });
                $('.card').appear({force_process: true});

                if (url_flag) {

                    url_obj.target = target;
                    url_obj.text = text;
                    window.history.pushState(url_obj, target, '/search/' + target);
                };
                url_flag = true;
            })
                .fail(function() {
                NProgress.done();
                    $('.alert-text').html('<strong><i class="glyphicon glyphicon-exclamation-sign"></i> Opps</strong> Nothing found, try searching for other terms.');
                    $('.alert-div').show();
                });
        }
        else{

                $('.alert-text').html('<strong>Opps!</strong> search is empty.');
                $('.alert-div').show();
                NProgress.done();
        }
        enter_pressed=false;
    };


    jQuery('.typeahead').on('typeahead:selected', function(e, datum) {
        target = (datum.value);
        getsearch();
    });
    $('.typeahead').typeahead([{
        name: 'city',
        prefetch: '../json/city.json',
        ttl: 0,
        limit: 5
    }, {
        name: 'hotel',
        prefetch: '../json/hotellist.json',
        ttl: 0,

    }, {
        name: 'state',
        prefetch: '../json/state.json',
        ttl: 0,
    }]);
    var geocoder;
    var map;
    var list_id;
    var modal_name;
    $(document).on('click', 'div.media', function(event) {
        list_id = parseInt($(this).attr('name'));
        modal_name = "#a" + list_id;
    });
    $(document).on('hidden.bs.modal', modal_name, function(event) {
        $('#status' + list_id).text('loading map...');
        $('#status' + list_id).width('0%');
        $(".status" + list_id).show(200);
    });
    $(document).on('shown.bs.modal', modal_name, function(event) {
        console.log('loading map--------------');
        $("#status" + list_id).width("80%");
        searchtime = 0;
        codeAddress(obj[list_id].name, obj[list_id].address);
    });
    var service;
    function initialize() {
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(-34.397, 150.644);
        var mapOptions = {
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            }
        map = new google.maps.Map(document.getElementById("map" + list_id), mapOptions);
        console.log('initialising map--------------');
    };
    var searchtime = 0;
    var add = '';
    function codeAddress(name, address) {
        initialize();
        console.log(name + ',' + address);
        var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);
        //  console.log(results[0]);
        var request = {
            location: pyrmont,
            radius: '500',
            query: name + ',' + address
        };
        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);
    };
    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            //for (var i = 0; i < results.length; i++) {
            //var place = results[i];
            $("#status" + list_id).width("100%");
            createMarker(results[0]);
            map.setCenter(results[0].geometry.location);
            var req = {
                reference: results[0].reference
            };
            service.getDetails(req, callback2);
            $(".status" + list_id).hide();
        } else {
            $("#status" + list_id).width("90%");
            if (searchtime++ < 2) {
                geocoder.geocode({
                    'address': obj[list_id].address
                }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var pyrmont = results[0].geometry.location; //new google.maps.LatLng(-33.8665433,151.1956316);
                        var request = {
                            location: pyrmont,
                            radius: '500',
                            query: obj[list_id].name
                        };
                        service = new google.maps.places.PlacesService(map);
                        service.textSearch(request, callback);
                        //map.setCenter(results[0].geometry.location);

                    } else {
                        $("#status" + list_id).width("100%");
                        $('#status' + list_id).text('Sorry, unble to load MAP');
                    }
                });
            }

        }
    };
    function callback2(result, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          
            var photoid = "#photos" + list_id;
            var photos = result.photos;
            if ($(photoid + ' > li').length == 0) {
                for (var i = 0; i < photos.length; i++) {
                    
                    $(photoid).append('<li><img src="' + photos[i].getUrl({
                        'maxWidth': 400,
                        'maxHeight': 300
                    }) + '" class="img-responsive list-img" alt="Unable to load image" ></li>');
                }
                $(".rslides").responsiveSlides();
                
            }
        }
    };
    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });
        var infowindow = new google.maps.InfoWindow();
        map.setCenter(placeLoc);
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });
    };

})();
