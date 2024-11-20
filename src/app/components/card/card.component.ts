import { IonicModule, AnimationController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, QueryList, ViewChildren, ViewChild } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent  implements OnInit {

  @ViewChildren('templateList', { read: ElementRef }) templateListRef!: QueryList<ElementRef>;
  
  templates = [
    {
      id: 0,
      background: 'assets/images/bikeimages/KTM Bike.png',
      screenPath: 'hotel-booking',
    },
    {
      id: 1,
      background: 'assets/images/bikeimages/KTM Bike.png',
      screenPath: 'fitness-app',
    },
    {
      id: 2,
      background: 'assets/images/bikeimages/KTM Bike.png',
      screenPath: 'design-course',
    },
  ];
 
  priceamountcounter = 0

  constructor(public animationCtrl: AnimationController) { }

  ngOnInit() {
    // this.showCards = Array(this.cards.length).fill(false);
    // this.animateCards();
    // this.setnumberanimation()
    this.setpricecounter()
  }

  setnumberanimation() {

    const genNumber = () => {
    document.getElementById("numberrun")?.style.setProperty("--percent", "0.4348534")
    }
// 
    // document.querySelector("div").style.setProperty("--percent", Math.random());
    
    // setInterval(genNumber, 2000);
    setTimeout(genNumber);
  }
  ngAfterViewInit() {
    this.initCardAnimation();
  }

  initCardAnimation() {
    const itemRefArray = this.templateListRef.toArray();
    for (let i = 0; i < itemRefArray.length; i++) {
      const element = itemRefArray[i].nativeElement as HTMLDivElement;
      const Xpos = element.getBoundingClientRect().x
      console.log("Xpos:-", Xpos)
      this.animationCtrl
        .create()
        .addElement(element)
        .duration(1000)
        .delay(i * (1000 / 3))
        .easing('cubic-bezier(0.4, 0.0, 0.2, 1.0)')
        .fromTo(
          'transform', 
          `translateX(${Xpos - 100}px) translateY(100px)`,  // Initial transform (X and Y)
          `translateX(${Xpos}px) translateY(0px)`           // Final transform (X and Y)
        )
        // .fromTo('transform', `translateX(${Xpos - 100}px)`, `translateX(${Xpos}px)`)
        // // .fromTo('transform', 'translateY(100px)', 'translateY(0px)')
        .fromTo('opacity', '0', '1')
        // .fromTo('transform', 'scaleX(0.8)', 'scaleX(1)')
        .play()    
    }
  }

  setpricecounter() {
    const counter: any = document.querySelectorAll('.numberrun');

    counter.forEach((element: any) => {
      let initialCount = 0;
      const finalCount = element.dataset.count;

      const counting = setInterval(updateCounting, 1)

      function updateCounting() {
        initialCount = initialCount + 1;
        element.innerText = initialCount

        if (initialCount >= finalCount) {
          clearInterval(counting)
        }
      }
    }); 
  }

}
