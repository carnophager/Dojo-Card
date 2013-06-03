package projects.shared.screens
{
	import com.greensock.easing.Quad;
	import com.greensock.easing.Quart;
	import com.greensock.easing.Sine;
	import com.greensock.TweenMax;
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.utils.getDefinitionByName;
	import flash.utils.getQualifiedSuperclassName;
	import projects.shared.screens.events.ScreenEvent;
	
	/**
	 * Managing various screens of the app
	 * 
	 * @author trayko
	 */
	public class ScreensBase extends Sprite
	{
		protected var _current_screen		:AbstractScreen;
		protected var _previous_screen		:AbstractScreen;
		
		public function addScreen(Screen:Class, animate_:Boolean = true) : AbstractScreen
		{
			_current_screen = new Screen() as AbstractScreen;
			
			addChild(_current_screen);
			
			if ( _previous_screen )
				animateScreenOut();
			
			if ( animate_ )
				animateScreenIn(_current_screen);
				
			_previous_screen = _current_screen;
			
			_current_screen.addEventListener(ScreenEvent.CLOSE_SCREEN, closeScreenHandler);
			
			dispatchEvent(new ScreenEvent(ScreenEvent.ADD_SCREEN, Screen));
			
			return _current_screen;
		}
		
		public function closeScreenHandler(e:ScreenEvent):void
		{
			clearCloseHandler();
			
			
			afterScreenWithTypeClosed(e);
		}
		
		protected function afterScreenWithTypeClosed(screen_event_:ScreenEvent):void 
		{
			
		}
		
		protected function clearCloseHandler():void 
		{
			_current_screen.removeEventListener(ScreenEvent.CLOSE_SCREEN, closeScreenHandler);
		}
		
		protected function animateScreenIn(current_screen_:AbstractScreen) : void
		{
			current_screen_.mouseEnabled = false;
			current_screen_.mouseChildren = false;
			
			playScreenInAnimation(current_screen_);
		}
		
		protected function playScreenInAnimation(current_screen_:AbstractScreen):void 
		{
			current_screen_.alpha = 0;
			TweenMax.to(current_screen_, 1, { alpha: 1, ease: Sine.easeOut, onComplete: afterCurrentScreenAnimateIn } );
		}
		
		protected function animateScreenOut() : void
		{
			_previous_screen.mouseEnabled = false;
			_previous_screen.mouseChildren = false;
			
			playScreenOutAnimation();
		}
		
		protected function playScreenOutAnimation():void 
		{
			TweenMax.to(_previous_screen, .5, { delay: 0, alpha: 0, ease: Sine.easeOut, onComplete: disposeScreen, onCompleteParams: [ _previous_screen ] } );
		}
		
		protected function afterCurrentScreenAnimateIn():void 
		{
			_current_screen.mouseEnabled = true;
			_current_screen.mouseChildren = true;
		}
		
		protected function disposeScreen(screen_:AbstractScreen):void 
		{
			screen_.dispose();
			if ( screen_.parent )
				screen_.parent.removeChild(screen_);
				
			screen_ = null;
		}
	}
}