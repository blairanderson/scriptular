(function() {
  var $, App, Expression, Results, TestStrings,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $ = jQuery;

  Expression = (function(_super) {

    __extends(Expression, _super);

    function Expression() {
      Expression.__super__.constructor.apply(this, arguments);
    }

    Expression.prototype.elements = {
      'input[name=expression]': 'regexp',
      'input[name=option]': 'option'
    };

    Expression.prototype.events = {
      'keyup input': 'onKeyPress'
    };

    Expression.prototype.onKeyPress = function(event) {
      this.value = new RegExp(this.regexp.val(), this.option.val());
      return this.trigger('update');
    };

    return Expression;

  })(Spine.Controller);

  TestStrings = (function(_super) {

    __extends(TestStrings, _super);

    function TestStrings() {
      TestStrings.__super__.constructor.apply(this, arguments);
    }

    TestStrings.prototype.elements = {
      'textarea': 'input'
    };

    TestStrings.prototype.events = {
      'keyup textarea': 'onKeyPress'
    };

    TestStrings.prototype.onKeyPress = function(event) {
      this.getValues(this.input.val());
      return this.trigger('update');
    };

    TestStrings.prototype.getValues = function(val) {
      return this.values = val.split('\n');
    };

    return TestStrings;

  })(Spine.Controller);

  Results = (function() {

    function Results(expression, test_strings) {
      this.expression = expression;
      this.test_strings = test_strings;
      this.compile = __bind(this.compile, this);
      this.expression.bind('update', this.compile);
      this.test_strings.bind('update', this.compile);
    }

    Results.prototype.compile = function() {
      var count, value, _i, _len, _ref, _results;
      $('#output').show();
      $('ul#results').empty();
      $('ul#groups').empty();
      count = 1;
      _ref = this.test_strings.values;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        value = _ref[_i];
        this.matchResults(value);
        this.matchGroups(value, count);
        _results.push(count += 1);
      }
      return _results;
    };

    Results.prototype.matchResults = function(value) {
      var first, second;
      first = value.match(this.expression.value)[0];
      second = value.split(value.match(this.expression.value)[0]);
      return $('ul#results').append("<li><span>" + first + "</span>" + second.slice(1) + "</li>");
    };

    Results.prototype.matchGroups = function(value, count) {
      var match, _i, _len, _ref, _results;
      $('ul#groups').append("<li id='match_" + count + "'><h3>Match " + count + "</h3><ol></ol></li>");
      _ref = value.match(this.expression.value).slice(1);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        match = _ref[_i];
        _results.push($("ul#groups li#match_" + count + " ol").append("<li>" + match + "</li>"));
      }
      return _results;
    };

    return Results;

  })();

  App = (function() {

    function App() {
      this.expression = new Expression({
        el: '#expression'
      });
      this.test_strings = new TestStrings({
        el: '#test_strings'
      });
      this.results = new Results(this.expression, this.test_strings);
    }

    return App;

  })();

  $(function() {
    return new App;
  });

}).call(this);
