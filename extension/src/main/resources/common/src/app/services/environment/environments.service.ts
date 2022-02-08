import { Injectable } from '@angular/core';
import {Environments} from "../../models/Environments.class";

@Injectable({
  providedIn: 'root'
})
export class EnvironmentsService {
  environments: Environments | undefined;
  numberOfResult: number | undefined;

  constructor() { }
}
