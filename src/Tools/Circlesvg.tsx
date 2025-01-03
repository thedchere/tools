import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { logo, myLink, title, Website } from '../Config/Config';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import toasted from '../Config/toast';
import { Place } from '@mui/icons-material';

const Circlesvg = (props: any) => {
     const location = useLocation();
     const path = "/svg-circle-progress";

     useEffect(() => {
          document.title = `${props.pageTitle} | ${title}`;

          if (location.pathname === path) {
               document.body.classList.add('svg-to-code');
          } else {
               document.body.classList.remove('svg-to-code');
          }
     }, [location.pathname, props.pageTitle]);

     // State setup for all customizable properties
     const [percentage, setPercentage] = useState<string>('50');
     const [svgSize, setSvgSize] = useState<string>('150');
     const [circleWidth, setCircleWidth] = useState<string>('15');
     const [progressWidth, setProgressWidth] = useState<string>('15');
     const [circleColor, setCircleColor] = useState<string>('#2a2727');
     const [progressColor, setProgressColor] = useState<string>('#30e87a');
     const [textColor, setTextColor] = useState<string>('#30e87a');
     const [textSize, setTextSize] = useState<string>('20');
     const [showPercentage, setShowPercentage] = useState<boolean>(true);
     const [showValue, setShowValue] = useState<boolean>(true);
     const [codeFormat, setCodeFormat] = useState<string>('html');

     // Calculations for Circle Progress
     const radius = (parseInt(svgSize) - Math.max(parseInt(circleWidth), parseInt(progressWidth))) / 2;
     const circumference = 2 * Math.PI * radius;
     const offset = circumference - (parseInt(percentage) / 100) * circumference;

     const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string, max: number) => {
          if (value === '') {
               setter('');
               return;
          }

          let formattedValue = value.replace(/^0+(?=\d)/, '');

          if (parseInt(formattedValue) > max) {
               formattedValue = max.toString();
          }

          setter(formattedValue);
     };

     const copyToClipboard = () => {
          const svgCode = document.getElementById('svg-code')?.textContent || '';
          navigator.clipboard.writeText(svgCode).then(
               () => toasted.success('SVG code copied to clipboard!'),
               (err) => toasted.error('Failed to copy SVG code. Please try again.')
          );
     };

     // SVG code generation
     const generateSvgCode = () => {
          return `
<svg width="${svgSize}" height="${svgSize}">
     <circle cx="${parseInt(svgSize) / 2}" cy="${parseInt(svgSize) / 2}" r="${radius}" stroke="${circleColor}" stroke-width="${circleWidth}" fill="transparent" />
     <circle cx="${parseInt(svgSize) / 2}" cy="${parseInt(svgSize) / 2}" r="${radius}" stroke="${progressColor}" stroke-width="${progressWidth}" fill="transparent" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" stroke-linecap="round"
          ${codeFormat === 'react' ? "style={{ transition: 'stroke-dashoffset 0.35s' }}" : 'style="transition: stroke-dashoffset 0.35s;"'} />
     ${showValue ? `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="${textSize}" fill="${textColor}"> ${percentage}${showPercentage ? '%' : ''} </text>` : ''}
</svg>
     `;
     };

     return (
          <>
               <section className='tool0001'>
                    <div className='__container-23'>
                         <div className='heading-code'>
                              <img src={logo} alt={title + '-logo'} />
                              <h3>SVG circle progress generator.</h3>
                              <p>Explore different styles and options for personalizing your SVG progress circle<br /> ❤️ Made by <Link to={myLink} target='_blank'>@tᖾᥱᑯᥴ_</Link></p>
                         </div>

                         <div className='__circle-progress'>
                              <div className='row'>
                                   <div className='col-lg-6 '>
                                        <div className='__circle-tool'>
                                             <ul>
                                                  <li>
                                                       <p>Code Format</p>
                                                       <div className='__inputs'>
                                                            <label>
                                                                 <input type="radio" name="codeFormat" value="html" checked={codeFormat === 'html'} onChange={() => setCodeFormat('html')} /> HTML
                                                            </label>
                                                            <label>
                                                                 <input type="radio" name="codeFormat" value="react" checked={codeFormat === 'react'} onChange={() => setCodeFormat('react')} /> React
                                                            </label>

                                                            <label>
                                                                 <input className='check-add' type="checkbox" checked={showPercentage} onChange={(e) => setShowPercentage(e.target.checked)} /> Show Percentage
                                                            </label>

                                                       </div>
                                                  </li>

                                                  <li>
                                                       <p>Progress Bar</p>
                                                       <div className='__inputs'>
                                                            <OverlayTrigger
                                                                 key="top"
                                                                 placement="top"
                                                                 overlay={
                                                                      <Tooltip id="tooltip-top" className='custom-tooltip'>
                                                                           Progress Bar Width
                                                                      </Tooltip>
                                                                 }>
                                                                 <input type="number" min="1" value={progressWidth} onChange={(e) => handleInputChange(setProgressWidth, e.target.value, 100)} onFocus={(e) => e.target.select()} />
                                                            </OverlayTrigger>

                                                            <OverlayTrigger
                                                                 key="top"
                                                                 placement="top"
                                                                 overlay={
                                                                      <Tooltip id="tooltip-top" className='custom-tooltip'>
                                                                           Progress Value
                                                                      </Tooltip>
                                                                 }>
                                                                 <input type="number" min="0" max="100" value={percentage} onChange={(e) => handleInputChange(setPercentage, e.target.value, 100)} onFocus={(e) => e.target.select()} />
                                                            </OverlayTrigger>

                                                            <OverlayTrigger
                                                                 key="top"
                                                                 placement="top"
                                                                 overlay={
                                                                      <Tooltip id="tooltip-top" className='custom-tooltip'>
                                                                           Progress Color
                                                                      </Tooltip>
                                                                 }>
                                                                 <input type="color" value={progressColor} onChange={(e) => setProgressColor(e.target.value)} />
                                                            </OverlayTrigger>
                                                       </div>
                                                  </li>
                                                  <li>
                                                       <p>Outer Circle</p>
                                                       <div className='__inputs'>
                                                            <OverlayTrigger
                                                                 key="top"
                                                                 placement="top"
                                                                 overlay={
                                                                      <Tooltip id="tooltip-top" className='custom-tooltip'>
                                                                           Outer Circle Width
                                                                      </Tooltip>
                                                                 }>
                                                                 <input type="number" min="1" value={circleWidth} onChange={(e) => handleInputChange(setCircleWidth, e.target.value, 100)} onFocus={(e) => e.target.select()} />
                                                            </OverlayTrigger>

                                                            <OverlayTrigger
                                                                 key="top"
                                                                 placement="top"
                                                                 overlay={
                                                                      <Tooltip id="tooltip-top" className='custom-tooltip'>
                                                                           Outer Circle Color
                                                                      </Tooltip>
                                                                 }>
                                                                 <input type="color" value={circleColor} onChange={(e) => setCircleColor(e.target.value)} />
                                                            </OverlayTrigger>
                                                       </div>
                                                  </li>

                                                  <li>
                                                       <p>SVG Size</p>
                                                       <div className='__inputs'>
                                                            <OverlayTrigger
                                                                 key="top"
                                                                 placement="top"
                                                                 overlay={
                                                                      <Tooltip id="tooltip-top" className='custom-tooltip'>
                                                                           SVG Size in px
                                                                      </Tooltip>
                                                                 }>
                                                                 <input type="number" min="50" max="200" value={svgSize} onChange={(e) => handleInputChange(setSvgSize, e.target.value, 200)} onFocus={(e) => e.target.select()} />
                                                            </OverlayTrigger>
                                                       </div>
                                                  </li>

                                                  <li>
                                                       <p>Progress Text </p>
                                                       <div className='__inputs'>
                                                            <OverlayTrigger
                                                                 key="top"
                                                                 placement="top"
                                                                 overlay={
                                                                      <Tooltip id="tooltip-top" className='custom-tooltip'>
                                                                           Progress Text
                                                                      </Tooltip>
                                                                 }>
                                                                 <input type="number" min="10" value={textSize} onChange={(e) => handleInputChange(setTextSize, e.target.value, 100)} onFocus={(e) => e.target.select()} />
                                                            </OverlayTrigger>

                                                            <OverlayTrigger
                                                                 key="top"
                                                                 placement="top"
                                                                 overlay={
                                                                      <Tooltip id="tooltip-top" className='custom-tooltip'>
                                                                           Progress Text Color
                                                                      </Tooltip>
                                                                 }>
                                                                 <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
                                                            </OverlayTrigger>

                                                            <OverlayTrigger
                                                                 key="top"
                                                                 placement="top"
                                                                 overlay={
                                                                      <Tooltip id="tooltip-top" className='custom-tooltip'>
                                                                           Text Hide
                                                                      </Tooltip>
                                                                 }>
                                                                 <input type="checkbox" checked={showValue} onChange={(e) => setShowValue(e.target.checked)} />
                                                            </OverlayTrigger>
                                                       </div>
                                                  </li>
                                             </ul>
                                        </div>
                                   </div>

                                   <div className='col-lg-5 offset-lg-1'>
                                        <div className='__circle-svg'>
                                             <div className='live-staus'>
                                                  <svg width={parseInt(svgSize)} height={parseInt(svgSize)}>
                                                       <circle cx={parseInt(svgSize) / 2} cy={parseInt(svgSize) / 2} r={radius} stroke={circleColor} strokeWidth={parseInt(circleWidth)} fill="transparent" />
                                                       <circle cx={parseInt(svgSize) / 2} cy={parseInt(svgSize) / 2} r={radius} stroke={progressColor} strokeWidth={parseInt(progressWidth)} fill="transparent" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.35s' }} />
                                                       {showValue && (
                                                            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize={parseInt(textSize)} fill={textColor}>
                                                                 {percentage}{showPercentage ? '%' : ''}
                                                            </text>
                                                       )}
                                                  </svg>
                                             </div>

                                             <div className='vs-code'>
                                                  {/* <h3>Generated SVG Code:</h3> */}
                                                  <pre id="svg-code">{generateSvgCode()}</pre>
                                                  <button className='btn' type='button' onClick={copyToClipboard}>Copy SVG Code</button>
                                             </div>
                                        </div>
                                   </div>
                              </div>


                              {/* SVG Preview */}

                         </div>

                         <div className='__code-about'>
                    <ul>
                        <li className='heading'><h3><Place /> About SVG circle progress</h3></li>
                        <li>- Use the sliders and inputs to set the progress percentage, adjust the progress bar width, and choose your desired colors for the progress and outer circle.</li>
                        <li>- Customize the size of the SVG, choose whether to display the percentage, and set the text size and color for the progress text.</li>
                        <li className='heading'><h3><Place /> How to Generate and Copy the SVG Code</h3></li>
                        <li>- View your customized circle progress in the live preview area to see how it looks.</li>
                        <li>- Once satisfied with the design, click the "Copy SVG Code" button to copy the generated SVG code to your clipboard, ready to use in your projects.</li>
                        <li className='heading'><h3><Place /> About Me</h3></li>
                        <li>I'm a passionate website designer specializing in creating innovative and user-friendly web experiences. <br /> Check out my portfolio at <Link to={Website} target='_blank'> @tᖾᥱᑯᥴ_</Link>  to see my work!</li>
                    </ul>
                </div>
                    </div>
               </section>
          </>
     );
};

export default Circlesvg;
