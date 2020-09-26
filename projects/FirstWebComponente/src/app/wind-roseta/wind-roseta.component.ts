import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wind-roseta',
  templateUrl: './wind-roseta.component.html',
  styleUrls: ['./wind-roseta.component.scss']
})
export class WindRosetaComponent implements OnInit {

  // VIENTO
  clientX: any;
  clientY: any;
  x; y; movementX; movementY;
  rosetaVisible = false;
  windAngle: any;
  windInterp: string;
  windIntensity: any;

  intensidadColor = ['#f0ecdb', '#ceff99', '#ffff99', '#ffa64d'];
  intensidadTxt = ['nulo', 'brisa', 'medio', 'fuerte'];

  moving = false;

  constructor() { }

  ngOnInit(): void {
  }


  // VIENTO
  windRosette(ev, nVal) {

    if (nVal === 1) {
      this.moving = true;
    }

    if (nVal === 2) {
      this.moving = false;
    }
    if (nVal === 0 && this.moving === true) {


      // DRAG
      const anglNhip = this.anguloVientoCalc(ev.pageX, ev.pageY);
      this.windAngle = anglNhip.angle;
      this.windIntensity = this.intensidadViento(anglNhip.hip);
      this.windInterp = this.direccionInterp(anglNhip.angle, this.windIntensity);
    }
  }

  private anguloVientoCalc(x, y) {

    const circle = document.getElementById('circle');
    const rect = circle.getBoundingClientRect();

    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };

    const deltaX = x - center.x;
    const deltaY = y - center.y;
    const deltaYc = deltaY * this.inclinationCorr();
    const hip = Math.round(Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaYc, 2)));
    const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
    const angRound = Math.round(angle);

    return { angle, hip };
  }

  private intensidadViento(hInt) {

    const arrowWind = document.getElementById('windDir');
    const badgeIntens = document.getElementById('intensidad');
    let pos = 0;
    const factor = 6;
    const ints = hInt / factor;
    if (hInt <= 30) { pos = 0; }
    if (hInt > 30 && hInt <= 70) { pos = 1; }
    if (hInt > 70 && hInt <= 110) { pos = 2; }
    if (hInt > 110) { pos = 3; }

    const intensity = Math.round(ints);
    badgeIntens.innerHTML = `${intensity} km\/h`;
    badgeIntens.style.background = this.intensidadColor[pos];

    arrowWind.style.width = `${hInt}px`;

    return intensity;
  }
  private inclinationCorr() {
    const rosDispl = document.getElementById('rosetaVientos');
    const hght = rosDispl.getBoundingClientRect().height;

    console.log("viento px :" + hght);
    const radiansSum = 0.436332;
    const trueDim = Math.sin(1.5708) * hght / Math.sin(radiansSum);
    console.log("TRUE px :" + trueDim);
    const factor = trueDim / hght;

    return factor;
  }

  private direccionInterp(ang, ints) {

    let dr = 'contra';
    const badgeDirecc = document.getElementById('direccion');
    const picker = document.getElementById('picker');
    const flag = document.getElementById('wFlag');

    if (ang < 15 && ang >= -15) { dr = 'EAST'; }
    if (ang < -15 && ang >= -65) { dr = 'NORTH-EAST'; }
    if (ang < -55 && ang > -110) { dr = 'NORTH'; }
    if (ang < -110 && ang > -165) { dr = 'NORTH-WEST'; }
    if (ang < -165 || ang > 165) { dr = 'WEST'; }
    if (ang < 165 && ang > 110) { dr = 'SOUTH-WEST'; }
    if (ang < 110 && ang > 65) { dr = 'SOUTH'; }
    if (ang < 65 && ang > 15) { dr = 'SOUTH-EAST'; }

    if (ints < 1) { dr = 'NULO'; }

    badgeDirecc.innerHTML = `Origin: ${dr}  `;

    picker.style.transform = 'rotate(' + ang + 'deg)';
    flag.style.transform = 'rotateY(' + ang + 'deg)';

    return dr;
  }


}
