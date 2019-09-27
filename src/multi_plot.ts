/**
 * Author Danial Chitnis 2019
 */

import ndarray = require("ndarray");
import { webGLplot} from "./webGLplot"
import { color_rgba} from "./webGLplot"
import * as noUiSlider from 'nouislider';


let canv = <HTMLCanvasElement>document.getElementById("my_canvas");

//let num = 1000;
let devicePixelRatio = window.devicePixelRatio || 1;
let num = Math.round(canv.clientWidth * devicePixelRatio);

let vert = ndarray(new Float32Array(num*2), [num, 2]);



let line_color = new color_rgba(1,1,0,1);

let wglp = new webGLplot(canv, vert, line_color);



console.log(num);

//amplitude
let Samp = 1; 
let Namp = 1;
let freq = 1;
let phi_delta=1;

for (let i=0; i<num; i++) {
   //set x to -num/2:1:+num/2
   vert.set(i, 0, 2*i/num-1);
}

let phi = 0;




//sliders
let slider_Samp = document.getElementById('slider_Samp') as noUiSlider.Instance;

noUiSlider.create(slider_Samp, {
   start: [0.5],
   connect: [true, false],
   //tooltips: [false, wNumb({decimals: 1}), true],
   range: {
     min: 0.0,
     max: 1
   }
});



slider_Samp.noUiSlider.on("update", function(values, handle) {
   Samp = parseFloat(values[handle]);
   (<HTMLParagraphElement>document.getElementById("display_Samp")).innerHTML = Samp.toString();
 });

 



setInterval(function () {
   for (let i=0; i<num; i++) {
      let y = Math.sin(i*freq*Math.PI/100 + phi) + Math.random()*Namp/1;
      vert.set(i,1, 0.9*Samp*y);
   }
   phi = phi + phi_delta*0.1;
   
   wglp.update();
   
}, 16.67*3);