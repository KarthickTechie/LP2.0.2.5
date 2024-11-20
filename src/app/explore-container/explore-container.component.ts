import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { IonicModule, AnimationController } from '@ionic/angular';
import { VehicleCardComponent } from '../components/vehicle-card/vehicle-card.component';
import { add, closeCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, VehicleCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExploreContainerComponent {

  constructor(public animationCtrl: AnimationController){
    addIcons({closeCircle})
  }
  // rowSizes: number[] = [1, 1] // Initial sizes for Rows (all equal)
  columns: number = 2;
  // columnSizes: number[] = [1, 1]; // Initial sizes for columns (all equal)
  gridItems: number[] = Array.from({ length: this.columns }, (_, i) => i + 1);


  staticdivshow = true;
  dynamicdivshow = false;

  bikeMaster = [
    {
      "Name": "KDM RC 125",
      "OnRoadPrice": "4,32,385",
      "FuelType": "Petrol",
      "offer": "18",
      "imgPath": "../../assets/images/bikeimages/KTM Bike.png"
    },
    {
      "Name": "Bajaj Pulsar 180",
      "OnRoadPrice": "1,51,273",
      "FuelType": "Petrol",
      "offer": "10",
      "imgPath": "../../assets/images/bikeimages/Pulsar Bike.png"
    },
    {
      "Name": "TVS Apache RTR",
      "OnRoadPrice": "1,42,100",
      "FuelType": "Petrol",
      "offer": "35",
      "imgPath": "../../assets/images/bikeimages/Apache.png"
    },
    {
      "Name": "Yamaha FZ",
      "OnRoadPrice": "1,58,715",
      "FuelType": "Petrol",
      "offer": "14",
      "imgPath": "../../assets/images/bikeimages/FZ Bike.png"
    },
    {
      "Name": "TVS Jupiter ZX",
      "OnRoadPrice": "95,282",
      "FuelType": "Petrol",
      "offer": "0",
      "imgPath": "../../assets/images/bikeimages/Jupiter scooty.png"
    },
    {
      "Name": "Ather New Electric",
      "OnRoadPrice": "1,38,427",
      "FuelType": "Electric",
      "offer": "15",
      "imgPath": "../../assets/images/bikeimages/Ather Scooty.png"
    },
    {
      "Name": "Ola Electric Scooty",
      "OnRoadPrice": "1,46,800",
      "FuelType": "Electric",
      "offer": "23",
      "imgPath": "../../assets/images/bikeimages/Ola Scooty.png"
    },
    {
      "Name": "Here Splendor Plus",
      "OnRoadPrice": "1,07,381",
      "FuelType": "Petrol",
      "offer": "17",
      "imgPath": "../../assets/images/bikeimages/Hero Splender Plus.png"
    },
    {
      "Name": "Bajaj Discover 125",
      "OnRoadPrice": "91,300",
      "FuelType": "Petrol",
      "offer": "29",
      "imgPath": "../../assets/images/bikeimages/Bajaj Discover.png"
    }
  ]
  @Input() name?: string;


  @ViewChildren('templateList', { read: ElementRef }) templateListRef!: QueryList<ElementRef>;

  animateDynamic() {
    console.log("animateDynamic")
    var div: any = document.getElementById('dynamicdiv');
    div.style.opacity = '100';
    div.style.zIndex = '1';
    // div.style.transform = 'scale(1, 1)';
    // div.style.transformOrigin = 'center';
    div.style.transition = 'all 3s ease-in-out';
    div.style.transitionDelay = '.5s';

    var statidiv: any = document.getElementById('selectdiv');
    statidiv.style.opacity = '0'
    statidiv.style.transition = 'all 1s ease-in-out';
    statidiv.style.zIndex = '-1'

    // setTimeout(() => {
      this.initListAnimation();
    // }, 2000);
    
  }

  dismissAnimation() {
    console.log("dismissAnimation")
    var div: any = document.getElementById('dynamicdiv');
    div.style.opacity = '0';
    div.style.zIndex = '-1'    
    // div.style.
    div.style.transition = 'opacity 1s ease-in-out';

    var statidiv: any = document.getElementById('selectdiv');
    statidiv.style.opacity = '100'
    // statidiv.style.position = 'relative'
    statidiv.style.zindex = '1'
    statidiv.style.transition = 'all 1s ease-in-out';
    statidiv.style.transitionDelay = '.5s';

    // window.location.reload();
  }

  get gridStyle() {
    return {
      'grid-template-columns': `repeat(${this.columns}, 1fr)`,
    };
  }

  initListAnimation() {
    const itemRefArray = this.templateListRef.toArray();
    for (let i = 0; i < itemRefArray.length; i++) {
      const element = itemRefArray[i].nativeElement as HTMLDivElement;
      const rect = element.getBoundingClientRect()
      const fromX = rect.x-50;
      const toX = rect.x
      console.log("fromX", fromX, toX)
      this.animationCtrl
        .create()
        .addElement(element)
        .duration(250)
        .delay(i == 0 ? 300 : (i + 1) * (1000 / 3))
        .easing('cubic-bezier(0.4, 0.0, 0.2, 1.0)')
        // .fromTo('transform', `translateX(${fromX}px)`, `translateX(${toX}px)`)
        .fromTo('transform', 'translateY(50px)', 'translateY(0px)')
        .fromTo(
          'transform', 
          `translateX(${fromX - 100}px) translateY(50px)`,  // Initial transform (X and Y)
          `translateX(${toX}px) translateY(0px)`           // Final transform (X and Y)
        )
        .fromTo('opacity', '0', '1')
        // .fromTo('transform', 'scaleX(0.8)', 'scaleX(1)')
        .play();
    }
  }
}
