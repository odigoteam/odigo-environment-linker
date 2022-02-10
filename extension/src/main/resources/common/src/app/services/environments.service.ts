import { Injectable } from '@angular/core';
import {Environments} from "../models/environments.class";

@Injectable({
  providedIn: 'root'
})
export class EnvironmentsService {
  environments: Environments | undefined;
  numberOfResult: number | undefined;

  constructor() { }
}
