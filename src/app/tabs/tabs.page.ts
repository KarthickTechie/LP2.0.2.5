import { CommonModule, NgClass } from '@angular/common';
import { Component, ContentChildren, EnvironmentInjector, inject, ViewChildren, AfterViewInit, ViewChild } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square, ellipsisVertical, ellipsisHorizontal, home, calendarNumber, fastFood, folder, grid, image, qrCode, storefront } from 'ionicons/icons';
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
    { name: "home", label: "home" },
    { name: "calendar-number", label: "calendar" },
    { name: "fast-food", label: "fast" },
    { name: "folder", label: "folder" },
    { name: "grid", label: "grid" },
    { name: "image", label: "image" },
    { name: "qr-code", label: "qr" },
    { name: "storefront", label: "storefront" }
  ]
  toggleMenu = false;
  constructor(public anmiationCtrl: AnimationController) {
    addIcons({
      triangle, ellipse, square, ellipsisHorizontal, home, calendarNumber,
      fastFood, folder, grid, image, qrCode, storefront
    });
  }

  ngAfterViewInit() {
    console.log(this.tabButtons)
    this.tabButtons.forEach((e) => {
      console.log(e)
    })
  }

  tabChanged() {

    this.selectedTab = this.tabButtons.find(e => e.selected == true)?.tab as string
  }

  setTransform() {
    console.log('ngclass', this.selectedTab)
    if (this.selectedTab === 'tab2') {
      return 'selected-tab2'
    } else if (this.selectedTab === 'tab3') {
      return 'selected-tab3'
    } else if (this.selectedTab === 'tab1') {
      return 'selected-tab1'

    }

    return ''
  }

  openMore() {
    this.toggleMenu = !this.toggleMenu;
    if (this.toggleMenu) {
      this.openModal();
    } else {
      this.closeModal();
    }
  }


  createFadeInAnimation(baseEl: HTMLElement) {
    return this.anmiationCtrl.create()
      .addElement(baseEl)
      .duration(500)
      .easing('ease-in-out')
    // .fromTo('opacity','0','1');
  }

  openModal() {
    const expand: any = document.querySelector(`.container`);
    const fadeInAnmiation = this.createFadeInAnimation(expand as HTMLElement);
    fadeInAnmiation.keyframes([
      { offset: 0, height: "0" },
      { offset: 0, opacity: "0" },

      { offset: 1, height: "300px" },
      { offset: 1, opacity: "1" }
    ])
    fadeInAnmiation.play();
    console.log(expand, "expand");

  }

  closeModal() {
    this.toggleMenu = false;
    console.log('close modal');
    const expand: any = document.querySelector(`.container`);
    const fadeInAnmiation = this.createFadeInAnimation(expand as HTMLElement);
    fadeInAnmiation.keyframes([
      { offset: 0, height: "300px" },
      { offset: 0, opacity: "1" },

      { offset: 1, height: "0" },
      { offset: 1, opacity: "0" },
    ])
    fadeInAnmiation.play();
  }

}
