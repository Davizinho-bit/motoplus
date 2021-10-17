import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {
routerId:string=null;
  constructor(private activectl:ActivatedRoute,private firedb:FirebaseService,private navctrl:NavController) { }
registro={};
km= 'ffd';
  ngOnInit() {


    this.routerId=this.activectl.snapshot.params['id'];
    

    if(this.routerId){
      this.firedb.getlistId(this.routerId).subscribe(result=>this.registro=result)
    }

  }

upshow(form){

  this.firedb.upregist(this.routerId,form.value);
  this.navctrl.navigateBack("/home")
}

  

}
