class Script
{
	constructor ( src )
	{
		this.script = document.querySelector('#modify')

		if ( this.script )
		{
			this.has = true
		}

		this.script = document.createElement('script')

		this.script.type = 'text/javascript'

		this.script.src = src

		this.script.id = 'modify'

		return this
	}

	inject ( mount )
	{
		this.script.setAttribute('mount', JSON.stringify( mount ))

		if ( !this.has )
		{
			document.querySelector('body').appendChild( this.script )
		}
	}

	destroy ()
	{
		this.script.parentNode.removeChild( this.script )
	}
}

document.addEventListener('DOMContentLoaded', () => {

	/* !!
	 * Maybe Another Site Need Inject Less.min
	 * ======== ======== ========
	 * const Less = new Script( chrome.extension.getURL('/js/less.min.js') )
	 * Less.inject()
	 * ======== ======== ========
	 */

	chrome.runtime.onMessage.addListener(

		(request, sender, sendResponse) => {

			// Not From Extension
			if ( sender.tab )
			{
				return false
			}

			// Is Injection
			if ( request.cmd === 'less' )
			{
				if ( !window.less )
				{
					return sendResponse('injection error')
				}

				const js = new Script( chrome.extension.getURL('/js/modify.js') )

				js.inject( request.data )

				// js.destroy()

				sendResponse('injection ok')
			}

		}

	)

})
