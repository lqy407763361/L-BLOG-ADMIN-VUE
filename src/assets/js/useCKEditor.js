import {
      ClassicEditor,
      Autosave,
      Bold,
      Code,
      Essentials,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      Highlight,
      Italic,
      Paragraph,
      PlainTableOutput,
      RemoveFormat,
      Strikethrough,
      Subscript,
      Superscript,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableLayout,
      TableProperties,
      TableToolbar,
      Underline
} from 'ckeditor5'

const setConfig = () =>{
      return {
            toolbar: {
                  items: [
                        'undo',
                        'redo',
                        '|',
                        'fontSize',
                        'fontFamily',
                        'fontColor',
                        'fontBackgroundColor',
                        '|',
                        'bold',
                        'italic',
                        'underline',
                        'strikethrough',
                        'subscript',
                        'superscript',
                        'code',
                        'removeFormat',
                        '|',
                        'insertTable',
                        'insertTableLayout',
                        'highlight'
                  ],
                  shouldNotGroupWhenFull: false
            },
            plugins: [
                  Autosave,
                  Bold,
                  Code,
                  Essentials,
                  FontBackgroundColor,
                  FontColor,
                  FontFamily,
                  FontSize,
                  Highlight,
                  Italic,
                  Paragraph,
                  PlainTableOutput,
                  RemoveFormat,
                  Strikethrough,
                  Subscript,
                  Superscript,
                  Table,
                  TableCaption,
                  TableCellProperties,
                  TableColumnResize,
                  TableLayout,
                  TableProperties,
                  TableToolbar,
                  Underline
            ],
            fontFamily: {
                  supportAllValues: true
            },
            fontSize: {
                  options: [10, 12, 14, 'default', 18, 20, 22],
                  supportAllValues: true
            },
            licenseKey: 'GPL',
            table: {
                  contentToolbar: [
                        'tableColumn',
                        'tableRow', 
                        'mergeTableCells', 
                        'tableProperties', 
                        'tableCellProperties'
                  ]
            }
      };
}

// 导出编辑器实例和配置生成器
export default{
      editor: ClassicEditor,
      config: setConfig
}