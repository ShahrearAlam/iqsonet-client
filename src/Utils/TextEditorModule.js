const textEditorColor = ['#001f3f', '#0074D9', '#7FDBFF', '#39CCCC', '#3D9970', '#2ECC40', '#01FF70', '#FFDC00', '#FF851B', '#FF4136', '#85144b', '#F012BE', '#B10DC9', '#111111', '#AAAAAA', '#DDDDDD', '#FFFFFF'];

const TextEditorModules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'link': 'true' }, 'image', { 'color': textEditorColor }, { 'background': textEditorColor }],
    ],
}

export default TextEditorModules;