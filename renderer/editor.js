let editor;

// Load Monaco Editor
require.config({ paths: { vs: './monaco-editor/min/vs' } });
require(['vs/editor/editor.main'], function () {
    editor = monaco.editor.create(document.getElementById('editor-container'), {
        value: `// Start coding...`,
        language: 'javascript',
        theme: 'vs-dark',
        automaticLayout: true,
    });
});

// Handle file open
window.fileApi.onFileOpened((content) => {
    editor.setValue(content);
});

// Handle save
window.fileApi.onSaveFile((filePath) => {
    const content = editor.getValue();
    window.fileApi.saveFileContent(content, filePath).then((savedPath) => {
        if (savedPath) alert(`File saved to ${savedPath}`);
    });
});

// Handle save as
window.fileApi.onSaveAsFile(() => {
    const content = editor.getValue();
    window.fileApi.saveAs(content).then((savedPath) => {
        if (savedPath) alert(`File saved to ${savedPath}`);
    });
});
