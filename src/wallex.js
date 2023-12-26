

export default async function wallex_result(){
	var formatter = new Intl.NumberFormat('en-US');
	let response = await fetch('https://api.wallex.ir/v1/markets', {
		method: "GET" // default, so we can ignore
	})
	let data = await response.json()


	let sumToman= 0;
	let sumUsdt= 0;
	let groups = {};

	let symbols = data.result.symbols

	for (let key of Object.keys(symbols) ){
		// console.log(symbols[key].stats["24h_tmnVolume"])


		let volume = parseInt(symbols[key].stats["24h_tmnVolume"])
		if (key.endsWith("TMN")) {
			// اضافه کردن کلید و مقدار آن به object groups با استفاده از عبارت [key]
			groups[key] = symbols[key].stats["24h_tmnVolume"];
		}
		// بررسی اینکه کلید به صورت *-usdt باشد
		if (key.endsWith("USDT")) {
			// اضافه کردن کلید و مقدار آن به object groups با استفاده از عبارت [key]
			groups[key] = symbols[key].stats["24h_tmnVolume"];
		}
		// console.log(`${key} : ${volume} `)
		if (typeof volume === 'number' && !Number.isNaN(volume)){
			if(key.endsWith("TMN")){
				sumToman+= volume
			}
			if(key.endsWith("USDT")){
				sumUsdt+= volume
			}
		}
	}


	var formattedRial = formatter.format(sumToman * 10);
	var formattedUsdt = formatter.format(sumUsdt/ symbols["USDTTMN"].stats.lastPrice)


	let totalVolumeRial = formatter.format((sumToman + sumUsdt)*10 )
	console.log(totalVolumeRial)

	return {currencies:groups,sumRials: formattedRial, sumUsdt: formattedUsdt, usdtPrice: symbols["USDTTMN"].stats.lastPrice*10, totalVolume: totalVolumeRial}


}
