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
				$('#console').text('Enter Usernames to Begin Game')
			} else if (gameStateTracker === 'setup' && playerArr[1].initialUnits > 0){
				setUpBoard(event)
			} else {
				attackSelector(event)	
			}
		}
	});
	// game mode tracker
	let gameStateTracker = 'start'
	//turn tracker
	let t = 0
	
	//create Territory class
	class Territory {
		constructor(name,neighbors){
			this.name = name;
			this.occupier = null;
			this.units = null;
			this.neigbors = neighbors;
		}
	}
	const stateNeighbors = {
		ak: ['wa'],
		al: ['mo','tn','ms','la','tx','ok'],
		az: ['ut','co','nm','ca','nv'],
		ca: ['or','nv','az','hi'],
		co: ['wy','ne','ks','ok','nm','az','ut'],
		ct: ['ma','ri','ny'],
		de: ['pa','nj','md'],
		fl: ['ga','al'],
		ga: ['nc','sc','fl','al','tn'],
		ia: ['mn','wi','il','mo','ne','sd'],
		id: ['mt','wy','ut','nv','or','wa'],
		il: ['wi','in','ky','mo','ia'],
		in: ['mi','oh','ky','il'],
		ks: ['ne','mo','ok','co'],
		ky: ['oh','wv','va','tn','mo','il','in'],
		la: ['ar','ms','tx'],
		ma: ['nh','ri','ct','ny','vt'],
		md: ['pa','de','dc','va','wv'],
		me: ['nh'],
		mi: ['oh','in','wi'],
		mn: ['wi','ia','sd','nd'],
		mo: ['ia','il','ky','tn','ar','ok','ks','ne'],
		ms: ['tn','al','la','ar'],
		mt: ['nd','sd','wy','id'],
		nc: ['va','sc','ga','tn'],
		nd: ['mn','sd','mt'],
		ne: ['sd','ia','mo','ks','co”,”wy'],
		nh: ['me','ma','vt'],
		nj: ['ny','de','pa'],
		nm: ['co','ok','tx','az','ut'],
		nv: ['id','ut','az','ca','or'],
		ny: ['vt','ma','ct','nj','pa'],
		oh: ['pa','wv','ky','in','mi'],
		ok: ['ks','mo','ar','tx','nm','co'],
		or: ['wa','id','nv','ca'],
		pa: ['ny','nj','de','md','wv','oh'],
		ri: ['ma','ct'],
		sc: ['nc','ga'],
		sd: ['nd','mn','ia','ne','wy','mt'],
		tn: ['ky','va','nc','ga','al','ms','ar','mo'],
		tx: ['ok','ar','la','nm'],
		ut: ['id','wy','co','nm','az','nv'],
		va: ['md','dc','nc','tn','ky','wv'],
		vt: ['nh','ma','ny'],
		wa: ['ak','id','or'],
		wi: ['mi','il','ia','mn'],
		wv: ['pa','md','va','ky','oh'],
		wy: ['mt','sd','ne','co','ut','id'],
	}

	//create player class
	class Player {
		constructor(name){
			this.name = name;
			this.initialUnits = 2;
			this.occupiedStates = null;
		}
	}


	//function makes players when they submitt thier names
	const playerArr = []
	playerArr.pop() //WHY!!!!!

	const makePlayer = (event) =>{
		let name = ($(event.target)).siblings().val();
		($(event.target)).parents(':eq(1)').text(name);
		($(event.target)).parents(':eq(1)').append('<button>');
		($(event.target)).parent().remove();
		
		let player = new Player(name)
		playerArr.push(player)
		if (playerArr.length === 2){
			gameStateTracker = 'setup';
			$('#console').text('Place your Units')
		}
	}
	
	//create object for each territory and assign neighbor states 
	let $territoryElements = $('.jqvmap-region')
	let territoryObjects = []

	$territoryElements.each(function(){
		let name = $(this).attr('id');
		for (stateId in stateNeighbors){
			if(name.match(/[^_]*$/)[0] === stateId){
				neighbors = stateNeighbors[stateId]
				let territory = new Territory(name, neighbors)
				territoryObjects.push(territory)
			}
		}
	})

	//TODO - TOGGLE EVENT LISTENER TO PREVENT CLICKS AFTER SELECTION
	//function to toggle turn that can be called by action fucntions 
	const toggleTurn = () =>{
		// turntoggle
		if (t === 0){
			t = 1
		} else {
			t = 0
		}
	}
	const setUpBoard = (event) =>{
		if (playerArr[1].initialUnits > 0){
			let $clicked = ($(event.target)).attr('id');
			for (territory of territoryObjects){
				if ($clicked === territory.name){
					territory.occupier = t;
					territory.units ++
				}
			}
			playerArr[t].occupiedStates ++
			if (t === 0){
				($(event.target)).css({'fill': 'blue'});
			} else if (t === 1) {
				($(event.target)).css({'fill': 'red'});
			}
			playerArr[t].initialUnits --

		} else {
			gameStateTracker = 'main';
		}
		console.log(playerArr[t]) 
		toggleTurn()
	}

	const attackSelector = (event) => {
		let $clicked = ($(event.target)).attr('id');
		console.log($clicked);
		$('#console').text('Game has started')
	}

	//event listeners
	$('#player1submit').click(makePlayer)
	$('#player2submit').click(makePlayer)
});

