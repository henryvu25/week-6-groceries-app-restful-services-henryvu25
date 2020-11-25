import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Item } from './item'

@Injectable({
  providedIn: 'root'
})
export class GroceriesServiceService {


  //array of grocery items
  items = [];

  dataChanged$: Observable<boolean>;

  private dataChangedSubject: Subject<boolean>;

  baseUrl = "http://localhost:8080";


  constructor(private http: HttpClient) {
    console.log("hello starting...");

    this.dataChangedSubject = new Subject<boolean>();
 
    this.dataChanged$ = this.dataChangedSubject.asObservable();

  }

  //The CRUD methods below use httpClient to send requests to server

  getItems() {
    console.log("getItems")
    return this.http.get(this.baseUrl + '/api/groceries')
  }


  // removeItem(index) {
  //   this.items.splice(index, 1);
  // }

  removeItem(id) {
    console.log("deleting..")
    return this.http.delete(this.baseUrl + '/api/groceries/' + id).subscribe((res: Item[]) => {
      this.items = res;
      this.dataChangedSubject.next(true);
    });
  }

  // addItem(item) {
  //   console.log("adding...")
  //   this.items.push(item);
  // }

  addItem(item) {
    console.log("adding " + item.name)
    return this.http.post(this.baseUrl + '/api/groceries/', item).subscribe((res: Item[]) => {
      this.items = res;
      this.dataChangedSubject.next(true);
    });
  }

  // editItem(item, index) {
  //   this.items[index] = item
  // }

  editItem(item, id) {
    console.log("editing...")
    return this.http.put(this.baseUrl + '/api/groceries/' + id, item).subscribe((res: Item[]) => {
      this.items = res;
      this.dataChangedSubject.next(true);
    });
  }
}
