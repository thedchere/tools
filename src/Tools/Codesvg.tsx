import React, { useEffect, useState } from 'react';
import prettier from 'prettier/standalone';
import * as parserHtml from 'prettier/parser-html';
import { logo, myLink, title, Website } from '../Config/Config';
import toasted from '../Config/toast';
import { Place } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const Codesvg = (props: any) => {
    const location = useLocation();
    const path = "/svg-to-code";

    const [svgCode, setSvgCode] = useState<string>('');
    const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
    const [isDropAreaVisible, setIsDropAreaVisible] = useState<boolean>(false);

    useEffect(() => {
        document.title = `${props.pageTitle} | ${title}`;
        
        if (location.pathname === path) {
            document.body.classList.add('svg-to-code');
        } else {
            document.body.classList.remove('svg-to-code');
        }

        const handleDragOver = (event: DragEvent) => {
            event.preventDefault();
            setIsDropAreaVisible(true);
        };

        const handleDrop = (event: DragEvent) => {
            event.preventDefault();
            setIsDropAreaVisible(false);
            const file = event.dataTransfer?.files?.[0];
            if (file && file.type === 'image/svg+xml') {
                processFile(file);
            } else {
                toasted.error('Please drop a valid SVG file.');
            }
        };

        const handleDragLeave = () => {
            setIsDropAreaVisible(false);
        };

        document.addEventListener('dragover', handleDragOver);
        document.addEventListener('drop', handleDrop);
        document.addEventListener('dragleave', handleDragLeave);

        return () => {
            document.removeEventListener('dragover', handleDragOver);
            document.removeEventListener('drop', handleDrop);
            document.removeEventListener('dragleave', handleDragLeave);
        };
    }, [location.pathname, props.pageTitle]);

    const processFile = async (file: File) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            let result = e.target?.result as string;

            // Exclude the `xmlns:xlink` attribute if it exists
            result = result.replace(/xmlns:xlink="http:\/\/www\.w3\.org\/1999\/xlink"/g, '');

            try {
                // Format SVG using Prettier for VS Code-like display
                const formattedSvg = await prettier.format(result, {
                    parser: 'html',
                    plugins: [parserHtml as any],  // Use 'as any' to bypass type checking
                    printWidth: 80,
                });

                setSvgCode(formattedSvg);
                setIsFileUploaded(true); // Set flag to true to show code and copy button
            } catch (error) {
                toasted.error("Error formatting SVG.");
            }
        };
        reader.readAsText(file);
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type === 'image/svg+xml') {
            processFile(file);
        } else {
            toasted.error('Please select a valid SVG file.');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(svgCode).then(
            () => toasted.success('SVG code copied to clipboard!'),
            () => toasted.error('Failed to copy SVG code.')
        );
    };

    const handleRefresh = () => {
        setSvgCode('');
        setIsFileUploaded(false); // Reset the state to initial
        toasted.error('Page Refresh and your SVG Code Clear');
    }; 

    return (
        <section className='tool0001'>
            <div className='__container-23'>
                <div className='heading-code'>
                    <img src={logo} alt={title + '-logo'} />
                    <h3>🪄 Convert SVG image to code.</h3>
                    <p>To start, upload or drag drop an SVG image or paste SVG code below<br/> ❤️ Made by <Link to={myLink} target='_blank'>@tᖾᥱᑯᥴ_</Link></p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Drop area */}
                    {isDropAreaVisible && (
                        <div className='drop-area'>
                            <p>Drop image anywhere</p>
                        </div>
                    )}

                    {/* Input file section */}
                    {!isFileUploaded && (
                        <div className='_upload-sec'>
                            <label htmlFor='upload-file' className='btn'> Upload / Drop SVG </label>
                            <input className='d-none' type="file" accept=".svg" id='upload-file' onChange={handleFileChange} />
                        </div>
                    )}

                    {/* SVG code display section with line numbers */}
                    <div className='vs-code-editor'>
                        {isFileUploaded && (
                            <>
                                <div className='btn-sec'>
                                    <button onClick={handleRefresh} className='btn --refresh'> Refresh </button>
                                    <button onClick={handleCopy} className='btn --copy'> Copy SVG Code </button>
                                </div>
                                <div className='vs-area'>
                                    <div className='vs-line-number'>
                                        {svgCode.split('\n').map((_, index) => (
                                            <div key={index}>{index + 1}</div>
                                        ))}
                                    </div>
                                    {/* SVG code */}
                                    <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', flex: 1 }}>
                                        {svgCode || 'SVG code will be displayed here.'}
                                    </pre>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className='__code-about'>
                    <ul>
                        <li className='heading'><h3><Place /> About Convert SVG</h3></li>
                        <li>An online tool to convert SVG images to HTML code fast and easy.</li>
                        <li>Only Upload SVG image to instantly see the output HTML code. Or paste/edit the HTML code and see the actual image in the Preview button. Copy output code to Clipboard or download SVG image to your computer.</li>
                        <li className='heading'><h3><Place /> How to convert SVG image to code</h3></li>
                        <li>SVG image is in fact a code itself. You can easily convert code to images and vice versa simply by opening SVG images in any text editor. Or alternatively, you can paste SVG code to the text editor and save the file with the .svg extension.</li>
                        <li className='heading'><h3><Place /> About Me</h3></li>
                        <li>I'm a passionate website designer specializing in creating innovative and user-friendly web experiences. <br /> Check out my portfolio at <Link to={Website} target='_blank'> @tᖾᥱᑯᥴ_</Link> to see my work!</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default Codesvg;
