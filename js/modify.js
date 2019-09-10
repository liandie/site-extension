function modify ( selector )
{
	this.script = document.querySelector( selector )

	this.vars = JSON.parse( this.script.getAttribute('mount') )

	this.run = () => {

		window.less.modifyVars( this.vars )

		console.log( this.vars )

		this.script.parentNode.removeChild( this.script )

	}

	return this
}


modify('#modify').run()
