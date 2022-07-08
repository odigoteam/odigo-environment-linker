export class Move {
  name: string = "";
  client_id: string = "";
  src: string = "";
  dest: string = "";
  pw_src: string = "";
  pw_dest: string = "";
  id_card: string = "";
  version_src: string = "";
  version_dest: string = "";
  highlight: boolean = false;
}

export class Wave {
  name: string = "";
  next_wave: boolean = false;
  moves: Move[] = [];
  displayed: boolean = true;
  containsResults: boolean = false;
}

export class MotionPlanning {
  generated: string = "";
  waves: Wave[] = [];
  d1: string = "";
  d2: string = "";
}
