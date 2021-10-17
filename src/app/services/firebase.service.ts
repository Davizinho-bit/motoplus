import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Moto } from '../interfaces/moto';
import {map} from 'rxjs/operators';
//import { Action } from 'rxjs/internal/scheduler/Action';
import { Action } from 'rxjs/internal/scheduler/Action';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
private motoList:AngularFirestoreCollection<Moto>;
  constructor(private fireCrl:AngularFirestore) {
    this.motoList=this.fireCrl.collection<Moto>('registro');
   }
   addregist(moto:Moto){
     return this.motoList.add(moto);
   }

   getRegistAll(){
     return this.motoList.snapshotChanges().pipe(
       map(actions=>{
         return actions.map(infor=>{
           const data=infor.payload.doc.data();
           const id = infor.payload.doc.id;
           return {
             id,...data
           }
         })
       })
     );
   }
   delregist(id:string){
     return this.motoList.doc(id).delete();

   }
   getlistId(id:string){
     return this.motoList.doc(id).valueChanges();
   }
   upregist(id:string,regist:Moto){
     return this.motoList.doc(id).update(regist);
   }
}
