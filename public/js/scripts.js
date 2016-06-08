/**
 * Created by RMP-Mobile on 3/11/2016.
 */

$(window).ready(function(){
   // initialize an ajax call to build the #collection
    getCollection();
});

function getLogin() {
    $.get( "/login", function(data) {
        var h = $(window).height(),
            w = $(window).width();
        $("#popup").html(data).removeClass('hidden').css({'top':(h-400)/2+'px', 'left':(w-400)/2+'px'});
        $(".shadowbox").removeClass('hidden');
    });
}

function closePopup(el){
    $("#popup").addClass("hidden");
    $(".shadowbox").addClass("hidden");
}

// page click observer
$(window).click(function(event){
    if ($(event.target).hasClass('search-wrapper') || $(event.target).parents().hasClass('search-wrapper')){
        sectionFocus('.search-wrapper');
    }
    if ($(event.target).hasClass('results-wrapper') || $(event.target).parents().hasClass('results-wrapper')){
        sectionFocus('.results-wrapper');
    }
    if ($(event.target).hasClass('collection-wrapper') || $(event.target).parents().hasClass('collection-wrapper')){
        sectionFocus('.collection-wrapper');
    }
});

function sectionFocus(el){
    var search = $('.search-wrapper'),
        results = $('.results-wrapper'),
        collection = $('.collection-wrapper'),
        h = $('body').height() - 45;

    if ($(search).hasClass('focus')){
        $(search).removeClass('focus');
    }
    if ($(results).hasClass('focus')){
        $(results).removeClass('focus');
    }
    if ($(collection).hasClass('focus')){
        $(collection).removeClass('focus');
    }

    if (el == '.search-wrapper'){
        $(search).height('100%').addClass('focus');
        $(results).css({'height':0, 'padding':0});
        $(collection).css({'height':0, 'padding':0});
    }
    if (el == '.results-wrapper'){
        $(search).height('auto');
        $(results).height(h).addClass('focus');
        $(collection).css({'height':0, 'padding':0});
    }
    if (el == '.collection-wrapper'){
        $(search).height('auto');
        $(results).css({'height':0, 'padding':0});
        $(collection).height(h).addClass('focus');
    }
}

function getCollection(){
    console.log('need to hit the couchbase server and as for all user videos');
    // $.get('http://www.trackright.org/video-tracking/rest/get_all_videos.php', function(data){
    //     // need to find what data if any is coming back....
    //     // also check into the timing of when this fires, should be after the owned-wrapper is on the page and in dom
    //     $('#collection .collection-movies').html('');
    //     $('#collection .collection-tv').html('');
    //
    //     var movies = [];
    //     var tv = [];
    //     var lastName = '';
    //
    //     $(data).each(function(key,val){
    //         if (val.format){
    //             if (val.series_season){ // we have tv here - go into the collection-tv div
    //                 //console.log(val);
    //                 var series = parseTVSeries(val.themoviedb_id, tv);
    //                 var episodeNumber = val.series_episode.split("_");
    //                 console.log(series);
    //                 if (series != null){
    //                      if (tv[series].seasons[val.series_season] != undefined ){
    //                          if (tv[series].seasons[val.series_season].episodes[episodeNumber[1]] == undefined ) {
    //                              var episodeObj = {episode: val.series_episode, name: val.episode_name, formats: [] };
    //                              tv[series].seasons[val.series_season].episodes[episodeNumber[1]] = episodeObj;
    //                          }
    //                          tv[series].seasons[val.series_season].episodes[episodeNumber[1]].formats.push(val.format);
    //                      } else {
    //                          var seasonsObj = {season: val.series_season, episodes: [] };
    //                          seasonsObj.episodes[episodeNumber[1]] = {episode: val.series_episode, name: val.episode_name, formats: [] };
    //                          seasonsObj.episodes[episodeNumber[1]].formats.push(val.format);
    //                          tv[series].seasons[val.series_season] = seasonsObj;
    //                      }
    //                 } else {
    //                     var item = {id: val.themoviedb_id, name: val.name, seasons: [] };
    //                     //console.log(item);
    //                     item.seasons[val.series_season] = {season: val.series_season, "episodes": [] };
    //                     item.seasons[val.series_season].episodes[episodeNumber[1]] = {episode: val.series_episode, name: val.episode_name, formats: [] };
    //                     item.seasons[val.series_season].episodes[episodeNumber[1]].formats.push(val.format);
    //                     console.log(val);
    //                     tv.push(item);
    //                 }
    //             } else {
    //                 movies.push(val);
    //             }
    //         }
    //         // buildTv(tv);
    //         // buildMovies(movies);
    //     });
    //
    //     //console.log(movies);
    //     console.log(tv);
    //
    //     $(tv).delay(1000).each(function(key, tvItem){ // we have tv here - go into the collection-tv div
    //         console.log(tvItem);
    //         var tvHtml = '';
    //         tvHtml += "<div class='collection-tv-show-wrapper'><span class='title collection-title'>"+tvItem.name+"</span><br />";
    //         tvHtml += "<ul id='tv-seasons-collection-"+tvItem.id+"' class='seasons'>";
    //         $(tvItem.seasons).each(function(key, season){
    //             if (season != undefined){
    //                 //console.log(season);
    //                 tvHtml += "<li class='season wrapper' id='show-collection-"+tvItem.id+"-season-"+season.season+"'>";
    //                 tvHtml += "<span class='expander closed' onclick='expandList(\".tv-"+tvItem.id+"-se-"+season.season+"\", \""+tvItem.name+"\", this, "+tvItem.id+", "+season.season+", false)'>";
    //                 tvHtml += "<span class='season-title'>Season: "+season.season+"</span><span class='icon'></span><br />";
    //                 tvHtml += "<div class='episode-block-wrapper closed tv-"+tvItem.id+"-se-"+season.season+"'><ol class='episodes'>";
    //                 $(season.episodes).each(function(key, episode){
    //                     //console.log(episode);
    //                     if (episode != undefined){
    //                         tvHtml += "<li class='season-episode' id='collection-episode-"+tvItem.id+"-"+season.season+"_"+key+"'><span style='float:left;'>Episode: "+key;
    //                         if (episode.name != undefined){ tvHtml += " : "+episode.name;}
    //                         tvHtml += "</span>";
    //                         $(episode.formats).each(function(key, format){
    //                             tvHtml += "<span class='"+format+"'>"+format+"</span>";
    //                         });
    //                         tvHtml += "</li>";
    //                     }
    //                 });
    //                 tvHtml += "</div></ol></li>";
    //             }
    //         });
    //         tvHtml += "</ul></div>";
    //
    //         $('#collection .collection-tv').append(tvHtml);
    //
    //     });
    //
    //     $(movies).each(function(key, movieItem){ // we have movies here - go into the collection-movies div
    //         //console.log(movieItem);
    //         var movieHtml = '';
    //         if (movieItem.name == lastName){
    //             movieHtml += '<span class="'+movieItem.format+'">'+movieItem.format+'</span>';
    //         } else {
    //             movieHtml += '<span class="title collection-title">'+movieItem.name+'</span><span class="'+movieItem.format+'">'+movieItem.format+'</span>';
    //         }
    //         $('#collection .collection-movies').append(movieHtml);
    //         lastName = movieItem.name;
    //     });
    //
    // }, 'json')
}

function parseTVSeries(id, tv) {
    for (var i = 0, len = tv.length; i < len; i++) {
        if (tv[i].id === id)
            return i; // Return as soon as the object is found
    }
    return null; // The object was not found
}

function toggleOwnerShip(el, name, season, episodes, episode_name){
    // var id = $(el).attr('id');
    // var db = id.split('-');
    // if ($(el).attr('class') == 'owned'){
    //     db.push(1);
    //     $(el).removeClass('owned');
    // } else {
    //     db.push(0);
    //     $(el).addClass('owned');
    // }
    //
    // $.ajax({
    //     url: 'http://www.trackright.org/video-tracking/rest/toggle_ownership.php',
    //     dataType: 'text/html; charset=UTF-8',
    //     data: {
    //         format: db[0],
    //         id: db[1],
    //         owned: db[2],
    //         name: name,
    //         season: season,
    //         episode: episodes,
    //         episode_name: episode_name
    //     }
    // }).complete(function(data){
    //     //console.log(data);
    //     getCollection()
    // });

}

function getTVSeasonInfo(id, name){
    //console.log(name+'in getTVSeasonInfo');
    $.get("http://api.themoviedb.org/3/tv/"+id+"?api_key=bba1c49a8793f95b6d78dc9adcdb6ded")
        .done(function(show){
 
            // update local database with additional information
            show.media_type = "tv";
            $.get("/1/upsertvideo", {
                item: show
            });

            var html = '';
            $(show.seasons).each(function(key, season){
                var seasonNum = parseInt(season.season_number);

                // write the starting format block title
                if (key == 0){
                    $('#formats-'+id+' .format-selection').html('Season '+seasonNum);
                }

                html += "<li class='season";
                if (key == 0){
                    getFormatOptions(id, name, seasonNum);
                    html += " active-season";
                }
                html += "' id='show-"+id+"-season-"+seasonNum+"'>";
                var expandClass = '".id-'+id+'-se-'+seasonNum+'"';
                var displayName = '"'+name+'"';
                html += "<span class='expander closed' onclick='expandList("+expandClass+", "+displayName+", this, "+id+", "+seasonNum+")'>";
                html += "<span class='season-title'>Season "+seasonNum+"</span><span class='icon'></span>";
                html += "</span></span></li>";
                getTVSeasonEpisodes(id, name, seasonNum);
            });
        $('#tv-seasons-'+id).html(html);
    });
}

function getTVSeasonEpisodes(id, name, seasonNum){
    //console.log(name+'in getTVSeasonEpisodes');
    var html = '';
    $.get("http://api.themoviedb.org/3/tv/"+id+"/season/"+seasonNum+"?api_key=bba1c49a8793f95b6d78dc9adcdb6ded")
        .done(function(data){
            //console.log(data);

            //update the local database with episode information
             $.get("/1/upsertepisodes", {
                 episodes: data.episodes,
                 id: id,
                 season: seasonNum
             });

            // $.get("/1/getvideo", {
            //     media: "tv",
            //     id: id
            // }).done(function(data){
            //     console.log(data);
            // });

            html = "<div class='episode-block-wrapper closed id-"+id+"-se-"+seasonNum+"'>";
            html += "<ol class=\"episodes\">";
            $(data.episodes).each(function(key, ep){
                var episodeArray = [];
                episodeArray['episode_number'] = ep.episode_number;
                episodeArray['episode_name'] = ep.name;
                var tempEpName = ep.name.replace(/'/g, "");
                tempEpName = tempEpName.replace(/"/g, "");
                var episodeItemId = "episode-"+id+"-"+seasonNum+"_"+ep.episode_number,
                    seasonEpisode = '"'+seasonNum+'_'+ep.episode_number+'"',
                    episodeName = '"'+tempEpName+'"',
                    displayName = '"'+name+'"';
                // remove " and ' and non-standard characters from the episodeName;
                html += "<li class='episode' id='"+episodeItemId+"' onclick='setActiveEpisode(this, "+id+", "+displayName+", "+seasonNum+", "+seasonEpisode+", "+episodeName+")'>"+ep.name+"</li>";
            });
            html += '</ol></div>';
            $('#show-'+id+'-season-'+seasonNum).append(html);
            var seasonEpisodeCount = data.episodes.length;
            var attr = $('#show-'+id+'-season-'+seasonNum+' .expander');
            $(attr).attr('onclick',$(attr).attr('onclick').slice(0,-1)+', '+seasonEpisodeCount+')');
        });
}

function expandList(target, name, el, id, seasonNum, seasonEpisodeCount){
    var seasonId = '#tv-seasons-'+id;
    if (seasonEpisodeCount){ // means this came from the search results, not the collection
        seasonId = '#tv-seasons-'+id;
        setActiveSeason(el, name, id, seasonNum, seasonEpisodeCount, seasonId);
    } else {
        seasonId = '#tv-seasons-collection-'+id;
        setActiveSeason(el, name, id, seasonNum, false, seasonId);
    }
    //console.log(el);
    //console.log(target);
    var h = $(target+' .episodes').height();
    //console.log(h);
    $(seasonId+' .season').each(function(key, val){
        $(el).parent().height('auto');
        if ($(val).hasClass('active-season')){ // this is the clicked on season - open if not already open
            if ($(el).hasClass('closed')){
                $(el).removeClass('closed');
                $(target).animate({
                    height:h
                },1000, function(){
                    $(target).removeClass('closed');
                });
            } else {
                $(el).addClass('closed');
                $(target).animate({
                    height:'0'
                },1000, function(){
                    $(target).addClass('closed');
                    $(el).parent().height(20);
                });
            }
        } else { // this is every other season, close the expander if it's open
            //console.log(val);
            if (!$(val).find('.expander').hasClass('closed')){
                $(val).find('.expander').addClass('closed');
                var blk = $(val).find('.episode-block-wrapper');
                $(blk).animate({
                    height:'0'
                },1000, function(){
                    $(blk).addClass('closed');
                });
            }
        }
    });
}

function setActiveSeason(el, name, id, seasonNum, seasonEpisodeCount, seasonId){
    if (seasonEpisodeCount){
        getFormatOptions(id, name, seasonNum, seasonEpisodeCount);
    }
    $(seasonId+' .season').removeClass('active-season');
    $(el).parent().addClass('active-season');
    //$('#formats-'+id+' .format-selection').html('Season '+seasonNum);
    $('.episode-block-wrapper .episode.active').removeClass('active');
    $('#formats-'+id+' > li').each(function(key, val){
        //console.log(val);
    })
}

function setActiveEpisode(el, id, name, seasonNum, episode_num, episode_name){
    getFormatOptions(id, name, seasonNum, episode_num, episode_name);
    $(el).parent().find('li').removeClass('active');
    $(el).addClass('active');

    //$('#formats-'+id+' .format-selection').append(' : '+episode_name);
}

function getFormatOptions(id, name, seasonNum, episode_num, episode_name){
    // var url = 'http://www.trackright.org/video-tracking/rest/format_options.php';
    // $.get(url, {
    //         id: id,
    //         name: name,
    //         season: seasonNum,
    //         episode_name: episode_name,
    //         episode_num: episode_num
    //     })
    //     .done(function(format) {
    //         $('#video-'+id+' .response-owned').html(format);
    //         //console.log(format);
    //     })
}