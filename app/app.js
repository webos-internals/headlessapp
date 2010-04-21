function AppAssistant() {}
AppAssistant.prototype.handleLaunch = function(params) 
{
	try
	{
		var manualFunction = function(stageController)
		{
	        stageController.pushScene
			({
				name: "manualLaunch",
				sceneTemplate: "popup"
			});
		};
		
		var stageName = "manualLaunch-" + Date.now();
		Mojo.Controller.getAppController().createStageWithCallback
		(
			{
				name: stageName,
				height: Mojo.Controller.appInfo.popupHeight,
				lightweight: true
			},
			manualFunction,
			'popupalert'
		);
	}
	catch (e)
	{
		Mojo.Log.logException(e, "AppAssistant#handleLaunch");
	}
}

function ManualLaunchAssistant(){}
ManualLaunchAssistant.prototype.setup = function()
{
	this.controller.get('header').innerHTML = Mojo.Controller.appInfo.title;
	this.controller.get('message').innerHTML = Mojo.Controller.appInfo.popupMessage;
	this.controller.setupWidget
	(
		'ok-button',
		{},
		{
			buttonLabel: $L(Mojo.Controller.appInfo.popupButton),
			buttonClass: 'affirmative'
		}
	);
    Mojo.Event.listen(this.controller.get('ok-button'), Mojo.Event.tap, this.okButton.bind(this));
}
ManualLaunchAssistant.prototype.okButton = function()
{
	//console.log('Popup [Ok Button]');
	this.controller.window.close();
}
ManualLaunchAssistant.prototype.cleanup = function(event)
{
    Mojo.Event.stopListening(this.controller.get('ok-button'), Mojo.Event.tap, this.okButton.bind(this));
}