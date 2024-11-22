import { CommonModule, NgClass } from '@angular/common';
import { Component, ContentChildren, EnvironmentInjector, inject, ViewChildren, AfterViewInit, ViewChild } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square, ellipsisVertical, ellipsisHorizontal, home, calendarNumber, fastFood, folder, grid, image, qrCode, storefront, heart, personAdd, create, library, bookmarks, closeCircle, archive } from 'ionicons/icons';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, NgClass, CommonModule],
})
export class TabsPage implements AfterViewInit {
  public environmentInjector = inject(EnvironmentInjector);
  @ViewChildren(IonTabButton) tabButtons!: IonTabButton[];
  selectedTab = ''
  cards = [
    { name: "person-add", label: "Create lead" },
    { name: "create", label: "Existing app" },
    { name: "library", label: "Credit app" },
    { name: "folder", label: "Group inbox" },
    { name: "grid", label: "Sanctioned" },
    { name: "bookmarks", label: "OPS" },
    { name: "close-circle", label: "Rejected" },
    { name: "archive", label: "PDD" }
  ]
   toggleMenu = false;
   closedModal = false;
  constructor(public anmiationCtrl: AnimationController) {
    addIcons({
      triangle, ellipse, square, ellipsisHorizontal, home, calendarNumber,
      fastFood, folder, grid, image, qrCode, storefront,personAdd,create,library,bookmarks,
      closeCircle,archive
    });
      this.closeModal();
  }

  ngAfterViewInit() {
    console.log(this.tabButtons)
    this.tabButtons.forEach((e) => {
      console.log(e)
    })
  }

  tabChanged() {

    this.selectedTab = this.tabButtons.find(e => e.selected == true)?.tab as string
    if(this.closedModal){
      this.closeModal();
    }
  }

  // setTransform() {
  //   console.log('ngclass', this.selectedTab)
  //   if (this.selectedTab === 'tab2') {
  //     return 'selected-tab2'
  //   } else if (this.selectedTab === 'tab3') {
  //     return 'selected-tab3'
  //   } else if (this.selectedTab === 'tab1') {
  //     return 'selected-tab1'

  //   }

  //   return ''
  // }

  openMore() {
    this.toggleMenu = !this.toggleMenu;
    if (this.toggleMenu) {
      this.closedModal = true;
      this.openModal();
    } else {
      this.closedModal = false;
      this.closeModal();
    }
  }


  createFadeInAnimation(baseEl: HTMLElement) {
    return this.anmiationCtrl.create()
      .addElement(baseEl)
      .duration(250)
      .easing('ease-in-out')
    // .fromTo('opacity','0','1');
  }

  openModal() {
    const container: any = document.querySelector(`.bottom-container`);
    if(container){
      container.style.bottom = "0";
    }
    const blurAnmiation = this.createFadeInAnimation(container as HTMLElement);
    blurAnmiation.keyframes([
      { offset: 1, height: "100vh" }
      ])
      blurAnmiation.play();
      const expand: any = document.querySelector(`.modal-container`);
    const fadeInAnmiation = this.createFadeInAnimation(expand as HTMLElement);
    fadeInAnmiation.keyframes([
      { offset: 0, height: "0" },
      { offset: 0, opacity: "0" },

      { offset: 1, height: "350px" },
      { offset: 1, opacity: "1" }
    ])
    fadeInAnmiation.play();
    console.log(expand, "expand");

    let icons = document.getElementsByClassName('icon');
    for (let i = 0; i < icons.length; i++) {
      icons[i].classList.add('bounce');
      icons[i].classList.add('shineCard');
  }
    console.log(icons,"icons")

  }

  closeModal() {
    this.toggleMenu = false;
    this.closedModal = false;
    console.log('close modal');
    const container: any = document.querySelector(`.bottom-container`);
    if(container){

      container.style.bottom = "0";
    }
    const blurAnmiation = this.createFadeInAnimation(container as HTMLElement);
    blurAnmiation.keyframes([
      { offset: 1, height: "0" }
      ])
      blurAnmiation.play();
    const expand: any = document.querySelector(`.modal-container`);
    const fadeInAnmiation = this.createFadeInAnimation(expand as HTMLElement);
    fadeInAnmiation.keyframes([
      { offset: 0, height: "350px" },
      { offset: 0, opacity: "1" },

      { offset: 1, height: "0" },
      { offset: 1, opacity: "0" },
    ])
    fadeInAnmiation.play();
    let icons = document.getElementsByClassName('icon');
    for (let i = 0; i < icons.length; i++) {
      icons[i].classList.remove('bounce');
      icons[i].classList.remove('shineCard');
  }
  }

}
