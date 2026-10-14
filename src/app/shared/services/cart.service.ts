import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { CartItem } from "../models/CartItem";
import { CoursesInterface } from "../models/Courses.interface";
import { ToastService } from "./toast.service";

const CART_STORAGE_KEY = "cart" ;

@Injectable({
  providedIn : 'root'
})

export class CartService {
  private toast : ToastService = inject(ToastService) ;
  private CartSubject : BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>(this.loadCart()) ;

  items$ : Observable<CartItem[]> = this.CartSubject.asObservable() ;
  count$ : Observable<number> = this.items$.pipe(map((items) => items.reduce((sum , item) => sum + item.quantity , 0))) ;
  total$ : Observable<number> = this.items$.pipe(map((items) => items.reduce((sum , item) => sum + this.priceOf(item.course) * item.quantity , 0))) ;

  priceOf(course : CoursesInterface) : number {
    return Number(course.price) || 0 ;
  }

  add(course : CoursesInterface , quantity : number = 1) : void {
    if (!course.is_in_inventory) {
      this.toast.error(`${course.name} is out of stock`) ;
      return ;
    }
    const qty = Math.max(1 , Math.floor(Number(quantity)) || 1) ;
    const items = this.CartSubject.value ;
    const exists = items.some((item) => item.course.id === course.id) ;
    this.update(exists
      ? items.map((item) => item.course.id === course.id ? { ...item , quantity : item.quantity + qty } : item)
      : [...items , { course , quantity : qty }]) ;
    this.toast.success(`${course.name} added to cart`) ;
  }

  setQuantity(id : number , quantity : number) : void {
    const qty = Math.floor(Number(quantity)) ;
    if (!qty || qty < 1) {
      this.remove(id) ;
      return ;
    }
    this.update(this.CartSubject.value.map((item) => item.course.id === id ? { ...item , quantity : qty } : item)) ;
  }

  remove(id : number) : void {
    this.update(this.CartSubject.value.filter((item) => item.course.id !== id)) ;
  }

  clear() : void {
    this.update([]) ;
  }

  private update(items : CartItem[]) : void {
    this.CartSubject.next(items) ;
    try {
      localStorage.setItem(CART_STORAGE_KEY , JSON.stringify(items)) ;
    } catch {}
  }

  private loadCart() : CartItem[] {
    try {
      const stored = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) ?? "[]") ;
      return Array.isArray(stored) ? stored.filter((item) => item?.course?.id != null && item.quantity > 0) : [] ;
    } catch {
      return [] ;
    }
  }
}
