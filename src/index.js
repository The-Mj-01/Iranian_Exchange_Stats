/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
// https://api.nobitex.ir/market/stats?srcCurrency=btc,eth,ltc,usdt,xrp,bch,bnb,eos,xlm,etc,trx,pmn,doge,uni,dai,link,dot,aave,ada,shib,ftm,matic,axs,mana,sand,avax,mkr,gmt,usdc,slp,egala,one,t,snt,celr,jst,grt,blur,hbar,storj&dstCurrency=rls

import nobitex_result from "./nobitex";
import ramzinex_result from "./ramzinex";
import wallex_result from "./wallex";
import bitpin_result from "./bitpin";

export default {
	async fetch(request, env, ctx) {


//
//
		let ramzinex = await ramzinex_result()
		let nobitex = await nobitex_result()
		let wallex = await wallex_result()
		let bitpin = await bitpin_result()

		const json = JSON.stringify({ramzinex,nobitex,wallex,bitpin}, null, 2);
		// console.log(json)
		return new Response(json, {
			headers: {
				"content-type": "application/json;charset=UTF-8",
			},
		});
	},
};
