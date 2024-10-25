var g_BottomMenuButtons = [
	{
		"caption": translate("Report a Bug"),
		"tooltip": translate("Click to visit 0 A.D. Trac to report a bug, crash, or error."),
		"size": "0% 0% 12.5% 100%",
		"onPress": () => {
			openURL("https://trac.wildfiregames.com/wiki/ReportingErrors/");
		}
	},
	{
		"caption": translateWithContext("Frequently Asked Questions", "FAQ"),
		"tooltip": translate("Click to visit the Frequently Asked Questions page in your browser."),
		"size": "12.5% 0% 25% 100%",
		"onPress": () => {
			openURL("https://trac.wildfiregames.com/wiki/FAQ");
		}
	},
	{
		"caption": translate("Chat"),
		"tooltip": translate("Click to open the 0 A.D. IRC chat in your browser (#0ad on webchat.quakenet.org). It is run by volunteers who do all sorts of tasks, it may take a while to get your question answered. Alternatively, you can use the forum (see Website)."),
		"size": "25% 0% 37.5% 100%",
		"onPress": () => {
			openURL("https://webchat.quakenet.org/?channels=0ad");
		}
	},
	{
		"caption": translate("Translate the Game"),
		"tooltip": translate("Click to open the 0 A.D. translate page in your browser."),
		"size": "37.5% 0% 50% 100%",
		"onPress": () => {
			openURL("https://trac.wildfiregames.com/wiki/Localization");
		}
	},
	{
		"caption": translate("Donate"),
		"tooltip": translate("Help with the project expenses by donating."),
		"size": "50% 0% 62.5% 100%",
		"onPress": () => {
			openURL("https://play0ad.com/community/donate/");
		}
	},
	{
		"caption": translate("Credits"),
		"tooltip": translate("Show the 0 A.D. credits."),
		"size": "62.5% 0% 75% 100%",
		"onPress": () => {
			Engine.PushGuiPage("page_credits.xml");
		}
	},
	{
		"caption": translate("Welcome Screen"),
		"tooltip": translate("Show the Welcome Screen again. Useful if you hid it by mistake."),
		"size": "75% 0% 87.5% 100%",
		"onPress": () => {
			Engine.PushGuiPage("page_splashscreen.xml");
		}
	},
	{
		"caption": translate("Website"),
		"tooltip": translate("Click to open play0ad.com in your web browser."),
		"size": "87.5% 0% 100% 100%",
		"onPress": () => {
			openURL("https://play0ad.com/");
		}
	}
];
