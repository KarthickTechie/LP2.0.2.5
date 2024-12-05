import { Component, ElementRef, TemplateRef, ViewChild, ViewContainerRef, Query, ViewChildren, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { IonicModule } from '@ionic/angular';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-product-card',
  templateUrl: 'productcard.component.html',
  styleUrls: ['productcard.component.scss'],
  standalone: true,
  imports: [NgFor,NgClass,IonicModule],
})
export class ProductCardComponent{

 @Input() showAll = false
 @Output() cardToggle = new EventEmitter<boolean>()
 
  selectedHTMLElement!: HTMLDivElement;
  @ViewChild('grid') gridContainer !: ElementRef<HTMLDivElement>
  @ViewChild('detailTemplate') detailTemplate !: TemplateRef<any>;
  @ViewChild('details') details !: ElementRef<HTMLDivElement>;
  @ViewChild('detailbgup') detailbgup !: ElementRef<HTMLDivElement>;
  @ViewChild('detailbgdown') detailbgdown !: ElementRef<HTMLDivElement>;
  @ViewChild('detailimg') detailimg !: ElementRef<HTMLDivElement>;
  @ViewChild('detailtitle') detailtitle !: ElementRef<HTMLDivElement>;
  @ViewChild('detailsubtitle') detailsubtitle !: ElementRef<HTMLDivElement>;
  @ViewChild('detaildesc') detaildesc !: ElementRef<HTMLDivElement>;
  @ViewChild('detailprice') detailprice !: ElementRef<HTMLDivElement>;
  @ViewChild('detailbutton') detailbutton !: ElementRef<HTMLButtonElement>;
  @ViewChild('detailclose') detailclose !: ElementRef<HTMLButtonElement>;

  @ViewChild('divsplash') divsplash !: ElementRef<HTMLDivElement>;

  @ViewChild('detailsVCR', { static: false, read: ViewContainerRef }) detailVCR!: ViewContainerRef;

  @ViewChild('productBG') productBG !: ElementRef<HTMLDivElement>
  @ViewChild('productIMG') productIMG !: ElementRef<HTMLImageElement>


  animeProps: any = {}

  products = [{
    img: '../../assets/img/01.png',
    title: 'Royal Enfield',
    subtitle: 'Classic 350',
    price: '₹ 1.29L',
    description: 'Hashtag cred air plant drinking vinegar. Leggings yuccie chambray pop-up tousled hell of. Portland wolf mumblecore, synth cold-pressed polaroid poke cardigan gochujang farm-to-table photo booth.',
  },
  {
    img: '../../assets/img/02.png',
    title: 'Royal Enfield',
    subtitle: 'Super Meteor 650',
    price: '₹ 1.29L',
    description: 'Hashtag cred air plant drinking vinegar. Leggings yuccie chambray pop-up tousled hell of. Portland wolf mumblecore, synth cold-pressed polaroid poke cardigan gochujang farm-to-table photo booth.',
  },
  {
    img: '../../assets/img/03.png',
    title: 'Royal Enfield',
    subtitle: 'Bear 650',
    price: '₹ 4.29L',
    description: 'Hashtag cred air plant drinking vinegar. Leggings yuccie chambray pop-up tousled hell of. Portland wolf mumblecore, synth cold-pressed polaroid poke cardigan gochujang farm-to-table photo booth.',
  },
  {
    img: '../../assets/img/04.png',
    title: 'Royal Enfield',
    subtitle: 'Super Hunter 650',
    price: '₹ 5.5L',
    description: 'Hashtag cred air plant drinking vinegar. Leggings yuccie chambray pop-up tousled hell of. Portland wolf mumblecore, synth cold-pressed polaroid poke cardigan gochujang farm-to-table photo booth.',
  }]
  detail = {
    img: '',
    title: '',
    subtitle: '',
    price: '',
    description: '',
  }
  constructor() {

  }
  open(i: number, vc: HTMLDivElement) {
    //console.log(i, this.products[i])
    this.cardToggle.emit(true)
    this.selectedHTMLElement = vc
    this.animeProps.isAnimating = true
    this.detailVCR.createEmbeddedView(this.detailTemplate)

    setTimeout(() => {
      this.details.nativeElement.classList.add('details--open')
      this.selectedHTMLElement.style.opacity = '0'
      const rect = this.getProductDetailsRect()
      this.detail = { ...this.products[i] }
      this.detailbgdown.nativeElement.style.transform = `translateX(${rect.productBgRect.left - rect.detailsBgRect.left}px) translateY(${rect.productBgRect.top - rect.detailsBgRect.top}px) scaleX(${rect.productBgRect.width / rect.detailsBgRect.width}) scaleY(${rect.productBgRect.height / rect.detailsBgRect.height})`;
      this.detailbgdown.nativeElement.style.opacity = '1'
      this.detailimg.nativeElement.style.transform = `translateX(${rect.productImgRect.left - rect.detailsImgRect.left}px) translateY(${rect.productImgRect.top - rect.detailsImgRect.top}px) scaleX(${rect.productImgRect.width / rect.detailsImgRect.width}) scaleY(${rect.productImgRect.height / rect.detailsImgRect.height})`;
      this.detailimg.nativeElement.style.opacity = '1'

      
      anime({
        targets: [this.detailbgdown.nativeElement, this.detailimg.nativeElement],
        duration: (target, index) => index ? 800 : 250,
        easing: 'easeOutElastic',
        elasticity: 250,
        translateX: 0,
        translateY: 0,
        scaleX: 1.2,
        scaleY: 1.2,
        complete: () => this.animeProps.isAnimating = false
      });

      anime({
        begin:async()=>{
          const height = await window.screen.availHeight
          const titleTopPosition = Math.ceil(rect.detailsTitleRect.top)
          console.log(Math.round((titleTopPosition/height)*100))
          console.log(`${JSON.stringify(rect.detailsTitleRect)} ---- $`)
        },
        targets: [this.detailtitle.nativeElement],
        duration: 600,
        easing: 'easeOutExpo',
        delay: 60,
        translateY: '-50vh',
        translateX: [0, '35vw'],
        scale: [0.1, 1],
        opacity: [0, 1],
      });

      anime({
        targets: [this.detailsubtitle.nativeElement],
        duration: 600,
        easing: 'easeOutExpo',
        delay: 100,
        translateY: '-50vh',
        translateX: [0, '35vw'],
        scale: [0.1, 0.8],
        opacity: [0, 1]
      });

      anime({
        targets: [this.detailprice.nativeElement],
        duration: 600,
        easing: 'easeOutExpo',
        delay: 100,
        translateY: '-50vh',
        translateX: [0, '35vw'],
        scale: [0.1, 0.8],
        opacity: [0, 1]
      });

      anime({
        targets: [this.detailbutton.nativeElement],
        duration: 600,
        easing: 'easeOutExpo',
        delay: 100,
        translateY: '-8vh',
        translateX: [0, '55vw'],
        scale: [0.1, 1.1],
        opacity: [0, 1]
      });

      anime({
        targets: [this.detailclose.nativeElement],
        duration: 600,
        easing: 'easeOutExpo',
        delay: 100,
        //translateY:   this.showAll ? '5vh' : '-30vh',
        //translateX: [0, '0vw'],
        scale: [0.1, 1.1],
        opacity: [0, 1],
        zindex:2000000
      });




      anime({
        targets: this.detailbgup.nativeElement,
        duration: 100,
        easing: 'linear',
        translateY: '-85vh',
        translateX: [0, '50vw'],
        opacity: 1
      });
      anime({
        targets: [this.divsplash.nativeElement],
        duration: 50,
        easing: 'easeOutElastic',
        delay: 0,
        scale: [0, 22],
        opacity: [0, 1]
      });



    }, 10)

  }

  close() {
    this.cardToggle.emit(false)
    this.detailVCR.clear()
    anime({
      targets: [this.selectedHTMLElement],
      duration: 100,
      easing: 'easeOutElastic',
      elasticity: 250,
      delay: 50,
      scale: [0, 1],
      opacity: [0, 1]
    });

  }
 getProductDetailsRect() {
    return {
      productBgRect: this.productBG.nativeElement.getBoundingClientRect(),
      detailsBgRect: this.detailbgdown.nativeElement.getBoundingClientRect(),
      productImgRect: this.productIMG.nativeElement.getBoundingClientRect(),
      detailsImgRect: this.detailimg.nativeElement.getBoundingClientRect(),
      detailsTitleRect: this.detailtitle.nativeElement.getBoundingClientRect(),
    };


  }
}
