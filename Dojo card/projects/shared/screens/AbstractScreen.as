package projects.shared.screens 
{
	import avmplus.getQualifiedClassName;
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.system.ApplicationDomain;
	import projects.shared.utils.Library;
	/**
	 * @author trayko
	 */
	public class AbstractScreen extends Sprite
	{
		protected var _graphic			:MovieClip;
		
		public function AbstractScreen() : void
		{
			addMainGraphic();
		}
		
		protected function addMainGraphic():void 
		{
			var main_graphic_class_name:String = getQualifiedClassName(this).split('::').pop().replace( /([A-Z])/g, function x():String { return (arguments[2] == 0 ? '' : '_' ) + arguments[0].toLowerCase(); });
			
			if ( ApplicationDomain.currentDomain.hasDefinition(main_graphic_class_name) )
			{
				_graphic = addGraphic( main_graphic_class_name ) as MovieClip;
			} else {
				trace('Unfortunately there is no graphic with linkage name of \'' + main_graphic_class_name + '\' to accompany this marvelous ' + Object(this).constructor + ' Screen object!');
			}
		}
		
		protected function addGraphic(graphic_class_:String) : Sprite
		{
			var graphic:Sprite = Library.instantiateSprite(graphic_class_);
			addChild(graphic);
			return graphic;
		}
		
		public function dispose() : void
		{
			if ( _graphic )
			{
				if ( _graphic.parent )
					_graphic.parent.removeChild(_graphic);
					
				_graphic = null;
			}
		}
	}

}