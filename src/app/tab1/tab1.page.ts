import { Component, AfterViewInit } from '@angular/core';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonicModule } from '@ionic/angular';
import { ChartsSectionComponent } from '../components/charts-section/charts-section.component';
import { NgClass, NgFor } from '@angular/common';
import { HeaderPage } from '../header/header.page';
import { ProductCardComponent } from '../product-card/productcard.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent,NgClass, NgFor,HeaderPage,ProductCardComponent,ChartsSectionComponent],
})
export class Tab1Page {
  showAllProducts = false
  showProductDetails = false
  constructor() {

  }


  showAll(){
    this.showAllProducts = !this.showAllProducts

  }

  onProductOpen(e:boolean){
    this.showProductDetails = e
  }

  onContentScroll(event: any) {
    // console.log("onContentScroll", event)
    // if (event.detail.scrollTop >= 30) {
    //   var headerDiv: any = document.getElementById('headerdiv');
    //   headerDiv.style.transition = 'top 700ms';
    //   headerDiv.style.top = '-150px';
    // } else {
    //   var headerDiv: any = document.getElementById('headerdiv');
    //   headerDiv.style.transition = 'top 700ms';
    //   headerDiv.style.top = '0px';
    // } 
   
  }

}
