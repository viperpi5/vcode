// Configure Monaco's base path
require.config({ paths: { vs: './monaco/min/vs' } });

// Load and initialize Monaco Editor
require(['vs/editor/editor.main'], function () {
    monaco.editor.create(document.getElementById('editor-container'), {
        value: `// Welcome to VCode!\nfunction hello() {\n    console.log("Hello, world!");\n}`,
        language: 'javascript',
        theme: 'vs-dark',
        automaticLayout: true
    });
});
