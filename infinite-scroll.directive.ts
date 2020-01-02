import { Directive, HostListener, Input, OnChanges, SimpleChanges } from "@angular/core";

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective implements OnChanges {

  @Input() loading: boolean;

  private event: CustomEvent;

  @HostListener('ionInfinite', ['$event'])
  public onIonInfinite(event: CustomEvent) {
    this.event = event;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.loading && !this.loading && this.event) {
      (this.event as any).complete();
      this.event = null;
    }

  }

}
