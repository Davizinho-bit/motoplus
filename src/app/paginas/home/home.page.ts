import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
title="motoplus";
imagen="";
listaregist=[];
  constructor(private alertController: AlertController,private fireDb:FirebaseService) { 
    this.registshow();}


registshow(){
  return this.fireDb.getRegistAll().subscribe((Dados:any)=>{this.listaregist=Dados});
}


async Addshow() {
  const alert = await this.alertController.create({
    header: 'novo registro',
    inputs:[
{
  name:'dono',
  type: 'text',
  placeholder:'informe o nome'
},{
  name:'marca',
  type: 'text',
  placeholder:'informe a Marca'
},{
  name:'modelo',
  type: 'text',
  placeholder:'informe o Modelo'
},{
  name:'placa',
  type: 'text',
  placeholder:'informe a Placa'
},{
  name:'ano',
  type: 'text',
  placeholder:'informe o ano'
},{
  name:'km',
  type: 'text',
  placeholder:'informe o kilometrotagem'
}
    ],

      buttons: [
        {
        text:'cancelar',
        role:'cancel',
        handler:()=>{console.log('testando')}
      },
      {text:'cadastrar',
    handler:(form)=>{
      let moto={
        dono:form.dono,
        marca:form.marca,
        modelo:form.modelo,
        placa:form.placa,
        ano:form.ano,
        km:form.km
      };
      this.fireDb.addregist(moto);
    }
  }
      ]
  });

  await alert.present();
}
 
delshow(id){
this.fireDb.delregist(id);
  
}
ngOnInit() {  }

}
