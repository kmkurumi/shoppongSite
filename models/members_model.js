const db = require('./connection_db');

module.exports = function register(req, res) {
	connection.query(
		"insert into members set Name = ?, Phone = ? ,Email = ? ,Account = ?, Password = ?, Birthday = ?, County = ?, District = ?, CompanyPhone = ?, Gender= ?",
		[
			req.body.secondName,
			req.body.phone,
			req.body.email,
			req.body.account,
			req.body.password,
			req.body.birthday,
			req.body.county,
			req.body.district,
			req.body.companyPhone,
			req.body.gender
		], function (err, results) {
			if (err) {
				console.log(JSON.stringify(err));
				console.log("\nerror can not insert");
			} else {
				if (results.lenght > 0) {
					//傳回Json陣列	
					res.send(JSON.stringify(results));
					console.log("\nsuccess insert1.");
				}
			}
		}
	);
	res.send(req.body);
	console.log("\nsuccess insert2.");
	console.log("ok");
	// res.redirect('/home');
}