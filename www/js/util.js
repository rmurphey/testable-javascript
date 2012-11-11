var app = window.app = window.app || {};

app._templateCache = {};

app.loadTemplate = function(name) {
  if (!app._templateCache[name]) {
    app._templateCache[name] = $.get('/templates/' + name)
      .pipe(function(tmpl) {
        return _.template(tmpl);
      });
  }

  return app._templateCache[name];
};