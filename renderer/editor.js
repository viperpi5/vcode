const monaco = require('monaco-editor');

// Create Monaco Editor instance
monaco.editor.create(document.getElementById('editor-container'), {
    value: `// Welcome to Monaco Editor!\nconsole.log('Hello, world!');`,
    language: 'javascript',
    theme: 'vs-dark',
    automaticLayout: true,
});
