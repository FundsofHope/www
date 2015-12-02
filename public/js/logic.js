Polymer({
	is: "first-Component",
	properties: {
		title: {
			type: String,
			value: "i'm the first-Component!!!!"
		}
	},

	ready: function(){
		console.log('work fine');
	} 
});
