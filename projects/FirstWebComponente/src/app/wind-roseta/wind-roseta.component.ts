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
  windInterpretation: string;
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
      const angleNhipot = this.anguloVientoCalc(ev.pageX, ev.pageY);
      this.windAngle = angleNhipot.angle;
      this.windIntensity = this.intensidadViento(angleNhipot.hip);
      this.windInterpretation = this.direccionInterp(angleNhipot.angle, this.windIntensity);
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

  private intensidadViento(hIntensity) {

    const arrowWind = document.getElementById('windDir');
    const badgeIntens = document.getElementById('intensidad');
    let posEvent = 0;
    const factor = 6;
    const intsTranslation = hIntensity / factor;
    if (hIntensity <= 30) { posEvent = 0; }
    if (hIntensity > 30 && hIntensity <= 70) { posEvent = 1; }
    if (hIntensity > 70 && hIntensity <= 110) { posEvent = 2; }
    if (hIntensity > 110) { posEvent = 3; }

    const resultIntensity = Math.round(intsTranslation);
    badgeIntens.innerHTML = `${resultIntensity} km\/h`;
    badgeIntens.style.background = this.intensidadColor[posEvent];
    arrowWind.style.width = `${hIntensity}px`;
    return resultIntensity;
  }

  private inclinationCorr() {
    // correction of perspective y pixels
    const roseElement = document.getElementById('rosetaVientos');
    const hRose = roseElement.getBoundingClientRect().height;

    // teor cateto //   180° = A + B + C
    //                  180° = 90° + 65° + X°
    // radians       3.14159 = 1.5708 + 1.13446 + radiansSum

    const radiansSum = 0.436332;
    const trueDim = Math.sin(1.5708) * hRose / Math.sin(radiansSum);
    const factor = trueDim / hRose;

    // factor correction perspective
    return factor;
  }

  private direccionInterp(ang, ints) {

    let direction = 'contra';
    const badgeDirecc = document.getElementById('direccion');
    const picker = document.getElementById('picker');
    const flag = document.getElementById('wFlag');

    if (ang < 15 && ang >= -15) { direction = 'EAST'; }
    if (ang < -15 && ang >= -65) { direction = 'NORTH-EAST'; }
    if (ang < -55 && ang > -110) { direction = 'NORTH'; }
    if (ang < -110 && ang > -165) { direction = 'NORTH-WEST'; }
    if (ang < -165 || ang > 165) { direction = 'WEST'; }
    if (ang < 165 && ang > 110) { direction = 'SOUTH-WEST'; }
    if (ang < 110 && ang > 65) { direction = 'SOUTH'; }
    if (ang < 65 && ang > 15) { direction = 'SOUTH-EAST'; }
    if (ints < 1) { direction = 'NULO'; }

    badgeDirecc.innerHTML = `Origin: ${direction}  `;

    picker.style.transform = 'rotate(' + ang + 'deg)';
    flag.style.transform = 'rotateY(' + ang + 'deg)';

    return direction;
  }


}
