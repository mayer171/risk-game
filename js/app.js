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
			console.log(gameStateTracker)
			if (gameStateTracker === 'start'){	
				
			} else if (gameStateTracker === 'setup' && playerArr[t].units > 0){
				setUpBoard(event)
			} else if (gameStateTracker === 'place-units' && playerArr[t].units > 0){
				placeUnits(event)
			} else if (gameStateTracker === 'fortify'){
				fortifyUnits(event)
			} else {
				gameStateTracker = 'main'
				$('#end-turn').show()
				selectorToggle()	
			}
		}
	});
	//Global variables 
	// game mode trackers
	let gameStateTracker = 'start';
	let mainGameTracker = 'select';
	//turn tracker
	let t = 0;
	//attack trackers
	let attackState = null;
	let targetStatesArr = [];
	let targetState = null;
	//Array of territories 
	let territoryObjects = [];
	//get player names 
	let player1 = window.prompt("Enter Player 1 Name","");
	let player2 = window.prompt("Enter Player 2 Name","");

	//function makes players when they submitt thier names
	const playerArr = []
	playerArr.pop() //WHY!!!!!

	const stateNeighbors = {
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
	//TODO Fix more states 
	const stateTransforms = {	 
		ca: ['60', '265'],
		de: ['840', '250'],
		fl: ['760', '505'],
		id: ['200', '150'],
		la: ['550', '450'],
		mi: ['650', '170'],
		mn: ['505', '125'],
		nh: ['840', '126'],
		ri: ['878', '185'],
		vt: ['860', '129'],	
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
	//create player class
	class Player {
		constructor(name){
			this.name = name;
			this.units = 30;
			this.occupiedStates = [];
		}
	}
	//function to toggle whose turn it is during gameplay 
	const checkWinner = () => {
		console.log('checking')
		for (let i = 0; i < playerArr.length; i ++){
			if (playerArr[i].occupiedStates.length >= Math.floor(territoryObjects.length)/2){
				$('#gameplay').remove()
			}
		}
	}
	const clearSlections = () =>{
		for (territory of territoryObjects){
			$(`#${territory.name}`).removeClass('selected');
			$(`#${territory.name}`).removeClass('toggle');
			$(`#${territory.name}`).removeClass('selected-targ');	
		}
		mainGameTracker = 'select'
		attackState = null;
		targetState = null;	
		$('.dice').text('X')
		$('#clear-selections').hide()
		$('#attack-button').hide()
	}
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
		if (gameStateTracker === 'main' && playerArr[t].units > 0){
			$('#fortify-states').show()
		}

		clearSlections()
		checkWinner()
	}
	const updateBoard = () => {
		//Update Players Info
		let ind = 1;
		for (player of playerArr){
			$(`#p${ind}u`).text(player.units);
			$(`#p${ind}s`).text(player.occupiedStates.length);
			ind ++
		}
		//Update State Info 
		for (territory of territoryObjects){
			let name = territory.name;
			document.getElementById(`${name}_text`).textContent = (territory.units)
		}
	}
	const makePlayer = (name) =>{
		let player = new Player(name)
		playerArr.push(player)
		if (playerArr.length === 2){
			gameStateTracker = 'setup';
			$('#console').text('Place your Units')
		}
		let index = playerArr.length
		$(`#player${index}box`).text(`${name}'s Army`)
		updateBoard()
	}
	//function to control initial board set up
	const setUpBoard = (event) => {
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
				
				if (playerArr[1].units === 0 || playerArr[1].occupiedStates.length >= Math.floor(territoryObjects.length / 10)){
					gameStateTracker = 'place-units';
					$('#console').text('Place additional units');
					toggleTurn();
					updateBoard();
					return
				}
		}
		toggleTurn()
		updateBoard()
	}
	const placeUnits = (event) => {
		let $clicked = ($(event.target)).attr('id');
		for (territory of territoryObjects){
			if (territory.name === $clicked && territory.occupier === t){
				territory.units ++;
				playerArr[t].units --
				toggleTurn();
				updateBoard();	
			} 
		}
		if (playerArr[t].units === 0){
			toggleTurn()
		}
		if (playerArr[t].units === 0){
			$('#console').text('Select State to Attack From')
			return
		} 
	}
	const fortifyUnits = () => {
		let $clicked = ($(event.target)).attr('id');
		for (territory of territoryObjects){
			if (territory.name === $clicked && territory.occupier === t){
				territory.units ++;
				playerArr[t].units --
			}
		}
		if (playerArr[t].units === 0){
			gameStateTracker = 'main'
		}
		updateBoard()
	}		
	const diceRoll = (numDice) => {
		let diceArr = []
		for (let i = 0; i < numDice; i++){
			let roll = Math.floor((Math.random() * 6) + 1);
			diceArr.push(roll)
		}
		diceArr.sort();
		diceArr.reverse();
		return diceArr
	}
	//Functions to select/deselect state to attack from 
	const selectorToggle = () => {
		if (($(event.target)).hasClass('selected')){
			deSelector(event)
		} else if (attackState !== null && targetState === null){
			targetSelector(event)
		} else {
			if (attackState !== null && targetState !== null){
				targetDeSelector(event)
			} 
			else if (mainGameTracker === 'select'){
				selector(event)
				updateBoard()
			}
		}
	}
	const selector = (event) => {
		let $clicked = ($(event.target)).attr('id');
		for (territory of territoryObjects){
			if ($clicked === territory.name){
				if (territory.occupier === t && territory.units > 1){
					$('#clear-selections').show()
					let neighbors = territory.neighbors
					for (neighbor of neighbors){
						for (territory of territoryObjects){
							if (neighbor === territory.name && territory.occupier !== t && territory.occupier !== null ){
							$(`#${neighbor}`).addClass('toggle');
							($(event.target)).addClass('selected');
							targetStatesArr.push(neighbor)		
							}
						} 
					} 
					$('#console').text('Select State to Attack');
					attackState = $clicked;
					mainGameTracker = null;
				} 
			} 		
		}	
	}
	const deSelector = (event) => {
		let $clicked = ($(event.target)).attr('id');
		if ($clicked !== attackState || targetState !== null){
			return
		} else if($clicked === attackState){
			for (target of targetStatesArr){
				($(`#${target}`)).removeClass('toggle')
			}
			($(event.target)).removeClass('selected');
			$(`#${targetState}`).removeClass('selected-targ');
			targetStatesArr = []
			attackState = null;
			mainGameTracker = 'select';	
		}	
	}
	const targetSelector = (event) => {
		let $clicked = ($(event.target)).attr('id');
		if (targetStatesArr.includes($clicked) !== true){
			return 
		} else {
			for (territory of targetStatesArr){
				if ($clicked === territory){
					($(event.target)).addClass('selected-targ');
					targetState = $clicked;
					$('#attack-button').show()
				} else {
					$(`#${territory}`).removeClass('toggle');
				}	
			}
		}
	}
	const targetDeSelector = (event) => {
		let $clicked = ($(event.target)).attr('id');
		if ($clicked !== targetState){
			return
		} else {
		if ($clicked === targetState){
			($(event.target)).removeClass('selected-targ');
			for (territory of targetStatesArr){
				$(`#${territory}`).addClass('toggle');
			}		
		}	
		}targetState = null;
	}
	const fortify = () => {
		gameStateTracker = 'fortify'
		$('#fortify-states').hide()
		updateBoard()
	}
	const turnUnits = () => {
		let randomUnits = Math.floor((Math.random() * 3) + 1);
		playerArr[t].units += randomUnits;
		alert(`You have been awarded ${randomUnits} random unit(s)`)
		updateBoard()
	}
	const moveAfterAttack = () => {
		let attackerArr = territoryObjects.filter(territory => territory.name === attackState);
		let defenderArr = territoryObjects.filter(territory => territory.name === targetState);
		let attacker = attackerArr[0]
		let defender = defenderArr[0]
		if (attacker.units >= 2) {
			attacker.units --;
			defender.units ++;
			console.log(defender)
			console.log(attacker)
			if (attacker.units === 1){
				$('#move-units').hide()
				$('#console').text('Select State to Attack From')
				clearSlections()
			}
		}
		updateBoard()
	}
	const attack = () => {
		$('#fortify-states').hide()
		let attackerDice = null;
		let defenderDice = null;
		let attackerArr = territoryObjects.filter(territory => territory.name === attackState);
		let defenderArr = territoryObjects.filter(territory => territory.name === targetState);
		let attacker = attackerArr[0]
		let defender = defenderArr[0] 
		//logic to set dice count for each player 
			if (attackState === null || 
				targetState === null || 
				attacker.units < 1 ||
				defender.units < 1){
				return
			} else {
				if (attacker.units > 3){
					attackerDice = 3;
				} else if (attacker.units === 3){
					attackerDice = 2;
				} else {
					attackerDice = 1;
				}
				if (defender.units >= 2){
					defenderDice = 2;
				} else {
					defenderDice = 1;
				}		
			} 
			//Call random dice rolls and compare 
			let attackerRoll = diceRoll(attackerDice)
			let defenderRoll = diceRoll(defenderDice)
			if (defenderRoll.length > attackerRoll.lenght){
				attackerRoll.pop()
			} 
			$('.dice').text('X')
			for (let i = 1; i <= attackerRoll.length; i++){
				$(`#ad${i}`).text(attackerRoll[i-1])
			}
			for (let i = 1; i <= defenderRoll.length; i++){
				$(`#dd${i}`).text(defenderRoll[i-1])
			}
			for (let i = 0; i < defenderRoll.length; i++){
				if (attackerRoll[i] > defenderRoll[i]){
					defender.units --
				} else {
					attacker.units --
				}
			}
			if (attacker.units === 1){
				$('#attack-button').hide()

			}
			//Check for battle win 
			if (defender.units <= 0 && attacker.units > 1){
				$(`#${defender.name}`).removeClass(`player${defender.occupier + 1}`)
				$(`#${defender.name}`).addClass(`player${attacker.occupier + 1}`)
				playerArr[`${attacker.occupier}`].occupiedStates.push(defender.name)
				let index = playerArr[`${defender.occupier}`].occupiedStates.indexOf(defender)
				playerArr[`${defender.occupier}`].occupiedStates.splice(index, 1)
				defender.occupier = attacker.occupier;
				defender.units ++
				attacker.units --
				playerArr[t].units ++;
				$('#console').text('Move Units to Defeated State')
				$('#attack-button').hide()
				$('#move-units').show()
				updateBoard()
				alert(`Battle Won! You have been awarded 1 unit!`)
			}
			updateBoard()
	}
	//CREATES TERRITORY OBJECTS FOR GAME PLAY AND ADDS TEXT ELEMENTS TO THE MAP
	const addText = (path, name) => {
		let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
		let boarder = path.getBBox();
		let pathId = path.getAttribute('id')
		text.setAttribute("transform", "translate(" + (boarder.x + boarder.width/2) + " " + (boarder.y + boarder.height/2) + ")");
		for (state in stateTransforms){
			if (pathId.split('_')[1] === state){
				text.setAttribute("transform", "translate(" + stateTransforms[state][0] + " " + stateTransforms[state][1] + ")");
			} 
		}
		text.setAttribute('id', `${name}_text`);
		text.setAttribute('class', 'state-display');
		text.textContent = '';
		text.setAttribute('fill', 'black')
		text.style.fontSize = '20px'
		path.parentNode.insertBefore(text,path.nextSibling)
	}
	const createBoard = () =>{let $territoryElements = $('.jqvmap-region')
		for (territory of $territoryElements){
			let name = $(territory).attr('id');
			addText(territory, name)
		}

		$territoryElements.each(function(){
			let name = $(this).attr('id');
			for (stateId in stateNeighbors){
				if(name.split('_')[1] === stateId){
					neighbors = stateNeighbors[stateId]
					let territory = new Territory(name, neighbors)
					territoryObjects.push(territory)
				}
			}
		})
		$('#clear-selections').hide()
		$('#move-units').hide()
		$('#attack-button').hide()
		$('#fortify-states').hide()
		$('#end-turn').hide()
	}

	makePlayer(player1)
	makePlayer(player2)
	createBoard()

	//event listeners
	$('#clear-selections').click(clearSlections)
	$('#move-units').click(moveAfterAttack)
	$('#fortify-states').click(fortify)
	$('#end-turn').click(turnUnits)
	$('#end-turn').click(toggleTurn)
	$('#attack-button').click(attack)
	$('#player1submit').click(makePlayer)
	$('#player2submit').click(makePlayer)
});
