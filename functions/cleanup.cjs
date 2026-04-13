const stripe = require("stripe")("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");

(async () => {
  const accounts = await stripe.accounts.list({ limit: 100 });

  for (const acct of accounts.data) {
    if (acct.email === "") {
      await stripe.accounts.del(acct.id);
      console.log("Disconnected:", acct.id);
    }
  }
})();