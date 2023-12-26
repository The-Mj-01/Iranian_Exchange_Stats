


export default async function ramzinex_result(){
	var formatter = new Intl.NumberFormat('en-US');


	let responseRamzinex = await fetch('https://publicapi.ramzinex.com/exchange/api/v1.0/exchange/total_volume', {
		method: "GET" // default, so we can ignore
	})
	let dataRamzinex = await responseRamzinex.json()

	let ramzinexTotalVol= formatter.format(dataRamzinex.data.toString())
	return {totalVal: ramzinexTotalVol}
}
