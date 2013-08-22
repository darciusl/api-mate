// Generated by CoffeeScript 1.6.3
(function() {
  var addUrlsToPage, clearAllFields, expandLinks, generateUrls, isFilled, template, updatedTimer;

  updatedTimer = null;

  template = "<div class='result-set'>     <div class='result-title'>       <h4 class='label-title'>Results {{title}}:</h4>     </div>     <div class='result-links'>       {{#urls}}         <div class='result-link-wrapper'>         <div class='result-link {{urlClass}}'>           <span class='method-name'>{{name}}</span>           <a class='api-link' href='{{url}}'>{{urlName}}</a>         </div>         </div>       {{/urls}}     </div>   </div>";

  isFilled = function(field) {
    var value;
    value = $(field).val();
    return (value != null) && value.trim() !== "";
  };

  addUrlsToPage = function(urls) {
    var html, opts, placeholder;
    placeholder = $("#api-mate-results");
    urls = _.map(urls, function(url, key) {
      var u;
      u = {
        name: key,
        url: url,
        urlName: url
      };
      if (key.match(/recordings/i)) {
        u.urlClass = "url-recordings";
      } else if (key.match(/from mobile/i)) {
        u.urlClass = "url-from-mobile";
      } else if (key.match(/mobile:/i)) {
        u.urlClass = "url-mobile-api";
      } else if (key.match(/custom call/i)) {
        u.urlClass = "url-custom-call";
      } else {
        u.urlClass = "url-standard";
      }
      return u;
    });
    opts = {
      title: new Date().toTimeString(),
      urls: urls
    };
    html = Mustache.to_html(template, opts);
    $(placeholder).html(html);
    expandLinks($("#view-type-input").hasClass("active"));
    placeholder.addClass("updated");
    clearTimeout(updatedTimer);
    return updatedTimer = setTimeout(function() {
      return placeholder.removeClass("updated");
    }, 300);
  };

  generateUrls = function() {
    var api, customCalls, line, lines, paramName, paramValue, params, separator, server, urls, _i, _j, _len, _len1;
    server = {};
    server.url = $("#input-custom-server-url").val();
    server.salt = $("#input-custom-server-salt").val();
    server.mobileSalt = $("#input-custom-server-mobile-salt").val();
    server.url = server.url.replace(/(\/api)?\/?$/, '/api');
    server.name = server.url;
    params = {};
    if (isFilled("#input-name")) {
      params.name = $("#input-name").val();
    }
    if (isFilled("#input-id")) {
      params.meetingID = $("#input-id").val();
    }
    if (isFilled("#input-moderator-password")) {
      params.moderatorPW = $("#input-moderator-password").val();
    }
    if (isFilled("#input-attendee-password")) {
      params.attendeePW = $("#input-attendee-password").val();
    }
    if (isFilled("#input-welcome")) {
      params.welcome = $("#input-welcome").val();
    }
    if (isFilled("#input-voice-bridge")) {
      params.voiceBridge = $("#input-voice-bridge").val();
    }
    if (isFilled("#input-dial-number")) {
      params.dialNumber = $("#input-dial-number").val();
    }
    if (isFilled("#input-web-voice")) {
      params.webVoice = $("#input-web-voice").val();
    }
    if (isFilled("#input-logout-url")) {
      params.logoutURL = $("#input-logout-url").val();
    }
    if (isFilled("#input-max-participants")) {
      params.maxParticipants = $("#input-max-participants").val();
    }
    if (isFilled("#input-duration")) {
      params.duration = $("#input-duration").val();
    }
    params.record = $("#input-record").is(":checked");
    if (isFilled("#input-fullname")) {
      params.fullName = $("#input-fullname").val();
    }
    if (isFilled("#input-user-id")) {
      params.userID = $("#input-user-id").val();
    }
    if (isFilled("#input-create-time")) {
      params.createTime = $("#input-create-time").val();
    }
    if (isFilled("#input-web-voice-conf")) {
      params.webVoiceConf = $("#input-web-voice-conf").val();
    }
    if (isFilled("#input-id")) {
      params.recordID = $("#input-id").val();
    }
    params.publish = $("#input-publish").is(":checked");
    if (isFilled("#input-meta")) {
      lines = $("#input-meta").val().replace(/\r\n/g, "\n").split("\n");
      for (_i = 0, _len = lines.length; _i < _len; _i++) {
        line = lines[_i];
        separator = line.indexOf("=");
        if (separator >= 0) {
          paramName = line.substring(0, separator);
          paramValue = line.substring(separator + 1, line.length);
          params["meta_" + paramName] = paramValue;
        }
      }
    }
    if (isFilled("#input-custom")) {
      lines = $("#input-custom").val().replace(/\r\n/g, "\n").split("\n");
      for (_j = 0, _len1 = lines.length; _j < _len1; _j++) {
        line = lines[_j];
        separator = line.indexOf("=");
        if (separator >= 0) {
          paramName = line.substring(0, separator);
          paramValue = line.substring(separator + 1, line.length);
          params["custom_" + paramName] = paramValue;
        }
      }
    }
    customCalls = null;
    if (isFilled("#input-custom-calls")) {
      lines = $("#input-custom-calls").val().replace(/\r\n/g, "\n").split("\n");
      customCalls = lines;
    }
    api = new BigBlueButtonApi(server.url, server.salt, server.mobileSalt);
    urls = api.getUrls(params, customCalls);
    return addUrlsToPage(urls);
  };

  clearAllFields = function() {
    $("#config-fields input, #config-fields textarea").each(function() {
      return $(this).val("");
    });
    return $("#config-fields input[type=checkbox]").each(function() {
      return $(this).attr("checked", null);
    });
  };

  expandLinks = function(selected) {
    if (selected) {
      $("#api-mate-results .result-link").css("word-break", "break-all");
      $("#api-mate-results .result-link").css("white-space", "normal");
      return $("#api-mate-results .method-name").css("display", "block");
    } else {
      $("#api-mate-results .result-link").css("word-break", "normal");
      $("#api-mate-results .result-link").css("white-space", "nowrap");
      return $("#api-mate-results .method-name").css("display", "inline-block");
    }
  };

  $(function() {
    var name, user, vbridge;
    vbridge = "7" + Math.floor(Math.random() * 10000 - 1).toString();
    $("#input-voice-bridge").val(vbridge);
    name = "random-" + Math.floor(Math.random() * 10000000).toString();
    $("#input-name").val(name);
    $("#input-id").val(name);
    user = "User " + Math.floor(Math.random() * 10000000).toString();
    $("#input-fullname").val(user);
    $("#input-id").on("keyup", function() {
      return $("#input-name").val($(this).val());
    });
    $("input, select, textarea", "#config-fields").on("change keyup", function(e) {
      return generateUrls();
    });
    $("input, select, textarea", "#config-server").on("change keyup", function(e) {
      return generateUrls();
    });
    $("#view-type-input").on("click", function() {
      var selected;
      selected = !$("#view-type-input").hasClass("active");
      return expandLinks(selected);
    });
    $(".api-mate-clearall").on("click", function(e) {
      clearAllFields();
      return generateUrls();
    });
    return generateUrls();
  });

}).call(this);
