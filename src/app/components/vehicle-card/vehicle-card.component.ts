import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehicleCardComponent implements OnInit {

  @Input() vehicleMaster: any
  @Input() normalcard: any
  @Input() dynamicard: any
  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

}
