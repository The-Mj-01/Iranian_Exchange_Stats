


export default async function bitpin_result() {
	var formatter = new Intl.NumberFormat('en-US');
	let response = await fetch('https://api.bitpin.ir/v1/mkt/markets/', {
		method: "GET" // default, so we can ignore
	})
	let data = await response.json()


	let sumToman= 0;
	let sumUsdt= 0;
	let groups = {};

	let results = data.results
	console.log(results)



	for (let i = 0; i < results.length; i++){
		let volume = parseInt(results[i]["order_book_info"].value)
		if (results[i]["currency2"]["code"] ==("IRT")) {
			// اضافه کردن کلید و مقدار آن به object groups با استفاده از عبارت [key]
			groups[results[i]["currency1"].code + results[i]["currency2"].code] = results[i]["order_book_info"].value;
		}
		// بررسی اینکه کلید به صورت *-usdt باشد
		if (results[i]["currency2"]["code"] == ("USDT")) {
			// اضافه کردن کلید و مقدار آن به object groups با استفاده از عبارت [key]
			groups[results[i]["currency1"].code+results[i]["currency2"].code] = results[i]["order_book_info"].value;
		}
		// console.log(`${key} : ${volume} `)
		if (typeof volume === 'number' && !Number.isNaN(volume)){
			if(results[i]["currency2"]["code"] == ("IRT")){
				sumToman+= volume
			}
			if(results[i]["currency2"]["code"] == ("USDT")){
				sumUsdt+= volume
			}
		}
	}


	var formattedRial = formatter.format(sumToman * 10);
	var formattedUsdt = formatter.format(sumUsdt * results[3]["order_book_info"].price * 10)


	let totalVolumeRial = formatter.format((sumToman + sumUsdt * results[3]["order_book_info"].price)*10 )
	console.log(totalVolumeRial)

	return {currencies:groups,sumRials: formattedRial, sumUsdt: formattedUsdt, usdtPrice: results[3]["order_book_info"].price, totalVolume: totalVolumeRial}


}
