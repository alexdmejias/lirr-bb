(function () {
window. App = {
	M: {},
	V: {},
	C: {}
}

App.M.Station = Backbone.Model.extend({});

App.C.Branch = Backbone.Collection.extend({
	model: App.M.Station
});

App.V.Branch = Backbone.View.extend({
	tagName: 'ul',

	render: function (){
		this.collection.each(this.addOne, this);
	},

	addOne: function (station){
		var stationView = new App.V.Station({model: station});
		this.$el.append(stationView.render().el);
	}
});

App.V.Station = Backbone.View.extend({
	tagName: 'li',

	render: function (){
		this.$el.html(this.model.get('title'));
		return this;
	},

	events: {
   		"click": "open"
  	},

	open: function () {
		console.log(this.model.get('zone'));
	}

});

var stations = new App.C.Branch([
	{
		title: 'oside',
		zone: 1
	},
	{
		title: 'lyn',
		zone: 3
	}
]);

var branchView = new App.V.Branch({collection: stations});
branchView.render();
$(document.body).html(branchView.el);
}) (); // end shell