import { Component, ElementRef, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import anime from 'animejs/lib/anime.es.js';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
    standalone: true,
  imports: [IonicModule, ExploreContainerComponent],
})
export class Tab1Page {

  @ViewChild('grid')gridContainer !: ElementRef<HTMLDivElement>
  @ViewChild('detailTemplate')detailTemplate !: TemplateRef<any>;
  @ViewChild('details')details !:ElementRef<HTMLDivElement>;
  @ViewChild('detailbgup')detailbgup !:ElementRef<HTMLDivElement>;
  @ViewChild('detailbgdown')detailbgdown !:ElementRef<HTMLDivElement>;
  @ViewChild('detailimg')detailimg !:ElementRef<HTMLDivElement>;
  @ViewChild('detailtitle')detailtitle !:ElementRef<HTMLDivElement>;
  @ViewChild('detailsubtitle')detailsubtitle !:ElementRef<HTMLDivElement>;
  @ViewChild('detaildesc')detaildesc !:ElementRef<HTMLDivElement>;
  @ViewChild('detailprice')detailprice !:ElementRef<HTMLDivElement>;
  @ViewChild('detailbutton')detailbutton !:ElementRef<HTMLButtonElement>;
  @ViewChild('divsplash')divsplash !:ElementRef<HTMLDivElement>;
  
  @ViewChild('detailsVCR',{static:false,read:ViewContainerRef})detailVCR!:ViewContainerRef;
  
  @ViewChild('productBG')productBG !: ElementRef<HTMLDivElement>
  @ViewChild('productIMG')productIMG !: ElementRef<HTMLImageElement>



  animeProps:any = {}

  product = {
    img:'../../assets/img/1.png',
    title:'Marble Dream',
    subtitle:'Constantin Frecker',
    price:'$129',
    description:'Hashtag cred air plant drinking vinegar. Leggings yuccie chambray pop-up tousled hell of. Portland wolf mumblecore, synth cold-pressed polaroid poke cardigan gochujang farm-to-table photo booth.',
  }
  detail = {
    img:'',
    title:'',
    subtitle:'',
    price:'',
    description:'',
  }
  constructor(  private vcf:ViewContainerRef    ) {

  }

  ngAfterViewInit(){

  }

  open(){
    
      this.animeProps.isAnimating = true
      this.detailVCR.createEmbeddedView(this.detailTemplate)

      setTimeout(()=>{
        this.details.nativeElement.classList.add('details--open')
        this.productBG.nativeElement.style.opacity='0'
        const rect = this.getProductDetailsRect()
        this.detail = {...this.product}
        this.detailbgdown.nativeElement.style.transform = `translateX(${rect.productBgRect.left-rect.detailsBgRect.left}px) translateY(${rect.productBgRect.top-rect.detailsBgRect.top}px) scaleX(${rect.productBgRect.width/rect.detailsBgRect.width}) scaleY(${rect.productBgRect.height/rect.detailsBgRect.height})`;
        this.detailbgdown.nativeElement.style.opacity = '1'
        this.detailimg.nativeElement.style.transform = `translateX(${rect.productImgRect.left-rect.detailsImgRect.left}px) translateY(${rect.productImgRect.top-rect.detailsImgRect.top}px) scaleX(${rect.productImgRect.width/rect.detailsImgRect.width}) scaleY(${rect.productImgRect.height/rect.detailsImgRect.height})`;
        this.detailimg.nativeElement.style.opacity = '1'

        anime({
          targets: [this.detailbgdown.nativeElement,this.detailimg.nativeElement],
          duration: (target, index) => index ? 800 : 250,
          easing: 'easeOutElastic',
          elasticity: 250,
          translateX: 0,
          translateY: 0,
          scaleX: 1,
          scaleY: 1,
          complete: () => this.animeProps.isAnimating = false
      });
  
      anime({
          targets: [this.detailtitle.nativeElement],
          duration: 600,
          easing: 'easeOutExpo',
          delay: 60,
          translateY: '-50vh',
          translateX:[0,'35vw'],
          scale:  [0.1,1],
          opacity: [0,1]
      });

      anime({
        targets: [this.detailsubtitle.nativeElement],
        duration: 600,
        easing: 'easeOutExpo',
        delay: 100,
        translateY: '-50vh',
        translateX:[0,'35vw'],
        scale:  [0.1,0.8],
        opacity: [0,1]
  });

  anime({
    targets: [this.detailprice.nativeElement],
    duration: 600,
    easing: 'easeOutExpo',
    delay: 100,
    translateY: '-50vh',
    translateX:[0,'50vw'],
    scale:  [0.1,0.8],
    opacity: [0,1]
});

anime({
  targets: [this.detailbutton.nativeElement],
  duration: 600,
  easing: 'easeOutExpo',
  delay: 100,
  translateY: '-85vh',
  translateX:[0,'50vw'],
  scale:  [0.1,1.1],
  opacity: [0,1]
});


  
      anime({
          targets: this.detailbgup.nativeElement,
          duration: 100,
          easing: 'linear',
          translateY: '-85vh',
          translateX:[0,'50vw'],
          opacity: 1
      });
      anime({
        targets: [this.divsplash.nativeElement],
        duration: 50,
        easing: 'easeOutElastic',
        delay: 0,
        scale:  [0,22],
        opacity: [0,1]
  });

  
  
      },10)

  }

    getProductDetailsRect() {
      return {
          productBgRect: this.productBG.nativeElement.getBoundingClientRect(),
          detailsBgRect: this.detailbgdown.nativeElement.getBoundingClientRect(),
          productImgRect: this.productIMG.nativeElement.getBoundingClientRect(),
          detailsImgRect: this.detailimg.nativeElement.getBoundingClientRect()
      };
  

  }
}
