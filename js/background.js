/* !!
 * Background Communication
 * ======== ======== ========
 */

chrome.runtime.onInstalled.addListener(

	() => {

		chrome.runtime.onMessage.addListener(

			(request, sender, sendResponse) => {

				chrome.tabs.query(

					{
						active: true, currentWindow: true
					},

					(tabs) => chrome.tabs.sendMessage(

						tabs[0].id,

						request,

						(response) => console.log( response )

					)

				)

				return true

			}

		)

		chrome.declarativeContent.onPageChanged.removeRules(

			undefined,

			() => {

				chrome.declarativeContent.onPageChanged.addRules([

					{
						conditions: [

							new chrome.declarativeContent.PageStateMatcher({

								// pageUrl: {urlContains: 'baidu.com'}

							})
						],

						actions: [

							new chrome.declarativeContent.ShowPageAction()

						]
					}

				])

			}

		)

	}

)
