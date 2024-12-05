import { CommonModule } from '@angular/common';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  IonCard,
  IonSegment,
  IonLabel,
  IonSegmentButton,
  IonIcon,
  IonButton,
  IonSelectOption,
  IonSelect,
  IonItem,
  IonList,
  IonPopover,
  IonContent,
} from '@ionic/angular/standalone';
import { ChartType, GoogleChartsModule } from 'angular-google-charts';
import { addIcons } from 'ionicons';
import { closeOutline, settings, statsChartOutline } from 'ionicons/icons';
import * as AppStaticData from '../../services/AppStaticData';
import { Platform } from '@ionic/angular';
import { Keyboard } from '@capacitor/keyboard';
@Component({
  selector: 'app-charts-section',
  templateUrl: './charts-section.component.html',
  styleUrls: ['./charts-section.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonPopover,
    IonList,
    IonItem,
    IonIcon,
    IonCard,
    IonSegment,
    IonSegmentButton,
    CommonModule,
    IonLabel,
    GoogleChartsModule,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonContent,
  ],
})
export class ChartsSectionComponent implements OnInit {
  chartList: ChartListConfig[] = [
    { name: 'Column Chart', code: 1, checked: false },
    { name: 'Pie Chart', code: 2, checked: false },
    { name: 'Line Chart', code: 3, checked: false },
  ];

  today = new Date();

  sampleLeadsData = [];

  chartData: ChartDataConfig = {
    title: '',
    type: ChartType.PieChart,
    columnNames: ['Leads', 'Counts', { role: 'style' }],
    data: [
      ['CLS', 8, '#eb0ec1'],
      ['ICLS', 30, '#350eeb'],
      ['RLS', 19, '#eb280e'],
    ],
    options: {
      backgroundColor: { fill: 'transparent' },
      legend: 'none',
      // rotation: (-0.5 * Math.PI) - (25/180 * Math.PI),
      chartArea: { height: '100%' },
      // height: 150,
      // width: 180,
      pieHole: 0.3,
      pieSliceTextStyle: {
        color: 'black',
      },
    },
  };
  count: any;
  showFullCharts: boolean = false;
  selectedVal: any;
  bkChecked!: ChartListConfig;
  ImgBasePath:string = AppStaticData.ImagePath.basePath;
  @ViewChild('tabContainer') tabContainer !: ElementRef<HTMLDivElement>
  
  constructor(private http: HttpClient) {
    addIcons({ statsChartOutline, closeOutline, settings });

    // this.platform.keyboardDidShow.subscribe(ev => {
    //   console.log('open');
    //  this.tabContainer.nativeElement.style.opacity = '0';
    //   });
     
    //  this.platform.keyboardDidHide.subscribe(() => {
    //   console.log('hide')
    //   // let tabOpacity:any =  document.querySelector('.tabSection');
    //   // tabOpacity.style.opacity = 1;
    //   this.tabContainer.nativeElement.style.opacity= '1';
    //   });

    Keyboard.addListener('keyboardWillShow', info => {
      this.tabContainer.nativeElement.style.visibility = 'hidden';
    });

    Keyboard.addListener('keyboardDidHide', () => {
      this.tabContainer.nativeElement.style.visibility = 'visible';
    });

  }

  ngOnInit() {
    this.getSampleData().subscribe((res: Record<string, string | number | any>) => {
      this.sampleLeadsData =
        res && res.hasOwnProperty('response') ? res['response'] : '';
    });
  }

  getSampleData() {
    return this.http.get(AppStaticData.ImagePath.sapmleData);
  }

  close() {
    setTimeout(() => {
      this.showFullCharts = false;
    }, 400);
  }

  showChartsList() {}

  selectedSegment(e: any) {
    let filterData: any = [];
    let selectedVal = e.detail ? e.detail.value : e;
    this.showFullCharts = true;
    this.animateCount(0, 100, 1000);
    filterData = this.filterDataOnSelect(this.sampleLeadsData, selectedVal);
  }

  filterDataOnSelect(data: any, type: string) {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    if (type == 'week') {
      return data.filter((item: any) => {
        const itemDate = new Date(item.created);
        return itemDate >= sevenDaysAgo && itemDate <= today;
      });
    } else if (type == 'today') {
      return data.filter((item: any) => {
        const itemDate = new Date(item.created).toISOString().split('T')[0];
        return itemDate === today.toISOString().split('T')[0];
      });
    } else if (type == 'month') {
      const selectedMonth = `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, '0')}`;
      return data.filter((item: any) => {
        const itemMonth = `${new Date(item.created).getFullYear()}-${String(
          new Date(item.created).getMonth() + 1
        ).padStart(2, '0')}`;
        return itemMonth === selectedMonth;
      });
    } else if (type == 'quaterly') {
      return data.filter((item: any) => {
        return (
          new Date(item.date).getFullYear() === today.getFullYear() &&
          this.getQuarter(new Date(item.date)) === 2
        );
      });
    }
  }

  getQuarter(date: Date): number {
    return Math.floor(date.getMonth() / 3) + 1;
  }

  animateCount(start: number, end: number, duration: number) {
    this.count = 0;
    const stepTime = duration / (end - start); // Time per increment
    const interval = setInterval(() => {
      if (this.count < end) {
        this.count++;
      } else {
        clearInterval(interval); // Stop the animation
      }
    }, stepTime);
  }

  selectedChart(chart: ChartListConfig) {
    chart.checked = true;
    this.chartList.forEach((item) => {
      if (item.code != chart.code) item.checked = false;
    });
    if (chart.code == 1) {
      this.chartData = {
        title: 'Total Leads',
        type: ChartType.ColumnChart,
        columnNames: ['Leads', 'Counts', { role: 'style' }],
        data: [
          // ['Leads', 'Counts', { role: 'style' }],
          ['CLS', 8.94, '#b87333'],
          ['ICLS', 10.49, 'silver'],
          ['RLS', 19.3, 'gold'],
        ],
        options: {
          // title: 'Total Leads',
          backgroundColor: { fill: 'transparent' },
          legend: 'none',
          chartArea: { width: '75%' },
          height: 150,
          bar: { groupWidth: '20%' },
          vAxis: { title: 'No.of Leads', gridlines: { count: 4 } },
          hAxis: { title: 'Leads' },
        },
      };
    } else if (chart.code == 2) {
      this.chartData = {
        title: '',
        type: ChartType.PieChart,
        columnNames: ['Leads', 'Counts', { role: 'style' }],
        data: [
          ['CLS', 8, '#eb0ec1'],
          ['ICLS', 30, '#350eeb'],
          ['RLS', 19, '#eb280e'],
        ],
        options: {
          backgroundColor: { fill: 'transparent' },
          legend: 'none',
          chartArea: { height: '100%' },
          // height: 150,
          pieHole: 0.3,
          pieSliceTextStyle: {
            color: 'black',
          },
        },
      };
    } else {
      this.chartData = {
        title: 'Total Leads',
        type: ChartType.LineChart,
        columnNames: ['Leads', 'Counts', { role: 'style' }],
        data: [
          // ['Leads', 'Counts', { role: 'style' }],
          ['CLS', 8.94, '#b87333'],
          ['ICLS', 10.49, 'silver'],
          ['RLS', 19.3, 'gold'],
        ],
        options: {
          backgroundColor: { fill: 'transparent' },
          legend: 'none',
          chartArea: { width: '75%' },
          height: 150,
          bar: { groupWidth: '20%' },
          vAxis: { title: 'No.of Leads', gridlines: { count: 4 } },
          hAxis: { title: 'Leads' },
        },
      };
    }
  }

  selectedAppType(e: any) {}
}

export interface ChartListConfig {
  name: string;
  code: string | number;
  checked: boolean;
}

export interface ChartDataConfig {
  title: string;
  type: any;
  columnNames: Array<string | Record<string, string | number>>;
  data: Array<string | number>[];
  options: Record<string, string | number | any>;
}
