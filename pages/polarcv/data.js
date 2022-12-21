var title = 'Polar CV';

var description = 'This is a VCV Rack module that generates control voltages that correspond to a point traveling along various polar equations.';
description += '<br><br>The red dot indicates the current position, which travels along the equation lines.';
description += '<br><br>The left-most control knob corresponds to the speed at which the dot travels (the <b>ΔΘ</b>). That can be adjusted by rotating the knob, or be controlled directly from a control voltage using the input to its left. The <b>mult</b> button to the upper left of the speed dial modifies the speed by a fixed amount. This is either 0.5x, 1.0x, or 2.0x.';
description += '<br><br>The current equation (along with the speed multiplier) can be seen in the top bar. There are a total of four different equations, which can be switched using the → and ← buttons. The equations all have two constants, <b>A</b> and <b>B</b>, which can be changed via the <b>A</b> and <b>B</b> knobs. Changing these values can create very different results, so I would encourage exploring different combinations of equations and constants.';
description += '<br><br>There are three outputs:<li><b>r</b> is the radius of the current position (in polar coordinates)</li><li><b>x</b> is the horizontal component of the current position (in cartesian coordinates)</li><li><b>y</b> is the vertical component of the current position (in cartesian coordinates)</li>';
description += '<br><br>Below are some examples of different equations that can be created with this module.';


var specs = '';//'Form: Installation<br><br>Completed: 2020<br><br>Materials: Record Player, Uncut Vinyl, Brush, String<br><br>Installed: January, 2020, Kyoto University of Art and Design<br>Kyoto, Japan';
specs += 'Source code available on <a href="https://github.com/aaronkarp123/EarthTones" target="_blank">Github</a>.<br><br>Module available for download from the <a href="https://library.vcvrack.com/AaronKarp-EarthTones/PolarCV" target="_blank">VCV Rack Plugin Library</a>.';

var images = ['0.png', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png'];

var pdf = '';

var soundcloud_link = '';

var video = '';

