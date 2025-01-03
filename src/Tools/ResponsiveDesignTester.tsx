import { NotInterested, PhoneIphone, TabletMac, ZoomIn, ZoomOut } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logo, myLink } from '../Config/Config';

const phoneBreakpoints = [
     { name: 'iPhone 6/6S/7/8 Plus', width: 414, height: 736 },
     { name: 'iPhone 4/5/4S', width: 320, height: 480 },
     { name: 'iPhone 6/6S/7/8', width: 375, height: 667 },
     { name: 'iPhone XS Max', width: 414, height: 896 },
     { name: 'iPhone XR', width: 414, height: 896 },
     { name: 'iPhone 12 Mini', width: 360, height: 780 },
     { name: 'iPhone 12/13/12 Pro/Max', width: 390, height: 844 },
     { name: 'iPhone 12 Pro Max', width: 428, height: 926 },
     { name: 'iPhone 14 Pro', width: 393, height: 852 },
     { name: 'iPhone 14/15 Pro/Max', width: 430, height: 932 },
     { name: 'Google Pixel 7', width: 412, height: 915 },
     { name: 'MI 11', width: 392, height: 851 },
     { name: 'Motorola One Fusion+', width: 360, height: 780 },
     { name: 'Redmi Note 12', width: 393, height: 873 },

];

const tabletBreakpoints = [
     { name: 'iPad Mini', width: 768, height: 1024 },
     { name: 'iPad Pro', width: 1024, height: 1366 },
     // Add more tablets if needed
];

const ResponsiveDesignTester = () => {
     const [selectedDevice, setSelectedDevice] = useState(phoneBreakpoints[0]);
     const [url, setUrl] = useState('https://thedchere.github.io/tools/#svg-to-code');
     const [isMdScreen, setIsMdScreen] = useState(false);
     const [scale, setScale] = useState(0.8);

     useEffect(() => {
          const mediaQuery = window.matchMedia('(max-width: 768px)');

          const handleMediaChange = (e: MediaQueryListEvent) => {
               setIsMdScreen(e.matches);
          };

          setIsMdScreen(mediaQuery.matches);
          mediaQuery.addListener(handleMediaChange);

          return () => mediaQuery.removeListener(handleMediaChange);
     }, []);

     const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setUrl(event.target.value);
     };

     const handleZoomIn = () => {
          setScale((prevZoom) => Math.min(prevZoom + 0.1, 3));
     };

     const handleZoomOut = () => {
          setScale((prevZoom) => Math.max(prevZoom - 0.1, 0.5));
     };

     const handleResetZoom = () => {
          setScale(0.8)
     };

     const handleDeviceSelect = (device: { name: string; width: number; height: number }) => {
          setSelectedDevice(device);
     };

     // Render different content based on screen size
     if (isMdScreen) {
          return (
               <div className='not-woking'>
                    <img src={logo} alt='icon' height={60} />
                    <h1>Only for Web Screen</h1>
               </div>
          );
     }

     const handleWheel = (event: any) => {

          setScale((prevScale) => {
               const newScale = prevScale + event.deltaY * -0.01;
               return Math.min(Math.max(newScale, 0.5), 3);
          });
     };




     return (
          <div className='__outer-box' >

               <div className='__bz-right'>

                    <div className='__bz-header'>
                         <p>About me</p>
                    </div>

                    <div className='__bz-footer'>
                         <p>Check out my portfolio at <Link to="https://thedchere.github.io/-" target='_blank'> Thedc here</Link> to see my work!</p>
                         <p> ❤️ Made by <Link to={myLink} target='_blank'>@sunilsharma</Link></p>
                    </div>

                    <div className='__bz-header'>
                         <p>information management</p>
                    </div>

                    <div className='__bz-body'>
                         <h6 className='title-bz'>Website Url</h6>
                         <div className='site-url'>
                              <input placeholder="Enter site URL" value={url} onChange={handleUrlChange} />
                         </div>
                         <h6 className='title-bz'>Zoom In & Out</h6>
                         <div className='zoom-btns'>
                              <button type='button' className='btn' onClick={handleZoomIn}> <ZoomIn /> </button>
                              <button type='button' className='btn' onClick={handleZoomOut}> <ZoomOut /> </button>
                              <button type='button' className='btn' onClick={handleResetZoom}> <NotInterested /></button>
                         </div>
                         <h6 className='title-bz mt-3'>Breakpoints Screens</h6>
                         <Accordion>
                              <Accordion.Item eventKey="0">
                                   <Accordion.Header>
                                        <PhoneIphone /> Phone
                                   </Accordion.Header>
                                   <Accordion.Body>
                                        <ul className='list'>
                                             {phoneBreakpoints.map((device) => (
                                                  <li
                                                       className='list-li'
                                                       key={device.name}
                                                       onClick={() => handleDeviceSelect(device)}>
                                                       {device.name} ({device.width} x {device.height})
                                                  </li>
                                             ))}
                                        </ul>
                                   </Accordion.Body>
                              </Accordion.Item>
                              <Accordion.Item eventKey="1">
                                   <Accordion.Header>
                                        <TabletMac /> Tablet
                                   </Accordion.Header>
                                   <Accordion.Body>
                                        <ul className='list'>
                                             {tabletBreakpoints.map((device) => (
                                                  <li
                                                       className='list-li'
                                                       key={device.name}
                                                       onClick={() => handleDeviceSelect(device)}>
                                                       {device.name} ({device.width} x {device.height})
                                                  </li>
                                             ))}
                                        </ul>
                                   </Accordion.Body>
                              </Accordion.Item>
                         </Accordion>
                    </div>
               </div>


               <div className='__frame_outer' onWheel={handleWheel} >
                    <div className='iframe-container' style={{ transform: `scale(${scale})` }} >
                         <div className='__frame-in'>
                              <p> {selectedDevice.name}</p>
                              <p>width: {selectedDevice.width} / height:{selectedDevice.height}</p>
                              <p>Zoom: {(scale * 100).toFixed(0)}%</p>
                         </div>
                         <iframe title="Responsive Preview" width={selectedDevice.width} height={selectedDevice.height} src={url} />
                    </div>
               </div>
          </div>
     );
};

export default ResponsiveDesignTester;
