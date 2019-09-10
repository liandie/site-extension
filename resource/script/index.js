class Editor
{
	constructor ( selector, option )
	{
		this.selector = selector

		this.editor = this.init( document.querySelector( selector ), option )

		this.skin = $('[regular-editor-theme]')

		this.submit = document.querySelector('#publish')

		this.read()

		this.theme()

		this.publish()

		this.editor
	}

	init ( dom, option )
	{
		return CodeMirror.fromTextArea( dom, option )
	}

	theme ( selector = 'li', active = 'span', classname = 'uk-active' )
	{
		this.skin.on('click', selector, (e) => {

			return (

				( dom, theme = dom.text() ) => {

					this.skin.find( selector ).removeClass( classname ), dom.addClass( classname ),
					this.skin.find( active ).text( theme ),
					this.editor.setOption('theme', theme)

				}

			)

			( $(e.target).closest( selector ) )

		})
	}

	read ( space )
	{
		$.get(`./node_modules/@baozun/ui-standard/src/ant/regular.less`, (data) => {

			this.editor.getDoc().setValue(data)

			this.editor.refresh()

		})
	}

	publish ()
	{
		this.submit.addEventListener('click', () => {

			chrome.runtime.sendMessage(

				{
					cmd: 'less',
					data: this.format()
				},

				(response) => console.log( response )

			)

		})
	}

	trim ( str )
	{
		return str.replace(/\s/g, '')
	}

	empty ( obj )
	{
		return !Object.keys( obj ).length
	}

	format ( data = this.editor.getValue() )
	{
		const trim = data.split(/[\r\n]/g)

		const filt = trim.filter( code => code.length && !code.indexOf('@') )

		const vars = {}

		filt.map( one => {

			const match = one.split(':')

			vars[ this.trim( match[0] ) ] = this.trim( match[1].replace(/(\;$)|(\/\/.*)/, '') )

		})

		return this.empty( vars ) ? {} : vars
	}
}


// Classic Run
new Editor(

	'#code-regular',

	{
		value: 'Regular Editor',
		lineNumbers: true,
		mode: 'css',
		gutters: ['CodeMirror-lint-markers'],
		lint: true,
		keyMap: 'sublime',
		autoCloseBrackets: true,
		matchBrackets: true,
		showCursorWhenSelecting: true,
		theme: 'monokai',
		tabSize: 2
	}

)
