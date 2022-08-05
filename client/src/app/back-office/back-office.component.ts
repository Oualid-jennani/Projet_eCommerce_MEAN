import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-back-office',
  templateUrl: './back-office.component.html',
  styleUrls: ['./back-office.component.css']
})
export class BackOfficeComponent implements OnInit {

  constructor() {
    //this.loadJs("assets/plugins/metismenu/js/metisMenu.min.js");
    //this.loadJs("assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js");
   }

  ngOnInit(): void {
    
  }
  loadAll(){
    this.loadJs("assets/plugins/metismenu/js/metisMenu.min.js");
    this.loadJs("assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js");
  }

  loadJs(src:string){
    const node = document.createElement('script');
    node.src = src;
    node.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(node);
  }

}
