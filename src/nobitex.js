


export default async function nobitex_result() {
	var formatter = new Intl.NumberFormat('en-US');
	let response = await fetch('https://api.nobitex.ir/market/stats?srcCurrency=btc,usdt,eth,etc,doge,ada,bch,ltc,bnb,eos,xlm,xrp,trx,uni,link,dai,dot,shib,aave,ftm,matic,axs,mana,sand,avax,usdc,gmt,mkr,sol,atom,grt,bat,near,ape,qnt,chz,xmr,egala,busd,algo,hbar,1inch,yfi,flow,snx,enj,crv,fil,wbtc,ldo,dydx,apt,mask,comp,bal,lrc,lpt,ens,sushi,api3,one,glm,pmn,dao,cvc,nmr,storj,snt,ant,zrx,slp,egld,imx,blur,100k_floki,1b_babydoge,1m_nft,1m_btt,t,celr,arb,magic,gmx,band,cvx,ton,ssv,mdt,omg,wld,rdnt,jst&dstCurrency=rls,usdt', {
		method: "GET" // default, so we can ignore
	})
	let data = await response.json()


	let sumRials= 0;
	let sumUsdt= 0;
	let groups = {};

	let stats = data.stats



	for (let key of Object.keys(stats) ){
		let volume = parseInt(stats[key].volumeDst)
		if (key.endsWith("-rls")) {
			// اضافه کردن کلید و مقدار آن به object groups با استفاده از عبارت [key]
			groups[key] = stats[key].volumeDst;
		}
		// بررسی اینکه کلید به صورت *-usdt باشد
		if (key.endsWith("-usdt")) {
			// اضافه کردن کلید و مقدار آن به object groups با استفاده از عبارت [key]
			groups[key] = stats[key].volumeDst;
		}
		// console.log(`${key} : ${volume} `)
		if (typeof volume === 'number' && !Number.isNaN(volume)){
			if(key.endsWith("-rls")){
				sumRials+= volume
			}
			if(key.endsWith("-usdt")){
				sumUsdt+= volume
			}
		}
	}


	var formattedRial = formatter.format(sumRials);
	var formattedUsdt = formatter.format(sumUsdt)

	let totalVolume = formatter.format(sumRials + sumUsdt * stats["usdt-rls"].latest)
	console.log(totalVolume)

  return {currencies:groups,sumRials: formattedRial, sumUsdt: formattedUsdt, usdtPrice: stats["usdt-rls"].latest, totalVolume: totalVolume}


}
