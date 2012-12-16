(function () {
    window. App = {
	M: {},
	V: {},
	C: {}
}

window.template = function (id){
	return _.template( $('#' + id).html() );
}

App.M.Station = Backbone.Model.extend({
	validate: function (attrs) {
		if (! $trim(attrs.title)) {
			return 'A station name is required'
		}
	}
});

App.C.Branch = Backbone.Collection.extend({
	model: App.M.Station
});

App.V.Branch = Backbone.View.extend({
	tagName: 'div',

	template: template('branch_template'),

	render: function (){
		this.collection.each(this.addOne, this);
	},

	addOne: function (station){
		var stationView = new App.V.Station({model: station});
		this.$el.append(stationView.render().el);
	}
});

App.V.Station = Backbone.View.extend({
	tagName: 'div',

	template: template('station_template'),

	initialize: function(){
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.remove, this);
	},

	events: {
   		'click .edit' : 'editStation',
   		'click .remove' : 'destroy'
  	},

	editStation: function() {
		var newStationTitle = prompt('rename to:', this.model.get('name'));
		if ( !newStationTitle ) return;
		this.model.set('name', newStationTitle);
	},

	destroy: function() {
		this.model.destroy();
	},

	remove: function() {
		this.remove();
	},

	render: function(){
		var template = this.template( this.model.toJSON() );
		this.$el.html(template);
		return this;
	}
});

App.V.addStation = Backbone.View.extend({
	el: '#add-task',

	initialize: function () {
	},

	events: {
		'submit' : 'submit'
	},

	submit: function(e){
		e.preventDefault();

		var newStationTitle = $(e.currentTarget).find('input[type=text').val();

		var task = new App.M.Station({ name: newStationTitle})

	}
});



var long_beach = new App.C.Branch([
	{
		name: 'oside',
		zone: 1
	},
	{
		name: 'lyn',
		zone: 3
	},
	{
		name: 'east rockway',
		zone: 3
	},
	{
		name: 'long beach',
		zone: 3
	}
]);


var addStationView = new App.V.addStation

var long_beach_V = new App.V.Branch({collection: long_beach});
long_beach_V.render();
$('.branches').html(long_beach_V.el );




}) (); // end shell