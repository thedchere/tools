import React, { useEffect, useState } from 'react';
// @ts-ignore
import chroma from 'chroma-js';
import { title } from '../Config/Config';

const GradientGenerate = (props: any) => {
    useEffect(() => {
        document.title = `${props.pageTitle} | ${title}`;
    }, [props.pageTitle]);

    const [orientation, setOrientation] = useState<string>('to top');
    const [color1Hex, setColor1Hex] = useState<string>('#ff0000');
    const [color2Hex, setColor2Hex] = useState<string>('#ffffff');
    const [gradient, setGradient] = useState<string>('');

    // Function to generate a more refined gradient using chroma.js's bezier curve
    const generateGradientColors = (colorA: string, colorB: string, steps: number) => {
        // Using bezier scale for a more natural curve
        const bezierScale = chroma.bezier([colorA, colorB]).scale().mode('lab');
        return bezierScale.colors(steps);
    };

    useEffect(() => {
        // Generate gradient with bezier method
        const steps = 5;  // You can adjust steps if needed
        const colors = generateGradientColors(color1Hex, color2Hex, steps);
        const gradientValue = `linear-gradient(${orientation}, ${colors.join(', ')})`;
        setGradient(gradientValue);
    }, [orientation, color1Hex, color2Hex]);

    const handleGenerate = () => {
        document.body.style.background = gradient;
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '400px', margin: 'auto', height: '100vh' }}>
            <h1 style={{ textAlign: 'center' }}>CSS Gradient Generator</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
                <div>
                    <label style={{ fontWeight: 'bold' }}>Choose Orientation:</label>
                    <select value={orientation} onChange={(e) => setOrientation(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
                        <option value="to left">Left</option>
                        <option value="to right">Right</option>
                        <option value="to top">Top</option>
                        <option value="to bottom">Bottom</option>
                        <option value="to top left">Top-Left</option>
                        <option value="to top right">Top-Right</option>
                        <option value="to bottom left">Bottom-Left</option>
                        <option value="to bottom right">Bottom-Right</option>
                    </select>
                </div>
                <div>
                    <label style={{ fontWeight: 'bold' }}>Color 1 (Hex):</label>
                    <input
                        type="color"
                        value={color1Hex}
                        onChange={(e) => setColor1Hex(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div>
                    <label style={{ fontWeight: 'bold' }}>Color 2 (Hex):</label>
                    <input
                        type="color"
                        value={color2Hex}
                        onChange={(e) => setColor2Hex(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
            </div>
            <button onClick={handleGenerate} style={{ width: '100%', padding: '10px', fontSize: '16px', cursor: 'pointer' }}>Apply Gradient</button>
            <div style={{ marginTop: '20px', padding: '20px', borderRadius: '8px', background: '#f0f0f0' }}>
                <h2>Preview:</h2>
                <div style={{ height: '150px', background: gradient, borderRadius: '8px' }}></div>
                <h3>Generated CSS Code:</h3>
                <code style={{ display: 'block', padding: '10px', background: '#e6e6e6', borderRadius: '4px', marginTop: '10px' }}>{`background: ${gradient};`}</code>
            </div>
        </div>
    );
};

export default GradientGenerate;
