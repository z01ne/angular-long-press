import
{
  Directive,
  Output,
  EventEmitter,
  HostListener,
  Input
} from '@angular/core';

@Directive({
  selector: '[longPress]'
})
export class LongPressDirective
{
  pressing: boolean;
  longPressing: boolean;
  timeout: any;
  interval: any;
  touchX: number;
  touchY: number;

  @Output()
  onLongPressStart = new EventEmitter();

  @Output()
  onLongPressing = new EventEmitter();

  @Output()
  onLongPressEnd = new EventEmitter();

  @Input()
  delay = 500;

  @Input()
  frequance = 50;

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  pressDown(event: any)
  {
    if (event instanceof TouchEvent)
    {
      this.touchX = event.targetTouches[0].clientX;
      this.touchY = event.targetTouches[0].clientY;
    }
    this.pressing = true;
    this.longPressing = false;
    this.timeout = setTimeout(() =>
    {
      this.longPressing = true;
      this.onLongPressStart.emit(event);
      this.interval = setInterval(() =>
      {
        this.onLongPressing.emit(event);
      }, this.frequance);
    }, this.delay);
  }

  @HostListener('touchmove', ['$event'])
  @HostListener('touchend', ['$event'])
  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  pressUp(event: any)
  {
    if (event.type === 'touchmove')
    {
      let validDistance = 50;
      let dx = Math.abs(this.touchX - event.targetTouches[0].clientX);
      let dy = Math.abs(this.touchY - event.targetTouches[0].clientY);
      if (dx < validDistance && dy < validDistance) return false;
    }
    clearTimeout(this.timeout);
    clearInterval(this.interval);
    if (this.longPressing) this.onLongPressEnd.emit(event);
    this.longPressing = false;
    this.pressing = false;
  }
}
