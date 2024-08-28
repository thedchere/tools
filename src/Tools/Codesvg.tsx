import React, { useState } from 'react';
import prettier from 'prettier/standalone';
import * as parserHtml from 'prettier/parser-html';

const Codesvg = () => {
    const [svgCode, setSvgCode] = useState<string>('');

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type === 'image/svg+xml') {
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
                } catch (error) {
                    console.error("Error formatting SVG:", error);
                }
            };
            reader.readAsText(file);
        } else {
            alert('Please select a valid SVG file.');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(svgCode).then(
            () => alert('SVG code copied to clipboard!'),
            () => alert('Failed to copy SVG code.')
        );
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Input file section */}
            <div style={{ padding: '10px' }}>
                <input
                    type="file"
                    accept=".svg"
                    onChange={handleFileChange}
                    style={{ width: '100%' }}
                />
            </div>

            {/* SVG code display section with line numbers */}
            <div
                style={{
                    display: 'flex',
                    border: '1px solid #ccc',
                    padding: '10px',
                    width: '50%',
                    maxHeight: '400px',
                    overflowY: 'auto',
                }}
            >
                {/* Line numbers */}
                <div style={{ marginRight: '10px', textAlign: 'right', userSelect: 'none', color: '#999' }}>
                    {svgCode.split('\n').map((_, index) => (
                        <div key={index}>{index + 1}</div>
                    ))}
                </div>

                {/* SVG code */}
                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', flex: 1 }}>
                    {svgCode || 'SVG code will be displayed here.'}
                </pre>
            </div>

            {/* Copy button */}
            <button onClick={handleCopy} style={{ marginTop: '10px', padding: '5px 10px' }}>
                Copy SVG Code
            </button>
        </div>
    );
}

export default Codesvg;
