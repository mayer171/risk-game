$(() => {
	
	$('#vmap').vectorMap(
	{
		//Map Settings
		map: 'usa_en',
		backgroundColor: '#a5bfdd',
		borderColor: '#818181',
		borderOpacity: 0.25,
		borderWidth: 1,
		color: '#f4f3f0',
		enableZoom: true,
		hoverColor: '#c9dfaf',
		hoverOpacity: null,
		normalizeFunction: 'linear',
		scaleColors: ['#b6d6ff', '#005ace'],
		selectedColor: '#c9dfaf',
		selectedRegions: null,
		showTooltip: true,
		
		//state event listener conditional based on gamestatetracker
		onRegionClick: function(element, code, region)
		{	
			if (gameStateTracker === 'start'){	
				
			} else if (gameStateTracker === 'setup' && playerArr[1].units > 0){
				setUpBoard(event)
			} else {
				selectorToggle()	
			}
		}
	});
	//Globally needed variables 
	// game mode trackers
	let gameStateTracker = 'start';
	let mainGameTracker = 'select';
	//turn tracker
	let t = 0;
	//attack trackers
	let attackState = null;
	let targetStatesArr = [];
	let targetState = null;

	//function to toggle whose turn it is during gameplay 
	const toggleTurn = () =>{
		if (t === 0){
			t = 1;
			$(`#player1`).removeClass("active")
			$(`#player2`).addClass("active")
		} else {
			t = 0;
			$(`#player1`).addClass("active")
			$(`#player2`).removeClass("active")
		}		
	}
	//function to update player information when needed
	const updatePlayerInfo = () => {
		let index = 1;
		for (player of playerArr){
			$(`#p${index}u`).text(player.units);
			$(`#p${index}s`).text(player.occupiedStates.length);
			index ++
		}
	}
	//create Territory class
	class Territory {
		constructor(name,neighbors){
			this.name = name;
			this.occupier = null;
			this.units = null;
			this.neighbors = neighbors;
		}
	}
	const stateNeighbors = {
		ak: ['jqvmap1_wa'],
		al: ['jqvmap1_tn','jqvmap1_ms','jqvmap1_fl','jqvmap1_ga'],
		ar: ['jqvmap1_ok','jqvmap1_ms','jqvmap1_la','jqvmap1_tx','jqvmap1_mo','jqvmap1_tn'],
		az: ['jqvmap1_ut','jqvmap1_co','jqvmap1_nm','jqvmap1_ca','jqvmap1_nv'],
		ca: ['jqvmap1_or','jqvmap1_nv','jqvmap1_az','jqvmap1_hi'],
		co: ['jqvmap1_wy','jqvmap1_ne','jqvmap1_ks','jqvmap1_ok','jqvmap1_nm','jqvmap1_az','jqvmap1_ut'],
		ct: ['jqvmap1_ma','jqvmap1_ri','jqvmap1_ny'],
		de: ['jqvmap1_pa','jqvmap1_nj','jqvmap1_md'],
		fl: ['jqvmap1_ga','jqvmap1_al'],
		ga: ['jqvmap1_nc','jqvmap1_sc','jqvmap1_fl','jqvmap1_al','jqvmap1_tn'],
		ia: ['jqvmap1_mn','jqvmap1_wi','jqvmap1_il','jqvmap1_mo','jqvmap1_ne','jqvmap1_sd'],
		id: ['jqvmap1_mt','jqvmap1_wy','jqvmap1_ut','jqvmap1_nv','jqvmap1_or','jqvmap1_wa'],
		il: ['jqvmap1_wi','jqvmap1_in','jqvmap1_ky','jqvmap1_mo','jqvmap1_ia'],
		in: ['jqvmap1_mi','jqvmap1_oh','jqvmap1_ky','jqvmap1_il'],
		ks: ['jqvmap1_ne','jqvmap1_mo','jqvmap1_ok','jqvmap1_co'],
		ky: ['jqvmap1_oh','jqvmap1_wv','jqvmap1_va','jqvmap1_tn','jqvmap1_mo','jqvmap1_il','jqvmap1_in'],
		la: ['jqvmap1_ar','jqvmap1_ms','jqvmap1_tx'],
		ma: ['jqvmap1_nh','jqvmap1_ri','jqvmap1_ct','jqvmap1_ny','jqvmap1_vt'],
		md: ['jqvmap1_pa','jqvmap1_de','jqvmap1_dc','jqvmap1_va','jqvmap1_wv'],
		me: ['jqvmap1_nh'],
		mi: ['jqvmap1_oh','jqvmap1_in','jqvmap1_wi'],
		mn: ['jqvmap1_wi','jqvmap1_ia','jqvmap1_sd','jqvmap1_nd'],
		mo: ['jqvmap1_ia','jqvmap1_il','jqvmap1_ky','jqvmap1_tn','jqvmap1_ar','jqvmap1_ok','jqvmap1_ks','jqvmap1_ne'],
		ms: ['jqvmap1_tn','jqvmap1_al','jqvmap1_la','jqvmap1_ar'],
		mt: ['jqvmap1_nd','jqvmap1_sd','jqvmap1_wy','jqvmap1_id'],
		nc: ['jqvmap1_va','jqvmap1_sc','jqvmap1_ga','jqvmap1_tn'],
		nd: ['jqvmap1_mn','jqvmap1_sd','jqvmap1_mt'],
		ne: ['jqvmap1_sd','jqvmap1_ia','jqvmap1_mo','jqvmap1_ks','jqvmap1_co','jqvmap1_wy'],
		nh: ['jqvmap1_me','jqvmap1_ma','jqvmap1_vt'],
		nj: ['jqvmap1_ny','jqvmap1_de','jqvmap1_pa'],
		nm: ['jqvmap1_co','jqvmap1_ok','jqvmap1_tx','jqvmap1_az','jqvmap1_ut'],
		nv: ['jqvmap1_id','jqvmap1_ut','jqvmap1_az','jqvmap1_ca','jqvmap1_or'],
		ny: ['jqvmap1_vt','jqvmap1_ma','jqvmap1_ct','jqvmap1_nj','jqvmap1_pa'],
		oh: ['jqvmap1_pa','jqvmap1_wv','jqvmap1_ky','jqvmap1_in','jqvmap1_mi'],
		ok: ['jqvmap1_ks','jqvmap1_mo','jqvmap1_ar','jqvmap1_tx','jqvmap1_nm','jqvmap1_co'],
		or: ['jqvmap1_wa','jqvmap1_id','jqvmap1_nv','jqvmap1_ca'],
		pa: ['jqvmap1_ny','jqvmap1_nj','jqvmap1_de','jqvmap1_md','jqvmap1_wv','jqvmap1_oh'],
		ri: ['jqvmap1_ma','jqvmap1_ct'],
		sc: ['jqvmap1_nc','jqvmap1_ga'],
		sd: ['jqvmap1_nd','jqvmap1_mn','jqvmap1_ia','jqvmap1_ne','jqvmap1_wy','jqvmap1_mt'],
		tn: ['jqvmap1_ky','jqvmap1_va','jqvmap1_nc','jqvmap1_ga','jqvmap1_al','jqvmap1_ms','jqvmap1_ar','jqvmap1_mo'],
		tx: ['jqvmap1_ok','jqvmap1_ar','jqvmap1_la','jqvmap1_nm'],
		ut: ['jqvmap1_id','jqvmap1_wy','jqvmap1_co','jqvmap1_nm','jqvmap1_az','jqvmap1_nv'],
		va: ['jqvmap1_md','jqvmap1_dc','jqvmap1_nc','jqvmap1_tn','jqvmap1_ky','jqvmap1_wv'],
		vt: ['jqvmap1_nh','jqvmap1_ma','jqvmap1_ny'],
		wa: ['jqvmap1_ak','jqvmap1_id','jqvmap1_or'],
		wi: ['jqvmap1_mi','jqvmap1_il','jqvmap1_ia','jqvmap1_mn'],
		wv: ['jqvmap1_pa','jqvmap1_md','jqvmap1_va','jqvmap1_ky','jqvmap1_oh'],
		wy: ['jqvmap1_mt','jqvmap1_sd','jqvmap1_ne','jqvmap1_co','jqvmap1_ut','jqvmap1_id'],
	}
	//create player class
	class Player {
		constructor(name){
			this.name = name;
			this.units = 4;
			this.occupiedStates = [];
		}
	}
	
	//function makes players when they submitt thier names
	const playerArr = []
	playerArr.pop() //WHY!!!!!
	
	//get player names 
	let player1 = 'Michael' //window.prompt("Enter Player 1 Name","");
	let player2 = 'Colleen' //window.prompt("Enter Player 2 Name","");
	
	const makePlayer = (name) =>{
		let player = new Player(name)
		playerArr.push(player)
		if (playerArr.length === 2){
			gameStateTracker = 'setup';
			$('#console').text('Place your Units')
		}
		let index = playerArr.length
		$(`#player${index}box`).text(`${name}'s Army`)
		updatePlayerInfo()
		
	}
	makePlayer(player1)
	makePlayer(player2)

	//create object for each territory and assign neighbor states
	//Also creates an info div for each territory to display info to the player 
	let $territoryElements = $('.jqvmap-region')
	let territoryObjects = []

	$territoryElements.each(function(){
		let name = $(this).attr('id');
		let infoId = `${name}_info`
		let $infoDiv = $('<div>').attr('id', infoId)
		$infoDiv.addClass('state_info')
		$('#state-info-container').append($infoDiv)
		for (stateId in stateNeighbors){
			if(name.match(/[^_]*$/)[0] === stateId){
				neighbors = stateNeighbors[stateId]
				let territory = new Territory(name, neighbors)
				territoryObjects.push(territory)
			}
		}
	})

	//TODO - ALLOW USER TO PLACE ADDITIONAL UNITS ON STATES THEY OWN
	//function to control initial board set up
	const setUpBoard = (event) =>{
		
			let $clicked = ($(event.target)).attr('id');
			if (($(event.target).hasClass('player1')) || ($(event.target).hasClass('player2'))){
				return
			} else {
				for (territory of territoryObjects){
					if ($clicked === territory.name){
						territory.occupier = t;
						territory.units ++
						if (t === 0){
							($(event.target)).addClass('player1');
						} else if (t === 1) {
							($(event.target)).addClass('player2');
						}
					}
				}
				playerArr[t].occupiedStates.push($clicked)
				playerArr[t].units --
				if (playerArr[1].units === 0){
					gameStateTracker = 'main';
					$('#console').text('Select State to Attack From');
					toggleTurn();
					updatePlayerInfo();
					return
				}
			}	
		updatePlayerInfo()
		toggleTurn()
	}
	//Functions to select/deselect state to attack from 
	const selectorToggle = () => {
		if (attackState !== null){
			targetSelector(event)
		} else {
			if (($(event.target)).hasClass('selected')){
				deSelector(event)
			} 
			else if (mainGameTracker === 'select'){
				selector(event)
				updatePlayerInfo()
			}
		}
	}
	const selector = (event) => {
		let $clicked = ($(event.target)).attr('id');
		for (territory of territoryObjects){
			if ($clicked === territory.name){
				if (territory.occupier === t){
					let neighbors = territory.neighbors
					for (neighbor of neighbors){
						for (territory of territoryObjects){
							if (neighbor === territory.name && territory.occupier !== t && territory.occupier !== null ){
							$(`#${neighbor}`).toggleClass('toggle');
							($(event.target)).addClass('selected');
							targetStatesArr.push(neighbor)		
							}
						} 
					} 
					$('#console').text('Select State to Attack');
					attackState = $clicked;
					console.log(attackState);
					mainGameTracker = null;
				} 
			} 		
		}
		
	}
	const deSelector = (event) => {
		let $clicked = ($(event.target)).attr('id');
		for (territory of territoryObjects){
			if ($clicked === territory.name){
				if (territory.occupier === t){
					let neighbors = territory.neighbors
					for (neighbor of neighbors){
						for (territory of territoryObjects){
							if (neighbor === territory.name && territory.occupier !== t && territory.occupier !== null ){
							$(`#${neighbor}`).toggleClass('toggle');
							($(event.target)).removeClass('selected');
							}
						} 
					} 
				} 
			} 		
		}
		$('#console').text('Select State to Attack From');
		targetStatesArr = []
		attackState = null;
		mainGameTracker = 'select';	
	}
	
	const targetSelector = (event) => {
		let $clicked = ($(event.target)).attr('id');
		for (territory of targetStatesArr){
			if ($clicked === territory){
				console.log(territory);
				
				($(event.target)).addClass('selected-targ');
				targetState = $clicked;
			} else {
				$(`#${territory}`).toggleClass('toggle');
				console.log(`${territory} not clicked`)
				

			}
		}


	}
	//event listeners
	$('#player1submit').click(makePlayer)
	$('#player2submit').click(makePlayer)
});
