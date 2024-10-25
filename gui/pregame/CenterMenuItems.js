var g_CenterMenuItems = [
	{
		"caption": translate("Learn to Play"),
		"tooltip": translate("Learn how to play, start the tutorial, discover the technology trees, and the history behind the civilizations."),
		"size": "0%+5 0%+5 33.3%-3 0%+75",
		"submenuSize": "0% 0% 33.3% 100%",
		"submenu": [
			{
				"caption": translate("Manual"),
				"tooltip": translate("Open the 0 A.D. Game Manual."),
				"size": "0% 0% 100% 0%+45",
				"onPress": () => {
					Engine.PushGuiPage("page_manual.xml");
				}
			},
			{
				"caption": translate("Tutorial"),
				"tooltip": translate("Start the economic tutorial."),
				"size": "0% 0%+45 100% 0%+90",
				"onPress": () => {
					Engine.SwitchGuiPage("page_autostart.xml", {
						"attribs": {
							"mapType": "scenario",
							"map": "maps/tutorials/starting_economy_walkthrough",
							"settings": {
								"CheatsEnabled": true
							},
						},
						"playerAssignments": {
							"local": {
								"player": 1,
								"name": Engine.ConfigDB_GetValue("user", "playername.singleplayer") || Engine.GetSystemUsername()
							}
						},
						"storeReplay": true
					});
				}
			},
			{
				"caption": translate("Structure Tree"),
				"tooltip": colorizeHotkey(translate("%(hotkey)s: View the structure tree of civilizations featured in 0 A.D."), "structree"),
				"size": "0% 0%+90 100% 0%+135",
				"hotkey": "structree",
				"onPress": () => {
					let callback = data => {
						if (data.nextPage)
							Engine.PushGuiPage(data.nextPage, { "civ": data.civ }, callback);
					};
					Engine.PushGuiPage("page_structree.xml", {}, callback);
				},
			},
			{
				"caption": translate("Civilization Overview"),
				"tooltip": colorizeHotkey(translate("%(hotkey)s: Learn about the civilizations featured in 0 A.D."), "civinfo"),
				"size": "0% 0%+135 100% 0%+180",
				"hotkey": "civinfo",
				"onPress": () => {
					let callback = data => {
						if (data.nextPage)
							Engine.PushGuiPage(data.nextPage, { "civ": data.civ }, callback);
					};
					Engine.PushGuiPage("page_civinfo.xml", {}, callback);
				}
			},
			{
				"caption": translate("Catafalque Overview"),
				"tooltip": translate("Compare the bonuses of catafalques featured in 0 A.D."),
				"size": "0% 0%+180 100% 0%+225",
				"onPress": () => {
					Engine.PushGuiPage("page_catafalque.xml");
				}
			},
			{
				"caption": translate("Map Overview"),
				"tooltip": translate("View the different maps featured in 0 A.D."),
				"size": "0% 0%+225 100% 0%+270",
				"onPress": () => {
					Engine.PushGuiPage("page_mapbrowser.xml");
				},
			}
		]
	},
	{
		"caption": translate("AI and LAN"),
		"tooltip": translate("Start, load, or replay a single-player game."),
		"size": "33.3%+3 0%+5 66.6%-3 0%+75",
		"submenuSize": "33.3% 0% 66.6% 100%",
		"submenu": [
			{
				"caption": translate("Matches"),
				"tooltip": translate("Start a new single-player game."),
				"size": "0% 0% 100% 0%+45",
				"onPress": () => {
					Engine.SwitchGuiPage("page_gamesetup.xml");
				}
			},
			{
				"caption": translate("Load Game"),
				"tooltip": translate("Load a saved game."),
				"size": "0% 0%+45 100% 0%+90",
				"onPress": () => {
					Engine.PushGuiPage("page_loadgame.xml");
				}
			},
			{
				"caption": translate("Continue Campaign"),
				"tooltip": translate("Relive history through historical military campaigns."),
				"size": "0% 0%+90 100% 0%+135",
				"onPress": () => {
					try
					{
						Engine.SwitchGuiPage(CampaignRun.getCurrentRun().getMenuPath());
					}
					catch(err)
					{
						error(translate("Error opening campaign run:"));
						error(err.toString());
					}
				},
				"enabled": () => CampaignRun.hasCurrentRun()
			},
			{
				"caption": translate("New Campaign"),
				"tooltip": translate("Relive history through historical military campaigns."),
				"size": "0% 0%+135 100% 0%+180",
				"onPress": () => {
					Engine.SwitchGuiPage("campaigns/setup/page.xml");
				}
			},
			{
				"caption": translate("Load Campaign"),
				"tooltip": translate("Relive history through historical military campaigns."),
				"size": "0% 0%+180 100% 0%+225",
				"onPress": () => {
					// Switch instead of push, otherwise the 'continue'
					// button might remain enabled.
					// TODO: find a better solution.
					Engine.SwitchGuiPage("campaigns/load_modal/page.xml");
				}
			},
			{
				"caption": translate("Replays"),
				"tooltip": translate("Playback previous games."),
				"size": "0% 0%+225 100% 0%+270",
				"onPress": () => {
					Engine.SwitchGuiPage("page_replaymenu.xml", {
						"replaySelectionData": {
							"filters": {
								"singleplayer": "Single-player"
							}
						}
					});
				}
			},
			
			{
				"caption": translate("Replays"),
				"tooltip": translate("Playback previous games."),
				"size": "0% 0%+135 100% 0%+180",
				"onPress": () => {
					Engine.SwitchGuiPage("page_replaymenu.xml", {
						"replaySelectionData": {
							"filters": {
								"singleplayer": "Multiplayer"
							}
						}
					});
				}
			},
			{
				// Translation: Join a game by specifying the host's IP address.
				"caption": translate("Join Game"),
				"tooltip": translate("Joining an existing multiplayer game."),
				"size": "0% 0%+45 100% 0%+90",
				"onPress": () => {
					Engine.PushGuiPage("page_gamesetup_mp.xml", {
						"multiplayerGameType": "join"
					});
				}
			},
			{
				"caption": translate("Host Game"),
				"tooltip": translate("Host a multiplayer game."),
				"size": "0% 0%+90 100% 0%+135",
				"onPress": () => {
					Engine.PushGuiPage("page_gamesetup_mp.xml", {
						"multiplayerGameType": "host"
					});
				}
			}
		]
	},
	{
		"caption": translate("Multiplayer Lobby"),
		"tooltip": translate("Fight against one or more human players in a multiplayer game."),
		"size": "66.6%+3 0%+5 100%-5 0%+75",
		"enabled": () => !!Engine.StartXmppClient,
				"hotkey": "lobby",
				"onPress": () => {
					 if (Engine.StartXmppClient)
						 Engine.PushGuiPage("page_prelobby_entrance.xml");
					 }
						 
		
	}
];
